from flask import Flask, jsonify, request
from dotenv import dotenv_values
from datetime import datetime
app = Flask(__name__)
import psycopg2

config = dotenv_values(".env")

try:
    conn = psycopg2.connect(host= "localhost",
        port= 5432,
        user= config["DB_USER"],
        password= config["DB_PASSWORD"],
        database= config["DB_NAME"]
    )

    print("DB Connected Successfully")
except:
    print("There is a Problem Connecting to DB")


cur = conn.cursor()

try:
    cur.execute("""
        CREATE TABLE IF NOT EXISTS diary (
                id SERIAL PRIMARY KEY,
                date VARCHAR(20) NOT NULL,
                time VARCHAR(20) NOT NULL,
                Message VARCHAR(10000000) NOT NULL
            )
    """)
    conn.commit()
    print("Table Created successfully")
except Exception as error:
    print(f"Table is Not Created. Error : {error}")


@app.route("/")
def home():
    return "API WORKING"

@app.route("/api/diary/list")
def list():
    try:
        cur.execute("""
            SELECT * FROM diary
        """)
        records = cur.fetchall()
        return jsonify({ 'success' : True, 'Messages' : records })
    except Exception as error:
        return jsonify({ 'success': False, 'message' : error })
    

@app.route("/api/diary/add", methods=['POST'])
def add():
    try:
        date = datetime.today().strftime('%d-%m-%Y')
        time =  datetime.now().time().strftime("%H:%M:%S")
        message = request.form['message']
        cur.execute("INSERT INTO diary(date, time, message) VALUES(%s, %s, %s)", [date, time, message])
        conn.commit()
        return jsonify({ 'success': True, 'message': "Diary Record Added Successfully" })
    except Exception as error:
        return jsonify({ 'success': False, 'message' : error })
    
@app.route("/api/diary/delete", methods=["GET", "POST"])
def delete():
    try:
        id = request.json['id']
        cur.execute(f"DELETE FROM diary WHERE id={id}")
        conn.commit()
        return jsonify({ 'success': True, 'message': "Diary Record Deleted Successfully" })
    except Exception as error:
        return jsonify({ 'success': False, 'message' : error })
    
@app.route("/api/diary/get", methods=["GET", "POST"])
def get():
    try:
        id = request.json['id']
        cur.execute(f"SELECT * FROM diary WHERE id={id}")
        data = cur.fetchone()
        return jsonify({ 'success': True, 'data': data, 'message': "Diary Record Retrieved Successfully" })
    except Exception as error:
        return jsonify({ 'success': False, 'message' : error })

if(__name__=="__main__"):
    app.run(host='0.0.0.0', debug=True)