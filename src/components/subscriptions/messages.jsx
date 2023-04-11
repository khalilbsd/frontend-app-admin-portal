import { defineMessages } from "@edx/frontend-platform/i18n"


const messages = defineMessages({
    'subs.management.page.title':{
        id:'sidebar.link.subs.management',
        defaultMessage: 'Subscription Management'
    },
    'subs.management.page.tab.manage.learners':{
        id:'subs.management.page.tab.manage.learners',
        defaultMessage: 'Manage Learners'
    },
    'subs.management.page.tab.manage.requests':{
        id:'subs.management.page.tab.manage.requests',
        defaultMessage: 'Manage Requests'
    },

    'subs.management.page.tab.manage.learners.no.sub.found':{
        id:'subs.management.page.tab.manage.learners.no.sub.found',
        defaultMessage: 'No subscription plans for your organization'
    },
    'subs.management.page.tab.manage.learners.no.sub.found.message':{
        id:'subs.management.page.tab.manage.learners.no.sub.found.message',
        defaultMessage: 'We were unable to find any active subscription plans for your organization. Please contact Customer Support if you have questions.'
    },

    'subs.management.page.tab.manage.learners.no.sub.found.contact':{
        id:'subs.management.page.tab.manage.learners.no.sub.found.contact',
        defaultMessage: 'Contact support'
    },
    'subs.management.page.tab.manage.learners.sub.details.invite':{
        id:'subs.management.page.tab.manage.learners.sub.details.invite',
        defaultMessage: 'Invite learners'
    },
    'subs.management.page.tab.manage.learners.sub.details.message':{
        id:'subs.management.page.tab.manage.learners.sub.details.message',
        defaultMessage: 'In accordance with Groupado Pro privacy policies, learners that do not activate their allocated licenses within 90 days of invitation are purged from the record tables below.'
    },
    'subs.management.page.tab.manage.learners.sub.details.purchase':{
        id:'subs.management.page.tab.manage.learners.sub.details.purchase',
        defaultMessage: 'Purchase Date'
    },
    'subs.management.page.tab.manage.learners.sub.details.start.date':{
        id:'subs.management.page.tab.manage.learners.sub.details.start.date',
        defaultMessage: 'Start Date'
    },
    'subs.management.page.tab.manage.learners.sub.details.end.date':{
        id:'subs.management.page.tab.manage.learners.sub.details.end.date',
        defaultMessage: 'End Date'
    },
    'subs.management.page.tab.manage.learners.sub.back.subs':{
        id:'subs.management.page.tab.manage.learners.sub.back.subs',
        defaultMessage: 'Back to subscriptions'
    },
    'subs.management.page.tab.manage.learners.add':{
        id:'subs.management.page.tab.manage.learners.add',
        defaultMessage: '{numAlreadyAssociated} email addresses were previously assigned. {numSuccessfulAssignments} email addresses were successfully added.'
    },
    'subs.management.page.tab.manage.learners.license.expiration.ended.title':{
        id:'subs.management.page.tab.manage.learners.license.expiration.ended.title',
        defaultMessage: "This subscription plan's end date has passed"
    },
    'subs.management.page.tab.manage.learners.license.subs.management.page.tab.manage.learners.license.expiration.ended.message':{
        id:'subs.management.page.tab.manage.learners.license.subs.management.page.tab.manage.learners.license.expiration.ended.message',
        defaultMessage: "Administrative actions are no longer available as of the plan end date of {expirationDate}. You may still view the statuses of your invited learners."
    },
    'subs.management.page.tab.manage.learners.license.expiration.ending.title':{
        id:'subs.management.page.tab.manage.learners.license.expiration.ending.title',
        defaultMessage: "This subscription plan's end date is approaching"
    },


    'subs.management.page.tab.manage.learners.license.expiration.ending.message':{
        id:'subs.management.page.tab.manage.learners.license.expiration.ending.message',
        defaultMessage: "Administrative actions will no longer be available beginning {SUBSCRIPTION_PLAN_RENEWAL_LOCK_PERIOD_HOURS} hours prior to the plan end date of {expirationDate}."
    },




    'subs.management.page.tab.manage.learners.license.expiration.exprired.title':{
        id:'subs.management.page.tab.manage.learners.license.expiration.exprired.title',
        defaultMessage: "Your subscription contract has expired"
    },

    'subs.management.page.tab.manage.learners.license.expiration.exprired.message':{
        id:'subs.management.page.tab.manage.learners.license.expiration.exprired.message',
        defaultMessage: "Renew your subscription today to reconnect your learning community."
    },
    'subs.management.page.tab.manage.learners.license.expiration.expring.title':{
        id:'subs.management.page.tab.manage.learners.license.expiration.expring.title',
        defaultMessage: "Your subscription contract is expiring soon"
    },

    'subs.management.page.tab.manage.learners.license.expiration.expring.message':{
        id:'subs.management.page.tab.manage.learners.license.expiration.exprired.message',
        defaultMessage: "Your current subscription contract will expire in {daysUntilContractExpiration} days.Renew your subscription today to minimize access disruption for your learners."
    },
    'subs.management.page.tab.manage.learners.license.expiration.exprired.modal.title':{
        id:'subs.management.page.tab.manage.learners.license.expiration.exprired.modal.title',
        defaultMessage: "This subscription cohort is expired"
    },
    'subs.management.page.tab.manage.learners.license.expiration.exprired.modal.message':{
        id:'subs.management.page.tab.manage.learners.license.expiration.exprired.modal.message',
        defaultMessage: "Your subscription contract expired on {expirationDate}. The Groupado Pro customer support team is here to help! Get in touch today to renew your subscription and access your subscription management details."
    },

    'subs.management.page.tab.manage.learners.license.expiration.modal.dismiss':{
        id:'subs.management.page.tab.manage.learners.license.expiration.modal.dismiss',
        defaultMessage: "Dismiss"
    },
    'subs.management.page.tab.manage.learners.license.expiration.expriring.modal.title':{
        id:'subs.management.page.tab.manage.learners.license.expiration.expriring.modal.title',
        defaultMessage: "Renew your expiring subscription"
    },
    'subs.management.page.tab.manage.learners.license.expiration.expriring.modal.message':{
        id:'subs.management.page.tab.manage.learners.license.expiration.expriring.modal.message',
        defaultMessage: "Your subscription contract expires in {agreementNetDaysUntilExpiration} days"
    },
    'subs.management.page.tab.manage.learners.license.expiration.expriring.on.modal.message':{
        id:'subs.management.page.tab.manage.learners.license.expiration.expriring.on.modal.message',
        defaultMessage: "It's time to renew your subscription contract with Groupado Pro! The Groupado Pro customer support team is here to help. Get in touch today to minimize access disruptions for your learners."
    },
    'subs.management.page.tab.manage.learners.license.expiration.expriring.on.date.modal.message':{
        id:'subs.management.page.tab.manage.learners.license.expiration.expriring.on.date.modal.message',
        defaultMessage: "Access expires on {expirationDate}"
    },
    'subs.management.page.tab.manage.learners.license.allocation':{
        id:'subs.management.page.tab.manage.learners.license.allocation',
        defaultMessage: 'License Allocation'
    },
    'subs.management.page.tab.manage.learners.license.allocation.of.nb':{
        id:'subs.management.page.tab.manage.learners.license.allocation.of.nb',
        defaultMessage: ' of '
    },
    'subs.management.page.tab.manage.learners.license.allocation.of.nb.allocated':{
        id:'subs.management.page.tab.manage.learners.license.allocation.of.nb.allocated',
        defaultMessage: 'licenses allocated'
    },

    'subs.management.page.tab.manage.learners.license.data.table.email':{
        id:'subs.management.page.tab.manage.learners.license.data.table.email',
        defaultMessage:'Email address'

    },
    'subs.management.page.tab.manage.learners.license.data.table.status':{
        id:'subs.management.page.tab.manage.learners.license.data.table.status',
        defaultMessage:'Status'

    },

    'subs.management.page.tab.manage.learners.license.data.table.status.active':{
        id:'subs.management.page.tab.manage.learners.license.data.table.status.active',
        defaultMessage:'Active'

    },

    'subs.management.page.tab.manage.learners.license.data.table.status.pending':{
        id:'subs.management.page.tab.manage.learners.license.data.table.status.pending',
        defaultMessage:'Pending'

    },

    'subs.management.page.tab.manage.learners.license.data.table.status.revoked':{
        id:'subs.management.page.tab.manage.learners.license.data.table.status.revoked',
        defaultMessage:'Revoked'
    },


    'subs.management.page.tab.manage.learners.license.data.table.recent.actions':{
        id:'subs.management.page.tab.manage.learners.license.data.table.recent.actions',
        defaultMessage:'Recent action'
    },
    'subs.management.page.tab.manage.learners.license.data.no.results.found':{
        id:'subs.management.page.tab.manage.learners.license.data.no.results.found',
        defaultMessage:'No results found'
    },

    'subs.management.page.tab.manage.learners.license.data.table.recent.actions.activated':{
        id:'subs.management.page.tab.manage.learners.license.data.table.recent.actions.activated',
        defaultMessage:'Activated: {activationDate}'
    },
    'subs.management.page.tab.manage.learners.license.data.table.recent.actions.revoked':{
        id:'subs.management.page.tab.manage.learners.license.data.table.recent.actions.revoked',
        defaultMessage:'Revoked: {revokedDate}'
    },
    'subs.management.page.tab.manage.learners.license.data.table.recent.actions.invited':{
        id:'subs.management.page.tab.manage.learners.license.data.table.recent.actions.invited',
        defaultMessage:'Invited: {lastRemindDate}'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.btn.remind':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.btn.remind',
        defaultMessage:'Remind'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.title':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.title',
        defaultMessage:'Remind User'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.title.plural':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.title.plural',
        defaultMessage:'Remind Users'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.error.occured':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.error.occured',
        defaultMessage:'There was an error with your request. Please try again.'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.error.occured.message':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.error.occured.message',
        defaultMessage:'If the error persists,'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.error.occured.message.link':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.error.occured.message.link',
        defaultMessage:'contact customer support.'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates',
        defaultMessage:'Email Template'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize',
        defaultMessage:'Customize Greeting'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.body':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.body',
        defaultMessage:'Body'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.closing':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.closing',
        defaultMessage:'Customize Closing'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.close':{
        id:'subs.management.page.tab.manage.learners.license.expiration.modal.dismiss',
        defaultMessage:'Cancel'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.remind.btn.all':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.remind.btn.all',
        defaultMessage:'all'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.remind.btn.remind':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.remind.btn.remind',
        defaultMessage:'Remind {buttonNumberLabel}'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.remind.btn.reminding':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.remind.btn.reminding',
        defaultMessage:'Reminding {buttonNumberLabel}'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.remind.btn.done':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.remind.btn.done',
        defaultMessage:'done'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.remind.btn.retry':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.remind.btn.retry',
        defaultMessage:'Retry remind {buttonNumberLabel}'
    },


    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.text':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.text',
        defaultMessage:'We noticed you haven’t had a chance to start learning With Groupado Pro! It’s easy to get started and browse the course catalog.'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.body.text':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.body.text',
        defaultMessage:'{ENTERPRISE_NAME} partnered with Groupado Pro to give everyone access to high-quality online courses. '
        + 'Start your subscription and browse courses in nearly every subject including '
        + 'Data Analytics, Digital Media, Business & Leadership, Communications, Computer Science and so much more. '
        + 'Courses are taught by experts from the world’s leading universities and corporations.'
        + '\n\nStart learning: {LICENSE_ACTIVATION_LINK}'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.closing.text':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.closing.text',
        defaultMessage:'To learn more about your unlimited subscription and Groupado Pro, contact your Groupado Pro administrator'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.closing.text.admin':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.closing.text.admin',
        defaultMessage:'{contactText} at {contactEmail}'
    },


    'subs.management.page.tab.manage.learners.license.data.table.actions.btn.revoke':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.btn.revoke',
        defaultMessage:'Revoke'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.revoke.modal.title.plural':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.revoke.modal.title.plural',
        defaultMessage:'Revoke Licenses'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.revoke.modal.title':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.revoke.modal.title',
        defaultMessage:'Revoke License'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.revoke.modal.warning':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.revoke.modal.warning',
        defaultMessage:'You have already revoked {applied} licenses. You have {remaining} revocations left on your plan.'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.revoke.modal.warning.body':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.revoke.modal.warning.body',
        defaultMessage:'This action cannot be undone. Learners with revoked licenses must be reinvited.'
    },

    'subs.management.page.tab.manage.learners.license.data.table.actions.revoke.modal.revoke.btn.revoke':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.revoke.modal.revoke.btn.revoke',
        defaultMessage:'Revoke {buttonNumberLabel}'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.revoke.modal.revoke.btn.revoking':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.revoke.modal.revoke.btn.revoking',
        defaultMessage:'Revoking {buttonNumberLabel}'
    },

    'subs.management.page.tab.manage.learners.license.data.table.actions.revoke.modal.revoke.btn.retry':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.revoke.modal.revoke.btn.retry',
        defaultMessage:'Retry revoke {buttonNumberLabel}'
    },
    'subs.management.page.tab.manage.learners.license.data.table.actions.btn.enroll':{
        id:'subs.management.page.tab.manage.learners.license.data.table.actions.btn.enroll',
        defaultMessage:'Enroll'
    },


})

export default messages