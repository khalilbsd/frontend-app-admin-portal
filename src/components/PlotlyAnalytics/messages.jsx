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
        defaultMessage: 'Progress by course'
    },
    'tab.analytics.chart.learner.course.certificate.title': {
        id: 'tab.analytics.chart.learner.course.certificate.title',
        defaultMessage: 'Learner certification status per course'
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
    'tab.analytics.chart.learner.course.enrollment.chart.number.learners': {
        id: 'tab.analytics.chart.learner.course.enrollment.chart.number.learners',
        defaultMessage: 'Enrolled Learners'
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
    },
    'tab.analytics.chart.date.picker.start.date':{
        id:'tab.analytics.chart.date.picker.start.date',
        defaultMessage: "Start Date"
    },
    'tab.analytics.chart.date.picker.end.date':{
        id:'tab.analytics.chart.date.picker.end.date',
        defaultMessage: "End Date"
    },
    'tab.analytics.chart.error.message.no.data':{
        id:'tab.analytics.chart.error.message.no.data',
        defaultMessage: "We're sorry! you do not have any enrollments before this date"
    },
    'tab.analytics.chart.error.message.startDateBeforeEndDate':{
        id:'tab.analytics.chart.error.message.startDateBeforeEndDate',
        defaultMessage: "Error: Start date must be before end date"
    },
    'tab.analytics.chart.all.course.progress.title':{
        id:'tab.analytics.chart.all.course.progress.title',
        defaultMessage: "Progress of all courses"
    },
    'tab.analytics.chart.all.course.progress.status':{
        id:'subs.management.page.tab.manage.learners.license.data.table.status',
        defaultMessage: "Status"
    },
    'tab.analytics.chart.all.course.progress.catageory':{
        id:'tab.analytics.chart.all.course.progress.catageory',
        defaultMessage: "Catageory"
    },
    'tab.analytics.chart.all.course.progress.finished':{
        id:'tab.analytics.chart.all.course.progress.finished',
        defaultMessage: "Learners who have finished"
    },
    'tab.analytics.chart.all.course.progress.progress':{
        id:'tab.analytics.chart.all.course.progress.progress',
        defaultMessage: "Learners in progress"
    },
    'tab.analytics.chart.all.course.progress.license.nb':{
        id:'tab.analytics.chart.all.course.progress.license.nb',
        defaultMessage: "Number  of active licenses"
    },
    'tab.analytics.chart.all.course.progress.no.licenses.assigned':{
        id:'tab.analytics.chart.all.course.progress.no.licenses.assigned',
        defaultMessage: "Your company didn't assign any license yet "
    },

    'tab.analytics.chart.cumalative.general.line.title':{
        id:'tab.analytics.chart.cumalative.general.line.title',
        defaultMessage: "General statistic"
    },
    'tab.analytics.chart.cumalative.general.line.bought.linceses':{
        id:'tab.analytics.chart.cumalative.general.line.bought.linceses',
        defaultMessage: "Number of licenses purchased"
    },
    'tab.analytics.chart.cumalative.general.line.finished.cumulated':{
        id:'tab.analytics.chart.cumalative.general.line.finished.cumulated',
        defaultMessage: "Number of learners who finished combined"
    },
    'tab.analytics.chart.cumalative.general.line.progress.cumulated':{
        id:'tab.analytics.chart.cumalative.general.line.progress.cumulated',
        defaultMessage: "Number of learners in  progress combined"
    },
    'tab.analytics.chart.cumalative.general.line.month':{
        id:'tab.analytics.chart.cumalative.general.line.month',
        defaultMessage: "Month"
    },

})


export default messages;