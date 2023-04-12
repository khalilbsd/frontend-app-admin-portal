import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  StatefulButton,
  ModalDialog,
  ActionRow,
  Spinner,
  Form,
  Hyperlink,
} from '@edx/paragon';
import { logError } from '@edx/frontend-platform/logging';
import { connect } from 'react-redux';
import moment from 'moment';

import { useRequestState } from './LicenseManagementModalHook';
import { validateEmailTemplateForm } from '../../../../data/validation/email';
import LicenseManagerApiService from '../../../../data/services/LicenseManagerAPIService';
import { configuration } from '../../../../config';
import { getSubscriptionContactText } from '../../../../utils';
import { transformFiltersForRequest } from '../../data/utils';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from '../../messages';

const generateEmailTemplate = (contactEmail,intl) => ({
  greeting: intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.text']),
  body: intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.body.text']),
  // body: '{ENTERPRISE_NAME} partnered with edX to give everyone access to high-quality online courses. '
  //   + 'Start your subscription and browse courses in nearly every subject including '
  //   + 'Data Analytics, Digital Media, Business & Leadership, Communications, Computer Science and so much more. '
  //   + 'Courses are taught by experts from the world’s leading universities and corporations.'
  //   + '\n\nStart learning: {LICENSE_ACTIVATION_LINK}',
  closing: getSubscriptionContactText(contactEmail,intl),
});

/**
 * Returns StatefulButton labels
 * @param {number} totalToRemind
 * @returns {Object}
 */
const generateRemindModalSubmitLabel = (totalToRemind,intl) => {
  let buttonNumberLabel =intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.remind.btn.all']);
  if (Number.isFinite(totalToRemind)) {
    buttonNumberLabel = `(${totalToRemind})`;
  }
  return {
    default:intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.remind.btn.remind'],{buttonNumberLabel}),
    pending: intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.remind.btn.reminding'],{buttonNumberLabel}),
    complete:intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.remind.btn.done']),
    error:intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.remind.btn.retry'],{buttonNumberLabel}),
  };
};

