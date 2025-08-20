from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from models import db
from route import routes

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:rootpassword@mysql:3306/message_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

@app.route("/")
def home():
    return "Hello World!"
db.init_app(app)

app.register_blueprint(routes)

if __name__ == '__main__':
    with app.app_context():
        db.create_all() 
    app.run(debug=True, host="0.0.0.0", port=5001)
