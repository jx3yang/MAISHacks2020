import React, { useState } from 'react';
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
    
    // Request Sentiment API
    const sentiment = await getSentiment([values.journal]);

    // Display success message
    success(sentiment as string);

    

    // Constructing Database API body
    const date = moment().format("YYYY-MM-DD");
    const name = "Kevin";
    const dataInput = {
      "Name": name,
      "Timestamp": date,
      "Message": values.journal,
      "Sentiment": sentiment,
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

  const getSentimentMessage = (sentiment: string) => {
    console.log(sentiment)
    switch (sentiment) {
      case 'positive': {
        return 'It seems you had a great day, happy to hear!';
      }
      case 'neutral': {
        return 'Another day in life it seems!'
      }
      default: {
        return "We all have our ups and lows, but don't give up!"
      }
    }
  } 
  
  // Handling success modal
  const success = (sentiment: string) => {
    Modal.success({
      content: <div>
          Thank you for submitting and see you tomorrow! <br />
          {getSentimentMessage(sentiment)}
      </div>,
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
