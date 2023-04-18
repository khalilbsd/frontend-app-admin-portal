import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import {
  Button, Icon, Modal, Alert,
} from '@edx/paragon';
import { Cancel as ErrorIcon } from '@edx/paragon/icons';

import { camelCaseObject } from '@edx/frontend-platform/utils';
import emailTemplate from './emailTemplate';
import TextAreaAutoSize from '../TextAreaAutoSize';
import FileInput from '../FileInput';
import { returnValidatedEmails, validateEmailAddrTemplateForm } from '../../data/validation/email';
import { normalizeFileUpload } from '../../utils';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from './messages'
class InviteLearnersModal extends React.Component {
  constructor(props) {
    super(props);
    this.intl= this.props.intl;
    this.errorMessageRef = React.createRef();
    this.modalRef = React.createRef();

    this.handleModalSubmit = this.handleModalSubmit.bind(this);
  }

  componentDidMount() {
    const { current: { firstFocusableElement } } = this.modalRef;
    const { contactEmail } = this.props;

    if (firstFocusableElement) {
      firstFocusableElement.focus();
    }
    this.props.initialize({
      'email-template-greeting': this.props.intl.formatMessage(messages[emailTemplate.greeting]),
      'email-template-body': this.props.intl.formatMessage(messages[emailTemplate.body]),
      'email-template-closing': emailTemplate.closing(contactEmail,this.props.intl),
    });
  }

  componentDidUpdate(prevProps) {
    const {
      submitFailed,
      submitSucceeded,
      onClose,
      error,
    } = this.props;

    const errorMessageRef = this.errorMessageRef && this.errorMessageRef.current;

    if (submitSucceeded && submitSucceeded !== prevProps.submitSucceeded) {
      onClose();
    }

    if (submitFailed && error !== prevProps.error && errorMessageRef) {
      // When there is an new error, focus on the error message status alert
      errorMessageRef.focus();
    }
  }

  handleModalSubmit(formData) {
    const {
      addLicensesForUsers,
      subscriptionUUID,
    } = this.props;

    const emailTemplateKey = 'email-template-body';
    // Validate form data
    validateEmailAddrTemplateForm(formData, emailTemplateKey);

    const options = {
      template: formData[emailTemplateKey],
      greeting: formData['email-template-greeting'],
      closing: formData['email-template-closing'],
    };

    options.user_emails = returnValidatedEmails(formData);

    /* eslint-disable no-underscore-dangle */
    return addLicensesForUsers(options, subscriptionUUID)
      .then((response) => {
        const result = camelCaseObject(response.data);
        this.props.onSuccess(result);
      })
      .catch((error) => {
        throw new SubmissionError({
          _error: [error.message],
        });
      });
    /* eslint-enable no-underscore-dangle */
  }

  renderBody() {
    const {
      submitFailed, availableSubscriptionCount,
    } = this.props;

    return (
      <>
        {submitFailed && this.renderErrorMessage()}
        <form onSubmit={e => e.preventDefault()}>
          <p>{this.props.intl.formatMessage(messages['invite.learners.modal.add.unnassigned'])} {availableSubscriptionCount}</p>
          <div className="mt-4">
            <h3>{this.props.intl.formatMessage(messages['invite.learners.modal.add.users'])}</h3>
            <Field
              name="email-addresses"
              component={TextAreaAutoSize}
              label={this.props.intl.formatMessage(messages['invite.learners.modal.add.users.email'])}
              description={this.props.intl.formatMessage(messages['invite.learners.modal.add.users.email.descirption'])}
              data-hj-suppress
            />
            <p className="pb-2">
             {this.props.intl.formatMessage(messages['invite.learners.modal.add.users.or'])}
            </p>
            <Field
              id="csv-email-addresses"
              name="csv-email-addresses"
              component={FileInput}
              label={this.props.intl.formatMessage(messages['invite.learners.modal.add.users.csv'])}
              description={this.props.intl.formatMessage(messages['invite.learners.modal.add.users.csv.description'])}
              accept=".csv"
              normalize={normalizeFileUpload}
              data-hj-suppress
            />
            <h3>{this.props.intl.formatMessage(messages['invite.learners.modal.add.users.email.template'])}</h3>
            <Field
              name="email-template-greeting"
              component={TextAreaAutoSize}
              label={this.props.intl.formatMessage(messages['invite.learners.modal.add.users.email.template.greetings'])}
              data-hj-suppress
            />
            <Field
              name="email-template-body"
              component={TextAreaAutoSize}
              label="Body"
              disabled
            />
            <Field
              name="email-template-closing"
              component={TextAreaAutoSize}
              label={this.props.intl.formatMessage(messages['invite.learners.modal.add.users.email.template.closing'])}
              data-hj-suppress
            />
          </div>
        </form>
      </>
    );
  }

  renderErrorMessage() {
    const { error } = this.props;

    return (
      <div
        ref={this.errorMessageRef}
        tabIndex="-1"
      >
        <Alert
          variant="danger"
          icon={ErrorIcon}
        >
          <Alert.Heading>Unable to subscribe users</Alert.Heading>
          {error.length > 1 ? (
            <ul className="m-0 pl-4">
              {error.map(message => <li key={message}>{message}</li>)}
            </ul>
          ) : (
            error[0]
          )}
        </Alert>
      </div>
    );
  }

  render() {
    const {
      onClose,
      submitting,
      handleSubmit,
    } = this.props;

    return (
      <Modal
        ref={this.modalRef}
        dialogClassName="add-users"
        title={this.props.intl.formatMessage(messages['invite.learners.modal.title'])}
        body={this.renderBody()}
        buttons={[
          <Button
            key="subscribe-users-submit-btn"
            disabled={submitting}
            className="subscribe-users-save-btn"
            onClick={handleSubmit(this.handleModalSubmit)}
          >
            <>
              {submitting && <Icon className="fa fa-spinner fa-spin mr-2" />}
              {this.props.intl.formatMessage(messages['invite.learners.modal.title'])}
            </>
          </Button>,
        ]}
        closeText={this.props.intl.formatMessage(messages['invite.learners.modal.close'])}
        onClose={onClose}
        open
      />
    );
  }
}

InviteLearnersModal.defaultProps = {
  error: null,
  contactEmail: null,

};

InviteLearnersModal.propTypes = {
  // props From redux-form
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitFailed: PropTypes.bool.isRequired,
  error: PropTypes.arrayOf(PropTypes.string),
  initialize: PropTypes.func.isRequired,

  // custom props
  onClose: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  addLicensesForUsers: PropTypes.func.isRequired,
  subscriptionUUID: PropTypes.string.isRequired,

  availableSubscriptionCount: PropTypes.number.isRequired,
  contactEmail: PropTypes.string,
};

export default reduxForm({
  form: 'license-assignment-modal-form',
})(injectIntl(InviteLearnersModal));
