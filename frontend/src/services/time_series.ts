import request from '@/utils/request';

export async function fakeTimeSeries() {
    return request('/api/time_series', {
        method: 'GET',
    });
}

type MetricType = 'act_inf_0' | 'act_inf_1' | 'phone_charging' | 'conversation'

export async function getMetric(metricType: MetricType) {
    return request(`http://localhost:5003/${metricType}`);
}

export async function runAnomalyDetection(series) {
    return fetch('http://localhost:5001/batch', {
        method: 'POST',
        headers: {
            contentType: 'application/json'
        },
        body: JSON.stringify({series})
    });
}
