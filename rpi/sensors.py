"""
# unpack_data(buffer)
# data list

HEADER_HIGH            = 0x42
HEADER_LOW             = 0x4d
FRAME_LENGTH           = 2x13+2(data+check bytes)
DUST_PM1_0_CF1         = PM1.0 concentration unit μ g/m3（CF=1，standard particle）
DUST_PM2_5_CF1         = PM2.5 concentration unit μ g/m3（CF=1，standard particle）
DUST_PM10_0_CF1        = PM10 concentration unit μ g/m3（CF=1，standard particle）
DUST_PM1_0_ATM         = PM1.0 concentration unit μ g/m3（under atmospheric environment）
DUST_PM2_5_ATM         = PM2.5 concentration unit μ g/m3（under atmospheric environment）
DUST_PM10_0_ATM        = PM10 concentration unit μ g/m3  (under atmospheric environment)
DUST_AIR_0_3           = indicates the number of particles with diameter beyond 0.3 um in 0.1 L of air.
DUST_AIR_0_5           = indicates the number of particles with diameter beyond 0.5 um in 0.1 L of air.
DUST_AIR_1_0           = indicates the number of particles with diameter beyond 1.0 um in 0.1 L of air.
DUST_AIR_2_5           = indicates the number of particles with diameter beyond 2.5 um in 0.1 L of air.
DUST_AIR_5_0           = indicates the number of particles with diameter beyond 5.0 um in 0.1 L of air.
DUST_AIR_10_0          = indicates the number of particles with diameter beyond 10 um in 0.1 L of air.
RESERVEDF              = Data13 Reserved high 8 bits
RESERVEDB              = Data13 Reserved low 8 bits
CHECKSUM               = Checksum code

"""

import serial
import sys
import RPi.GPIO as GPIO
import Adafruit_DHT
import time
import board
import neopixel
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import datetime

from PMS7003 import PMS7003

dust = PMS7003()

SPICLK = 11
SPIMISO = 9
SPIMOSI = 10
SPICS = 8
mq7_dpin = 26
mq7_apin = 0

# Baud Rate
Speed = 9600

# UART / USB Serial
USB0 = '/dev/ttyUSB0'
UART = '/dev/ttyAMA0'

# USE PORT
SERIAL_PORT = USB0

#serial setting
ser = serial.Serial(SERIAL_PORT, Speed, timeout = 1)

# Choose an open pin connected to the Data In of the NeoPixel strip, i.e. board.D18
# NeoPixels must be connected to D10, D12, D18 or D21 to work.
pixel_pin = board.D18

# The number of NeoPixels
num_pixels = 4

# The order of the pixel colors - RGB or GRB. Some NeoPixels have red and green reversed!
# For RGBW NeoPixels, simply change the ORDER to RGBW or GRBW.
ORDER = neopixel.GRB

pixels = neopixel.NeoPixel(pixel_pin, num_pixels, brightness=0.2, auto_write=False,
                           pixel_order=ORDER)

cred = credentials.Certificate('airpolice-key.json')
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://airpolice-123de.firebaseio.com/'
})

def wheel(pos):
    # Input a value 0 to 255 to get a color value.
    # The colours are a transition r - g - b - back to r.
    if pos < 0 or pos > 255:
        r = g = b = 0
    elif pos < 85:
        r = int(pos * 3)
        g = int(255 - pos*3)
        b = 0
    elif pos < 170:
        pos -= 85
        r = int(255 - pos*3)
        g = 0
        b = int(pos*3)
    else:
        pos -= 170
        r = 0
        g = int(pos*3)
        b = int(255 - pos*3)
    return (r, g, b) if ORDER == neopixel.RGB or ORDER == neopixel.GRB else (r, g, b, 0)

#port init
def init():
         GPIO.setwarnings(False)
         GPIO.cleanup()         #clean up at the end of your script
         GPIO.setmode(GPIO.BCM)     #to specify whilch pin numbering system
         # set up the SPI interface pins
         GPIO.setup(SPIMOSI, GPIO.OUT)
         GPIO.setup(SPIMISO, GPIO.IN)
         GPIO.setup(SPICLK, GPIO.OUT)
         GPIO.setup(SPICS, GPIO.OUT)
         GPIO.setup(mq7_dpin,GPIO.IN,pull_up_down=GPIO.PUD_DOWN)

