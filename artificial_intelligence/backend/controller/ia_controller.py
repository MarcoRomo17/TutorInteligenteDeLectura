from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
import json, random, os

# Crear el Chotbot
chatbot = ChatBot("Tutor de Lectura")
trainer = ChatterBotCorpusTrainer(chatbot)

#Entrenamiento
trainer.train("chatterbot.corpus.spanish")
trainer.train("chatterbot.corpus.spanish.greetings")
trainer.train("chatterbot.corpus.spanish.conversations") 

# Declaración de Rutas
yml_route = os.path.join(os.path.dirname(__file__), "../" "data.yml")
json_route = os.path.join(os.path.dirname(__file__), "../"  "training.json")

if yml_route: 
    print("La ruta existe, preparando entrenamiento")
    trainer.train(yml_route) 
    
    
if json_route: 
    print("La ruta del JSON existe")
    
with open(json_route, "r", encoding="utf-8") as file: 
    data = json.load(file)

def book_assistant(gender): 
    for book_gender in data: 
        if book_gender in gender.lower(): 
            return random.choice(data[book_gender])

def chat(message):
    
    book = book_assistant(message)
    if book: 
        print("Bot: ", book_assistant(message) )
       
    else: 
        response = chatbot.get_response(message)
        print("Bot:", response)
    