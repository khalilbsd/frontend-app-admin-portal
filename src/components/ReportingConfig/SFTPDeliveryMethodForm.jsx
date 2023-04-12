import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input, ValidationFormGroup } from '@edx/paragon';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

const SFTPDeliveryMethodForm = ({ invalidFields, config, handleBlur,intl }) => {
  const [checked, setChecked] = useState(false);

  return (
    <>
      <div className="row">
        <div className="col">
          <ValidationFormGroup
            for="sftpHostname"
            helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.sftp.hostname.help'])}
            invalidMessage={intl.formatMessage(messages['tab.report.config.add.config.form.data.sftp.hostname.invalid'])}
            invalid={invalidFields.sftpHostname}
          >
            <label htmlFor="sftpHostname">{intl.formatMessage(messages['tab.report.config.add.config.form.data.sftp.hostname'])}</label>
            <Input
              type="text"
              id="sftpHostname"
              name="sftpHostname"
              defaultValue={config ? config.sftpHostname : undefined}
              onBlur={e => handleBlur(e)}
              data-hj-suppress
            />
          </ValidationFormGroup>
        </div>
        <div className="col col-2">
          <ValidationFormGroup
            for="sftpPort"
            helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.sftp.port.help'])}
            invalid={invalidFields.sftpPort}
            invalidMessage={intl.formatMessage(messages['tab.report.config.add.config.form.data.sftp.port.invalid'])}
          >
            <label htmlFor="sftpPort">{intl.formatMessage(messages['tab.report.config.add.config.form.data.sftp.port'])}</label>
            <Input
              type="number"
              id="sftpPort"
              name="sftpPort"
              defaultValue={config ? config.sftpPort : 22}
              onBlur={e => handleBlur(e)}
            />
          </ValidationFormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <ValidationFormGroup
            for="sftpUsername"
            helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.sftp.username.help'])}
            invalidMessage={intl.formatMessage(messages['tab.report.config.add.config.form.data.sftp.username.invalid'])}
            invalid={invalidFields.sftpUsername}
          >
            <label htmlFor="sftpUsername">{intl.formatMessage(messages['tab.report.config.add.config.form.data.sftp.username'])}</label>
            <Input
              type="text"
              id="sftpUsername"
              name="sftpUsername"
              defaultValue={config ? config.sftpUsername : undefined}
              onBlur={e => handleBlur(e)}
              data-hj-suppress
            />
          </ValidationFormGroup>
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
          <ValidationFormGroup
            for="encryptedSftpPassword"
            helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.sftp.password.help'])}
            invalid={invalidFields.encryptedSftpPassword}
            invalidMessage={intl.formatMessage(messages['tab.report.config.add.config.form.data.sftp.password.invalid'])}
          >
            <label htmlFor="encryptedSftpPassword">{intl.formatMessage(messages['tab.report.config.add.config.form.data.sftp.password'])}</label>
            <Input
              type="password"
              id="encryptedSftpPassword"
              name="encryptedSftpPassword"
              onBlur={e => handleBlur(e)}
              disabled={config && !checked}
              data-hj-suppress
            />
          </ValidationFormGroup>
          <ValidationFormGroup
            for="sftpFilePath"
            helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.sftp.file.path.help'])}
            invalid={invalidFields.sftpFilePath}
            invalidMessage={intl.formatMessage(messages['tab.report.config.add.config.form.data.sftp.file.path.invalid'])}
          >
            <label htmlFor="sftpFilePath">{intl.formatMessage(messages['tab.report.config.add.config.form.data.sftp.file.path'])}</label>
            <Input
              type="text"
              id="sftpFilePath"
              name="sftpFilePath"
              defaultValue={config ? config.sftpFilePath : undefined}
              onBlur={e => handleBlur(e)}
              data-hj-suppress
            />
          </ValidationFormGroup>
        </div>
      </div>
    </>
  );
};

SFTPDeliveryMethodForm.defaultProps = {
  invalidFields: {},
  config: undefined,
};

SFTPDeliveryMethodForm.propTypes = {
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

export default (injectIntl(SFTPDeliveryMethodForm));
