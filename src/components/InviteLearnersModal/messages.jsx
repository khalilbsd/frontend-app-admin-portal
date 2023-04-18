import { defineMessages } from "@edx/frontend-platform/i18n";


const messages = defineMessages({
    'invite.learners.modal.title':{
        id:'invite.learners.modal.title',
        defaultMessage: 'Invite learners',
    },


    'invite.learners.modal.add.unnassigned':{
        id:'invite.learners.modal.add.unnassigned',
        defaultMessage: 'Unassigned licenses:',
    },
    'invite.learners.modal.add.users':{
        id:'invite.learners.modal.add.users',
        defaultMessage: 'Add Users',
    },
    'invite.learners.modal.add.users.email':{
        id:'invite.learners.modal.add.users.email',
        defaultMessage: 'Email Address',
    },
    'invite.learners.modal.add.users.email.descirption':{
        id:'invite.learners.modal.add.users.email.descirption',
        defaultMessage: 'To add more than one user, enter one email address per line.',
    },
    'invite.learners.modal.add.users.or':{
        id:'invite.learners.modal.add.users.or',
        defaultMessage: 'Or',
    },
    'invite.learners.modal.add.users.csv':{
        id:'invite.learners.modal.add.users.csv',
        defaultMessage: 'Upload Email Addresses',
    },
    'invite.learners.modal.add.users.csv.description':{
        id:'invite.learners.modal.add.users.csv.description',
        defaultMessage: 'The file must be a CSV containing a single column of email addresses.',
    },
    'invite.learners.modal.add.users.email.template':{
        id:'invite.learners.modal.add.users.email.template',
        defaultMessage: 'Email Template',
    },
    'invite.learners.modal.add.users.email.template.greetings':{
        id:'invite.learners.modal.add.users.email.template.greetings',
        defaultMessage: 'Customize Greeting',
    },
    'invite.learners.modal.add.users.email.template.closing':{
        id:'invite.learners.modal.add.users.email.template.closing',
        defaultMessage: 'Customize Closing',
    },
    'invite.learners.modal.add.users.email.template.greetings.text':{
        id:'invite.learners.modal.add.users.email.template.greetings.text',
        defaultMessage: 'Congratulations!',
    },
    'invite.learners.modal.add.users.email.template.body.text':{
        id:'invite.learners.modal.add.users.email.template.body.text',
        defaultMessage: '{ENTERPRISE_NAME} has partnered with Groupado Pro to give you an unlimited subscription to learn on Groupado Pro!  Take the best courses in the most in-demand subject areas and upskill for a new career opportunity.  Earn a professional certificate, start a program or just learn for fun. \n {LICENSE_ACTIVATION_LINK}.',
    },
    'invite.learners.modal.close':{
        id:'subs.management.page.tab.manage.learners.license.expiration.modal.dismiss',
        defaultMessage: 'Cancel',
    },




})

export default messages;