import React from 'react';
import PropTypes from 'prop-types';
import {
  Badge,
} from '@edx/paragon';

import {
  USER_STATUS_BADGE_MAP,
  ACTIVATED,
  ASSIGNED,
  REVOKED,
} from '../../data/constants';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from '../../messages';

const LicenseManagementUserBadge = ({ userStatus,intl }) => {
  const badgeLabel = USER_STATUS_BADGE_MAP[userStatus];

  if (badgeLabel) {
    return <Badge variant={badgeLabel.variant}>{intl.formatMessage(messages[badgeLabel.label])}</Badge>;
  }
  // If userStatus is undefined return no badge
  return null;
};

LicenseManagementUserBadge.propTypes = {
  userStatus: PropTypes.oneOf([ACTIVATED, ASSIGNED, REVOKED]).isRequired,
};

export default (injectIntl(LicenseManagementUserBadge));
