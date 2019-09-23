#include <PMS.h>
#include <MQ7.h>
#include <SoftwareSerial.h>
#include <Wire.h>
#include <cactus_io_BME280_I2C.h>
#include <avr/pgmspace.h>


BME280_I2C bme;
 
SoftwareSerial s(9,10); /* RX:D10, TX:D9 */

MQ7 mq7(A0, 5.0);

PMS pms(s);
PMS::DATA data;

void setup(void)
{
    Serial.begin(9600);
    s.begin(9600);

    if (!bme.begin()) 
    { 
        Serial.println(F("Could not find a valid BME280 sensor, check wiring!")); 
        while (1); 
    }
    bme.setTempCal(-1);// Temp was reading high so subtract 1 degree

}
 
void loop(void)
{
   bme.readSensor(); 
   
   if (pms.read(data))
   {
    Serial.print("PM 1.0 (ug/m3): ");
    Serial.println(data.PM_AE_UG_1_0);

    Serial.print("PM 2.5 (ug/m3): ");
    Serial.println(data.PM_AE_UG_2_5);

    Serial.print("PM 10.0 (ug/m3): ");
    Serial.println(data.PM_AE_UG_10_0);

    Serial.println();

    float humidity = bme.getHumidity();
    float temperature = bme.getTemperature_C();
    float ppm = mq7.getPPM();

    Serial.print("gas = ");
    Serial.println(ppm);
    Serial.print("humidity = ");
    Serial.println(humidity);
    Serial.print("temperature = ");
    Serial.println(temperature);
   }

}
