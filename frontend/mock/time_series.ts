import { Request, Response } from 'express';

const data = {
  "series": [
    {
      "value": 116168307,
      "timestamp": "2019-01-01T00:00:00Z"
    },
    {
      "value": 116195090,
      "timestamp": "2019-01-01T01:00:00Z"
    },
    {
      "value": 116219292,
      "timestamp": "2019-01-01T02:00:00Z"
    },
    {
      "value": 116218498,
      "timestamp": "2019-01-01T03:00:00Z"
    },
    {
      "value": 116217643,
      "timestamp": "2019-01-01T04:00:00Z"
    },
    {
      "value": 116234219,
      "timestamp": "2019-01-01T05:00:00Z"
    },
    {
      "value": 116291400,
      "timestamp": "2019-01-01T06:00:00Z"
    },
    {
      "value": 116326509,
      "timestamp": "2019-01-01T07:00:00Z"
    },
    {
      "value": 116323167,
      "timestamp": "2019-01-01T08:00:00Z"
    },
    {
      "value": 116360790,
      "timestamp": "2019-01-01T09:00:00Z"
    },
    {
      "value": 116367491,
      "timestamp": "2019-01-01T10:00:00Z"
    },
    {
      "value": 116371082,
      "timestamp": "2019-01-01T11:00:00Z"
    },
    {
      "value": 116380405,
      "timestamp": "2019-01-01T12:00:00Z"
    },
    {
      "value": 116393919,
      "timestamp": "2019-01-01T13:00:00Z"
    },
    {
      "value": 116443750,
      "timestamp": "2019-01-01T14:00:00Z"
    },
    {
      "value": 116467267,
      "timestamp": "2019-01-01T15:00:00Z"
    },
    {
      "value": 116497910,
      "timestamp": "2019-01-01T16:00:00Z"
    },
    {
      "value": 116499861,
      "timestamp": "2019-01-01T17:00:00Z"
    },
    {
      "value": 116500538,
      "timestamp": "2019-01-01T18:00:00Z"
    },
    {
      "value": 116532052,
      "timestamp": "2019-01-01T19:00:00Z"
    },
    {
      "value": 116559282,
      "timestamp": "2019-01-01T20:00:00Z"
    },
    {
      "value": 116597249,
      "timestamp": "2019-01-01T21:00:00Z"
    },
    {
      "value": 118036892,
      "timestamp": "2019-01-01T22:00:00Z"
    },
    {
      "value": 118090207,
      "timestamp": "2019-01-01T23:00:00Z"
    },
    {
      "value": 118105517,
      "timestamp": "2019-01-02T00:00:00Z"
    },
    {
      "value": 118107624,
      "timestamp": "2019-01-02T01:00:00Z"
    },
  ],
}

const getRule = (req: Request, res: Response) => {
  res.json(data);
}

export default {
  'GET /api/time_series': getRule,
};
