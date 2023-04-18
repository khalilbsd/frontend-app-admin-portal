import React, { useContext, useState } from 'react';
import { Card, Toast } from '@edx/paragon';
import InviteLearnersButton from './buttons/InviteLearnersButton';
import { SubscriptionContext } from './SubscriptionData';
import { SubscriptionDetailContext } from './SubscriptionDetailContextProvider';
import messages from './messages';
import { injectIntl } from '@edx/frontend-platform/i18n';

const SubscriptionZeroStateMessage = ({intl}) => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const { forceRefresh } = useContext(SubscriptionContext);
  const {
    subscription,
    forceRefreshDetailView,
  } = useContext(SubscriptionDetailContext);
  const isSubscriptionExpired = subscription.daysUntilExpiration <= 0;

  return (
    <>
      <Card className="mb-4">
        <Card.Section className="text-center">
          <h2>{intl.formatMessage(messages['subs.management.page.tab.manage.learners.sub.details.zero.get.started'])}</h2>
          <p className="py-2 lead">
           {intl.formatMessage(messages['subs.management.page.tab.manage.learners.sub.details.zero.get.started.message'])}
          </p>
          <InviteLearnersButton
            onSuccess={({ numSuccessfulAssignments }) => {
              forceRefresh();
              forceRefreshDetailView();
              setToastMessage(intl.formatMessage(messages['subs.management.page.tab.manage.learners.sub.details.zero.get.started.add.success'],{numSuccessfulAssignments}));
              setShowToast(true);
            }}
            disabled={isSubscriptionExpired}
          />
        </Card.Section>
      </Card>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
      >
        {toastMessage}
      </Toast>
    </>
  );
};

export default (injectIntl(SubscriptionZeroStateMessage));
