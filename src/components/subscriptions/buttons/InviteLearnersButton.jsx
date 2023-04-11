import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import InviteLearnersModal from '../../../containers/InviteLearnersModal';
import ActionButtonWithModal from '../../ActionButtonWithModal';
import { SubscriptionDetailContext } from '../SubscriptionDetailContextProvider';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from '../messages';

export const INVITE_LEARNERS_BUTTON_TEXT = 'subs.management.page.tab.manage.learners.sub.details.invite';

const InviteLearnersButton = ({ onSuccess, onClose, disabled,intl }) => {
  const { overview, subscription } = useContext(SubscriptionDetailContext);
  return (
    <ActionButtonWithModal
      buttonLabel={intl.formatMessage(messages[INVITE_LEARNERS_BUTTON_TEXT])}
      buttonClassName="invite-learners-btn"
      variant="primary"
      renderModal={({ closeModal }) => (
        <InviteLearnersModal
          availableSubscriptionCount={overview.unassigned}
          subscriptionUUID={subscription.uuid}
          onSuccess={onSuccess}
          onClose={() => {
            closeModal();
            if (onClose) {
              onClose();
            }
          }}
        />
      )}
      disabled={disabled}
    />
  );
};

InviteLearnersButton.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func,
  disabled: PropTypes.bool,
};

InviteLearnersButton.defaultProps = {
  onClose: null,
  disabled: false,
};

export default (injectIntl(InviteLearnersButton));
