import functions_framework
from langchain.chat_models import ChatVertexAI

from langchain.memory.chat_message_histories.in_memory import ChatMessageHistory
from langchain.schema import messages_from_dict, messages_to_dict
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
import json

import os
import vertexai

from google.cloud import firestore

credential_path = os.path.abspath('./key.json')
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = credential_path

PROJECT_ID = "talktome-e4031"  # @param {type:"string"}
vertexai.init(project=PROJECT_ID, location="us-central1")
db = firestore.Client(project=PROJECT_ID)

temperature:float = 0.8
max_output_tokens:int = 1024
top_p: float = 0.95
top_k: int = 40

chat_model = ChatVertexAI(temperature=temperature,
                       max_output_tokens=max_output_tokens,
                       top_p=top_p,
                       top_k=top_k)

def store_conversation(llm_chain,user_id,file_name):
    json_obj = messages_to_dict(llm_chain.memory.chat_memory.messages)
    string_of_json_obj = json.dumps(json_obj)
    db.collection("histories").document(user_id).update({file_name:string_of_json_obj})

def set_context(user_id:str,
                file_name:str) -> str:
    """
    This function takes the document for the first time and the chat id as well.
    It will return the summary of the same.
    """

    document_content = db.collection("histories").document(user_id).get().to_dict()[file_name]

    start_system_message = f"""
    You are an assistant for a very large content query answering company.
    Based on this, you will be asked questions in the future, so learn it properly.
    Given the content, you have to process the document's content that is provided to you. The content is:

    {document_content}
    """

    llm_chain = ConversationChain(llm=chat_model,
                                  verbose=True,
                                  memory=ConversationBufferMemory(),
                                    )

    response = llm_chain.predict(input=start_system_message)

    
    store_conversation(llm_chain,user_id,file_name)

    return response

@functions_framework.http
def hello_http(request):
    """HTTP Cloud Function.
    Args:
        request (flask.Request): The request object.
        <https://flask.palletsprojects.com/en/1.1.x/api/#incoming-request-data>
    Returns:
        The response text, or any set of values that can be turned into a
        Response object using `make_response`
        <https://flask.palletsprojects.com/en/1.1.x/api/#flask.make_response>.
    """
    request_json = request.get_json(silent=True)
    request_args = request.args

    #if request_json and 'name' in request_json:
    #    name = request_json['name']
    #elif request_args and 'name' in request_args:
    #    name = request_args['name']
    #else:
    #    name = 'World'
    #return 'Hello {}!'.format(name)

    if request_json and 'user_id' in request_json:
        user_id = request_json['user_id']
        file_name = request_json['file_name']

        set_context(user_id,file_name)

    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 