const LicenseManagementRemindModal = ({
  isOpen,
  onClose,
  onSuccess,
  onSubmit,
  subscription,
  usersToRemind,
  remindAllUsers,
  totalToRemind,
  contactEmail,
  activeFilters,
  intl
}) => {
  const [requestState, setRequestState, initialRequestState] = useRequestState(isOpen);

  const [emailTemplate, setEmailTemplate] = useState(generateEmailTemplate(contactEmail,intl));
  const isExpired = moment().isAfter(subscription.expirationDate);

  const buttonLabels = generateRemindModalSubmitLabel(totalToRemind,intl);


  // const title = `Remind User${remindAllUsers || totalToRemind > 1 ? 's' : ''}`;
  var  title = ""
  if (remindAllUsers || totalToRemind > 1){
    title = intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.title.plural'])

  }else{
    title = intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.title'])

  }

  const handleSubmit = useCallback(async () => {
    if (onSubmit) {
      onSubmit();
    }
    setRequestState({ ...initialRequestState, loading: true });
    try {
      validateEmailTemplateForm(emailTemplate, 'body', false);
    } catch (error) {
      logError(error);
      setRequestState({ ...initialRequestState, error });
      return;
    }

    const makeRequest = async () => {
      const options = {
        greeting: emailTemplate.greeting,
        closing: emailTemplate.closing,
      };

      const filtersPresent = activeFilters.length > 0;

      // If reminding all users and there are no filters, hit remind-all endpoint
      if (remindAllUsers && !filtersPresent) {
        return LicenseManagerApiService.licenseRemindAll(subscription.uuid);
      }

      const userEmailsToRemind = usersToRemind.map((user) => user.email);

      // If emails are passed in, send them in the payload.
      if (userEmailsToRemind.length > 0) {
        options.user_emails = userEmailsToRemind;
      } else {
        options.filters = transformFiltersForRequest(activeFilters);
      }

      return LicenseManagerApiService.licenseBulkRemind(subscription.uuid, options);
    };

    try {
      const response = await makeRequest();
      setRequestState({ ...initialRequestState, success: true });
      onSuccess(response);
    } catch (error) {
      logError(error);
      setRequestState({ ...initialRequestState, error });
    }
  }, [
    onSubmit,
    activeFilters,
    emailTemplate,
    remindAllUsers,
    usersToRemind,
    subscription.uuid,
    initialRequestState,
    onSuccess,
    setRequestState,
  ]);

  const handleClose = () => {
    if (!requestState.loading) {
      onClose();
    }
  };

  const getRemindButtonState = () => {
    if (requestState.error) {
      return 'error';
    }
    if (requestState.loading) {
      return 'pending';
    }
    if (requestState.success) {
      return 'complete';
    }
    return 'default';
  };

  return (
    <ModalDialog
      title={title}
      isOpen={isOpen}
      onClose={handleClose}
      hasCloseButton={false}
    >
      <ModalDialog.Header>
        <ModalDialog.Title>
          {title}
        </ModalDialog.Title>
      </ModalDialog.Header>
      <ModalDialog.Body>
        {requestState.error
            && (
            <Alert variant="danger">
              <p>{intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.error.occured'])}</p>
              <p>
               {intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.error.occured.message'])}
                <Hyperlink destination={configuration.ENTERPRISE_SUPPORT_URL}>
                 {intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.error.occured.message.link'])}
                </Hyperlink>
              </p>
            </Alert>
            )}
        <h3 className="h4">{intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates'])}</h3>
        <Form>
          <Form.Group controlId="email-template-greeting">
            <Form.Label>{intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize'])}</Form.Label>
            <Form.Control
              rows={3}
              as="textarea"
              data-hj-suppress
              value={emailTemplate.greeting}
              onChange={(e) => setEmailTemplate({ ...emailTemplate, greeting: e.target.value })}
            />
          </Form.Group>
          <Form.Group controlId="email-template-body">
            <Form.Label>{intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.body'])}</Form.Label>
            <Form.Control
              rows={3}
              as="textarea"
              data-hj-suppress
              value={emailTemplate.body}
              readOnly
            />
          </Form.Group>
          <Form.Group controlId="email-template-closing">
            <Form.Label>{intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.templates.customize.closing'])}</Form.Label>
            <Form.Control
              rows={3}
              as="textarea"
              data-hj-suppress
              value={emailTemplate.closing}
              onChange={(e) => setEmailTemplate({ ...emailTemplate, closing: e.target.value })}
            />
          </Form.Group>
        </Form>

      </ModalDialog.Body>
      <ModalDialog.Footer>
        <ActionRow>
          <ModalDialog.CloseButton variant="tertiary">
            {intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.data.table.actions.remind.modal.close'])}
          </ModalDialog.CloseButton>
          <StatefulButton
            state={getRemindButtonState()}
            variant="primary"
            onClick={handleSubmit}
            disabled={(!remindAllUsers && usersToRemind.length < 1) || isExpired}
            labels={buttonLabels}
            icons={{
              pending: <Spinner animation="border" variant="light" size="sm" />,
            }}
            disabledStates={['pending', 'complete']}
          />
        </ActionRow>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

LicenseManagementRemindModal.defaultProps = {
  remindAllUsers: false,
  totalToRemind: -1,
  contactEmail: null,
  onSubmit: undefined,
};

LicenseManagementRemindModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  /** Function executed after successful remind request resolved */
  onSuccess: PropTypes.func.isRequired,
  /** Function executed when submit button is pressed */
  onSubmit: PropTypes.func,
  subscription: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    expirationDate: PropTypes.string.isRequired,
  }).isRequired,
  usersToRemind: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
    }),
  ).isRequired,
  remindAllUsers: PropTypes.bool,
  totalToRemind: PropTypes.number,
  contactEmail: PropTypes.string,
  activeFilters: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      filter: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
      filterValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  contactEmail: state.portalConfiguration.contactEmail,
});

export default connect(mapStateToProps)(injectIntl(LicenseManagementRemindModal));
