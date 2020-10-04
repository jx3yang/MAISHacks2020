from flask import Flask, request
from flask_cors import CORS
import tensorflow as tf
import numpy as np
import json


app = Flask(__name__)
cors = CORS(app)
model = tf.keras.models.load_model('model')

index2Sentiment = {
    0: 'negative',
    1: 'neutral',
    2: 'positive'
}

@app.route('/')
def home():
    return json.dumps({'result': 'ok'})

"""
Schema
{
    messages: string[]
}
"""

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    print(data);
    if 'messages' not in data:
        return { 'success': False, 'predictions': [] }
    predictions = model.predict(data.get('messages'))
    return {
        'success': True,
        'predictions': [index2Sentiment[np.argmax(prediction)] for prediction in predictions]
    }

if __name__ == '__main__':
    app.run(host='localhost', port=5002)
