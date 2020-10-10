from flask import Flask
from flask_cors import CORS
import pandas as pd

df = pd.read_csv('u00_features.csv')[['timestamp', 'conversation', 'phone_charging', 'activity_inference_0', 'activity_inference_1']].head(72)

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return { 'success': True }

def get_metric(metric):
    tstamps = list(df['timestamp'])
    metric_points = list(df[metric])
    return [{'timestamp': t, 'value': v} for t, v in zip(tstamps, metric_points)]

@app.route('/conversation')
def conversation():
    return {
        'success': True,
        'series': get_metric('conversation')
    }

@app.route('/phone_charging')
def phone():
    return {
        'success': True,
        'series': get_metric('phone_charging')
    }

@app.route('/act_inf_0')
def act_inf_0():
    return {
        'success': True,
        'series': get_metric('activity_inference_0')
    }

@app.route('/act_inf_1')
def act_inf_1():
    return {
        'success': True,
        'series': get_metric('activity_inference_1')
    }

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5003)
