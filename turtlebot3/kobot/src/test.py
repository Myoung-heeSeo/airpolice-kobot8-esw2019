from datetime import datetime

now = datetime.now()

# print(now.year)
# print(now.month)
# print(now.day)
# print(now.hour)
# print(now.minute)
# print ( '%s-%s-%s' % ( now.year, now.month, now.day ) )

while True:
    min5 = now.minute
    if min5 % 5 == 0:
        break
    else:
        min5-=1

print(min5)