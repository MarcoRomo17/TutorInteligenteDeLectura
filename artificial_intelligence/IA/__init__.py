from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
   
    from routes.chatbot_routes import chatbot_bp  
    app.register_blueprint(chatbot_bp)
    
    CORS(app)
    
    return app  
    