import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, } from 'antd';
import TimelineChart, { TimelineItem } from '@/components/TimelineChart';
import { fakeTimeSeries, getMetric, runAnomalyDetection } from '@/services/time_series';

const Dashboard: React.FC<{}> = () => {
  const [data, setData] = useState<TimelineItem[]>([]);
  const [act_1, setAct_1] = useState<TimelineItem[]>([]);
  const [act_0, setAct_0] = useState<TimelineItem[]>([]);
  const [conversation, setConversation] = useState<TimelineItem[]>([]);
  const [phone, setPhone] = useState<TimelineItem[]>([]);

  const makeItem = (x: number, y: number, anomaly: boolean): TimelineItem => {
    const item: TimelineItem = { x, y, anomaly };
    return item;
  }

  const formatSeries = (series) => series.map(point => ({timestamp: point.timestamp.replace(' ', 'T').concat('Z'), value: point.value}));
  const formatTimestamp = (ts: string) => Date.parse(ts) / 1000;

  useEffect(() => {
    fakeTimeSeries().then(res => {
      const series = res.series as ({value: number, timestamp: string}[]);
      const seriesData: TimelineItem[] = series.map(point => makeItem(Date.parse(point.timestamp) / 1000, point.value / 100000));
      setData(seriesData.slice(seriesData.length - 11, seriesData.length - 1));
    });

    getMetric('act_inf_1').then(res => {
      if (!res) return;
      const series: any[] = formatSeries(res['series']);
      runAnomalyDetection(series)
        .then(res => res.json())
        .then(res => {
          const anomalies = res.result.isAnomaly;
          setAct_1(
            series.map((elem, index) => makeItem(formatTimestamp(elem.timestamp), elem.value, anomalies[index]))
          );
        });
    });

    getMetric('act_inf_0').then(res => {
      if (!res) return;
      const series: any[] = formatSeries(res['series']);
      runAnomalyDetection(series)
        .then(res => res.json())
        .then(res => {
          const anomalies = res.result.isAnomaly;
          setAct_0(
            series.map((elem, index) => makeItem(formatTimestamp(elem.timestamp), elem.value, anomalies[index]))
          );
        });
    });

    getMetric('conversation').then(res => {
      if (!res) return;
      const series: any[] = formatSeries(res['series']);
      runAnomalyDetection(series)
        .then(res => res.json())
        .then(res => {
          const anomalies = res.result.isAnomaly;
          setConversation(
            series.map((elem, index) => makeItem(formatTimestamp(elem.timestamp), elem.value, anomalies[index]))
          );
        });
    });

    getMetric('phone_charging').then(res => {
      if (!res) return;
      const series: any[] = formatSeries(res['series']);
      runAnomalyDetection(series)
        .then(res => res.json())
        .then(res => {
          const anomalies = res.result.isAnomaly;
          setPhone(
            series.map((elem, index) => makeItem(formatTimestamp(elem.timestamp), elem.value, anomalies[index]))
          );
        });
    });
  }, []);

  const colProps = { span: 12 }

  return (
    <PageContainer>
      <Card>
      <Row gutter={24}>
        <Col {...colProps}>
          <TimelineChart
            title='Activity Inference Stationary'
            color='#45A1FF'
            data={act_0}
          />
        </Col>
        <Col {...colProps}>
          <TimelineChart
            title='Activity Inference Walking'
            color='#9761E5'
            data={act_1}
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colProps}>
          <TimelineChart
            title='Conversation'
            color='#FBD44C'
            data={conversation}
          />
        </Col>
        <Col {...colProps}>
          <TimelineChart
            title='Phone Charging'
            color='#5ACC74'
            data={phone}
          />
        </Col>
      </Row>
      </Card>
      
  </PageContainer>
  )
}

export default Dashboard;
