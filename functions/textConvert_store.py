import functions_framework
import json
import re
import os

from google.cloud import vision
from google.cloud import storage


def call_vision_api(file_path:str,save_annotation_path:str) -> str:
    os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'vision_ocr_read.json'
    async_detect_document(file_path, save_annotation_path)
    return write_to_text(save_annotation_path)


def async_detect_document(gcs_source_uri, gcs_destination_uri):
    # Supported mime_types are : 'application/pdf and 'image/tiff'
    # because we are reading from a PDF document ,we set this variable
    # to application/pdf

    mime_type = 'application/pdf'

    ##Batch size determines how many PDF pages worth of data will go in 
    ## each file of text locations
    batch_size = 100

    client = vision.ImageAnnotatorClient()

    feature = vision.Feature(
        type_= vision.Feature.Type.DOCUMENT_TEXT_DETECTION)
    
    #here, we tell the cloud vision API that our source type is mime_type
    gcs_source = vision.GcsSource(uri= gcs_source_uri)
    input_config = vision.InputConfig(
        gcs_source = gcs_source, mime_type=mime_type
    )

    gcs_destination = vision.GcsDestination(uri=gcs_destination_uri)
    output_config = vision.OutputConfig(
        gcs_destination = gcs_destination, batch_size=batch_size
    )

    async_request = vision.AsyncAnnotateFileRequest(
        features = [feature], input_config = input_config,
        output_config = output_config
    )

    operation = client.async_batch_annotate_files(
        requests = [async_request] )

    print('Waiting for the operation to finish')
    operation.result(timeout=540)

def delete_blob(bucket_name, blob_name):
    """Deletes a blob from the bucket."""
    # bucket_name = "your-bucket-name"
    # blob_name = "your-object-name"

    storage_client = storage.Client()

    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(blob_name)
    generation_match_precondition = None

    # Optional: set a generation-match precondition to avoid potential race conditions
    # and data corruptions. The request to delete is aborted if the object's
    # generation number does not match your precondition.
    blob.reload()  # Fetch blob metadata to use in generation_match_precondition.
    generation_match_precondition = blob.generation

    blob.delete(if_generation_match=generation_match_precondition)
    print(f"Blob {blob_name} deleted.")



def write_to_text(gcs_destination_uri):
     # Once the request has completed and the output has been
     # written to GCS, we can list all the output files.
    storage_client =  storage.Client()

    match = re.match(r'gs://([^/]+)/(.+)', gcs_destination_uri)
    bucket_name = match.group(1)
    prefix = match.group(2)

    bucket = storage_client.get_bucket(bucket_name)

    # List objects with the given prefix.
    blob_list = list(bucket.list_blobs(prefix=prefix))
    print('Output files:')
    for blob in blob_list:
        print(blob.name)

    
    final_text:str = ""
    text:str = ""

    for n in range(1,len(blob_list)):
        # Process the an output file from GCS.
        # Since we specified batch_size=100, the first response contains
        # the first 100 pages of the input file.
        output = blob_list[n]
        print("N",n)
        print("Output",output)

        json_string = output.download_as_string()
        try:
            response = json.loads(json_string)
            # make a file to write the contents of this batch in
            # file = open("batch{}.txt".format(str(n)),"w")
            # The actual response for the first page of the input file.
            print("Number of pages:",len(response['responses']))

            for m in range(len(response['responses'])):
                first_page_response = response['responses'][m]
                annotation = first_page_response['fullTextAnnotation']
        
                # Here we print the full text from the first page.
                # The response contains more information:
                # annotation/pages/blocks/paragraphs/words/symbols
                # including confidence scores and bounding boxes
                print('Full text:\n')
                # print(annotation[ 'text'])
                # file.write(annotation['text'])
                text = text + annotation['text']
            
            print(text)
      
        except:
            pass

        #deleting the bucket object after reading it
        delete_blob(bucket_name=bucket_name,blob_name=output.name)

    
    return text


