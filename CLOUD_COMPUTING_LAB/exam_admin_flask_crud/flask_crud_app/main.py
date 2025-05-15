# from flask import Flask, render_template, request, redirect, url_for, jsonify
# import firebase_admin
# from firebase_admin import credentials, firestore

# # https://lofty-object-341209.el.r.appspot.com/



# # Initialize Firebase Admin SDK
# cred = credentials.Certificate("lofty-object-341209-firebase-adminsdk-5y8z4-00a5d50efd.json")
# firebase_admin.initialize_app(cred)
# db = firestore.client()

# app = Flask(__name__)

# # Home page
# @app.route('/')
# def home():
#     return render_template("index.html")

# # Show form to add data
# @app.route('/add', methods=['GET', 'POST'])
# def add_data():
#     if request.method == 'POST':
#         name = request.form.get("name")
#         age = request.form.get("age")

#         if name and age:
#             db.collection("users").add({"name": name, "age": int(age)})
#             return redirect(url_for('get_data'))

#     return render_template("add.html")

# # Show all data
# @app.route('/get')
# def get_data():
#     users = db.collection("users").stream()
#     data = [{"id": doc.id, "name": doc.to_dict()["name"], "age": doc.to_dict()["age"]} for doc in users]
#     return render_template("get.html", users=data)

# if __name__ == '__main__':
#     app.run(debug=True)


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

# Show form to add student data
@app.route('/add_student', methods=['GET', 'POST'])
def add_student():
    if request.method == 'POST':
        student_id = request.form.get("student_id")
        name = request.form.get("name")
        email = request.form.get("email")
        dob = request.form.get("dob")  # Date format, ensure it's validated properly
        department = request.form.get("department")

        if student_id and name and email and dob and department:
            # Adding student data to Firebase Firestore
            db.collection("students").add({
                "student_id": student_id,
                "name": name,
                "email": email,
                "dob": dob,
                "department": department
            })
            return redirect(url_for('get_students'))

    return render_template("add_student.html")

# Show all student data
@app.route('/get_students')
def get_students():
    students = db.collection("students").stream()
    data = [{"id": doc.id, "student_id": doc.to_dict()["student_id"], 
             "name": doc.to_dict()["name"], "email": doc.to_dict()["email"],
             "dob": doc.to_dict()["dob"], "department": doc.to_dict()["department"]} 
            for doc in students]
    return render_template("get_students.html", students=data)

# Show form to add exam data
@app.route('/add_exam', methods=['GET', 'POST'])
def add_exam():
    if request.method == 'POST':
        exam_id = request.form.get("exam_id")
        exam_name = request.form.get("exam_name")
        exam_date = request.form.get("exam_date")  # Date-time format (ensure it's validated properly)
        subject = request.form.get("subject")

        if exam_id and exam_name and exam_date and subject:
            # Adding exam data to Firebase Firestore
            db.collection("exams").add({
                "exam_id": exam_id,
                "exam_name": exam_name,
                "exam_date": exam_date,
                "subject": subject
            })
            return redirect(url_for('get_exams'))

    return render_template("add_exam.html")

# Show all exam data
@app.route('/get_exams')
def get_exams():
    exams = db.collection("exams").stream()
    data = [{"id": doc.id, "exam_id": doc.to_dict()["exam_id"], 
             "exam_name": doc.to_dict()["exam_name"], "exam_date": doc.to_dict()["exam_date"],
             "subject": doc.to_dict()["subject"]} 
            for doc in exams]
    return render_template("get_exams.html", exams=data)

# Show form to add result data
@app.route('/add_result', methods=['GET', 'POST'])
def add_result():
    if request.method == 'POST':
        result_id = request.form.get("result_id")
        student_id = request.form.get("student_id")
        exam_id = request.form.get("exam_id")
        score = request.form.get("score")

        if result_id and student_id and exam_id and score:
            # Adding result data to Firebase Firestore
            db.collection("results").add({
                "result_id": result_id,
                "student_id": student_id,
                "exam_id": exam_id,
                "score": float(score)
            })
            return redirect(url_for('get_results'))

    return render_template("add_result.html")

# Show all result data
@app.route('/get_results')
def get_results():
    results = db.collection("results").stream()
    data = [{"id": doc.id, "result_id": doc.to_dict()["result_id"], 
             "student_id": doc.to_dict()["student_id"], "exam_id": doc.to_dict()["exam_id"],
             "score": doc.to_dict()["score"]} 
            for doc in results]
    return render_template("get_results.html", results=data)

if __name__ == '__main__':
    app.run(debug=True)



