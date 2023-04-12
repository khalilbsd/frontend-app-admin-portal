import { defineMessages } from "@edx/frontend-platform/i18n";

const messages = defineMessages({
    'tab.report.config.title': {
        id: 'sidebar.link.report.config',
        defaultMessage: 'Reporting configuration'
    },
    'tab.report.config.add.config.btn': {
        id: 'tab.report.config.add.config.btn',
        defaultMessage: 'Add a reporting configuration'
    },
    'tab.report.config.add.config.form.active': {
        id: 'subs.management.page.tab.manage.learners.license.data.table.status.active',
        defaultMessage: 'Active'
    },
    'tab.report.config.add.config.form.data.type': {
        id: 'tab.report.config.add.config.form.data.type',
        defaultMessage: 'Data Type'
    },
    'tab.report.config.add.config.form.data.type.help': {
        id: 'tab.report.config.add.config.form.data.type.help',
        defaultMessage: 'The type of data this report should contain. If this is an old report, you will not be able to change this field, and should create a new report'
    },
    'tab.report.config.add.config.form.data.report': {
        id: 'tab.report.config.add.config.form.data.report',
        defaultMessage: 'Report Type'
    },
    'tab.report.config.add.config.form.data.report.help': {
        id: 'tab.report.config.add.config.form.data.report.help',
        defaultMessage: 'The type this report should be sent as, e.g. CSV'
    },
    'tab.report.config.add.config.form.data.delivery': {
        id: 'tab.report.config.add.config.form.data.delivery',
        defaultMessage: 'Delivery Method'
    },
    'tab.report.config.add.config.form.data.delivery.help': {
        id: 'tab.report.config.add.config.form.data.delivery.help',
        defaultMessage: 'The method in which the data should be sent'
    },
    'tab.report.config.add.config.form.data.frequency': {
        id: 'tab.report.config.add.config.form.data.frequency',
        defaultMessage: 'Frequency'
    },
    'tab.report.config.add.config.form.data.frequency.help': {
        id: 'tab.report.config.add.config.form.data.frequency.help',
        defaultMessage: 'The frequency interval (daily, weekly, or monthly) that the report should be sent'
    },
    'tab.report.config.add.config.form.data.day.month': {
        id: 'tab.report.config.add.config.form.data.day.month',
        defaultMessage: 'Day of Month'
    },
    'tab.report.config.add.config.form.data.day.month.help': {
        id: 'tab.report.config.add.config.form.data.day.month.help',
        defaultMessage: 'The day of the month to send the report. This field is required and only valid when the frequency is monthly'
    },
    'tab.report.config.add.config.form.data.day.week': {
        id: 'tab.report.config.add.config.form.data.day.week',
        defaultMessage: 'Day of Week'
    },
    'tab.report.config.add.config.form.data.day.week.help': {
        id: 'tab.report.config.add.config.form.data.day.week.help',
        defaultMessage: 'The day of the week to send the report. This field is required and only valid when the frequency is weekly'
    },
    'tab.report.config.add.config.form.data.hour.day': {
        id: 'tab.report.config.add.config.form.data.hour.day',
        defaultMessage: 'Hour of Day'
    },
    'tab.report.config.add.config.form.data.hour.day.help': {
        id: 'tab.report.config.add.config.form.data.hour.day.help',
        defaultMessage: 'The hour of the day to send the report, in Eastern Standard Time (EST). This is required for all frequency settings'
    },
    'tab.report.config.add.config.form.data.pgp': {
        id: 'tab.report.config.add.config.form.data.pgp',
        defaultMessage: 'PGP Encryption Key'
    },
    'tab.report.config.add.config.form.data.pgp.help': {
        id: 'tab.report.config.add.config.form.data.pgp.help',
        defaultMessage: 'The key for encryption, if PGP encrypted file is required This is required for all frequency settings'
    },
    'tab.report.config.add.config.form.data.email': {
        id: 'tab.report.config.add.config.form.data.email',
        defaultMessage: 'Email(s)'
    },
    'tab.report.config.add.config.form.data.email.help': {
        id: 'tab.report.config.add.config.form.data.email.help',
        defaultMessage: 'The email(s), one per line, where the report should be sent'
    },
    'tab.report.config.add.config.form.data.email.required': {
        id: 'tab.report.config.add.config.form.data.email.required',
        defaultMessage: 'Required. One email per line. Emails must be formatted properly (email@domain.com)'
    },
    'tab.report.config.add.config.form.data.change.password': {
        id: 'ttab.report.config.add.config.form.data.change.password',
        defaultMessage: 'Change Password'
    },
    'tab.report.config.add.config.form.data.password': {
        id: 'tab.report.config.add.config.form.data.password',
        defaultMessage: 'Password'
    },
    'tab.report.config.add.config.form.data.password.help': {
        id: 'tab.report.config.add.config.form.data.password.help',
        defaultMessage: 'This password will be used to secure the zip file. It will be encrypted when stored in the database.'
    },
    'tab.report.config.add.config.form.data.password.invalid': {
        id: 'tab.report.config.add.config.form.data.password.invalid',
        defaultMessage: 'Required. Password must not be blank'
    },

    'tab.report.config.add.config.form.data.sftp.hostname.help': {
        id: 'tab.report.config.add.config.form.data.sftp.hostname.help',
        defaultMessage: 'The host to deliver the report too'
    },
    'tab.report.config.add.config.form.data.sftp.hostname.invalid': {
        id: 'tab.report.config.add.config.form.data.sftp.hostname.invalid',
        defaultMessage: 'Required. Hostname cannot be blank'
    },
    'tab.report.config.add.config.form.data.sftp.hostname': {
        id: 'tab.report.config.add.config.form.data.sftp.hostname',
        defaultMessage: 'SFTP Hostname'
    },
    'tab.report.config.add.config.form.data.sftp.port.help': {
        id: 'tab.report.config.add.config.form.data.sftp.port.help',
        defaultMessage: 'The port the SFTP host connects too'
    },
    'tab.report.config.add.config.form.data.sftp.port.invalid': {
        id: 'tab.report.config.add.config.form.data.sftp.port.invalid',
        defaultMessage: 'Required: Must be a valid port'
    },
    'tab.report.config.add.config.form.data.sftp.port': {
        id: 'tab.report.config.add.config.form.data.sftp.port',
        defaultMessage: 'SFTP Port'
    },
    'tab.report.config.add.config.form.data.sftp.username.help': {
        id: 'tab.report.config.add.config.form.data.sftp.username.help',
        defaultMessage: 'the username to securely access the host'
    },
    'tab.report.config.add.config.form.data.sftp.username.invalid': {
        id: 'tab.report.config.add.config.form.data.sftp.username.invalid',
        defaultMessage: 'Required: Username cannot be blank'
    },
    'tab.report.config.add.config.form.data.sftp.username': {
        id: 'tab.report.config.add.config.form.data.sftp.username',
        defaultMessage: 'SFTP Username'
    },
    'tab.report.config.add.config.form.data.sftp.password.help': {
        id: 'tab.report.config.add.config.form.data.sftp.password.help',
        defaultMessage: 'The password to use to securely access the host. The password will be encrypted when stored in the database'
    },
    'tab.report.config.add.config.form.data.sftp.password.invalid': {
        id: 'tab.report.config.add.config.form.data.sftp.password.invalid',
        defaultMessage: 'Required: Password must not be blank'
    },
    'tab.report.config.add.config.form.data.sftp.password': {
        id: 'tab.report.config.add.config.form.data.sftp.password',
        defaultMessage: 'SFTP Password'
    },
    'tab.report.config.add.config.form.data.sftp.file.path.help': {
        id: 'tab.report.config.add.config.form.data.sftp.file.path.help',
        defaultMessage: "The path on the host to deliver the report too"
    },
    'tab.report.config.add.config.form.data.sftp.file.path.invalid': {
        id: 'tab.report.config.add.config.form.data.sftp.file.path.invalid',
        defaultMessage: "Required"
    },
    'tab.report.config.add.config.form.data.sftp.file.path': {
        id: 'tab.report.config.add.config.form.data.sftp.file.path',
        defaultMessage: "SFTP File Path"
    },
    'tab.report.config.add.config.form.data.enterprise.catalog.help': {
        id: 'tab.report.config.add.config.form.data.enterprise.catalog.help',
        defaultMessage: "The catalogs that should be included in the report. No selection means all catalogs will be included."
    },
    'tab.report.config.add.config.form.data.enterprise.catalog': {
        id: 'tab.report.config.add.config.form.data.enterprise.catalog',
        defaultMessage: "Enterprise Customer Catalogs"
    },

    'tab.report.config.add.config.form.data.enterprise.catalog.label': {
        id: 'tab.report.config.add.config.form.data.enterprise.catalog.label',
        defaultMessage: "Catalog {title} with UUID {uuid}"
    },
    'tab.report.config.add.config.form.data.btn.submit': {
        id: 'tab.report.config.add.config.form.data.btn.submit',
        defaultMessage: "Submit"
    },
    'tab.report.config.add.config.form.data.btn.saving': {
        id: 'tab.report.config.add.config.form.data.btn.saving',
        defaultMessage: "Saving..."
    },
    'tab.report.config.add.config.form.data.btn.complete': {
        id: 'tab.report.config.add.config.form.data.btn.complete',
        defaultMessage: "Complete"
    },
    'tab.report.config.add.config.form.data.btn.error': {
        id: 'tab.report.config.add.config.form.data.btn.error',
        defaultMessage: "Error"
    },
    'tab.report.config.add.config.form.data.btn.delete': {
        id: 'tab.report.config.add.config.form.data.btn.delete',
        defaultMessage: "Delete"
    },
})

export default messages;