#read SPI data from MCP3008(or MCP3204) chip,8 possible adc's (0 thru 7)
def readadc(adcnum, clockpin, mosipin, misopin, cspin):
        if ((adcnum > 7) or (adcnum < 0)):
                return -1
        GPIO.output(cspin, True)

        GPIO.output(clockpin, False)  # start clock low
        GPIO.output(cspin, False)     # bring CS low

        commandout = adcnum
        commandout |= 0x18  # start bit + single-ended bit
        commandout <<= 3    # we only need to send 5 bits here
        for i in range(5):
                if (commandout & 0x80):
                        GPIO.output(mosipin, True)
                else:
                        GPIO.output(mosipin, False)
                commandout <<= 1
                GPIO.output(clockpin, True)
                GPIO.output(clockpin, False)

        adcout = 0
        # read in one empty bit, one null bit and 10 ADC bits
        for i in range(12):
                GPIO.output(clockpin, True)
                GPIO.output(clockpin, False)
                adcout <<= 1
                if (GPIO.input(misopin)):
                        adcout |= 0x1

        GPIO.output(cspin, True)

        adcout >>= 1       # first bit is 'null' so drop it
        return adcout

while True:
    init()
    buffer = ser.read(1024)
    if(dust.protocol_chk(buffer)):
        data = dust.unpack_data(buffer)
        dt = datetime.datetime.now()
        month = dt.month
        day = dt.day

        hour = dt.hour
        min = dt.minute

        min = min - (min % 5)

        if month < 10:
            month = '0' + str(month)
        if day < 10:
            day = '0' + str(day)

        ref = db.reference('inside/kitchen/' + str(month) + str(day) + '/' + str(hour) + ':' + str(min) + '/')

        print ("PMS 7003 dust data")
        print ("PM 2.5 : %s" % (data[dust.DUST_PM2_5_ATM]))
        PM25 = data[dust.DUST_PM2_5_ATM]
        print ("PM 10.0 : %s \n" % (data[dust.DUST_PM10_0_ATM]))
        PM10 = data[dust.DUST_PM10_0_ATM]

        RH, T = Adafruit_DHT.read_retry(Adafruit_DHT.DHT22, 23)

        COlevel=readadc(mq7_apin, SPICLK, SPIMOSI, SPIMISO, SPICS)

        if GPIO.input(mq7_dpin):
            print("CO not leak")
            time.sleep(0.5)
        else:
            CO1 = (COlevel/1024.) * 5
            CO2 = (5.0 - CO1) / 5.0
            CO3 = CO2 * 10.0
            COppm = 19.32 * (CO3 ** -0.64)
            print("CO is detected")
            print("Current CO AD vaule = " +str("%.2f"%((COlevel/1024.)*5))+" V")
            print("Current CO density is:" +str("%.2f"%((COlevel/1024.)*100))+" %")
            print(COlevel)
            print(COppm)
            print("\n")
            time.sleep(0.5)

        if(PM10 >= 101):
            # Comment this line out if you have RGBW/GRBW NeoPixels
            pixels.fill((255, 0, 0))
            # Uncomment this line if you have RGBW/GRBW NeoPixels
            # pixels.fill((255, 0, 0, 0))
            pixels.show()

        elif(PM10 >= 51 and PM10 <= 100):
            # Comment this line out if you have RGBW/GRBW NeoPixels
            pixels.fill((255, 255, 0))
            # Uncomment this line if you have RGBW/GRBW NeoPixels
            # pixels.fill((255, 0, 0, 0))
            pixels.show()

        elif(PM10 >= 31 and PM10 <=50):
            # Comment this line out if you have RGBW/GRBW NeoPixels
            pixels.fill((0, 255, 0))
            # Uncomment this line if you have RGBW/GRBW NeoPixels
            # pixels.fill((255, 0, 0, 0))
            pixels.show()

        elif(PM10 <= 30):
            # Comment this line out if you have RGBW/GRBW NeoPixels
            pixels.fill((0, 0, 255))
            # Uncomment this line if you have RGBW/GRBW NeoPixels
            # pixels.fill((255, 0, 0, 0))
            pixels.show()

        coValue = COppm
        pm10Value = PM10
        pm25Value = PM25
        humid = RH
        temp = T

        dataList = {
            'coValue': coValue,
            'pm10Value': pm10Value,
            'pm25Value': pm25Value,
            'humid': humid,
            'temp': temp
        }

        try:
            print('Temp={0:0.1f}*C  Humidity={1:0.1f}% \n'.format(T, RH))
        except TypeError:
            print("WTF!!!!!!!")

        if T is not None and RH is not None:
            ref.update(dataList)
    else:
        print ("data read Err")

ser.close()