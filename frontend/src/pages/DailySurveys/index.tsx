import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Modal, Button, Card, Alert  } from 'antd';
import moment from 'moment';

import JournalSurvey from './Components/JournalSurvey';
import SleepSurvey from './Components/SleepSurvey';
// import styles from './index.less';

// Sentiment API Endpoint
const sentimentUrl = "http://localhost:5002/predict";
const databaseUrl = "http://localhost:3500/api/add_forms/";

const layout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

export default (): React.ReactNode => {
  
  const onFinish = async (values: {journal: string, sleep: {count: number, rate: number}}) => {
    
    // Display success message
    success();

    // Request Sentiment API
    const sentiment = await getSentiment([values.journal]);

    // Constructing Database API body
    const date = moment().format("YYYY-MM-DD");
    const name = "Kevin";
    const dataInput = {
      "Name": name,
      "Timestamp": date,
      "Message": values.journal,
      "Sentiment": (sentiment == "positive"? 1 : 0),
      "Sleephours": values.sleep.count,
      "Rating":values.sleep.rate
    };

    // Request POST Database API
    await addToDatabase(dataInput);
  };

  const getSentiment = async (messages: string[]) => {

    // Request Sentiment API
    const response = await fetch(sentimentUrl, {
      method: 'POST',
      headers: {
        contentType: "application/json"
      },
      body: JSON.stringify({messages})
    });
    
    // Throw error if no response
    if (!response) error();
    const result = await response.json();
    if (!result.success) error();
    return result.predictions[0];
  };


  const addToDatabase = async (dataInput: Object) => {

    // Request Sentiment API
    const response = await fetch(databaseUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        contentType: "application/json"
      },
      body: JSON.stringify([dataInput])
    });
    
    // Throw error if no response
    if (!response) error();
  };
  
  // Handling success modal
  const success = () => {
    Modal.success({
      content: 'Thank you for submitting and see you tomorrow!',
    });
  }

  // Handling error modal
  const error = () => {
    Modal.error({
      content: 'Oops...Something went wrong.',
    });
  }
  
  return (
  <PageContainer>
    <Card>
      <Alert
        message="This survey is meant to help us understand how you are feeling."
        type="info"
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
