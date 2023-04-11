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
        defaultMessage: 'In accordance with groupadoPro privacy policies, learners that do not activate their allocated licenses within 90 days of invitation are purged from the record tables below.'
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
    'subs.management.page.tab.manage.learners.license.expiration.first.title':{
        id:'subs.management.page.tab.manage.learners.license.expiration.first.title',
        defaultMessage: "This subscription plan's end date has passed"
    },
    'subs.management.page.tab.manage.learners.license.expiration.first.message':{
        id:'subs.management.page.tab.manage.learners.license.expiration.first.message',
        defaultMessage: "Administrative actions are no longer available as of the plan end date of {expirationDate}. You may still view the statuses of your invited learners."
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
        id:'subs.management.page.tab.manage.learners.license.expiration.exprired.title',
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



})

export default messages