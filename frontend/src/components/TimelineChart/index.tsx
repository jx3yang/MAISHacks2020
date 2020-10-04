import { Axis, Chart, Geom, Line, Point, Tooltip } from 'bizcharts';

import DataSet from '@antv/data-set'
import React from 'react'
import styles from './style.less'

export interface TimelineItem {
  x: number;
  y: number;
  anomaly: boolean;
}

interface TimelineChartProps {
  data: TimelineItem[];
  title: string;
  color: string;
  tickInterval?: number;
}

const TimelineChart: React.FC<TimelineChartProps> = (props) => {
  const {
    data: sourceData,
    title,
    color,
    tickInterval,
  } = props;

  const data = Array.isArray(sourceData) && sourceData.length > 0 ? sourceData : [{x: 0, y: 0}]

  data.sort((a, b) => a.x - b.x)

  let max = Number.NEGATIVE_INFINITY;
  let min = Number.POSITIVE_INFINITY;
  data.forEach(point => {
    max = Math.max(max, point.y);
    min = Math.min(min, point.y);
  });

  console.log(data)

  const ds = new DataSet({
    state: {
      start: data[0].x,
      end: data[data.length - 1].x,
    }
  });

  const dv = ds.createView();
  dv.source(data)
    .transform({
      type: 'filter',
      callback: (obj: { x: string }) => {
        const date = obj.x;
        return date <= ds.state.end && date >= ds.state.start;
      },
    })
    .transform({
      type: 'map',
      callback(row: { y: string, anomaly: boolean }) {
        const newRow = { ...row };
        newRow[title] = row.y;
        newRow['state'] = row.anomaly ? 'anomaly' : 'regularity';
        return newRow;
      },
    })
    .transform({
      type: 'fold',
      fields: [title],
      key: 'key',
      value: 'value'
    });

  const timeScale = {
    type: 'time',
    tickInterval: tickInterval || 60 * 60 * 2, // two hour
    mask: 'HH:mm', // hours:minutes
    range: [0, 1],
  };

  const cols = {
    x: timeScale,
    value: {
      max,
      min,
    },
  };

  return (
    <div className={styles.timelineChart} style={{ height: 450 }}>
      <h3>{title}</h3>
      <Chart height={400} padding={[60, 20, 40, 40]} data={dv} scale={cols} forceFit>
        <Line shape='smooth' position='x*value' color={color} />
        <Point 
          position='x*value' 
          color={['state', (state) => state === 'anomaly' ? 'red' : color]}
        />
      </Chart>
    </div>
  );
};

export default TimelineChart;
