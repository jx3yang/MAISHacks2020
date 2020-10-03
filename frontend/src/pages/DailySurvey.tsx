import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Alert } from 'antd';
// import styles from './DailySurvey.less';

export default (): React.ReactNode => (
  <PageContainer>
    <Card>
      <Alert
        message="This page will be the home page with the daily surveys."
        type="success"
        showIcon
        banner
        style={{
          margin: -12,
          marginBottom: 24,
        }}
      />
    </Card>
  </PageContainer>
);
