from flask import Blueprint, jsonify, request
from backend.controller.ia_controller import chat

ia_bp = Blueprint("ia", __name__, url_prefix="/ia")

@ia_bp.route("/chat", methods=["POST"])
def chat_running():
    data = request.get_json("message")
    message = data.get("message")
    output_message = chat(message)
    print(output_message)
    
    return jsonify({
        "msg": output_message
    }), 200