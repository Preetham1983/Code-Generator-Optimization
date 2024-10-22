# Code-Generator-Optimization
The code generator optimization tool helps users solve coding-related problems and more. It assists in preparing for interviews by generating optimized solutions, reviewing code for best practices, and offering suggestions for code improvements. Additionally, the tool supports debugging, helping users identify and fix issues, and optimizing code for better performance. This tool is a comprehensive resource for both learning and refining coding skills, making it easier for users to write efficient, high-quality code across various programming languages.

# Model Information
I used CodeLlama-13B in my backend, which processes user queries related to problem-solving and provides responses
download link: https://huggingface.co/TheBloke/CodeLlama-13B-Instruct-GGUF/resolve/main/codellama-13b-instruct.Q4_K_M.gguf

# PyTesseract-OCR/tesseract.exe
Download PyTesseract-OCR/tesseract.exe in your system and add the location of the pytessract in your system and proceeced as i written in my code 
Download link : https://pypi.org/project/pytesseract/#files

# Run- frontend with these commands
 replace the files where u created using create-react-app my-app with above files 
  to run frontend 
  command -- npm start
# Run - backend commands 
  Command1 --python app.py ( to start the flask application where your model will process the user query)
  Command2 --node server.js ( is the backend server which will store the query asked by the user and the response give by the LLM model)
