from flask import Blueprint, request, jsonify
from models import db, User, UserDetails, UserDescription, MatchRequest, MatchResult, Interest
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

import requests
import base64
from datetime import datetime
import os
from flask import send_from_directory


routes = Blueprint('routes', __name__)

UPLOAD_FOLDER = 'uploads/'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS



@routes.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory('uploads', filename)

@routes.route('/register', methods=['POST'])
@routes.route('/register', methods=['POST'])
def register():
    try:
        # Log incoming request for debugging
        print("Incoming request data:")
        print("Form:", request.form)
        print("Files:", request.files)
        print("JSON:", request.get_json(silent=True))

        # Get JSON or form data
        data = request.get_json(silent=True) or request.form

        name = data.get('name')
        email = data.get('email')
        password = data.get('password')
        phone = data.get('phone')
        age = data.get('age')
        gender = data.get('gender')
        county = data.get('county')
        town = data.get('town')

        if not all([name, email, password, phone, age, gender, county, town]):
            return jsonify({'error': 'All fields are required'}), 400

        try:
            age = int(age)
        except ValueError:
            return jsonify({'error': 'Age must be a number'}), 400

        # Handle image upload
        image_file = request.files.get('image')
        image_filename = None
        if image_file and allowed_file(image_file.filename):
            image_filename = secure_filename(image_file.filename)
            os.makedirs(UPLOAD_FOLDER, exist_ok=True)
            image_file.save(os.path.join(UPLOAD_FOLDER, image_filename))

        # Check for duplicates
        if User.query.filter_by(email=email).first():
            return jsonify({'error': 'Email already registered'}), 409
        if User.query.filter_by(phone_number=phone).first():
            return jsonify({'error': 'Phone number already registered'}), 409

        # Create user
        user = User(
            name=name,
            email=email,
            password=generate_password_hash(password),
            phone_number=phone,
            age=age,
            gender=gender,
            county=county,
            town=town,
            image_filename=image_filename,
            registered_on=datetime.utcnow()
        )
        db.session.add(user)
        db.session.commit()

        return jsonify({
            "message": "Registration successful",
            "user": {
                "name": name,
                "email": email,
                "phone": phone,
                "age": age,
                "gender": gender,
                "county": county,
                "town": town,
                "image_filename": image_filename
            }
        }), 201

    except Exception as e:
        print("Error in /register:", e)
        return jsonify({'error': str(e)}), 500



@routes.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()

    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({'success': False, 'message': 'Invalid email or password'}), 401

    return jsonify({
        'success': True,
        'message': 'Login successful',
        'user': {
            'id': user.id,
            'name': user.name,
            'email': user.email,
            'phone': user.phone_number,
            'age': user.age,
            'gender': user.gender,
            'county': user.county,
            'town': user.town
        }
    }), 200

@routes.route('/details', methods=['POST'])
def add_details():
    data = request.json
    user = User.query.filter_by(phone_number=data['phone']).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    details = UserDetails(
        user_id=user.id,
        level_of_education=data['education'],
        profession=data['profession'],
        marital_status=data['marital_status'],
        religion=data['religion'],
        ethnicity=data['ethnicity']
    )
    db.session.add(details)
    db.session.commit()
    return jsonify({'message': 'Details saved'}), 200


@routes.route('/description', methods=['POST'])
def add_description():
    data = request.json
    user = User.query.filter_by(phone_number=data['phone']).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    desc = UserDescription(user_id=user.id, description=data['description'])
    db.session.add(desc)
    db.session.commit()
    return jsonify({'message': 'Description saved'}), 200

@routes.route('/match', methods=['POST'])
def match_request():
    data = request.json
    user = User.query.filter_by(phone_number=data['phone']).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    age_range = data.get('age_range', '')
    if '-' not in age_range:
        return jsonify({'message': 'Invalid age_range format. Expected format: "25-30"'}), 400

    try:
        min_age, max_age = map(int, age_range.split('-'))
    except ValueError:
        return jsonify({'message': 'Invalid age range values'}), 400

    match = MatchRequest(
        user_id=user.id,
        age_range=age_range,
        town=data['town']
    )
    db.session.add(match)
    db.session.commit()

    matches = User.query.filter(
        User.age.between(min_age, max_age),
        User.town.ilike(data['town']),
        User.gender != user.gender,
        User.id != user.id
    ).limit(3).all()

    for i, m in enumerate(matches, start=1):
        result = MatchResult(match_request_id=match.id, matched_user_id=m.id, position=i)
        db.session.add(result)

    db.session.commit()

    return jsonify({
        'message': f"{len(matches)} matches found",
        'matches': [{'name': m.name, 'age': m.age, 'phone': m.phone_number} for m in matches]
    })

@routes.route('/match/next', methods=['POST'])
def match_next():
    data = request.json
    last_match_id = data['match_request_id']
    start_at = data.get('start_at', 3)

    results = MatchResult.query.filter_by(match_request_id=last_match_id).offset(start_at).limit(3).all()
    matches = []
    for r in results:
        user = User.query.get(r.matched_user_id)
        matches.append({
            'name': user.name,
            'age': user.age,
            'phone': user.phone_number
        })

    return jsonify({'matches': matches})

