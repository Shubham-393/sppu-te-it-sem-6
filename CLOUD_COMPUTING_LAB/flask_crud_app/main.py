from flask import Flask, render_template, request, redirect, url_for, jsonify
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK
cred = credentials.Certificate("lofty-object-341209-firebase-adminsdk-5y8z4-00a5d50efd.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

app = Flask(__name__)

# Home page
@app.route('/')
def home():
    return render_template("index.html")

# Show form to add data
@app.route('/add', methods=['GET', 'POST'])
def add_data():
    if request.method == 'POST':
        name = request.form.get("name")
        age = request.form.get("age")

        if name and age:
            db.collection("users").add({"name": name, "age": int(age)})
            return redirect(url_for('get_data'))

    return render_template("add.html")

# Show all data
@app.route('/get')
def get_data():
    users = db.collection("users").stream()
    data = [{"id": doc.id, "name": doc.to_dict()["name"], "age": doc.to_dict()["age"]} for doc in users]
    return render_template("get.html", users=data)

if __name__ == '__main__':
    app.run(debug=True)

# from flask import Flask, render_template, request, redirect, url_for
# from flask_sqlalchemy import SQLAlchemy
# import os
# app = Flask(__name__)
# # app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///users.db"


# app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///" + os.path.join(os.path.dirname(__file__), "users.db")

# app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# db = SQLAlchemy(app)

# # Model for User
# class User(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(100), nullable=False)
#     email = db.Column(db.String(100), unique=True, nullable=False)

# # Create Database
# with app.app_context():
#     db.create_all()

# # Home - Show All Users
# @app.route("/")
# def index():
#     users = User.query.all()
#     return render_template("index.html", users=users)

# # Create User
# @app.route("/add", methods=["POST"])
# def add_user():
#     name = request.form["name"]
#     email = request.form["email"]
#     new_user = User(name=name, email=email)
#     db.session.add(new_user)
#     db.session.commit()
#     return redirect(url_for("index"))

# # Update User
# @app.route("/edit/<int:id>", methods=["GET", "POST"])
# def edit_user(id):
#     user = User.query.get(id)
#     if request.method == "POST":
#         user.name = request.form["name"]
#         user.email = request.form["email"]
#         db.session.commit()
#         return redirect(url_for("index"))
#     return render_template("edit.html", user=user)

# # Delete User
# @app.route("/delete/<int:id>")
# def delete_user(id):
#     user = User.query.get(id)
#     db.session.delete(user)
#     db.session.commit()
#     return redirect(url_for("index"))

# if __name__ == "__main__":
#     app.run(host="127.0.0.1", port=8080,debug=True)
