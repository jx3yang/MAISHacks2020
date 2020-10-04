import React from 'react';
import { Form, Rate, Card, InputNumber } from 'antd';

const SleepSurvey: React.FC<{}> = () => (
  <Card style={{ marginTop: "20px"}}>
    <Form.Item name={['user', 'sleep count']} label="How many hours did you sleep last night?" colon={false} rules={[{ type: 'number' }]} >
      <InputNumber min={0} max={24} />
    </Form.Item>
    <Form.Item name="rate" label="How would rate your overall sleep last night?" colon={false}>
        <Rate count={4}/>
      </Form.Item>
  </Card>
);

export default SleepSurvey;