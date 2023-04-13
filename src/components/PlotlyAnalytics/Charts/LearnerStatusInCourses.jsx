import { Card } from '@edx/paragon';
import React, { useEffect } from 'react'
import { Chart } from "react-google-charts";
import { useState } from 'react';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from '../messages';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';




const LearnerStatusInCourses = ({ rawData,intl }) => {
  const [courseStats, setCourseStats] = useState();
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] =useState(new Date());
  const [error, setErrorMessage] = useState(undefined);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };


console.log(selectedDate)


  const options = {
    title: intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.title']),
    chartArea: { width: '70%' },
    hAxis: {
      title: intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.horiz.axis.title']),
      minValue: 0,
    },
    vAxis: {
      title: intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.vert.axis.title']),
    },
    isStacked: false,
    series: {
      0: { color: '#2ce4b4' },
      1: { color: '#1a46de' },
      2: { color: '#de1a47' },
    },
  }



  useEffect(() => {
    const groupedByCourse = rawData?.reduce((acc, enrollment) => {
      const courseKey = enrollment.courserun_key;
      const existingCourse = acc.find(course => course.courseKey === courseKey);

      if (existingCourse) {

        existingCourse.totalEnrollments++;
         if ((parseFloat(enrollment.progress_status) > 0) && (parseFloat(enrollment.progress_status) < 100)) {
           existingCourse.totalInProgress++;
         }else if (parseFloat(enrollment.progress_status) == 100) {
           existingCourse.totalFinished++;
         }else {
           existingCourse.totalNotActive++;
         }

      } else {

        if (selectedDate > new Date(enrollment.enrollment_date) ){
        acc.push({
          courseKey: courseKey,
          courseTitle: enrollment.course_title,
          totalEnrollments: 1,
          totalInProgress: parseFloat(enrollment.progress_status) > 0 && parseFloat(enrollment.progress_status) < 100 ? 1 : 0,
          totalFinished: parseFloat(enrollment.progress_status) == 100 ? 1 : 0,
          totalNotActive: parseFloat(enrollment.progress_status) == 0 ? 1 : 0,
        });
      }
    }
      return acc;
    }, []);

    // groupedByCourse?.forEach(element => {
    //     element.totalNotActive = element.totalEnrollments - (element.totalInProgress + element.totalFinished) ;
    // });


    setCourseStats(groupedByCourse);
  }, [rawData,selectedDate]);



  useEffect(() => {
    if (courseStats?.length){
    setErrorMessage(undefined)
    setData([[intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.course']),intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.chart.finish']), intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.chart.in.progress']),intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.chart.number.learners'])]]);
    courseStats?.forEach(element =>
     {
      const temp = [`${element.courseTitle} (${element.totalEnrollments})`, element.totalFinished, element.totalInProgress,element.totalEnrollments]
      setData(data => [...data, temp]);
    }
      )
  }else{
    setErrorMessage(intl.formatMessage(messages['tab.analytics.chart.error.message.no.data']))
  }
  }, [courseStats])



  return (
    <Card className='py-5 px-5'>
      <div >
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />


    </MuiPickersUtilsProvider>
      </div>
      {
        !error?
        <Chart
        chartType="ColumnChart"
        width="100%"
        height="600px"
        data={data}
        options={options}
        />
        :
        <div className='w-100 d-flex align-items-center justify-content-center error-container'>
          <h3 className='error-message no-data-found'>{error}</h3>
        </div>
      }
    </Card>
  )
}

export default (injectIntl(LearnerStatusInCourses))