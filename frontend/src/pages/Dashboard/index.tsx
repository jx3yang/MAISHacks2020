import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Row, Col, } from 'antd';
import TimelineChart, { TimelineItem } from '@/components/TimelineChart';
import { fakeTimeSeries } from '@/services/time_series';

const Dashboard: React.FC<{}> = () => {
  const [data, setData] = useState<TimelineItem[]>([]);

  const makeItem = (x: number, y: number): TimelineItem => {
    const item: TimelineItem = { x, y, anomaly: y < 1170 };
    return item;
  }

  useEffect(() => {
    fakeTimeSeries().then(res => {
      const series = res.series as ({value: number, timestamp: string}[]);
      const seriesData: TimelineItem[] = series.map(point => makeItem(Date.parse(point.timestamp) / 1000, point.value / 100000));
      setData(seriesData.slice(seriesData.length - 11, seriesData.length - 1));
    });
  }, []);

  const colProps = { span: 12 }

  return (
    <PageContainer>
      <Card>
      <Row gutter={24}>
        <Col {...colProps}>
          <TimelineChart
            title='Chart 1'
            color='#45A1FF'
            data={data}
          />
        </Col>
        <Col {...colProps}>
          <TimelineChart
            title='Chart 2'
            color='#9761E5'
            data={data}
          />
        </Col>
      </Row>
      <Row gutter={24}>
        <Col {...colProps}>
          <TimelineChart
            title='Chart 3'
            color='#FBD44C'
            data={data}
          />
        </Col>
        <Col {...colProps}>
          <TimelineChart
            title='Chart 4'
            color='#5ACC74'
            data={data}
          />
        </Col>
      </Row>
      </Card>
      
  </PageContainer>
  )
}

export default Dashboard;
