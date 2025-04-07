from flask import Flask, jsonify, request
from dotenv import dotenv_values
from datetime import datetime
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load environment variables
config = dotenv_values(".env")

# Function to get DB connection
def get_db_connection():
    try:
        conn = psycopg2.connect(
            host=config["DB_HOST"],
            port=5432,
            user=config["DB_USER"],
            password=config["DB_PASSWORD"],
            database=config["DB_NAME"]
        )
        return conn
    except Exception as e:
        print(f"Database connection error: {e}")
        return None

# Initial table creation
def create_table():
    conn = get_db_connection()
    if conn is None:
        print("❌ Unable to connect to DB. Skipping table creation.")
        return
    try:
        cur = conn.cursor()
        cur.execute("""
            CREATE TABLE IF NOT EXISTS diary (
                id SERIAL PRIMARY KEY,
                date VARCHAR(20) NOT NULL,
                time VARCHAR(20) NOT NULL,
                message VARCHAR(10000000) NOT NULL
            )
        """)
        conn.commit()
        cur.close()
        conn.close()
        print("✅ Table created successfully")
    except Exception as error:
        print(f"❌ Table creation failed: {error}")

# Run table creation on startup
create_table()

@app.route("/")
def home():
    return "API WORKING"

@app.route("/api/diary/list")
def list_diary():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'success': False, 'message': 'Database not connected'})
    try:
        cur = conn.cursor()
        cur.execute("SELECT * FROM diary")
        records = cur.fetchall()
        cur.close()
        conn.close()
        return jsonify({'success': True, 'Messages': records})
    except Exception as error:
        return jsonify({'success': False, 'message': str(error)})

@app.route("/api/diary/add", methods=["POST"])
def add():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'success': False, 'message': 'Database not connected'})
    try:
        date = datetime.today().strftime('%d-%m-%Y')
        time = datetime.now().time().strftime("%H:%M:%S")
        data = request.get_json()
        message = data.get('message')
        cur = conn.cursor()
        cur.execute("INSERT INTO diary(date, time, message) VALUES(%s, %s, %s)", (date, time, message))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({'success': True, 'message': "Diary Record Added Successfully"})
    except Exception as error:
        return jsonify({'success': False, 'message': str(error)})

@app.route("/api/diary/delete", methods=["POST"])
def delete():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'success': False, 'message': 'Database not connected'})
    try:
        data = request.get_json()
        record_id = data.get('id')
        cur = conn.cursor()
        cur.execute("DELETE FROM diary WHERE id = %s", (record_id,))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({'success': True, 'message': "Diary Record Deleted Successfully"})
    except Exception as error:
        return jsonify({'success': False, 'message': str(error)})

@app.route("/api/diary/get", methods=["POST"])
def get():
    conn = get_db_connection()
    if conn is None:
        return jsonify({'success': False, 'message': 'Database not connected'})
    try:
        data = request.get_json()
        record_id = data.get('id')
        cur = conn.cursor()
        cur.execute("SELECT * FROM diary WHERE id = %s", (record_id,))
        result = cur.fetchone()
        cur.close()
        conn.close()
        return jsonify({'success': True, 'data': result, 'message': "Diary Record Retrieved Successfully"})
    except Exception as error:
        return jsonify({'success': False, 'message': str(error)})

if __name__ == "__main__":
    app.run(debug=True)
