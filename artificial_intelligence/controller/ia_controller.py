from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from chatterbot.trainers import ListTrainer
import json
import os


# Crear el chatbot
chatbot = ChatBot(
    "BotPablo",
    storage_adapter="chatterbot.storage.SQLStorageAdapter",
    logic_adapters=[
        {
            "import_path": "chatterbot.logic.BestMatch",
            "default_response": "Lo siento, no entiendo. ¿Puedes reformularlo?",
            "maximum_similarity_threshold": 0.90,
        }
    ],
    database_uri="sqlite:///database.sqlite3"
)

# Entrenar con corpus en español
trainer = ChatterBotCorpusTrainer(chatbot)
trainer.train("chatterbot.corpus.spanish.greetings")  # Saludos básicos
trainer.train("chatterbot.corpus.spanish.conversations")  # Conversaciones generales

# Entrenamiento personalizado (opcional)
trainer_list = ListTrainer(chatbot)
trainer_list.train([
    "¿Cómo te llamas?",
    "Soy BotPablo, tu asistente virtual.",
    "¿Qué puedes hacer?",
    "Puedo responder preguntas básicas y mantener una conversación simple.",
])


def get_response(user_message):
    bot_response = chatbot.get_response(user_message)
    return str(bot_response)

def train_with_json():
    ruta_json = os.path.join(os.path.dirname(__file__), "..", "IA", "training.json")
    ruta_json = os.path.abspath(ruta_json)


    if not os.path.exists(ruta_json):
        return {"error": "No se encontró el archivo training.json"}

    with open(ruta_json, "r", encoding="utf-8") as file:
        data = json.load(file)

    trainer = ListTrainer(chatbot)

    conversaciones = data.get("data", [])
    for conversacion in conversaciones:
        trainer.train(conversacion)

    return {"msg": f"Entrenamiento exitoso con {len(conversaciones)} conversaciones"}