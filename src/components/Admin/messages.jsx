import { defineMessages } from "@edx/frontend-platform/i18n";


const messages = defineMessages({
    'tab.progress.report.page.title': {
        id: 'tab.progress.report.page.title',
        defaultMessage: 'Learner Progress Report'
    },
    'tab.progress.report.overview': {
        id: 'tab.progress.report.overview',
        defaultMessage: 'Overview'
    },

    'tab.progress.report.cards.details.text.expanded':{
        id:'tab.progress.report.cards.details.text.expanded',
        defaultMessage:'Detailed breakdown'
    },

    'tab.progress.report.cards.details.text.unexpanded':{
        id:'tab.progress.report.cards.details.text.unexpanded',
        defaultMessage:'Details'
    },
    'tab.progress.report.cards.details.text.expandedScreenReader':{
        id:'tab.progress.report.cards.details.text.expandedScreenReader',
        defaultMessage:'Close details'
    },
    'tab.progress.report.cards.details.text.expandedScreenReader':{
        id:'tab.progress.report.cards.details.text.unexpandedScreenReader',
        defaultMessage:'Show details'
    },


    'tab.progress.report.cards.numberOfUsers.description': {
        id: 'tab.progress.report.cards.numberOfUsers.description',
        defaultMessage: 'total number of learners registered'
    },
    'tab.progress.report.cards.numberOfUsers.actions.label': {
        id: 'tab.progress.report.cards.numberOfUsers.actions.label',
        defaultMessage: 'Which learners are registered but not yet enrolled in any courses?'
    },

    'tab.progress.report.cards.enrolledLearners.description': {
        id: 'tab.progress.report.cards.enrolledLearners.description',
        defaultMessage: 'learners enrolled in at least one course'
    },

    'tab.progress.report.cards.enrolledLearners.label.enrolled.learners': {
        id: 'tab.progress.report.cards.enrolledLearners.label.enrolled.learners',
        defaultMessage: 'How many courses are learners enrolled in?'
    },
    'tab.progress.report.cards.enrolledLearners.label.enrolled.learners.inactive.course': {
        id: 'tab.progress.report.cards.enrolledLearners.label.enrolled.learners.inactive.course',
        defaultMessage: 'Who is no longer enrolled in a current course?'
    },

    'tab.progress.report.cards.activeLearners.description': {
        id: 'tab.progress.report.cards.activeLearners.description',
        defaultMessage: 'active learners in the past week'
    },

    'tab.progress.report.cards.activeLearners.label.learners.active.week': {
        id: 'tab.progress.report.cards.activeLearners.label.learners.active.week',
        defaultMessage: 'Who are my top active learners?'
    },
    'tab.progress.report.cards.activeLearners.label.learners.inactive.week': {
        id: 'tab.progress.report.cards.activeLearners.label.learners.inactive.week',
        defaultMessage: 'Who has not been active for over a week?'
    },
    'tab.progress.report.cards.activeLearners.label.learners.inactive.month': {
        id: 'tab.progress.report.cards.activeLearners.label.learners.inactive.month',
        defaultMessage: 'Who has not been active for over a month?'
    },

    'tab.progress.report.cards.courseCompletions.description': {
        id: 'tab.progress.report.cards.courseCompletions.description',
        defaultMessage: 'course completions'
    },

    'tab.progress.report.cards.courseCompletions.label.completed.courses': {
        id: 'tab.progress.report.cards.courseCompletions.label.completed.courses',
        defaultMessage: 'How many courses have been completed by learners?'
    },
    'tab.progress.report.cards.courseCompletions.label.completed.courses.week': {
        id: 'tab.progress.report.cards.courseCompletions.label.completed.courses.week',
        defaultMessage: 'Who completed a course in the past week?'
    },
    'tab.progress.report.full.report.title':{
        id:'tab.progress.report.full.report.title',
        defaultMessage: 'Full Report'
    },
    'tab.progress.report.full.report.sub.title':{
        id:'tab.progress.report.full.report.sub.title',
        defaultMessage: 'Registered Learners Not Yet Enrolled in a Course'
    },
    'tab.progress.report.reset.to.action':{
        id:'tab.progress.report.reset.to.action',
        defaultMessage: 'Reset to'
    },
    'tab.progress.report.reset.to.action.filters':{
        id:'tab.progress.report.reset.to.action.filters',
        defaultMessage: 'Reset Filters'
    },
    'tab.progress.report.data.date.showing':{
        id:'tab.progress.report.data.date.showing',
        defaultMessage: 'Showing data as of'
    },
    'tab.progress.report.data.download.report':{
        id:'tab.progress.report.data.download.report',
        defaultMessage: 'Full Report'
    },
    'tab.progress.report.data.download.report.error':{
        id:'tab.progress.report.data.download.report.error',
        defaultMessage: 'Unable to Generate CSV Report'
    },
    'tab.progress.report.data.download.report.error.try.again':{
        id:'tab.progress.report.data.download.report.error.try.again',
        defaultMessage: 'Please try again. ({message})'

    },

    'tab.progress.report.data.filter':{
        id:'tab.progress.report.data.filter',
        defaultMessage: 'Filter by course'
    },
    'tab.progress.report.data.filter.all.courses':{
        id:'tab.progress.report.data.filter.all.courses',
        defaultMessage: 'Filter by course'
    },
    'tab.progress.report.data.filter.start.date':{
        id:'tab.progress.report.data.filter.start.date',
        defaultMessage: 'Filter by start date'
    },
    'tab.progress.report.data.filter.start.date.help':{
        id:'tab.progress.report.data.filter.start.date.help',
        defaultMessage: 'A start date can be selected after the course name is selected.'
    },

    'tab.progress.report.data.filter.start.search':{
        id:'tab.progress.report.data.filter.start.search',
        defaultMessage: 'All Dates'
    },

    'tab.progress.report.data.filter.start.search.choose':{
        id:'tab.progress.report.data.filter.start.search.choose',
        defaultMessage: 'Choose a course'
    },
    'tab.progress.report.data.filter.email':{
        id:'tab.progress.report.data.filter.email',
        defaultMessage: 'Filter by email'
    },
    'tab.progress.report.data.filter.email.placeholder':{
        id:'tab.progress.report.data.filter.email.placeholder',
        defaultMessage: 'Search by email...'
    },

})


export default messages;