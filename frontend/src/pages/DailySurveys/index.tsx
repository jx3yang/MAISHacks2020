import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Input, Button, Card, Alert  } from 'antd';

import JournalSurvey from './Components/JournalSurvey';
import SleepSurvey from './Components/SleepSurvey';

// import styles from './index.less';

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export default (): React.ReactNode => {
  
  const onFinish = (values: Object) => {
    console.log(values);
  };
  
  return (
  <PageContainer>
    <Card>
      <Alert
        message="This survey is meant to help us understand how you are feeling."
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
    </Card>
    
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>

        <JournalSurvey />
        <SleepSurvey />

        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 0 }}>
          <Button style={{marginTop: 25, marginLeft: 15, width: 150, backgroundColor: "transparent", color: "#A2CAA4", borderWidth: 2, borderRadius: 5}} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    
  </PageContainer>
)};
