import { injectIntl } from '@edx/frontend-platform/i18n';
import { Card } from '@edx/paragon'
import React, { useEffect, useState } from 'react'
import { Chart } from "react-google-charts";
import messages from '../messages';


const LineChart = ({intl,licenses,enrollments}) => {
    const [numberOfLicenses, setNumberOfLicenses] = useState(undefined)
   const data = [
    ['Year', 'Sales', 'Expenses', 'tahir'],
    ['2004', 1000, 400, 200],
    ['2005', 1170, 700, 400],
    ['2006', 660,   800, 600],
    ['2007', 1030, 1110, 1111]
  ];
   const options = {
    hAxis: {
      title: intl.formatMessage(messages['tab.analytics.chart.cumalative.general.line.month']),
    },
    // vAxis: {
    //   title: "Popularity",
    // },


    title: intl.formatMessage(messages['tab.analytics.chart.cumalative.general.line.title']),
    curveType: 'none',
    legend: { position: 'top' }
  }



  useEffect(() => {
    var temp ={
      startDate:NaN,

    }
    licenses.forEach(license => {

    })
  }, [licenses])


console.log(licenses)

  return (
    <Card>
      <Chart
        chartType="LineChart"
        width="100%"
        height="600px"
        data={data}
        options={options}
      />
    </Card>
  )
}

export default (injectIntl(LineChart))