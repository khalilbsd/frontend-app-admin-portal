import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Alert, Button, CardGrid, Dropzone, Image, Toast, useToggle,
} from '@edx/paragon';
import { Info } from '@edx/paragon/icons';

import InfoHover from '../../InfoHover';
import LmsApiService from '../../../data/services/LmsApiService';
import ThemeCard from './ThemeCard';
import CustomThemeModal from './CustomThemeModal';
import {
  ACUMEN_THEME, CAMBRIDGE_THEME, CUSTOM_THEME_LABEL, IMPACT_THEME, PIONEER_THEME, SAGE_THEME, SCHOLAR_THEME,
} from '../data/constants';
import { injectIntl } from '@edx/frontend-platform/i18n';
import messages from '../messages';

 const SettingsAppearanceTab = ({
  enterpriseId, enterpriseBranding, updatePortalConfiguration,intl
}) => {
  const logoMessage = intl.formatMessage(messages['tab.settings.tabs.labels.appearance.customize.logo.placeholder.message']);
  const themeMessage = intl.formatMessage(messages['tab.settings.tabs.labels.appearance.theme.message']);
  const [configChangeSuccess, setConfigChangeSuccess] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(undefined);
  const [customModalIsOpen, openCustomModal, closeCustomModal] = useToggle(false);
  const curatedThemes = [ACUMEN_THEME, CAMBRIDGE_THEME, IMPACT_THEME, PIONEER_THEME, SAGE_THEME, SCHOLAR_THEME];

  function getStartingTheme() {
    for (let i = 0; i < curatedThemes.length; i++) {
      if (curatedThemes[i].button === enterpriseBranding.primary_color
        && curatedThemes[i].banner === enterpriseBranding.secondary_color
        && curatedThemes[i].accent === enterpriseBranding.tertiary_color) {
        return [curatedThemes[i], null];
      }
    }
    const CUSTOM_THEME = {
      title: intl.formatMessage(messages[CUSTOM_THEME_LABEL]),
      button: enterpriseBranding.primary_color,
      banner: enterpriseBranding.secondary_color,
      accent: enterpriseBranding.tertiary_color,
    };
    return [CUSTOM_THEME, CUSTOM_THEME];
  }

  // this variable is [selected , null] if the user has not created a custom
  // theme and it is [selectedTheme, [customName, #primary, #secondary, #tertiary]] if they have
  // (they can't be two variables because of rules regarding setting react hooks)
  const [theme, setTheme] = useState(getStartingTheme());

  const handleLogoUpload = async ({
    fileData, handleError,
  }) => {
    try {
      const formData = new FormData();
      formData.append('logo', fileData.get('file'));
      const response = await LmsApiService.updateEnterpriseCustomerBranding(enterpriseId, formData);
      if (response.status === 204) {
        setUploadedFile(fileData.get('file'));
        setConfigChangeSuccess(true);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const saveChanges = () => {
    const sendThemeData = async (formData) => {
      const response = await LmsApiService.updateEnterpriseCustomerBranding(enterpriseId, formData);
      if (response.status === 204) {
        const updatedBranding = {
          logo: uploadedFile || enterpriseBranding.logo,
          primary_color: theme[0].button,
          secondary_color: theme[0].banner,
          tertiary_color: theme[0].accent,
        };
        updatePortalConfiguration({ enterpriseBranding: updatedBranding });
        setConfigChangeSuccess(true);
      } else {
        setConfigChangeSuccess(false);
      }
    };
    try {
      const formData = new FormData();
      formData.append('primary_color', theme[0].button);
      formData.append('secondary_color', theme[0].banner);
      formData.append('tertiary_color', theme[0].accent);
      sendThemeData(formData);
    } catch {
      setConfigChangeSuccess(false);
    }
  };
  return (
    <>
      <h2 className="py-2">{intl.formatMessage(messages['tab.settings.tabs.labels.appearance'])}</h2>
      <p>
       {intl.formatMessage(messages['tab.settings.tabs.labels.appearance.customize.logo.message'])}
      </p>
      <Alert
        show={configChangeSuccess === false}
        variant="danger"
        icon={Info}
        onClose={() => setConfigChangeSuccess(null)}
        dismissible
        stacked
      >
        <Alert.Heading>{intl.formatMessage(messages['tab.settings.tabs.labels.appearance.customize.logo.error.sorry'])}</Alert.Heading>
        <p>
         {intl.formatMessage(messages['tab.settings.tabs.labels.appearance.customize.logo.error.message'])}
        </p>
      </Alert>
      {/* <h3 className="py-2">
        {intl.formatMessage(messages['tab.settings.tabs.labels.appearance.customize.logo'])}
        <InfoHover className="" keyName="logo-info-hover" message={logoMessage} />
      </h3>
      {!uploadedFile && (
      <Dropzone
        onProcessUpload={handleLogoUpload}
        errorMessages={{
          invalidType:intl.formatMessage(messages['tab.settings.tabs.labels.appearance.customize.logo.error.type.type']),
          invalidSize:intl.formatMessage(messages['tab.settings.tabs.labels.appearance.customize.logo.error.type.size']),
          multipleDragged: intl.formatMessage(messages['tab.settings.tabs.labels.appearance.customize.logo.error.type.number']),
        }}
        maxSize={512000}
        accept={{
          'image/*': ['.png'],
        }}
      />
      )}
      {uploadedFile && (
      <p className="image-preview">
        <Image
          src={global.URL.createObjectURL(uploadedFile)}
        />
      </p>
      )}

      <Toast
        onClose={() => setConfigChangeSuccess(null)}
        show={configChangeSuccess || false}
      >
       {intl.formatMessage(messages['tab.settings.tabs.labels.appearance.updated.success'])}
      </Toast> */}
      <h3 className="py-2 pt-5">
        {intl.formatMessage(messages['tab.settings.tabs.labels.appearance.theme'])}
        <InfoHover className="" keyName="theme-info-hover" message={themeMessage} />
      </h3>
      <CardGrid
        columnSizes={{
          xs: 6,
          lg: 4,
          xl: 3,
        }}
      >
        <ThemeCard themeVars={SCHOLAR_THEME} theme={theme} setTheme={setTheme} />
        <ThemeCard themeVars={SAGE_THEME} theme={theme} setTheme={setTheme} />
        <ThemeCard themeVars={IMPACT_THEME} theme={theme} setTheme={setTheme} />
        <ThemeCard themeVars={CAMBRIDGE_THEME} theme={theme} setTheme={setTheme} />
        <ThemeCard themeVars={ACUMEN_THEME} theme={theme} setTheme={setTheme} />
        <ThemeCard themeVars={PIONEER_THEME} theme={theme} setTheme={setTheme} />
      </CardGrid>
      <h3 className="py-2 pt-5 mb-2">
        {intl.formatMessage(messages[CUSTOM_THEME_LABEL])}
      </h3>
      {theme[1] === null && (
      <p className="mt-0">
        {intl.formatMessage(messages['tab.settings.tabs.labels.appearance.custom.theme.message'])}
        <Button variant="link" onClick={openCustomModal} className="p-0 pl-1" size="inline">
         {intl.formatMessage(messages['tab.settings.tabs.labels.appearance.custom.theme.btn'])}
        </Button>
      </p>
      )}
      {theme[1] !== null && (
        <ThemeCard className="mt-1" themeVars={theme[1]} theme={theme} setTheme={setTheme} openCustom={openCustomModal} />
      )}
      <CustomThemeModal
        isOpen={customModalIsOpen}
        close={closeCustomModal}
        customColors={theme[1]}
        setTheme={setTheme}
      />
      <Button className="d-flex ml-auto" onClick={saveChanges}>{intl.formatMessage(messages['tab.settings.tabs.labels.appearance.save'])}</Button>
    </>
  );
};

SettingsAppearanceTab.propTypes = {
  enterpriseId: PropTypes.string.isRequired,
  enterpriseBranding: PropTypes.shape({
    logo: PropTypes.string,
    primary_color: PropTypes.string,
    secondary_color: PropTypes.string,
    tertiary_color: PropTypes.string,
  }).isRequired,
  updatePortalConfiguration: PropTypes.func.isRequired,
};

export default (injectIntl(SettingsAppearanceTab));
