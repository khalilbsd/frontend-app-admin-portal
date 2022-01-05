import faker from 'faker';
import moment from 'moment';
import qs from 'query-string';

import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import {
  ACTIVATED,
  ASSIGNED,
  REVOKED,
  PAGE_SIZE,
} from '../../components/subscriptions/data/constants';

import { configuration } from '../../config';

export function createSampleUser(licenseStatus) {
  return {
    userId: faker.random.uuid(),
    emailAddress: faker.internet.email(),
    lastRemindDate: moment(faker.date.past(10)),
    licenseStatus,
  };
}

const users = [
  [...Array(6)].map(() => createSampleUser(ACTIVATED)),
  [...Array(3)].map(() => createSampleUser(ASSIGNED)),
  [...Array(1)].map(() => createSampleUser(REVOKED)),
].flat();

function updateUserLicenseStatus({ userId, status }) {
  const index = users.findIndex(item => item.userId === userId);

  if (index !== -1) {
    users[index] = {
      ...users[index],
      licenseStatus: status,
    };

    return users[index];
  }

  return null;
}

function updateUserRemindTimeStamp({ userId, bulkRemind, lastRemindDate }) {
  if (!bulkRemind) {
    const index = users.findIndex(item => item.userId === userId);
    if (index !== -1) {
      users[index] = {
        ...users[index],
        lastRemindDate,
      };
      return users;
    }
  } else {
    return users.map(user => (user.licenseStatus === ASSIGNED ? { ...user, lastRemindDate } : user));
  }

  return null;
}

/**
 * This function mocks out the response from a non-existant API endpoint. Once the endpoint
 * exists, the contents of this function will use the `apiClient` to make an actual API
 * call to get this data.
 */
export function sendLicenseReminder(options = {}) {
  const { userId, bulkRemind } = options;
  const lastRemindDate = moment();
  const response = updateUserRemindTimeStamp({ userId, bulkRemind, lastRemindDate });

  return Promise.resolve(response);
  // return Promise.reject(new Error('Could not connect to the server'));
}

/**
 * This function mocks out the response from a non-existant API endpoint. Once the endpoint
 * exists, the contents of this function will use the `apiClient` to make an actual API
 * call to get this data.
 */
export function sendLicenseRevoke(options = {}) {
  const { userId } = options;

  updateUserLicenseStatus({ userId, status: REVOKED });

  const updatedUser = users.find(item => item.userId === userId);
  return Promise.resolve(updatedUser);
  // return Promise.reject(new Error('Could not connect to the server'));
}

class LicenseManagerApiService {
  static licenseManagerBaseUrl = `${configuration.LICENSE_MANAGER_BASE_URL}/api/v1`;

  static apiClient = getAuthenticatedHttpClient

  static licenseAssign(options, subscriptionUUID) {
    const url = `${LicenseManagerApiService.licenseManagerBaseUrl}/subscriptions/${subscriptionUUID}/licenses/assign/`;
    return LicenseManagerApiService.apiClient().post(url, options);
  }

  static licenseBulkRemind(subscriptionUUID, options) {
    const url = `${LicenseManagerApiService.licenseManagerBaseUrl}/subscriptions/${subscriptionUUID}/licenses/remind/`;
    return LicenseManagerApiService.apiClient().post(url, options);
  }

  static licenseRemindAll(subscriptionUUID) {
    const url = `${LicenseManagerApiService.licenseManagerBaseUrl}/subscriptions/${subscriptionUUID}/licenses/remind-all/`;
    return LicenseManagerApiService.apiClient().post(url);
  }

  static fetchSubscriptions(options) {
    const queryParams = {
      ...options,
    };

    const url = `${LicenseManagerApiService.licenseManagerBaseUrl}/subscriptions/?${qs.stringify(queryParams)}`;
    return LicenseManagerApiService.apiClient().get(url);
  }

  static fetchSubscriptionUsers(subscriptionUUID, options) {
    const queryParams = {
      page_size: PAGE_SIZE,
      ignore_null_emails: 1,
      ...options,
    };

    const url = `${LicenseManagerApiService.licenseManagerBaseUrl}/subscriptions/${subscriptionUUID}/licenses/?${qs.stringify(queryParams)}`;
    return LicenseManagerApiService.apiClient().get(url);
  }

  static fetchSubscriptionUsersOverview(subscriptionUUID, options) {
    const queryParams = {
      ignore_null_emails: 1,
      ...options,
    };

    const url = `${LicenseManagerApiService.licenseManagerBaseUrl}/subscriptions/${subscriptionUUID}/licenses/overview/?${qs.stringify(queryParams)}`;
    return LicenseManagerApiService.apiClient().get(url);
  }

  static fetchSubscriptionLicenseDataCsv(subscriptionUUID) {
    const url = `${LicenseManagerApiService.licenseManagerBaseUrl}/subscriptions/${subscriptionUUID}/licenses/csv/`;
    return LicenseManagerApiService.apiClient().get(url);
  }

  static licenseBulkRevoke(subscriptionUUID, options) {
    const url = `${LicenseManagerApiService.licenseManagerBaseUrl}/subscriptions/${subscriptionUUID}/licenses/bulk-revoke/`;
    return LicenseManagerApiService.apiClient().post(url, options);
  }

  static licenseRevokeAll(subscriptionUUID) {
    const url = `${LicenseManagerApiService.licenseManagerBaseUrl}/subscriptions/${subscriptionUUID}/licenses/revoke-all/`;
    return LicenseManagerApiService.apiClient().post(url);
  }

  static licenseBulkEnroll(enterpriseUuid, subscriptionUUID, options) {
    const url = `${LicenseManagerApiService.licenseManagerBaseUrl}/bulk-license-enrollment/?enterprise_customer_uuid=${enterpriseUuid}&subscription_uuid=${subscriptionUUID}`;
    return LicenseManagerApiService.apiClient().post(url, options);
  }

  static fetchBulkEnrollmentJob(enterpriseUuid, bulkEnrollmentJobUuid, options) {
    const queryParams = new URLSearchParams();
    queryParams.append('enterprise_customer_uuid', enterpriseUuid);
    queryParams.append('bulk_enrollment_job_uuid', bulkEnrollmentJobUuid);
    const url = `${LicenseManagerApiService.licenseManagerBaseUrl}/bulk-license-enrollment/?${queryParams.toString()}`;
    return LicenseManagerApiService.apiClient().get(url, options);
  }

  static fetchCustomerAgreementData(options) {
    const queryParams = {
      ...options,
    };
    const url = `${LicenseManagerApiService.licenseManagerBaseUrl}/customer-agreement/?${qs.stringify(queryParams)}`;
    return LicenseManagerApiService.apiClient().get(url);
  }
}

export default LicenseManagerApiService;
