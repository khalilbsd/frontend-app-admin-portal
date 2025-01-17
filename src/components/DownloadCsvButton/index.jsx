import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from '@edx/paragon';
import { sendEnterpriseTrackEvent } from '@edx/frontend-enterprise-utils';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from '../Admin/messages';

export const CSV_CLICK_SEGMENT_EVENT_NAME = 'edx.ui.enterprise.admin_portal.download_csv.clicked';

class DownloadCsvButton extends React.Component {
  componentWillUnmount() {
    this.props.clearCsv();
  }

  render() {
    const {
      fetchMethod,
      fetchCsv,
      csvLoading,
      disabled,
      buttonLabel,
      enterpriseId,
      id,
      intl
    } = this.props;
    const downloadButtonIconClasses = csvLoading ? ['fa-spinner', 'fa-spin'] : ['fa-download'];
    return (
      <Button
        variant="outline-primary"
        className="download-btn d-sm-inline float-md-right"
        disabled={disabled || csvLoading}
        onClick={() => {
          fetchCsv(fetchMethod);
          sendEnterpriseTrackEvent(enterpriseId, CSV_CLICK_SEGMENT_EVENT_NAME, {
            csvId: id,
          });
        }}
      >
        <>

          {/* {buttonLabel}  */}
          {intl.formatMessage(messages['tab.progress.report.data.download.report'])}
          <span className='file-type'>.csv</span>
          <Icon className={`fa ml-2 ${downloadButtonIconClasses.join(' ')}`} />
        </>
      </Button>
    );
  }
}

DownloadCsvButton.defaultProps = {
  csvLoading: false,
  fetchMethod: () => {},
  disabled: false,
  buttonLabel: 'Full Report',
};

DownloadCsvButton.propTypes = {
  fetchCsv: PropTypes.func.isRequired,
  fetchMethod: PropTypes.func,
  csvLoading: PropTypes.bool,
  clearCsv: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  buttonLabel: PropTypes.string,
  enterpriseId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default (injectIntl(DownloadCsvButton));
