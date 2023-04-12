import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, ValidationFormGroup } from '@edx/paragon';
import isEmpty from 'lodash/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

const EmailDeliveryMethodForm = ({ invalidFields, config, handleBlur, intl }) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className="row">
        <div className="col col-lg-6">
          <ValidationFormGroup
            for="email"
            helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.email.help'])}
            invalidMessage={intl.formatMessage(messages['tab.report.config.add.config.form.data.email.required'])}
            invalid={invalidFields.emailRaw}
          >
            <label htmlFor="email">{intl.formatMessage(messages['tab.report.config.add.config.form.data.email'])}</label>
            <Input
              type="textarea"
              id="email"
              name="emailRaw"
              defaultValue={config ? config.email.join('\n') : undefined}
              onBlur={e => handleBlur(e, () => {
                const rows = e.target.value.split('\n');
                const emails = rows.filter(email => !isEmail(email));
                return !isEmpty(emails);
              })}
              data-hj-suppress
            />
          </ValidationFormGroup>
              </div>
              <div className="col col-lg-6">
          <ValidationFormGroup
            for="encryptedPassword"
            helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.password.help'])}
            invalid={invalidFields.encryptedPassword}
            invalidMessage={intl.formatMessage(messages['tab.report.config.add.config.form.data.password.invalid'])}
          >
            <label htmlFor="encryptedPassword">{intl.formatMessage(messages['tab.report.config.add.config.form.data.password'])}</label>
            <Input
              type="password"
              id="encryptedPassword"
              name="encryptedPassword"
              disabled={config && !checked}
              onBlur={e => handleBlur(e)}
              data-hj-suppress
            />
          </ValidationFormGroup>
        </div>

      </div>
      <div className="row">
        <div className='col col-lg-6'>
          {config && (
            <div className="form-group">
              <label htmlFor="changePassword">{intl.formatMessage(messages['tab.report.config.add.config.form.data.change.password'])}</label>
              <Input
                type="checkbox"
                id="changePassword"
                className="ml-3"
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            </div>
          )}
        </div>

      </div>

    </>
  );
};

EmailDeliveryMethodForm.defaultProps = {
  invalidFields: {},
  config: undefined,
};

EmailDeliveryMethodForm.propTypes = {
  //  this can be dynamic, and could be empty. Based on the input fields of the form.
  invalidFields: PropTypes.objectOf(PropTypes.bool),
  handleBlur: PropTypes.func.isRequired,
  config: PropTypes.shape({
    active: PropTypes.bool,
    dataType: PropTypes.string,
    dayOfMonth: PropTypes.number,
    dayOfWeek: PropTypes.number,
    deliveryMethod: PropTypes.string,
    email: PropTypes.arrayOf(PropTypes.string),
    frequency: PropTypes.string,
    hourOfDay: PropTypes.number,
    reportType: PropTypes.string,
    sftpFilePath: PropTypes.string,
    sftpHostname: PropTypes.string,
    sftpPort: PropTypes.number,
    sftpUsername: PropTypes.string,
    pgpEncryptionKey: PropTypes.string,
  }),
};

export default (injectIntl(EmailDeliveryMethodForm));
