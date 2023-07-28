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

def fetch_conversation(user_id,file_name):
    return messages_from_dict(json.loads(db.collection("histories").document(user_id).get().to_dict()[file_name]))

def send_question(question_content:str,
                  user_id:str,
                  file_name:str,
                  ) -> str:
    """
    This function will fetch the document, and the existing conversation.
    Then it will ask the question and return the response.
    """

    question_system_message = f"""
    Based on the document and the summary that you gave, answer the following question please:

    {question_content}
    """

    #Function to get the conversational memory buffer from firestore
    memory = fetch_conversation(user_id,file_name)
    chat_history = ChatMessageHistory(messages=memory)
    retrieved_memory = ConversationBufferMemory(chat_memory=chat_history)

    reloaded_chain = ConversationChain( llm=chat_model,
                                        verbose=True,
                                        memory=retrieved_memory,
                                        )

    response = reloaded_chain.predict(input=question_system_message)
    #print(f"The question's response is \n{response}")

    store_conversation(reloaded_chain,user_id,file_name)

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

    # Set CORS headers for the main request
    headers = {"Access-Control-Allow-Origin": "*"}

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
        question_content = request_json['question_content']
        user_id = request_json['user_id']
        file_name = request_json['file_name']
    else:
        return "Invalid request format"

    print("Request is verified")

    print("sending questio to model")

    answer = send_question(question_content,user_id,file_name)

    print ("answer from model received")

    return json.dumps({'success':True,'answer':answer}), 200, headers 


