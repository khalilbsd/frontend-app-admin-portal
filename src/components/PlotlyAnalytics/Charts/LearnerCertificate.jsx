import { Card } from '@edx/paragon';
import React, { useEffect } from 'react'
import { Chart } from "react-google-charts";
import { useState } from 'react';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from '../messages';






const LearnerCertificate = ({ rawData, intl }) => {
  const [courseStats, setCourseStats] = useState();
  const [data, setData] = useState([]);
const [error, setError] = useState(undefined)

  const options = {
    title: intl.formatMessage(messages['tab.analytics.chart.learner.course.certificate.title']),
    chartArea: { width: '70%' },
    hAxis: {
      title: intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.horiz.axis.title']),
      minValue: 0,
    },
    annotations: {
      alwaysOutside: true,
      textStyle: {
        fontSize: 14,
        fontName: 'Montserrat',
        bold: true,
        color: '#000',
        auraColor: 'none'
      }
    },
    vAxis: {
      title: intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.vert.axis.title']),
      format: 'percent',
      minValue: 0,
      ticks: [0, 0.1, .2, .3, .4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]

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
        if (enrollment.passed_date && enrollment.has_passed && parseFloat(enrollment.progress_status) > 60) {
          existingCourse.totalSucceded++
        } else {
          existingCourse.totalFailure++
        }
      } else {
        // console.log(enrollment.course_title)
        acc.push({
          courseKey: courseKey,
          courseTitle: enrollment.course_title,
          totalEnrollments: 1,
          totalSucceded: enrollment.passed_date ? 1 : 0,
          totalFailure: !enrollment.passed_date ? 1 : 0,
        });
      }
      return acc;
    }, []);

    // groupedByCourse?.forEach(element => {
    //     element.totalNotActive = element.totalEnrollments - (element.totalInProgress + element.totalFinished) ;
    // });


    setCourseStats(groupedByCourse);
    //setCourseStats([]);
  }, [rawData]);


  useEffect(() => {
    setData([
      [
        intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.course']),
        intl.formatMessage(messages['tab.analytics.chart.learner.course.certificate.succeded']),
        { type: 'string', role: 'annotation' },
        intl.formatMessage(messages['tab.analytics.chart.learner.course.certificate.pending']),
        { type: 'string', role: 'annotation' },

      ]]);
    console.log("marra");
    if (courseStats?.length > 0) {
      setError(undefined)
      courseStats?.forEach(element => {
        const temp = [
          `${element.courseTitle} (${element.totalEnrollments})`
          , element.totalSucceded / element.totalEnrollments,
          `${(element.totalSucceded / element.totalEnrollments) * 100}%`,

          element.totalFailure / element.totalEnrollments,
          `${(element.totalFailure / element.totalEnrollments) * 100}%`
        ]
        setData(data => [...data, temp]);
      }
      )
    } else {
        const temp = [
          `0`, 0, `0%`,0,`0%`
        ]
        setData(data => [...data, temp]);
        setError("il n'y a pas encore d'inscriptions")

    }
  }, [courseStats])

  console.log(data);

  return (
    <Card className='py-5 px-5'>
      <h3 className='stats-card-title'>{intl.formatMessage(messages['tab.analytics.chart.learner.course.certificate.title'])}</h3>
      {error?
       <div className='w-100 d-flex align-items-center justify-content-center error-container'>
       <h3 className='error-message no-data-found'>{error}</h3>
      </div>
        :

      <Chart
      chartType="ColumnChart"
      width="100%"
      height="600px"
      data={data}
      options={options}
      />
    }
    </Card>
  )
}

export default (injectIntl(LearnerCertificate))