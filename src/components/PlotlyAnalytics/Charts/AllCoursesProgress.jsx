import { injectIntl } from '@edx/frontend-platform/i18n';
import { Card } from '@edx/paragon'
import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'
import messages from '../messages';
import DateFnsUtils from '@date-io/date-fns';
import { Grid } from '@material-ui/core';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';

const AllCoursesProgress = ({ intl, licenses, enrollments }) => {
    const [endDate, setEndDate] = useState(new Date());
    const [data, setData] = useState([])
    const [stats, setStats] = useState(undefined)
    const options = {
        title: intl.formatMessage(messages['tab.analytics.chart.all.course.progress.title']),
        chartArea: { width: '70%' },
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
        hAxis: {

            minValue: 0,
        },
        vAxis: {

            format: 'percent',
            minValue: 0,
            ticks: [0, 0.1, .2, .3, .4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]

        },
        isStacked: false,

    }


    const [licenseStats, setLicenseStats] = useState({
        revoked: 0,
        assigned: 0,
        activated: 0,
        total: 0,
        unassigned: 0,
    });

    const [startDate, setStartDate] = useState(() => {
        const today = new Date();
        today.setDate(1);
        today.setMonth(today.getMonth() - 1);
        return today;
    });
    const [error, setErrorMessage] = useState(undefined);
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


    useEffect(() => {
        const licenseDetails = () => {
            licenses.forEach(subscription => {
                setLicenseStats(stat => {
                    stat.revoked += subscription.licenses.revoked
                    stat.assigned += subscription.licenses.assigned
                    stat.activated += subscription.licenses.activated
                    stat.total += subscription.licenses.total
                    stat.unassigned += subscription.licenses.unassigned
                    return stat
                }
                )
            })
        }


        const genereateStatistique = () => {
            const figures = {
                finished: 0,
                progress: 0,
                activeLicense: 0,
            }
            enrollments?.forEach(enrollment => {
                if (endDate > new Date(enrollment.enrollment_date) && startDate < new Date(enrollment.enrollment_date)) {

                    // console.log(`username ${enrollment.user_username} has passed : ${enrollment.passed} on  ${enrollment.passed_date} with ${parseFloat(enrollment.progress_status) > 60}`)
                    if (enrollment.has_passed && enrollment.passed_date && parseFloat(enrollment.progress_status) > 60) {
                        figures.finished++
                        return
                    }
                    if (!enrollment.passed && !enrollment.passed_date) {
                        if (parseFloat(enrollment.progress_status) < 60 && parseFloat(enrollment.progress_status) > 0) {
                            figures.progress++
                            return
                        }
                    }
                }
            })



            figures.activeLicense = licenseStats.activated


            var stats = [
                [intl.formatMessage(messages['tab.analytics.chart.all.course.progress.title']),intl.formatMessage(messages['tab.analytics.chart.all.course.progress.status']) , { role: 'style' },{ role: 'annotation' }],
                [intl.formatMessage(messages['tab.analytics.chart.all.course.progress.progress']), Math.round((figures.progress / licenseStats.total)*100)/100,'#1a46de',`${Math.round((figures.progress / licenseStats.total)*100)}%`],
                [intl.formatMessage(messages['tab.analytics.chart.all.course.progress.finished']), Math.round((figures.finished / licenseStats.total)*100)/100, '#1a46de',`${Math.round((figures.finished / licenseStats.total)*100)}%`],
                [intl.formatMessage(messages['tab.analytics.chart.all.course.progress.license.nb']), Math.round((figures.activeLicense / licenseStats.total)*100)/100, '#1a46de',`${Math.round((figures.activeLicense / licenseStats.total)*100)}%`],

            ]

            setData(stats)


        }

        licenseDetails()
        genereateStatistique()

    }, [licenses, enrollments])



    useEffect(() => {
        const totalLicenses = () => {
            return licenseStats.total - licenseStats.revoked - licenseStats.unassigned
        }

        if (totalLicenses() < 0) {
            setErrorMessage(intl.formatMessage(messages['tab.analytics.chart.all.course.progress.no.licenses.assigned']))
        }
    }, [licenseStats])


    return (
        <Card className='py-5 px-5 flex-1' >
            <h3 className='stats-card-title'>{intl.formatMessage(messages['tab.analytics.chart.all.course.progress.title'])}</h3>
            <div >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container spacing={5}>
                        <Grid item xs={12} lg={3} md={3} sm={6}>
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
                        <Grid item xs={12} lg={3} md={3} sm={6}>
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

                    </Grid>


                </MuiPickersUtilsProvider>
            </div>
            {
                !error ?
                    <Chart
                        chartType="ColumnChart"
                        width="100%"
                        height="400px"
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

export default (injectIntl(AllCoursesProgress))