import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

cred = credentials.Certificate('/home/kmucs/Downloads/airpolice-key.json')
firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://airpolice-123de.firebaseio.com/'
})

ref = db.reference('cooking_mode')
tmp = ref.get()

mode = tmp['mode']
print(mode)
