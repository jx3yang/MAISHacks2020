import json
import os

import pandas as pd
import requests
from flask import Flask, request
from flask_cors import CORS

from api.endpoints import BATCH_DETECTION, LATEST_POINT_DETECTION

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
cors = CORS(app)

SERIES_KEY = 'series'
TIMESTAMP_KEY = 'timestamp'
VALUE_KEY = 'value'

####################### AZURE CREDENTIALS #####################
CREDENTIALS_FILE = 'credentials.csv'
df = pd.read_csv(CREDENTIALS_FILE)
endpoint = df['endpoint'][0]
subscription_key = df['key'][0]
del df
###############################################################

GRANULARITY = 'hourly'

def get_points():
    points = request.get_json(force=True)
    if SERIES_KEY not in points:
        return [], False
    points = points[SERIES_KEY]
    if not isinstance(points, list):
        return [], False
    try:
        points = [
            {
                TIMESTAMP_KEY: point[TIMESTAMP_KEY],
                VALUE_KEY: float(point[VALUE_KEY])
            }
            for point in points
        ]
        return points, True
    except:
        print('Error encountered')
        return [], False

def format_request_data(points):
    return {
        'granularity': GRANULARITY,
        SERIES_KEY: points
    }

def send_request(url, request_data):
    headers = {'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': subscription_key}
    response = requests.post(endpoint+url, data=json.dumps(request_data), headers=headers)
    return json.loads(response.content.decode('utf-8'))

def check_result(result):
    if result.get('code') is not None:
        return {'success': False, 'result': {}}
    return {'success': True, 'result': result}

@app.route('/', methods=['GET'])
def home():
    return json.dumps({'result': 'ok'})


"""
Schema:
    {
        series: [
            {timestamp: datestring, value: float64}
        ],
    }
"""

"""
example timestamp: "2018-03-01T00:00:00Z"
"""


# Returns {success: boolean, result: Result}
# Example Result https://github.com/Azure-Samples/anomalydetector/blob/master/example-data/batch-response.json
@app.route('/batch', methods=['POST'])
def batch():
    points, success = get_points()
    if success:
        return check_result(send_request(BATCH_DETECTION, format_request_data(points)))

# Returns {success: boolean, result: Result}
# Example Result https://github.com/Azure-Samples/anomalydetector/blob/master/example-data/latest-point-response.json
@app.route('/latest_point', methods=['POST'])
def latest_point():
    points, success = get_points()
    if success:
        return check_result(send_request(LATEST_POINT_DETECTION, format_request_data(points)))

if __name__ == '__main__':
    app.run(host='localhost', port=5001)
