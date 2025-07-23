from flask import Blueprint, request, jsonify
from controller.ia_controller import get_response, train_with_json

chatbot_bp = Blueprint("chatbot", __name__)

@chatbot_bp.route("/get_response", methods=["POST"])
def handle_chat():
    user_message = request.form.get("message")
    bot_response = get_response(user_message)
    return jsonify({"response": bot_response})


@chatbot_bp.route("/train-json", methods=["POST"])
def handle_training_json():
    resultado = train_with_json()
    if "error" in resultado:
        return jsonify(resultado), 404
    return jsonify(resultado), 200
