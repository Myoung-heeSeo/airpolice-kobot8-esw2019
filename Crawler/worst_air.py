import kFirebase
import datetime

class Check_mise:
    def worst_air(self):
        dt = datetime.datetime.now()
        month = dt.month
        # day = dt.day
        day = 18
        hour = dt.hour
        min = dt.minute
        min = min - (min % 5)

        Firebase = kFirebase.Firebase()
        # Firebase.firebase_db()

        area = ['kitchen', 'livingroom', 'room']
        pm10values = []
        pm25values = []
        for i in range(3):
            pm10path = 'inside/' + area[i] + '/' + str(month) + str(day) + '/' + str(hour) + ':' +  str(min) + '/' + 'pm10Value'
            pm10value = Firebase.load(pm10path)
            pm10values.append(pm10value)

            pm25path = 'inside/' + area[i] + '/' + str(month) + str(day) + '/' + str(hour) + ':' +  str(min) + '/' + 'pm25Value'
            pm25value = Firebase.load(pm25path)
            pm25values.append(pm25value)

        print(pm25values)
        print(pm10values)

        # pm10이 10보다 작으면 pm2.5 농도가 제일 안 좋은 곳으로 이동
        idx = 0
        for i in range(3):
            if pm10values[i] < 10:
                if pm25values[i] == max(pm25values):
                    idx = i
                    continue
            else:
                if pm10values[i] == max(pm10values):
                    idx = i
                    continue

        new_path = 'mode/'
        dataset = {
            'auto' : idx
        }
        Firebase.wa_update(new_path, dataset)
        pass

    def _main(self):
        self.worst_air()

# if __name__ == '__main__':
#     ch = Check_mise()
#     ch._main()
