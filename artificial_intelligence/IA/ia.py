from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer

chatbot = ChatBot("MiBot")
entrenador = ChatterBotCorpusTrainer(chatbot)

entrenador.train("chatterbot.corpus.spanish")

while True:
    pregunta = input("Tú: ")
    respuesta = chatbot.get_response(pregunta)
    print("Bot: ", respuesta)
