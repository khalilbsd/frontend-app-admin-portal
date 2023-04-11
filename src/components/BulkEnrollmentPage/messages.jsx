import { defineMessages } from "@edx/frontend-platform/i18n"


const messages = defineMessages({
    'bulk.enrollment.learners.main.title': {
        id: 'bulk.enrollment.learners.main.title',
        defaultMessage: 'Subscription Enrollment',
    },
    'bulk.enrollment.learners.title': {
        id: 'bulk.enrollment.learners.title',
        defaultMessage: 'Revoked Learners Selected',
    },
    'bulk.enrollment.learners.message': {
        id: 'bulk.enrollment.learners.message',
        defaultMessage: "Any learners with revoked licenses are not included. Click 'Enroll' to enroll active and pending learners only.",
    },
    'bulk.enrollment.learners.message.close': {
        id: 'bulk.enrollment.learners.message.close',
        defaultMessage: "Close"
    },


    'bulk.enrollment.learners.btn.previous': {
        id: 'pagination.previous',
        defaultMessage: 'Previous',
    },

    'bulk.enrollment.learners.btn.next': {
        id: 'pagination.next',
        defaultMessage: 'Next',
    },
    'bulk.enrollment.learners.add.course.description': {
        id: 'bulk.enrollment.learners.add.course.description',
        defaultMessage: 'By enrolling your learners in courses, you connect your learning community with the content that matters most to them, and take the guesswork out of getting started on the Groupado Pro platform. To begin, select a course from your subscription catalog.',
    },
    'bulk.enrollment.learners.add.course.add.courses': {
        id: 'bulk.enrollment.learners.add.course.add.courses',
        defaultMessage: 'Add courses',
    },

})

export default messages