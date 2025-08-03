from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import spacy
import json, random, os
 
# Cargar datos
iris = load_iris()
x = iris.data
y = iris.target

x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.2, random_state=42)

# Modelo 
model = RandomForestClassifier()
model.fit(x_train, y_train)
predict = model.predict(x_test)
nlp = spacy.load("es_core_news_sm")

# Crear el Chotbot
chatbot = ChatBot("Tutor de Lectura")
trainer = ChatterBotCorpusTrainer(chatbot)

try: 
    recomendations_yml = os.path.join(os.path.dirname(__file__), "../data/" "recomendations.yml")
    difficulties_yml = os.path.join(os.path.dirname(__file__), "../data/" "difficulties.yml")
    analyse_yml = os.path.join(os.path.dirname(__file__), "../data/" "analyse.yml")
    close_yml = os.path.join(os.path.dirname(__file__), "../data/" "close.yml")
    
    json_file = os.path.join(os.path.dirname(__file__), "../"  "training.json")
    
    
 
    print("Entrenando por primera vez...")
    trainer.train("chatterbot.corpus.spanish")
    trainer.train("chatterbot.corpus.spanish.greetings")
    trainer.train("chatterbot.corpus.spanish.conversations")
    
    for yml_file in [recomendations_yml, difficulties_yml, analyse_yml, close_yml]: 
        if yml_file:
            trainer.train(yml_file)
        else: 
            print(".yml no existente.", yml_file)
    
    with open(json_file, "r", encoding="utf-8") as file: 
        data = json.load(file)
except:
    print("Hubo un error con las rutas.") 
    data = {}
    
    

def book_assistant(gender): 
    for book_gender in data: 
        if book_gender in gender.lower(): 
            return random.choice(data[book_gender])

def chat(message):
    
    book = book_assistant(message)
    if book: 
        return book
       
    else: 
        response = chatbot.get_response(message)
        response = str(response)
        doc = nlp(response)
        
        for ent in doc.ents: 
            print(ent.text, ent.label_)
        
        print(f"Precisión: {accuracy_score(y_test, predict)}")
        return response
    