import React from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import {
  ValidationFormGroup, Input, StatefulButton, Icon, Button,
} from '@edx/paragon';
import { camelCaseObject } from '@edx/frontend-platform/utils';
import SFTPDeliveryMethodForm from './SFTPDeliveryMethodForm';
import EmailDeliveryMethodForm from './EmailDeliveryMethodForm';
import SUBMIT_STATES from '../../data/constants/formSubmissions';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from './messages';

//  All the fields in this form that need to be validated can be added here.
const REQUIRED_FIELDS = [
  'hourOfDay',
];
// for the email delivery method
const REQUIRED_EMAIL_FIELDS = [
  ...REQUIRED_FIELDS,
  'emailRaw',
];
// for the sftp delivery mothod
const REQUIRED_SFTP_FIELDS = [
  ...REQUIRED_FIELDS,
  'sftpPort',
  'sftpHostname',
  'sftpUsername',
  'sftpFilePath',
];
const REQUIRED_NEW_SFTP_FEILDS = [
  ...REQUIRED_SFTP_FIELDS,
  'encryptedSftpPassword',
];
const REQUIRED_NEW_EMAIL_FIELDS = [
  ...REQUIRED_EMAIL_FIELDS,
  'encryptedPassword',
];
const MONTHLY_MAX = 31;
const MONTHLY_MIN = 1;

