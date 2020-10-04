import request from '@/utils/request';

export async function fakeTimeSeries() {
    return request('/api/time_series', {
        method: 'GET',
    });
}
