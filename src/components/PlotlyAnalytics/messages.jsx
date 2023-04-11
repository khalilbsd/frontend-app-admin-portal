import { defineMessages } from "@edx/frontend-platform/i18n";


const messages = defineMessages({
    'tab.anayltics.page.title':{
        id:'tab.anayltics.page.title',
        defaultMessage:'Analytics dashboard'
    },
    'tab.anayltics.chart.title.daily.activities': {
        id: 'tab.anayltics.chart.title.daily.activities',
        defaultMessage: 'The number of learners per status',
    },
    'tab.anayltics.chart.title.daily.time.zones': {
        id: 'tab.anayltics.chart.title.daily.time.zones',
        defaultMessage: "Learner's partitions according to time zones",
    },
    'tab.analytics.chart.learner.enrollment.status.message': {
        id: 'tab.analytics.chart.learner.enrollment.status.message',
        defaultMessage: 'Learners enrollments'
    },
    'tab.analytics.chart.learner.enrollment.status': {
        id: 'tab.analytics.chart.learner.enrollment.status',
        defaultMessage: 'Status'
    },
    'tab.analytics.chart.learner.enrollment.status.enrolled': {
        id: 'tab.analytics.chart.learner.enrollment.status.enrolled',
        defaultMessage: 'Enrolled'
    },
    'tab.analytics.chart.learner.enrollment.status.not.enrolled': {
        id: 'tab.analytics.chart.learner.enrollment.status.not.enrolled',
        defaultMessage: 'Not Enrolled'
    },

    'tab.analytics.chart.learner.course.enrollment.title': {
        id: 'tab.analytics.chart.learner.course.enrollment.title',
        defaultMessage: 'Number of Learners per Course'
    },

    'tab.analytics.chart.learner.course.enrollment.horiz.axis.title': {
        id: 'tab.analytics.chart.learner.course.enrollment.horiz.axis.title',
        defaultMessage: 'Course Name'
    },

    'tab.analytics.chart.learner.course.enrollment.vert.axis.title': {
        id: 'tab.analytics.chart.learner.course.enrollment.vert.axis.title',
        defaultMessage: 'Number of Learners'
    },
    'tab.analytics.chart.learner.course.enrollment.course': {
        id: 'tab.analytics.chart.learner.course.enrollment.course',
        defaultMessage: 'Course'
    },
    'tab.analytics.chart.learner.course.enrollment.chart.not.active': {
        id: 'tab.analytics.chart.learner.course.enrollment.chart.not.active',
        defaultMessage: 'Non Active Learners'
    },
    'tab.analytics.chart.learner.course.enrollment.chart.in.progress': {
        id: 'tab.analytics.chart.learner.course.enrollment.chart.in.progress',
        defaultMessage: 'In Progress Learners'
    },
    'tab.analytics.chart.learner.course.enrollment.chart.finish': {
        id: 'tab.analytics.chart.learner.course.enrollment.chart.finish',
        defaultMessage: 'Finished Learners'
    },
    'tab.analytics.chart.learner.course.certificate.succeded':{
        id:'tab.analytics.chart.learner.course.certificate.succeded',
        defaultMessage: 'Learners who got a certificate'
    },
    'tab.analytics.chart.learner.course.certificate.pending':{
        id:'tab.analytics.chart.learner.course.certificate.pending',
        defaultMessage: "Learner who still didn't get a certificate"
    }

})


export default messages;