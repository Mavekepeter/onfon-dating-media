from flask import Flask
from config import Config
from models import db
from routes import routes
from flask_cors import   CORS
def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:Maveke12@onfon-mysql:3306/onfon_db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config.from_object(Config)

    CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

    db.init_app(app)

    with app.app_context():
        db.create_all()
    app.register_blueprint(routes)

    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
