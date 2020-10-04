import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Calendar, Alert } from 'antd';
import moment from 'moment';
// import styles from './Calendar.less';

export default (): React.ReactNode => {

  const [value, setValue] = useState<moment.Moment>(moment());
  const [selectedValue, setSelectedValue] = useState<moment.Moment>(moment());

  const onSelect = (newValue: moment.Moment) => {
    setSelectedValue(newValue);
    setValue(newValue);
  };

  const onPanelChange = (newValue: moment.Moment) => {
    setValue(newValue);
  };
  
  return (
  <PageContainer>
    <Card>
    <Alert message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`} />
    </Card>
    <Card style={{ marginTop: "20px"}}>
    < Calendar value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
    </Card>
  </PageContainer>
)};