import { Card } from '@edx/paragon'
import React from 'react'
import { Chart } from "react-google-charts";

export const data = [
  ["x", "dogs", "cats","bhyem"],
  [0, 0, 0,0],
  [1, 10, 5,20],
  [2, 23, 15,50],
  [3, 17, 9,6],
  [4, 18, 10,12],
  [5, 9, 5,3],
  [6, 11, 3,1],
  [7, 27, 19,22],
];
export const options = {
  hAxis: {
    title: "Time",
  },
  vAxis: {
    title: "Popularity",
  },
  series: {
    1: { curveType: "function" },
  },
};
const LineChart = () => {
  return (
    <Card>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </Card>
  )
}

export default LineChart