import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import {
  Button, Row, Col, Toast,
} from '@edx/paragon';
import { getLocale } from '@edx/frontend-platform/i18n';
import { SubscriptionDetailContext } from './SubscriptionDetailContextProvider';
import InviteLearnersButton from './buttons/InviteLearnersButton';
import { SubscriptionContext } from './SubscriptionData';
import SubscriptionExpirationBanner from './expiration/SubscriptionExpirationBanner';
import { MANAGE_LEARNERS_TAB } from './data/constants';
import messages from './messages';
import { injectIntl } from '@edx/frontend-platform/i18n';

const SubscriptionDetails = ({ enterpriseSlug,intl }) => {
  const { forceRefresh } = useContext(SubscriptionContext);
  const {
    hasMultipleSubscriptions,
    subscription,
    forceRefreshDetailView,
  } = useContext(SubscriptionDetailContext);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const hasLicensesAllocatedOrRevoked = subscription.licenses?.allocated > 0 || subscription.licenses?.revoked > 0;
  const shouldShowInviteLearnersButton = (
    hasLicensesAllocatedOrRevoked && subscription.daysUntilExpiration > 0
  );

  const backToSubscriptionsPath = `/${enterpriseSlug}/admin/subscriptions/${MANAGE_LEARNERS_TAB}`;

  return (
    <>
      {hasMultipleSubscriptions && (
        <Row className="ml-0 mb-3">
          <Link to={backToSubscriptionsPath}>
            <Button variant="outline-primary">
              <FontAwesomeIcon icon={faAngleLeft} className="mr-2" />
                {intl.formatMessage(messages['subs.management.page.tab.manage.learners.sub.back.subs'])}
            </Button>
          </Link>
        </Row>
      )}
      <SubscriptionExpirationBanner isSubscriptionPlanDetails />
      <Row className="mb-4">
        <Col className="mb-3 mb-lg-0">
          <div className="d-flex justify-content-between mb-3">
            <h2>{subscription.title}</h2>
            {shouldShowInviteLearnersButton && (
              <div className="text-md-right">
                <InviteLearnersButton
                  onSuccess={({ numAlreadyAssociated, numSuccessfulAssignments }) => {
                    forceRefresh();
                    forceRefreshDetailView();
                    setToastMessage(intl.formatMessage(messages['subs.management.page.tab.manage.learners.add'],{numAlreadyAssociated,numSuccessfulAssignments}));
                    setShowToast(true);
                  }}
                  disabled={subscription.isLockedForRenewalProcessing}
                />
              </div>
            )}
          </div>
          <p>
            {intl.formatMessage(messages['subs.management.page.tab.manage.learners.sub.details.message'])}
          </p>
          <div className="mt-3 d-flex align-items-center">
            {subscription.priorRenewals[0]?.priorSubscriptionPlanStartDate && (
              <div className="mr-5 sub-detail-card">
                <div className="text-uppercase text-muted">
                  <small>{intl.formatMessage(messages['subs.management.page.tab.manage.learners.sub.details.purchase'])}</small>
                </div>
                <div className="lead">
                  {/* {moment(subscription.priorRenewals[0].priorSubscriptionPlanStartDate).format('MMMM D, YYYY')} */}
                {(new Intl.DateTimeFormat(getLocale())).format(new Date(subscription.priorRenewals[0].priorSubscriptionPlanStartDate))}

                </div>
              </div>
            )}
            <div className="mr-5 sub-detail-card">
              <div className="text-uppercase text-muted">
                <small>{intl.formatMessage(messages['subs.management.page.tab.manage.learners.sub.details.start.date'])}</small>
              </div>
              <div className="lead start-date">
                {/* {moment(subscription.startDate).format('MMMM D, YYYY')} */}
                {(new Intl.DateTimeFormat(getLocale())).format(new Date(subscription.startDate))}
              </div>
            </div>
            <div className="sub-detail-card">
              <div className="text-uppercase text-muted">
                <small>{intl.formatMessage(messages['subs.management.page.tab.manage.learners.sub.details.end.date'])}</small>
              </div>
              <div className="lead end-date">
                {/* {moment(subscription.expirationDate).format('MMMM D, YYYY')} */}
                {(new Intl.DateTimeFormat(getLocale())).format(new Date(subscription.expirationDate))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
      >
        {toastMessage}
      </Toast>
    </>
  );
};

SubscriptionDetails.propTypes = {
  enterpriseSlug: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  enterpriseSlug: state.portalConfiguration.enterpriseSlug,
});

export default connect(mapStateToProps)(injectIntl(SubscriptionDetails));
