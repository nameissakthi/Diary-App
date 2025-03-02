from flask import Flask
from dotenv import dotenv_values
app = Flask(__name__)
import psycopg2

config = dotenv_values(".env")

db = {
    
}

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
except:
    print("Table is Not Created")


@app.route("/")
def home():
    return "API WORKING"

if(__name__=="__main__"):
    app.run(debug=True)