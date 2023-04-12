import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Container } from '@edx/paragon';

import Hero from '../Hero';
import SubscriptionData from './SubscriptionData';
import SubscriptionRoutes from './SubscriptionRoutes';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';


const PAGE_TITLE = 'subs.management.page.title';
const SubscriptionManagementPage = ({ enterpriseId,intl }) => (
  <SubscriptionData enterpriseId={enterpriseId}>
    <Helmet title={intl.formatMessage(messages[PAGE_TITLE])} />
    <Hero title={intl.formatMessage(messages[PAGE_TITLE])} />
    <main role="main" className="manage-subscription">
      <Container className="tab-content" fluid>
        <SubscriptionRoutes />
      </Container>
    </main>
  </SubscriptionData>
);

SubscriptionManagementPage.propTypes = {
  enterpriseId: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  enterpriseId: state.portalConfiguration.enterpriseId,
});

export default connect(mapStateToProps)(injectIntl(SubscriptionManagementPage));
