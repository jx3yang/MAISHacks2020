import React from 'react';
import { Form, Input, Card } from 'antd';

const JournalSurvey: React.FC<{}> = () => (
  <Card style={{ marginTop: "20px"}}>
    <Form.Item name={['user', 'journal']} label="What's on your mind today?" colon={false}>
      <Input.TextArea style={{borderRadius: 8}} rows={4} placeholder="Today, I was feeling..." onPressEnter={() => console.log("enter was pressed")}/>
    </Form.Item>
  </Card>
);

export default JournalSurvey;