@routes.route('/interest', methods=['POST'])
def express_interest():
    data = request.json
    requester = User.query.filter_by(phone_number=data['from']).first()
    target = User.query.filter_by(phone_number=data['to']).first()

    if not requester or not target:
        return jsonify({'message': 'User(s) not found'}), 404

    interest = Interest(requester_id=requester.id, target_user_id=target.id)
    db.session.add(interest)
    db.session.commit()

    return jsonify({'message': 'Interest expressed, awaiting confirmation'})

@routes.route('/describe/<phone>', methods=['GET'])
def get_description(phone):
    user = User.query.filter_by(phone_number=phone).first()

    if not user:
        return jsonify({'message': 'User not found'}), 404

    description = user.description.description if user.description else None
    details = user.details

    if not description and not details:
        return jsonify({'message': 'No details or description found'}), 404

    return jsonify({
        'description': description or '',
        'education': details.level_of_education if details else '',
        'profession': details.profession if details else '',
        'marital_status': details.marital_status if details else '',
        'religion': details.religion if details else '',
        'ethnicity': details.ethnicity if details else ''
    })


@routes.route('/confirm-interest', methods=['POST'])
def confirm_interest():
    data = request.json
    target = User.query.filter_by(phone_number=data['to']).first()
    requester = User.query.filter_by(phone_number=data['from']).first()

    if not target or not requester:
        return jsonify({'message': 'One or both users not found'}), 404

    interest = Interest.query.filter_by(requester_id=requester.id, target_user_id=target.id).first()

    if not interest:
        return jsonify({'message': 'Interest record not found'}), 404

    interest.confirmed = data['confirmed']
    db.session.commit()

    return jsonify({'message': 'Interest confirmation saved'})


@routes.route('/getuser',methods=['GET'])
def get_users():
    users = User.query.all()
    user_list=[]
    for user in users:
        user_list.append({
            'id':user.id,
            'name':user.name,
            'age':user.age,
            'image_filename':user.image_filename,
            'gender':user.gender,
            'phone_number':user.phone_number,
            'county':user.county,
            'town':user.town
        })
    return jsonify({'users':user_list})



CONSUMER_KEY = "9RxI9PGzfkSng7UZEeZj1DGPdhXXxDDzPGiO6xiyiAQQfaE5"
CONSUMER_SECRET = "0396RJCAiqsr2l3WPH6Ubd3fFG4h0HEXCWXEvUrSGUImWTQGAVCORtUXg4cSOJy9"
BUSINESS_SHORTCODE = "174379"
PASSKEY = "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
PARTYB = "600000"
CALLBACK_URL = "https://yourdomain.com/mpesa/callback"  

def generate_password():
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    data_to_encode = BUSINESS_SHORTCODE + PASSKEY + timestamp
    encoded = base64.b64encode(data_to_encode.encode()).decode('utf-8')
    return encoded, timestamp

def get_access_token():
    response = requests.get(
        "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
        auth=(CONSUMER_KEY, CONSUMER_SECRET)
    )
    return response.json().get("access_token")

@routes.route('/pay', methods=['POST'])
def lipa_na_mpesa():
    data = request.get_json()
    phone = data.get("phone")
    amount = data.get("amount", 1)
    name = data.get("name", "User")
    town = data.get("town", "Unknown")

    if not phone:
        return jsonify({"message": "Phone number is required"}), 400

    access_token = get_access_token()
    if not access_token:
        return jsonify({"message": "Failed to get access token"}), 500

    password, timestamp = generate_password()

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    payload = {
        "BusinessShortCode": BUSINESS_SHORTCODE,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": BUSINESS_SHORTCODE,
        "PhoneNumber": phone,
        "CallBackURL": CALLBACK_URL,
        "AccountReference": "OnfonMedia",
        "TransactionDesc": "Payment for user details"
    }

    response = requests.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        headers=headers,
        json=payload
    )

    if response.status_code == 200:

        sms_text = "Hi"
        send_sms_message(phone, sms_text)
        return jsonify({"message": "STK push sent and test SMS attempted"}), 200
    else:
        return jsonify({"message": "Failed to send STK push", "error": response.json()}), 500


def send_sms_message(phone_number, message):
    url = "https://api.onfonmedia.co.ke/v1/sms/SendBulkSMS"

    original_phone = phone_number
    phone_number = ''.join(filter(str.isdigit, phone_number))

    if phone_number.startswith("07"):
        phone_number = "254" + phone_number[1:]
    elif phone_number.startswith("7") and len(phone_number) == 9:
        phone_number = "254" + phone_number
    elif not phone_number.startswith("254"):
        print("Invalid phone number format (must start with 254):", original_phone)
        return False

    if len(phone_number) != 12:
        print(f" Invalid phone number length: {phone_number}")
        return False

    message = "Hi"

    payload = {
        "SenderId": "OnfonInfo",
        "MessageParameters": [
        {
            "Number":"254708462058",
            "Text": "Hello get started with bulk"
        }
    ],
    }

    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "ApiKey": "w1q6yKOrB2mZloDRIUaE8fjiLNvgckM3V094Xe7JSHAxpzd5",
        "ClientId": "mavekepeter"
    }

    print("Sending SMS to:", phone_number)
    print("Message:", message)

    try:
        response = requests.post(url, json=payload, headers=headers)
        print(f" Onfon Response: {response.status_code} - {response.text}")

        if response.status_code == 200:
            print("SMS sent successfully")
            return True
        else:
            print(" SMS failed:", response.text)
            return False
    except Exception as e:
        print(f" Exception sending SMS: {e}")
        return False
