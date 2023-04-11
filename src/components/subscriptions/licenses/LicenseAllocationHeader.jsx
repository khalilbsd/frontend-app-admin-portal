import React, { useContext } from 'react';
import { SubscriptionDetailContext } from '../SubscriptionDetailContextProvider';
import { SubsidyRequestsContext } from '../../subsidy-requests';
import NewFeatureAlertBrowseAndRequest from '../../NewFeatureAlertBrowseAndRequest';
import { SUPPORTED_SUBSIDY_TYPES } from '../../../data/constants/subsidyRequests';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from '../messages';

const LicenseAllocationHeader = ({intl}) => {
  const {
    subscription,
  } = useContext(SubscriptionDetailContext);
  const { subsidyRequestConfiguration } = useContext(SubsidyRequestsContext);

  // don't show alert if the enterprise already has subsidy requests enabled
  const isBrowseAndRequestFeatureAlertShown = subsidyRequestConfiguration?.subsidyType
    === SUPPORTED_SUBSIDY_TYPES.license && !subsidyRequestConfiguration?.subsidyRequestsEnabled;

  return (
    <>
      {isBrowseAndRequestFeatureAlertShown && <NewFeatureAlertBrowseAndRequest />}
      <h2 className="mb-2">{intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.allocation'])}</h2>
      <p className="lead resume-license">
        {subscription.licenses?.allocated}
        {intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.allocation.of.nb'])}
        {subscription.licenses?.total} {intl.formatMessage(messages['subs.management.page.tab.manage.learners.license.allocation.of.nb.allocated'])}
      </p>
    </>
  );
};

export default (injectIntl(LicenseAllocationHeader));
