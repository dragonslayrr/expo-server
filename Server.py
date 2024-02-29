import sqlite3
from flask import Flask, request,jsonify, render_template
import json
from flask_cors import CORS
from datetime import date

con = sqlite3.connect("db/database.db", check_same_thread=False)

cur = con.cursor()

# DB Functions

def getFromDB(table, id):
    res = cur.execute(f"SELECT * FROM {table} WHERE id = {id}")
    return res.fetchone()

def verifyLogin(email, password):
    try:
        res = cur.execute(f"SELECT id, email FROM logins WHERE email = '{email}' AND password = '{password}'")
        id, returnEmail = res.fetchone()
        return jsonify({'id': id, 'email': returnEmail}), 200
    except:
        return jsonify({'error': 'Could not find account with provided details'}),404
    



def removeFromDB(table, id):
    cur.execute(f"DELETE FROM {table} WHERE email = {id}")
    con.commit()
    return

def addToDB(table: str, headers: str, data: str):
    cur.execute(f"INSERT INTO {table} ({headers}) VALUES ({data})")
    con.commit()
    if table == "logins": 
        res = cur.execute(f"SELECT id FROM {table} WHERE email={data.split(', ')[0]} AND password={data.split(', ')[1]}")
        id = res.fetchone()[0]
        return id

def getStatistics(uid: str, date: str):
    res = cur.execute(f"SELECT * FROM stats WHERE uid = '{uid}' AND date = '{date}'")
    
    return res.fetchall(), 200

# res = cur.execute("SELECT email, password FROM logins")

# addToDB("logins", "email, password", "'asdf@gmail.com', 'test1234'")

# id, email, password = getFromDB("logins", 0)

# print(f'Id: {id} Email: {email} Password: {password}')

# Connect to react-native

app = Flask(__name__, template_folder="./templates")
CORS(app)

@app.route("/login/get", methods=["POST"])
def get_database():
    jsonData = json.loads(request.data.decode("utf-8"))
    return verifyLogin(jsonData['email'], jsonData['password'])

@app.route("/login/remove/<id>", methods=["DELETE"])
def remove_database(id):
    return id

@app.route("/login/add", methods=["POST"])
def add_to_database():
    # user_data = request.get_json()
    print(request.data)
    jsonData = json.loads(request.data.decode("utf-8"))
    print(jsonData["email"])
    addToDB("logins", "email, password", f"'{jsonData['email']}', '{jsonData['password']}'")
    return verifyLogin(jsonData['email'], jsonData['password'])
    # jsonify({"Email":jsonData['email'], "Password": jsonData['password']},200)

@app.route("/login/exists", methods=["GET"])
def checkIfExists():
    # user_data = request.get_json()
    print(request.data)
    jsonData = json.loads(request.data.decode("utf-8"))
    print(jsonData["email"])
    return jsonify({"Data":"Test"},200)

@app.route("/stats/get", methods=["POST"])
def getStats():
    print(request.data)
    jsonData = json.loads(request.data.decode("utf-8"))
    uid = jsonData["id"]
    date = jsonData["date"]
    return getStatistics(uid, date)

@app.route("/stats")
def render():
    return render_template("index.html")

@app.route("/stats/add", methods=["POST"])
def addStat():
    if date.today().strftime("%m/%d/%Y")[0] == "0":
        cdate = date.today().strftime("%m/%d/%Y")[1:]
    else: cdate = date.today().strftime("%d/%m/%Y")
    addToDB("stats", "stat, val, date, uid", f"'{request.form.get('statType')}', '{request.form.get('value')}', '{cdate}', '{request.form.get('id')}'")
    return render_template("index.html"), 200

if(__name__=="__main__"):
    from waitress import serve
    # app.run(debug=True)
    print("Server listening on port 5000")
    serve(app, host="0.0.0.0", port=5000)

# \(0-0)/ #
# Bruh #