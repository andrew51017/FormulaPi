from flask import Flask, render_template
from subprocess import call
import datetime
import RPi.GPIO as GPIO
app = Flask(__name__)
GPIO.setmode(GPIO.BCM)
GPIO.setup(22, GPIO.OUT)
GPIO.setup(27, GPIO.OUT)

@app.route("/")
def index():
   templateData = {
      'title' : 'HELLO!'
      }
   return render_template('main.html', **templateData)


@app.route("/act/fw")
def forward():
	GPIO.output(22, True)
	GPIO.output(27, False)
	return redirect("/", code=302)

@app.route("/act/bw")
def backward():
	GPIO.output(27, True)
	GPIO.output(22, False)
	return redirect("/", code=302)

@app.route("/act/stop")
def stop():
	GPIO.output(22, False)
	GPIO.output(27, False)
	return redirect("/", code=302)

@app.route("/act/left")
def left():
	call(["echo 0=-10 > /dev/servoblaster", ""])
	return redirect("/", code=302)

@app.route("/act/right")
def right(): 
	call(["echo 0=+10 > /dev/servoblaster", ""])
	return redirect("/", code=302)
	

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8800, debug=True)
