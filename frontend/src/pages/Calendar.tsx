import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Badge, Card, Calendar, Alert, Modal } from 'antd';
import moment from 'moment';
import styles from './Calendar.less';

const fetchFormsURL = "http://localhost:3500/api/get_forms/Kevin";

export default (): React.ReactNode => {

  const [value, setValue] = useState<moment.Moment>(moment());
  const [selectedValue, setSelectedValue] = useState<moment.Moment>(moment());
  const [listData, setListData] = useState([]);
  const [done, setDone] = useState<boolean>(false);

  useEffect(() => {
    getDailyMood();
  }, []);

  const onSelect = (newValue: moment.Moment) => {
    setSelectedValue(newValue);
    setValue(newValue);
  };

  const onPanelChange = (newValue: moment.Moment) => {
    setValue(newValue);
  };


  const getDailyMood = async () => {
    const response = await fetch(fetchFormsURL, {
      method: 'GET',
    })
    if (response.status !== 200) error();
    const data = await response.json();
    const convertedData = await convertData(data);
    setListData(convertedData);
  }


  const convertData = async (data) => {
    return data.map((survey) => {
      const alert = { type: (survey.Sentiment === "positive") ? "success": (survey.Sentiment === "negative" ? "error":"warning"), content: survey.Message }
      return { date: survey.Timestamp , alert }
    })
  }

  const dateCellRender = (value) => {
    if (listData) {
      const result = listData.filter(data => data.date === value.format("YYYY-MM-DD"));
      if (result.length) {
        console.log(result);
        return (
          <ul className="events">
            {result.map(item => (
              <li key={item.alert.content}>
                <Badge status={item.alert.type} text={item.alert.content} />
              </li>
            ))}
          </ul>
        );
      }
    }
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
    <Alert message={`You selected date: ${selectedValue && selectedValue.format('YYYY-MM-DD')}`} />
    </Card>
    <Card style={{ marginTop: "20px"}}>
    < Calendar dateCellRender={dateCellRender} value={value} onSelect={onSelect} onPanelChange={onPanelChange} />
    </Card>
  </PageContainer>
)};