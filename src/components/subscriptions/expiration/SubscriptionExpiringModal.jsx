import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ActionRow, ModalDialog } from '@edx/paragon';

import { SubscriptionDetailContext } from '../SubscriptionDetailContextProvider';
import { getSubscriptionExpiringCookieName } from '../data/utils';
import ContactCustomerSupportButton from '../../ContactCustomerSupportButton';
import { formatTimestamp } from '../../../utils';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from '../messages';


const SubscriptionExpiringModal = ({
  onClose,
  isOpen,
  expirationThreshold,
  enterpriseId,
  onAction,
  intl
}) => {
  const { subscription: { agreementNetDaysUntilExpiration, expirationDate } } = useContext(SubscriptionDetailContext);

  const EXPIRING_MODAL_TITLE = intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.expiration.expriring.modal.title']);
  const handleClose = () => {
    if (expirationThreshold) {
      const seenCurrentExpirationModalCookieName = getSubscriptionExpiringCookieName({
        expirationThreshold,
        enterpriseId,
      });
      // Mark that the user has seen this range's expiration modal when they close it
      global.localStorage.setItem(seenCurrentExpirationModalCookieName, true);
    }
    onClose();
  };

  return (
    <ModalDialog
      title={EXPIRING_MODAL_TITLE}
      onClose={handleClose}
      isOpen={isOpen}
      hasCloseButton={false}
    >
      <ModalDialog.Header>
        <ModalDialog.Title>
          {intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.expiration.expriring.modal.message'],{agreementNetDaysUntilExpiration})}

        </ModalDialog.Title>
      </ModalDialog.Header>

      <ModalDialog.Body>
        <p>
          {intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.expiration.expriring.on.modal.message'])}
        </p>
        <i>
            {intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.expiration.expriring.on.date.modal.message'],{expirationDate:formatTimestamp({ timestamp: expirationDate })})}

        </i>
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

SubscriptionExpiringModal.propTypes = {
  onClose: PropTypes.func.isRequired,
  enterpriseId: PropTypes.string.isRequired,
  onAction: PropTypes.func.isRequired,
  isOpen: PropTypes.bool,
  expirationThreshold: PropTypes.number,
};

SubscriptionExpiringModal.defaultProps = {
  isOpen: false,
  expirationThreshold: null,
};

export default (injectIntl(SubscriptionExpiringModal));
