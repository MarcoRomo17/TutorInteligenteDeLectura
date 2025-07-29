from flask import Flask
from flask_cors import CORS

def create_app(): 
    app = Flask(__name__)
    
    from backend.routes.ia_route import ia_bp
    app.register_blueprint(ia_bp)
    
    CORS(app)
    
    
    
    return app
    


