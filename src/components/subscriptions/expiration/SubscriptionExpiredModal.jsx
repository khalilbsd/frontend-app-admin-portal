import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ModalDialog, ActionRow } from '@edx/paragon';

import { configuration } from '../../../config';
import Img from '../../Img';
import { formatTimestamp } from '../../../utils';
import { SubscriptionDetailContext } from '../SubscriptionDetailContextProvider';
import ContactCustomerSupportButton from '../../ContactCustomerSupportButton';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from '../messages';


const SubscriptionExpiredModal = ({
  onClose,
  isOpen,
  onAction,
  intl
}) => {
  const { subscription: { expirationDate } } = useContext(SubscriptionDetailContext);

  const EXPIRED_MODAL_TITLE =intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.expiration.expired.modal.title']);


  return (
    <ModalDialog
      title={EXPIRED_MODAL_TITLE}
      onClose={onClose}
      isOpen={isOpen}
      hasCloseButton={false}
    >
      <ModalDialog.Body>
        <Img className="w-25 my-5 mx-auto d-block" src={configuration.LOGO_URL} alt="edX logo" />
        <p>
          {intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.expiration.exprired.modal.message'],{expirationDate:formatTimestamp({ timestamp: expirationDate })})}

        </p>
      </ModalDialog.Body>
      <ModalDialog.Footer>
        <ActionRow>
          <ModalDialog.CloseButton variant="tertiary">
            {intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.expiration.modal.dismiss'])}
          </ModalDialog.CloseButton>
          <ContactCustomerSupportButton onClick={onAction} />
        </ActionRow>
      </ModalDialog.Footer>
    </ModalDialog>
  );
};

SubscriptionExpiredModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onAction: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
};

SubscriptionExpiredModal.defaultProps = {
  isOpen: false,
};

export default (injectIntl(SubscriptionExpiredModal));