def transcribe_gcs(gcs_uri: str,lang_code : str) -> str:
    """Asynchronously transcribes the audio file specified by the gcs_uri.

    Args:
        gcs_uri: The Google Cloud Storage path to an audio file.

    Returns:
        The generated transcript from the audio file provided.
    """
    from google.cloud import speech

    # client = speech.SpeechClient()
    client = speech.SpeechClient.from_service_account_file('key_speech_to_text.json')


    audio = speech.RecognitionAudio(uri=gcs_uri)
    config = speech.RecognitionConfig(
        # encoding=speech.RecognitionConfig.AudioEncoding.FLAC,
        sample_rate_hertz=44100,
        language_code= lang_code,
    )

    operation = client.long_running_recognize(config=config, audio=audio)

    print("Converting speech to text")
    print("Waiting for operation to complete...")
    
    response = operation.result()

    transcript_builder = []
    # Each result is for a consecutive portion of the audio. Iterate through
    # them to get the transcripts for the entire audio file.
    for result in response.results:
        # The first alternative is the most likely one for this portion.
        transcript_builder.append(f"\nTranscript: {result.alternatives[0].transcript}")
        # transcript_builder.append(f"\nConfidence: {result.alternatives[0].confidence}")

    transcript = "".join(transcript_builder)
    # print(transcript)
    return transcript

@functions_framework.http
def textConvert_store(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """

    if request.method == "OPTIONS":
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Max-Age": "3600",
        }

        return ("", 204, headers)
    
    headers = {"Access-Control-Allow-Origin": "*"}
    request_json = request.get_json(silent=True)
    request_args = request.args


    # file_path = "gs://filebucket/filedir/filename"
    
    # request object format
    # {
    #     'user_id' : ----
    #     'file_path' : 'gs://----/---'
    # }
    

    if request_json and 'user_id' in request_json:
        user_id = request_json['user_id']
        file_path = request_json['file_path']
        print("user_id:",user_id)
        print("file_path:",file_path)
    else:
        print("Incorrect request format")
        return json.dumps({'success': False}),400,headers
    
    text: str = ""

    print("Checking file_type")

    import re
    match = re.search(r"/([^/]+)$", file_path)
    if match:
        file_name = match.group(1)
        print('file_name:',file_name) 
    else:
        print("filename not found")

    if file_name.lower().endswith(('.wav','.mp3')):
        from google.cloud import speech
        print("calling cloud speech to text api")
        text = transcribe_gcs(file_path,"en-US")


    elif file_name.lower().endswith('.pdf'):
        print("Detected it is a PDF")
        save_annotation_path = 'gs://talktome-e4031.appspot.com/pdf_annotation_storage/'
        text = call_vision_api(file_path,save_annotation_path)

    elif file_name.lower().endswith('.txt'):
        with open(file_path, 'r') as f:
            text = f.read()

    else:
        print('File is not an audio or pdf or txt file.')
        return ({'success': False}),415 , headers

    print(text)
    print("Storing the content in firestore")

    from google.cloud import firestore
    

    PROJECT_ID = "talktome-e4031"  # @param {type:"string"}
    db = firestore.Client(project=PROJECT_ID)
    doc_ref = db.collection('histories').document(user_id)
    doc = doc_ref.get()
    if doc.exists:
        print("Found")
        db.collection("histories").document(user_id).update({file_name.replace('.','__'):text})
    else:
        print("Not found")
        db.collection("histories").document(user_id).set({file_name.replace('.','__'):text})
    

    print("Sending HTTP request to Chat function")
    import requests
    url_create = "https://us-central1-talktome-e4031.cloudfunctions.net/create-context"
    params = {"user_id" : user_id,
            "file_name" : file_name.replace('.','__'),
            }
    r = requests.post(url_create,json=params)

    print("This is response : ",r,r.content)

    return json.dumps({'success': True}),200, headers

