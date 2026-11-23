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

@app.route("/guide")
def guide():
    return send_from_directory("static/html", "guide.html")


# 后面写到第一章时，可以把下面这段取消注释：
# @app.route("/chapter1")
# def chapter1():
#     return send_from_directory("static", "chapter1.html")


@app.route("/static/<path:filename>")
def serve_static(filename):
    return send_from_directory("static", filename)


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=3000, debug=True)