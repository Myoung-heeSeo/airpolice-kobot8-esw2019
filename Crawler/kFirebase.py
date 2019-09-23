import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

class Firebase:
    def firebase_db(self):
        cred = credentials.Certificate('airpolice-key.json')
        firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://airpolice-123de.firebaseio.com/'
        })

    def load(self, path):
        ref = db.reference(path)
        data = ref.get()
        return data

    def update(self, dataset):
        ref = db.reference('outside/info')
        ref.update(dataset)

    def wa_update(self, path, dataset):
        ref = db.reference(path)
        ref.update(dataset)