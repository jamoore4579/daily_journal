from flask import Flask, render_template, request, jsonify
import psycopg2
import dotenv

app = Flask(__name__)

# Configure your PostgreSQL connection here
conn = psycopg2.connect(
    host="192.168.4.59",
    port="5432",
    database="journal",
    user="jmoore",
    password="jmoore",
    connect_timeout=10
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/submit_post', methods=['POST'])
def submit_post():
    data = request.get_json()
    title = data.get('title')
    body = data.get('body')

    try:
        cur = conn.cursor()
        cur.execute("INSERT INTO posts (title, body) VALUES (%s, %s)", (title, body))
        conn.commit()
        return jsonify({"status": "success", "message": "Post submitted successfully"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
    finally:
        cur.close()

@app.route('/get_posts')
def get_posts():
    try:
        cur = conn.cursor()
        cur.execute("SELECT title, body FROM posts")
        posts = cur.fetchall()

        post_list = [{"title": post[0], "body": post[1]} for post in posts]
        return jsonify({"posts": post_list})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
    finally:
        cur.close()

if __name__ == '__main__':
    app.run(debug=True)
