@routes.route('/getuser', methods=['POST'])
def get_users():
    users = User.query.all()
    user_list = []

    for user in users:
        user_list.append({
            'id': user.id,
            'name': user.name,
            'age': user.age,
            'gender': user.gender,
            'phone_number': user.phone_number,
            'county': user.county,
            'town': user.town
        })

    return jsonify({'users': user_list})
