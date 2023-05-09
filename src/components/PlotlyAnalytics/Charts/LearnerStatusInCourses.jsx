import { Card } from '@edx/paragon';
import React, { useEffect, useMemo } from 'react'
import { Chart } from "react-google-charts";
import { useState } from 'react';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from '../messages';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,

  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Grid } from '@material-ui/core';
import CourseSearchBox from './CourseSearchBox';
import { element } from 'prop-types';




const LearnerStatusInCourses = ({ rawData, intl, licenseData }) => {
  const [courseStats, setCourseStats] = useState();
  const [data, setData] = useState([]);
  const [endDate, setEndDate] = useState(new Date());
  const [licenseStats, setLicenseStats] = useState({
    revoked: 0,
    allocated: 0,
    assigned: 0,
    activated: 0,
    total: 0,
    unassigned: 0,
  });
  const [courseList, setCourseList] = useState([]);
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    today.setDate(1);
    today.setMonth(today.getMonth() - 4);
    return today;
  });
  const [error, setErrorMessage] = useState(undefined);
  const [course, setCourse] = useState(undefined)


  const handleStartDateChange = (date) => {
    setStartDate(date);
  };
  const handleEndDateChange = (date) => {
    if (date < startDate) {
      setErrorMessage(intl.formatMessage(messages['tab.analytics.chart.error.message.startDateBeforeEndDate']))
      return
    }
    setEndDate(date);
  };



  const handleCourseChange = (e) => {
    setCourse(e.target.value);
  }


  const options = {
    title: intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.title']),
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
      0: { color: '#de1a47' },
      1: { color: '#1a46de' },
      2: { color: '#2ce4b4' },
    },
    tooltip: {
      formatter: function () {
        return this.series.name + ': ' + Highcharts.numberFormat(this.y * 100, 2, ',') + '%';
      }
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true,
          formatter: function () {
            return Highcharts.numberFormat(this.y * 100, 2, ',') + '%';
          }
        }
      }
    }
  }


