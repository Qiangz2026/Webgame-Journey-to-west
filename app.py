from flask import Flask, send_from_directory

app = Flask(__name__)


@app.route("/")
def index():
    return send_from_directory("static/html", "index.html")


@app.route("/home")
def home():
    return send_from_directory("static/html", "home.html")

@app.route("/chapter-1")
def chapterOne():
    return send_from_directory("static/html", "chapterOne.html")

@app.route("/chapter-2")
def chapterTwo():
    return send_from_directory("static/html", "chapterTwo.html")

@app.route("/guide")
def guide():
    return send_from_directory("static/html", "guide.html")

@app.route("/status")
def status():
    return send_from_directory("static/html", "status.html")



@app.route("/static/<path:filename>")
def serve_static(filename):
    return send_from_directory("static", filename)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3000, debug=True)