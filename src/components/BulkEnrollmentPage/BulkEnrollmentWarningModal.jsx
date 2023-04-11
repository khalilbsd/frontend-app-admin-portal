import React from 'react';
import PropTypes from 'prop-types';

import {
  ActionRow, AlertModal, Button, Icon,
} from '@edx/paragon';
import { Error } from '@edx/paragon/icons';

import BulkEnrollButton from './BulkEnrollButton';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

const BulkEnrollWarningModal = ({
  learners, isDialogOpen, onClose, onEnroll,intl
}) => (
  <AlertModal
    title={(
      <div className="d-flex align-items-center">
        <Icon className="enroll-header mr-1" src={Error} />
       {intl.formatMessage(messages['bulk.enrollment.learners.title'])}
      </div>
    )}
    isOpen={isDialogOpen}
    footerNode={(
      <ActionRow>
        <Button variant="link" onClick={onClose} data-testid="CLOSE_BTN_IN_WARNING_MODAL">{intl.formatMessage(messages['bulk.enrollment.learners.message.close'])}</Button>
        <BulkEnrollButton
          learners={learners}
          handleEnrollment={onEnroll}
          buttonType="ENROLL_BTN_IN_WARNING_MODAL"
        />
      </ActionRow>
    )}
  >
 {intl.formatMessage(messages['bulk.enrollment.learners.message'])}
  </AlertModal>
);

BulkEnrollWarningModal.defaultProps = {
  learners: [],
  isDialogOpen: false,
};

BulkEnrollWarningModal.propTypes = {
  isDialogOpen: PropTypes.bool,
  learners: PropTypes.arrayOf(PropTypes.string),
  onEnroll: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default (injectIntl(BulkEnrollWarningModal));
