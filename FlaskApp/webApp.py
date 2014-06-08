# -*- coding: iso-8859-15 -*-
from flask import Flask, render_template, request, make_response, redirect
from subprocess import call
import datetime
import RPi.GPIO as GPIO
import os
#Pre-Start tasks. Config GPIO and enable servo control on P1 Pin 7
app = Flask(__name__)
GPIO.setmode(GPIO.BCM)
GPIO.setup(9, GPIO.OUT)
GPIO.setup(10, GPIO.OUT)
GPIO.setup(11, GPIO.OUT)
os.system("servod --p1pins=7")
#Reset servo to default position. 
os.system("echo 0=120 > /dev/servoblaster")

#Post-Request method to sort Access-Control-Allow-Origin.
@app.after_request
def fixorigin(resp):
  if request.method != 'OPTIONS' and 'Origin' in request.headers:
 	resp.headers['Access-Control-Allow-Origin'] = request.headers['Origin']
  return resp

#Application Route
@app.route("/")
def index():

   return "OK"

@app.route("/act/ledon")
def ledon(): 
	GPIO.output(10, True)
	return redirect("/", code=302)

@app.route("/act/ledoff")
def ledoff(): 
	GPIO.output(10, False)
	return redirect("/", code=302)


@app.route("/act/fw")
def forward():
	GPIO.output(9, False)
	GPIO.output(11, True)
	return redirect("/", code=302)

@app.route("/act/bw")
def backward():
	GPIO.output(9, True)
	GPIO.output(11, False)
	return redirect("/", code=302)

@app.route("/act/stop")
def stop():
	GPIO.output(9, False)
	GPIO.output(11, False)
	return redirect("/", code=302)

@app.route("/act/reset")
def resetPos(): 
	os.system("echo 0=120 > /dev/servoblaster")

@app.route("/act/left")
def left():
	os.system("echo 0=-40 > /dev/servoblaster")
	return redirect("/", code=302)

@app.route("/act/right")
def right(): 
	os.system("echo 0=+40 > /dev/servoblaster")
	return redirect("/", code=302)

#Default run on Port 8800
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8800, debug=True)
