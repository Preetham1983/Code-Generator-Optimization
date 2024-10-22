

from flask import Flask, request, jsonify
from flask_cors import CORS
import pytesseract as tess
from PIL import Image
from io import BytesIO
from langchain_community.llms import CTransformers
from langchain.prompts import PromptTemplate

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  

# Configure Tesseract path
tess.pytesseract.tesseract_cmd = r'C:/Program Files/Tesseract-OCR/tesseract.exe'  # Update this to the correct path

# Function to load and get the LLaMA response
# def get_llama_response(input_text,timeComplexity,language):
#     # Load the LLaMA 2 model from the local path
#     llm = CTransformers(
#         model='C:/Users/bandi/OneDrive/Desktop/LLama/codellama-13b-instruct.Q4_K_M.gguf',
#         model_type='llama',
#         config={'max_new_tokens': 500, 'temperature': 0.01}
#     )
    
#     # Define the template for generating code and explanation
#     template = "generate code for '{input_text}' in timeComplexity '{timeComplexity}' and in language{language}"
    
#     # Create the prompt using the template and input data
#     prompt = PromptTemplate(input_variables=["input_text","timeComplexity","language"], template=template)
    
#     # Generate the response from the model
#     response = llm(prompt.format(input_text=input_text,timeComplexity=timeComplexity,language=language))
#     return response
def get_llama_response(input_text, timeComplexity, language):

    llm = CTransformers(
        model='C:/Users/bandi/OneDrive/Desktop/LLama/codellama-13b-instruct.Q4_K_M.gguf',
        model_type='llama',
        config={'max_new_tokens': 500, 'temperature': 0.01}
    )
    
    # Define the template for generating code and explanation
    # template = "Generate code for the following description:\n\n'{input_text}'\n\nTime complexity: {timeComplexity}\n\n  Programming language:{language}\n\n"
    template = (
    "Generate code for description:\n\n"
    "Description: '{input_text}'\n\n"
    "Time Complexity: {timeComplexity}\n\n"
    "in Programming Language: {language}\n\n")

 
    prompt = PromptTemplate(input_variables=["input_text", "timeComplexity", "language"], template=template)
    
  
    formatted_prompt = prompt.format(input_text=input_text, timeComplexity=timeComplexity, language=language)
    
    
    print(f"Formatted Prompt: {formatted_prompt}")

   
    response = llm(formatted_prompt)
    return response


@app.route('/generate', methods=['POST'])
def generate_response():
    try:
        data = request.json
        input_text = data.get('input_text')
        timeComplexity=data.get('timeComplexity')
        language=data.get('language')
        # Get the LLaMA response using the provided function
        response = get_llama_response(input_text,timeComplexity,language)

        # Return the response as JSON
        return jsonify({'response': response}), 200

    except Exception as e:
        print(f"Error generating response: {str(e)}")
        return jsonify({'error': 'Failed to generate response'}), 500


@app.route('/image-to-text', methods=['POST'])
def image_to_text():
    try:
        # Check if an image file is present in the request
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'}), 400

        # Check if timeComplexity and language are present in the form data
        time_complexity = request.form.get('timeComplexity', 'O(n)')  # Default to O(n) if not provided
        language = request.form.get('language', 'java')  # Default to java if not provided

        # Open the image file
        image_file = request.files['image']
        image = Image.open(BytesIO(image_file.read()))

        # Use Tesseract to extract text from the image
        extracted_text = tess.image_to_string(image)

        # Send the extracted text, time complexity, and language to LLaMA for code generation
        llama_response = get_llama_response(extracted_text, time_complexity, language)

        # Return both the extracted text and LLaMA response
        return jsonify({
            'extracted_text': extracted_text,
            'llama_response': llama_response
        }), 200

    except Exception as e:
        print(f"Error processing image: {str(e)}")
        return jsonify({'error': 'Failed to process image'}), 500
    
def get_llama_response2(code_with_bug, language):
    llm = CTransformers(
        model='C:/Users/bandi/OneDrive/Desktop/LLama/codellama-13b-instruct.Q4_K_M.gguf',
        model_type='llama',
        config={'max_new_tokens': 500, 'temperature': 0.01}
    )

    # The prompt template for debugging code
    template = (
        "Debug the following code:\n\n"
        "Code: '{input_text}'\n\n"
        "Identify and fix any bugs.\n"
        "Provide an explanation for the bugs and the fixes. Provide correct code.\n\n"
    )

    # Create a PromptTemplate and format it with input_text, timeComplexity, and language
    prompt = PromptTemplate(
        input_variables=["input_text", "language"], 
        template=template
    )
    
    # Format the prompt using the provided code, time complexity, and language
    formatted_prompt = prompt.format(input_text=code_with_bug,  language=language)
    
    print(f"Formatted Prompt: {formatted_prompt}")

    # Get response from the model
    response = llm(formatted_prompt)
    return response

