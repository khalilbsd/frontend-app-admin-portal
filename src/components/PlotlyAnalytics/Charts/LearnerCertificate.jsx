import { Card } from '@edx/paragon';
import React, { useEffect } from 'react'
import { Chart } from "react-google-charts";
import { useState } from 'react';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from '../messages';






const LearnerCertificate = ({ rawData,intl }) => {
  const [courseStats, setCourseStats] = useState();
  const [data, setData] = useState([]);


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
      1: { color: '#de1a47' },
    },
  }


  useEffect(() => {
    const groupedByCourse = rawData?.reduce((acc, enrollment) => {
      const courseKey = enrollment.courserun_key;
      const existingCourse = acc.find(course => course.courseKey === courseKey);
      if (existingCourse) {
        existingCourse.totalEnrollments++;
         if (enrollment.passed_date) {
            existingCourse.totalSucceded++
        }else{
            existingCourse.totalFailure++
         }
      } else {
        // console.log(enrollment.course_title)
        acc.push({
          courseKey: courseKey,
          courseTitle: enrollment.course_title,
          totalEnrollments: 1,
            totalSucceded: enrollment.passed_date?1:0,
            totalFailure: !enrollment.passed_date?1:0,
        });
      }
      return acc;
    }, []);

    // groupedByCourse?.forEach(element => {
    //     element.totalNotActive = element.totalEnrollments - (element.totalInProgress + element.totalFinished) ;
    // });


    setCourseStats(groupedByCourse);
  }, [rawData]);



  useEffect(() => {
    setData([[intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.course']), intl.formatMessage(messages['tab.analytics.chart.learner.course.certificate.succeded']), intl.formatMessage(messages['tab.analytics.chart.learner.course.certificate.pending'])]]);
    courseStats?.forEach(element =>
     {
      const temp = [`${element.courseTitle} (${element.totalEnrollments})`, element.totalSucceded, element.totalFailure,]
      setData(data => [...data, temp]);
    }
      )
  }, [courseStats])

console.log(courseStats);

  return (
    <Card>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="600px"
        data={data}
        options={options}
      />
    </Card>
  )
}

export default (injectIntl(LearnerCertificate))