useEffect(()=>{
  const licenseDetails = () => {
    licenseData.results.forEach(subscription => {
      setLicenseStats(stat => {
        stat.revoked += subscription.licenses.revoked
        stat.allocated += subscription.licenses.allocated
        stat.assigned += subscription.licenses.assigned
        stat.activated += subscription.licenses.activated
        stat.total += subscription.licenses.total
        stat.unassigned += subscription.licenses.unassigned
        return stat
      }
      )
    })
  }
  licenseDetails();
},[licenseData])


  useEffect(() => {
    function getInactiveUsers(progress){
      console.log(`native progress is ${progress}`);
      if (parseFloat(progress) < 1){
        return 1
      }
      return 0

    }

    const groupedByCourse = rawData?.reduce((acc, enrollment) => {
      // console.log(licenseStats);
      // console.log(`unactive license ${parseInt(licenseStats.unassigned)+parseInt(licenseStats.assigned)}`);
      const courseKey = enrollment.courserun_key;

      const existingCourse = acc.find(course => course.courseKey === courseKey);

      if (existingCourse) {
        // console.log(`number of  inactive user in ${existingCourse.courseTitle} is ${existingCourse.totalNotActive}`);
        // console.log(`the user ${enrollment.user_username} has passed ${enrollment.has_passed} on ${enrollment.passed_date} with progress equal ${parseFloat(enrollment.progress_status)}`)
        existingCourse.totalEnrollments++;
        if ((parseFloat(enrollment.progress_status) > 0)  && (parseFloat(enrollment.progress_status) < 100) && !(enrollment.has_passed)) {
          existingCourse.totalInProgress++;

        } else if (parseFloat(enrollment.progress_status) > 60 && enrollment.has_passed && enrollment.passed_date) {
          existingCourse.totalFinished++;
        } else {
          // console.log(`im in inactive for the course ${existingCourse.courseTitle}`);
          existingCourse.totalNotActive++;
          // console.log(existingCourse.totalNotActive);
        }

      } else {
        if (endDate > new Date(enrollment.enrollment_date) && startDate < new Date(enrollment.enrollment_date)) {
          const unacu=getInactiveUsers(enrollment.progress_status)
          // console.log(`this is user is inactive for the course  ${enrollment.course_title} with progresss ${unacu}`);
          const stats= {
            courseKey: courseKey,
            courseTitle: enrollment.course_title,
            totalEnrollments: 1,
            totalInProgress: parseFloat(enrollment.progress_status) > 0 && parseFloat(enrollment.progress_status) < 100 ? 1 : 0,
            totalFinished: parseFloat(enrollment.progress_status) > 60 && enrollment.has_passed && enrollment.passed_date ? 1  : 0,
            // totalNotActive: parseFloat(enrollment.progress_status) == 0 ? 1 : 0,
            totalNotActive: parseInt(licenseStats.assigned) + parseInt(licenseStats.unassigned) + unacu,
          }
          console.log(stats.totalNotActive);
          // stats.totalNotActive = parseInt(stats.totalNotActive) + p

          acc.push(stats)
        }
      }

      return acc;
    }, []);


    setCourseStats(groupedByCourse);

  }, [rawData, startDate, endDate,licenseStats]);





  useEffect(() => {

    if (courseStats?.length) {
      //preparing the course list for the course filter
      const formattedCourseList = courseStats.map(course => {
        return {
          courseKey: course.courseKey,
          courseTitle: course.courseTitle
        };
      });
      setCourseList(formattedCourseList);
      setErrorMessage(undefined)
      //working the on the analytics data
      const newData = [
        [
          intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.course']),
          intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.chart.number.learners']),
          { type: 'string', role: 'annotation' },
          intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.chart.in.progress']),
          { type: 'string', role: 'annotation' },
          intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.chart.finish']),
          { type: 'string', role: 'annotation' },

        ]
      ];


      if (course && course.length > 0) {
         courseStats.filter(item => item.courseKey === course).forEach(element=>{
          const temp = [`
          ${element.courseTitle}`,
          Math.round((element.totalNotActive / licenseStats.total)*100)/100,
          `${Math.round((element.totalNotActive / licenseStats.total)*100)}%`,

          Math.round((element.totalInProgress / licenseStats.total)*100)/100,
          `${Math.round((element.totalInProgress / licenseStats.total)*100)} %`,
          Math.round((element.totalFinished / licenseStats.total)*100)/100,
          `${Math.round((element.totalFinished / licenseStats.total)*100)} %`,

        ]
          newData.push(temp);
        })
      }else{
        courseStats?.forEach(element => {
          const temp = [`
          ${element.courseTitle}`,
          Math.round((element.totalNotActive / licenseStats.total)*100)/100,
          `${Math.round((element.totalNotActive / licenseStats.total)*100)}%`,

          Math.round((element.totalInProgress / licenseStats.total)*100)/100,
          `${Math.round((element.totalInProgress / licenseStats.total)*100)} %`,
          Math.round((element.totalFinished / licenseStats.total)*100)/100,
          `${Math.round((element.totalFinished / licenseStats.total)*100)} %`,

        ]
        //   const temp = [`
        //   ${element.courseTitle} (${element.totalEnrollments})`,
        //   Math.round((element.totalNotActive / licenseStats.total)*100)/100,
        //   `${Math.round((element.totalNotActive / licenseStats.total)*100)}%`,

        //   Math.round((element.totalInProgress / licenseStats.total)*100)/100,
        //   `${Math.round((element.totalInProgress / licenseStats.total)*100)} %`,
        //   Math.round((element.totalFinished / licenseStats.total)*100)/100,
        //   `${Math.round((element.totalFinished / licenseStats.total)*100)} %`,

        // ]
          newData.push(temp);
        });
      }



      setData(newData);
    } else {
      setErrorMessage(intl.formatMessage(messages['tab.analytics.chart.error.message.no.data']))
    }
  }, [courseStats, licenseStats,course]);



  return (
    <Card className='py-5 px-5'>
      <h3 className='stats-card-title'>{intl.formatMessage(messages['tab.analytics.chart.learner.course.enrollment.title'])}</h3>
      <div >
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={3} md={4} sm={6}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label={intl.formatMessage(messages['tab.analytics.chart.date.picker.start.date'])}
                format="MM/dd/yyyy"
                value={startDate}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs={12} lg={3} md={4} sm={6}>
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label={intl.formatMessage(messages['tab.analytics.chart.date.picker.end.date'])}
                format="MM/dd/yyyy"
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item xs={12} lg={3} md={4} sm={6}>
              <CourseSearchBox handleChange={handleCourseChange} initialValue={course} courses={courseList}  />
            </Grid>
          </Grid>


        </MuiPickersUtilsProvider>
      </div>
      {
        !error ?
          <Chart
            chartType="ColumnChart"
            width="100%"
            height="500px"
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