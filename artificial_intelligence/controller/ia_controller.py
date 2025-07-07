from flask import Blueprint, jsonify, request
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer, ListTrainer
import os
import json

ia_bp = Blueprint("ia_bp", __name__, url_prefix="/ia")

# Crear el chatbot
chatbot = ChatBot("Bot de Mamá de Fátima", read_only=True)

# Entrenar la IA
@ia_bp.route("/training", methods=["POST"])
def training_corpus(): 
    print("Entrenamiento en proceso...")
    trainer = ChatterBotCorpusTrainer(chatbot)
    
    for i in range(100):
        trainer.train("chatterbot.corpus.spanish")
        os.system('cls')
        
    trainer.export_for_training('./mi_entrenamiento.json')

    
    return jsonify({
        "msg": "Entrenamiento finalizado."
    }), 200
    
# Entrenar la IA con un JSON
@ia_bp.route("/training-json", methods=["POST"])
def training_by_json(file="artificial_intelligence/IA/training.json"):
    if not os.path.exists(file): 
        return jsonify({
            "err": "No se encuentra el archivo .json"
        }), 404
    
    print("Entrenamiento en curso...")
    
    with open(file, "r", encoding="utf-8") as f: 
        print(f"Archivo usado: {file}")
        data = json.load(f)
        
        trainer = ListTrainer(chatbot)
        
        repeticiones = 100  # 🔁 Número de veces que quieres entrenar
        
        for i in range(repeticiones):
            print(f"Entrenamiento #{i+1}")
            for conversacion in data.get("data", []): 
                trainer.train(conversacion)
                
        trainer.export_for_training('./mi_entrenamiento.json')

    
    return jsonify({
        "msg": f"Entrenamiento realizado {repeticiones} veces con éxito."
    })


@ia_bp.route("/chat", methods=["GET"])
def start_chat():
    user_input = request.args.get("mensaje")

    if not user_input:
        return jsonify({"error": "Falta el parámetro 'mensaje'"}), 400

    try:
        user_input = user_input.strip()
        answer = chatbot.get_response(user_input)
        respuesta = str(answer)
    except Exception as e:
        return jsonify({"error": "Ocurrió un problema al generar la respuesta.", "detalle": str(e)}), 500

    return jsonify({"respuesta": respuesta})

