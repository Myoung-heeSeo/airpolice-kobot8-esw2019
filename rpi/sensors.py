"""
green led = 25

yellow led = 12

red led = 21

"""

 

import serial

import sys

import RPi.GPIO as GPIO

import Adafruit_DHT

from PMS7003 import PMS7003

 

dust = PMS7003()

 

GPIO.setmode(GPIO.BCM)

GPIO.setup(25, GPIO.OUT)

GPIO.setup(12, GPIO.OUT)

GPIO.setup(21, GPIO.OUT)

 

# Baud Rate

Speed = 9600

 

# UART / USB Serial

USB0 = '/dev/ttyUSB0'

UART = '/dev/ttyAMA0'

 

# USE PORT

SERIAL_PORT = USB0

 

#serial setting

ser = serial.Serial(SERIAL_PORT, Speed, timeout = 1)

 

while True:

    buffer = ser.read(1024)

    if(dust.protocol_chk(buffer)):

        data = dust.unpack_data(buffer)

 

        print ("PMS 7003 dust data")

        print ("PM 2.5 : %s" % (data[dust.DUST_PM2_5_ATM]))

        PM25 = data[dust.DUST_PM2_5_ATM]

        print ("PM 10.0 : %s" % (data[dust.DUST_PM10_0_ATM]))

        PM10 = data[dust.DUST_PM10_0_ATM]

        if(PM10 >= 101):

            GPIO.output(21, True)

            GPIO.output(12, False)

            GPIO.output(25, False)

        if(PM10 >= 51 and PM10 <= 100):

            GPIO.output(21, False)

            GPIO.output(12, True)

            GPIO.output(25, False)

        if(PM10 >= 31 and PM10 <=50):

            GPIO.output(21, False)

            GPIO.output(12, True)

            GPIO.output(25, True)

        if(PM10 <= 30):

            GPIO.output(21, False)

            GPIO.output(12, False)

            GPIO.output(25, True)

 

        RH, T = Adafruit_DHT.read_retry(Adafruit_DHT.DHT22, 23)

        print('Temp={0:0.1f}*C  Humidity={1:0.1f}%'.format(T, RH))

        

    else:

        print ("data read Err")

 

ser.close()
