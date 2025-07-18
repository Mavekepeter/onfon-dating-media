from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(15), unique=True, nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    county = db.Column(db.String(50), nullable=False)
    town = db.Column(db.String(50), nullable=False)
    image_filename = db.Column(db.String(255))  
    registered_on = db.Column(db.DateTime, default=datetime.utcnow)
    
    details = db.relationship("UserDetails", uselist=False, backref="user")
    description = db.relationship("UserDescription", uselist=False, backref="user")

class UserDetails(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    level_of_education = db.Column(db.String(50))
    profession = db.Column(db.String(50))
    marital_status = db.Column(db.String(20))
    religion = db.Column(db.String(50))
    ethnicity = db.Column(db.String(50))


class UserDescription(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    description = db.Column(db.Text)

class MatchRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    age_range = db.Column(db.String(20))  
    town = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class MatchResult(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    match_request_id = db.Column(db.Integer, db.ForeignKey("match_request.id"))
    matched_user_id = db.Column(db.Integer, db.ForeignKey("user.id")) 
    position = db.Column(db.Integer)  

class Interest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    requester_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    target_user_id = db.Column(db.Integer, db.ForeignKey("user.id"))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
    confirmed = db.Column(db.Boolean, default=False)  


class UserInteraction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    phone_number = db.Column(db.String(15))
    message = db.Column(db.Text)
    direction = db.Column(db.String(10))  
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)