class ReportingConfigForm extends React.Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    frequency: this.props.config ? this.props.config.frequency : 'monthly',
    deliveryMethod: this.props.config ? this.props.config.deliveryMethod : 'email',
    invalidFields: {},
    APIErrors: {},
    active: this.props.config ? this.props.config.active : false,
    submitState: SUBMIT_STATES.DEFAULT,
    intl: this.props.intl,
  };

  /**
   * Validates this form. If the form is invalid, it will return the fields
   * that were invalid. Otherwise, it will return an empty object.
   * @param {FormData} formData
   * @param {[String]} requiredFields
   */
  validateReportingForm = (formData, requiredFields) => {
    const invalidFields = requiredFields
      .filter(field => !formData.get(field))
      .reduce((prevFields, currField) => ({ ...prevFields, [currField]: true }), {});
    return invalidFields;
  };

  /**
   * Handles the state change for when a form field validation onBlur is called. An
   * optional second param can be added to give a specific validation function,
   * otherwise it is just checked to see if it is empty.
   * @param {Event} e
   * @param {Func} validationFunction -> to see and example of this,
   * check the <EmailDeliveryMethodForm />
   */
  handleBlur = (e, validationFunction) => {
    // One special case for email fields
    const field = e.target;
    const error = validationFunction ? validationFunction() : !field.value.length;
    this.setState((state) => ({
      invalidFields: {
        ...state.invalidFields,
        [field.name]: error,
      },
      // Remove the field that changed from APIErrors. It will b validated again on the next API request/
      APIErrors: {
        ...omit(state.APIErrors, [field.name]),
      },
    }));
  };

  handleAPIErrorResponse = (response) => {
    const responseData = response && camelCaseObject(response.data);
    const invalidFields = {};

    if (!isEmpty(responseData)) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(responseData)) {
        [invalidFields[key]] = value;
      }

      this.setState((state) => ({
        APIErrors: {
          ...state.APIErrors,
          ...invalidFields,
        },
      }));
    }
  };

  /**
   * attempt to submit the form data and show any error states or invalid fields.
   * @param {FormData} formData
   * @param {*} config
   */
  handleSubmit = async (formData, config) => {
    await this.setState({ submitState: SUBMIT_STATES.PENDING });
    let requiredFields = [];
    if (formData.get('deliveryMethod') === 'email') {
      requiredFields = config ? [...REQUIRED_EMAIL_FIELDS] : [...REQUIRED_NEW_EMAIL_FIELDS];
      // transform email field to match what the api is looking for
      const emails = formData.get('emailRaw').split('\n');
      emails.forEach(email => formData.append('email[]', email));
    } else {
      // Password field needs to be required only when creating a new configuration
      requiredFields = config ? [...REQUIRED_SFTP_FIELDS] : [...REQUIRED_NEW_SFTP_FEILDS];
    }
    // validate the form
    const invalidFields = this.validateReportingForm(formData, requiredFields);
    // if there are invalid fields, reflect that in the UI
    if (!isEmpty(invalidFields)) {
      this.setState((state) => ({
        invalidFields: {
          ...state.invalidFields,
          ...invalidFields,
        },
        submitState: SUBMIT_STATES.default,
      }));
      return;
    }

    // append the enterprise customer data if editing an already created reporting form
    if (config) {
      formData.append('uuid', config.uuid);
      formData.append('enterprise_customer_id', config.enterpriseCustomer.uuid);
      const err = await this.props.updateConfig(formData, config.uuid);
      if (err) {
        this.setState({ submitState: SUBMIT_STATES.ERROR });
        this.handleAPIErrorResponse(err.response);
        return;
      }
    } else {
      // ...or create a new configuration
      formData.append('enterprise_customer_id', this.props.enterpriseCustomerUuid);
      const err = await this.props.createConfig(formData);
      if (err) {
        this.setState({ submitState: SUBMIT_STATES.ERROR });
        this.handleAPIErrorResponse(err.response);
        return;
      }
    }
    this.setState({ submitState: SUBMIT_STATES.COMPLETE });
  };

  render() {
    const { config, availableCatalogs, reportingConfigTypes, intl } = this.props;
    const {
      frequency,
      invalidFields,
      APIErrors,
      deliveryMethod,
      active,
      submitState,
    } = this.state;
    const selectedCatalogs = (config?.enterpriseCustomerCatalogs || []).map(item => item.uuid);
    const dataTypesOptions = reportingConfigTypes.dataType.map((item, index) => ({
      key: index, label: item[1], value: item[0],
    }));
    const dataTypesOptionsValues = dataTypesOptions.map(item => item.value);
    const selectedDataTypesOption = config ? [{ label: config.dataType, value: config.dataType, hidden: true }] : [];
    return (
      <form className='report-form'
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          this.handleSubmit(formData, config);
        }}
        onChange={() => this.setState({ submitState: SUBMIT_STATES.DEFAULT })}
      >
        <div className="row">
          <div className="col">
            <ValidationFormGroup
              for="active"
            >
              <label htmlFor="active">{intl.formatMessage(messages['tab.report.config.add.config.form.active'])}</label>
              <Input
                type="checkbox"
                id="active"
                name="active"
                className="ml-3"
                checked={active}
                onChange={() => this.setState(prevState => ({ active: !prevState.active }))}
              />
            </ValidationFormGroup>
          </div>
        </div>
        <div className="row">

          <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
            <ValidationFormGroup
              for="dataType"
              helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.type.help'])}
            >
              <label htmlFor="dataType">{intl.formatMessage(messages['tab.report.config.add.config.form.data.type'])}</label>
              <Input
                type="select"
                id="dataType"
                name="dataType"
                defaultValue={config ? config.dataType : reportingConfigTypes.dataType[0][0]}
                disabled={config && !dataTypesOptionsValues.includes(config.dataType)}
                options={[...dataTypesOptions, ...selectedDataTypesOption]}
              />
            </ValidationFormGroup>
          </div>

          <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
            <ValidationFormGroup
              for="deliveryMethod"
              helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.delivery.help'])}
            >
              <label htmlFor="deliveryMethod">{intl.formatMessage(messages['tab.report.config.add.config.form.data.delivery'])}</label>
              <Input
                type="select"
                id="deliveryMethod"
                name="deliveryMethod"
                defaultValue={config ? config.deliveryMethod : reportingConfigTypes.deliveryMethod[0][0]}
                options={reportingConfigTypes.deliveryMethod.map(item => ({ label: item[1], value: item[0] }))}
                onChange={e => this.setState({ deliveryMethod: e.target.value })}
              />
            </ValidationFormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
            <ValidationFormGroup
              for="reportType"
              helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.report.help'])}
            >
              <label htmlFor="reportType">{intl.formatMessage(messages['tab.report.config.add.config.form.data.report'])}</label>
              <Input
                type="select"
                id="reportType"
                name="reportType"
                defaultValue={config ? config.reportType : reportingConfigTypes.reportType[0][0]}
                options={reportingConfigTypes.reportType.map(item => ({ label: item[1], value: item[0] }))}
              />
            </ValidationFormGroup>
          </div>
          <div className="col col-lg-6 col-md-6 col-sm-12 col-12">

            <ValidationFormGroup
              for="frequency"
              helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.frequency.help'])}
            >
              <label htmlFor="frequency">{intl.formatMessage(messages['tab.report.config.add.config.form.data.frequency'])}</label>
              <Input
                type="select"
                id="frequency"
                name="frequency"
                defaultValue={frequency}
                options={reportingConfigTypes.frequency.map(item => ({ label: item[1], value: item[0] }))}
                onChange={e => this.setState({ frequency: e.target.value })}
              />
            </ValidationFormGroup>
          </div>

        </div>

        <div className="row">
          <div className="col col-lg-4 col-md-4 col-sm-12 col-12">
            <ValidationFormGroup
              for="dayOfMonth"
              helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.day.month.help'])}
              invalid={frequency === 'monthly' && invalidFields.dayOfMonth}
            >
              <label htmlFor="dayOfMonth">{intl.formatMessage(messages['tab.report.config.add.config.form.data.day.month'])}</label>
              <Input
                type="number"
                max={MONTHLY_MAX}
                min={MONTHLY_MIN}
                disabled={!(frequency === 'monthly')}
                id="dayOfMonth"
                name="dayOfMonth"
                defaultValue={config ? config.dayOfMonth : 1}
                onBlur={e => this.handleBlur(e)}
              />
            </ValidationFormGroup>
          </div>
          <div className="col col-lg-4 col-md-4 col-sm-12 col-12">
            <ValidationFormGroup
              for="dayOfWeek"
              helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.day.week.help'])}
            >
              <label htmlFor="dayOfWeek">{intl.formatMessage(messages['tab.report.config.add.config.form.data.day.week'])}</label>
              <Input
                type="select"
                id="dayOfWeek"
                name="dayOfWeek"
                disabled={!(frequency === 'weekly')}
                options={reportingConfigTypes.dayOfWeek.map(item => ({ label: item[1], value: item[0] }))}
                defaultValue={config ? config.dayOfWeek : undefined}
              />
            </ValidationFormGroup>
          </div>
          <div className="col col-lg-4 col-md-4 col-sm-12 col-12">
            <ValidationFormGroup
              for="hourOfDay"
              helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.hour.day.help'])}
              invalid={invalidFields.hourOfDay}
              invalidMessage="Required for all frequency types"
            >
              <label htmlFor="hourOfDay">{intl.formatMessage(messages['tab.report.config.add.config.form.data.hour.day'])}</label>
              <Input
                type="number"
                id="hourOfDay"
                name="hourOfDay"
                defaultValue={config ? config.hourOfDay : undefined}
                onBlur={e => this.handleBlur(e)}
              />
            </ValidationFormGroup>
          </div>
        </div>
        <div className="row">
          <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
            <ValidationFormGroup
              for="pgpEncryptionKey"
              helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.pgp.help'])}
              invalid={!!APIErrors.pgpEncryptionKey}
              invalidMessage={APIErrors.pgpEncryptionKey}
            >
              <label htmlFor="pgpEncryptionKey">{intl.formatMessage(messages['tab.report.config.add.config.form.data.pgp'])}</label>
              <Input
                type="textarea"
                id="pgpEncryptionKey"
                name="pgpEncryptionKey"
                defaultValue={config ? config.pgpEncryptionKey : undefined}
                data-hj-suppress
                onBlur={e => this.handleBlur(e)}
              />
            </ValidationFormGroup>
          </div>

        </div>
        {deliveryMethod === 'email' && (
          <EmailDeliveryMethodForm
            config={config}
            invalidFields={invalidFields}
            handleBlur={this.handleBlur}
          />
        )}
        {deliveryMethod === 'sftp' && (
          <SFTPDeliveryMethodForm
            config={config}
            invalidFields={invalidFields}
            handleBlur={this.handleBlur}
          />
        )}
        <div className='row'>
          <div className="col col-12">
            <ValidationFormGroup
              for="enterpriseCustomerCatalogs"
              helpText={intl.formatMessage(messages['tab.report.config.add.config.form.data.enterprise.catalog.help'])}
            >
              <label htmlFor="enterpriseCustomerCatalogs">{intl.formatMessage(messages['tab.report.config.add.config.form.data.enterprise.catalog'])}</label>
              <Input
                type="select"
                id="enterpriseCustomerCatalogs"
                name="enterpriseCustomerCatalogUuids"
                multiple
                defaultValue={selectedCatalogs}
                options={
                  availableCatalogs && availableCatalogs.map(item => ({
                    value: item.uuid,

                    label: intl.formatMessage(messages['tab.report.config.add.config.form.data.enterprise.catalog.label'], { title: item.title, uuid: item.uuid }),
                  }))
                }
              />
            </ValidationFormGroup>
          </div>
        </div>
        <div className="row justify-content-between align-items-center ">
          <div className="col col-lg-4 col-md-6 col-sm-12 col-12">

              <StatefulButton
                state={submitState}
                type="submit"
                id="submitButton"
                labels={{
                  default: intl.formatMessage(messages['tab.report.config.add.config.form.data.btn.submit']),
                  pending: intl.formatMessage(messages['tab.report.config.add.config.form.data.btn.saving']),
                  complete: intl.formatMessage(messages['tab.report.config.add.config.form.data.btn.complete']),
                  error: intl.formatMessage(messages['tab.report.config.add.config.form.data.btn.error']),
                }}
                icons={{
                  default: <Icon className="fa fa-download" />,
                  pending: <Icon className="fa fa-spinner fa-spin" />,
                  complete: <Icon className="fa fa-check" />,
                  error: <Icon className="fa fa-times" />,
                }}
                disabledStates={[SUBMIT_STATES.PENDING]}
                className="submit-btn w-100"
                variant="primary"
              />

          </div>
          <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
            {config && (
              <Button
                className="btn-outline-danger  mr-3"
                onClick={() => this.props.deleteConfig(config.uuid)}
              >
                <Icon className="fa fa-times danger" /> {intl.formatMessage(messages['tab.report.config.add.config.form.data.btn.delete'])}
              </Button>
            )}

          </div>
        </div>
      </form>
    );
  }
}
ReportingConfigForm.defaultProps = {
  config: undefined,
  deleteConfig: undefined,
  updateConfig: undefined,
};

ReportingConfigForm.propTypes = {
  enterpriseCustomerUuid: PropTypes.string.isRequired,
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
    uuid: PropTypes.string,
    enterpriseCustomerCatalogs: PropTypes.arrayOf(PropTypes.shape({
      uuid: PropTypes.string,
      title: PropTypes.string,
    })),
  }),
  availableCatalogs: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    title: PropTypes.string,
  })).isRequired,
  reportingConfigTypes: PropTypes.shape({
    dataType: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    reportType: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    deliveryMethod: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
    dayOfWeek: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]))),
    frequency: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  }).isRequired,
  createConfig: PropTypes.func.isRequired,
  updateConfig: PropTypes.func,
  deleteConfig: PropTypes.func,
};

export default (injectIntl(ReportingConfigForm));
