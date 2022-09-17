from flask import Flask, session
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.secret_key = 'horoscopes'
