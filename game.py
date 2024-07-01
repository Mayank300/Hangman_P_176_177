from flask import Flask, render_template, jsonify, request
import os
import random



words = {
    1: "ELEPHANT",
    2: "TIGER",
    3: "LION",
    4: "GIRAFFE",
    5: "ZEBRA",
    6: "CAR",
    7: "BIKE",
    8: "AEROPLANE",
    9: "BOAT",
    10: "HELICOPTER"
}



app = Flask(__name__)

picFolder = os.path.join('static','assets' )
app.config["UPLOAD_FOLDER"] = picFolder

@app.route("/")
def index():
   balloonPic = os.path.join(app.config["UPLOAD_FOLDER"], 'balloon.png')
   return render_template("index.html", balloon_image=balloonPic)

@app.route("/templates/game.html")
def game():
   return render_template("game.html")

@app.route("/get-word" , methods = ["GET"])
def get_word():
    return jsonify({
        'status': 'success',
        'word': random.choice(words)
    })

   

app.run(debug=True)