# Flask route to handle debugging requests
@app.route('/debug', methods=['POST'])
def generate_response1():
    try:
        # Extract code with bug, time complexity, and language from the request body
        data = request.json
        code_with_bug = data.get('code_with_bug')
       
        language = data.get('language')

        # Get the LLaMA response using the provided function
        response = get_llama_response2(code_with_bug, language)

        # Return the response as JSON
        return jsonify({'debugged_code': response}), 200

    except Exception as e:
        print(f"Error generating response: {str(e)}")
        return jsonify({'error': 'Failed to generate response'}), 500
    


def get_llama_response3(input_text):
    llm = CTransformers(
        model='C:/Users/bandi/OneDrive/Desktop/LLama/codellama-13b-instruct.Q4_K_M.gguf',
        model_type='llama',
        config={'max_new_tokens': 512, 'temperature': 0.01}
    )

    # The prompt template for debugging code
    template = (
    "Optimize the following code:\n\n"
    "Code: '{input_text}'\n\n"
    "Identify and suggest improvements to optimize the code.\n"
    "Provide an explanation for the optimizations and give the optimized code.\n\n"
    
   
)

    # Create a PromptTemplate and format it with input_text, timeComplexity, and language
    prompt = PromptTemplate(
        input_variables=["input_text"], 
        template=template
    )
    
    # Format the prompt using the provided code, time complexity, and language
    formatted_prompt = prompt.format(input_text=input_text)
    
    print(f"Formatted Prompt: {formatted_prompt}")

    # Get response from the model
    response = llm(formatted_prompt)
    return response

@app.route('/optimize', methods=['POST'])
def generate_response2():
    try:
        
        data = request.json
        input_text= data.get('input_text')
        response = get_llama_response3(input_text)

        
        return jsonify({'optimized_code': response}), 200

    except Exception as e:
        print(f"Error generating response: {str(e)}")
        return jsonify({'error': 'Failed to generate response'}), 500
    



def get_llama_response4(input_text):
    llm = CTransformers(
        model='C:/Users/bandi/OneDrive/Desktop/LLama/codellama-13b-instruct.Q4_K_M.gguf',
        model_type='llama',
        config={'max_new_tokens': 512, 'temperature': 0.01}
    )

    template = (
    "Review the following code:\n\n"
    "Code: '{input_text}'\n\n"
    "Please provide a detailed review of the code. Include the following in your review:\n"
    "- Analysis of code quality, readability, and maintainability\n"
    "- Identification of any potential issues or improvements\n"
    "- Suggestions for enhancing the code's performance and efficiency\n"
    "- Any recommendations for best practices or design patterns\n\n"
)
   



    prompt = PromptTemplate(
        input_variables=["input_text"], 
        template=template
    )
    
  
    formatted_prompt = prompt.format(input_text=input_text)
    
    print(f"Formatted Prompt: {formatted_prompt}")

    response = llm(formatted_prompt)
   
    return response

@app.route('/review', methods=['POST'])
def generate_response3():
    try:
        
        data = request.json
        input_text= data.get('input_text')
       

       
        response = get_llama_response4(input_text)

      
        return jsonify({'reviewed_code': response}), 200

    except Exception as e:
        print(f"Error generating response: {str(e)}")
        return jsonify({'error': 'Failed to generate response'}), 500
    

def fun(topic):
    llm = CTransformers(
        model='C:/Users/bandi/OneDrive/Desktop/LLama/chat-with-author-backend/models/llama-2-7b-chat.ggmlv3.q8_0.bin',
        model_type='llama',
        config={'max_new_tokens': 150, 'temperature': 0.7}
    )

    template = (
        "Generate 10 interview questions related to the following topic:\n\n"
        "Topic: {topic}\n\n"
        "Provide the questions in a list format."
    )

    prompt = PromptTemplate(input_variables=["topic"], template=template)
    formatted_prompt = prompt.format(topic=topic)

    response = llm(formatted_prompt)
    return response

@app.route('/generate_questions', methods=['POST'])
def generate_questions():
    try:
        data = request.json
        topic = data.get('topic')

        response = fun(topic)
        return jsonify({'questions': response}), 200

    except Exception as e:
        print(f"Error generating questions: {str(e)}")
        return jsonify({'error': 'Failed to generate questions'}), 500


    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)
