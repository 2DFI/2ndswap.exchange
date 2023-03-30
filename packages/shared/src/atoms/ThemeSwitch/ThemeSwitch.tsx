import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import Tooltip from '@mui/material/Tooltip';
import { useSettings, useUserTracking } from '@transferto/dapp/src/hooks';
import { useTranslation } from 'react-i18next';
import { useDetectDarkModePreference } from '../../../../dapp/src/providers/ThemeProvider';
import { ButtonThemeSwitch } from './ThemeSwitch.style';
export const ThemeSwitch = () => {
  const isDarkMode = useDetectDarkModePreference();
  const { settings, onChangeMode } = useSettings();
  const { t: translate } = useTranslation();
  const i18Path = 'navbar.';
  const { trackEvent } = useUserTracking();

  const handleThemeSwitch = () => {
    onChangeMode(isDarkMode ? 'light' : 'dark');
    trackEvent({
      category: 'theme-switch',
      action: `click-theme-switch`,
      label: isDarkMode ? 'light' : 'dark',
      data: { themeSwitch: `theme-${isDarkMode ? 'light' : 'dark'}` },
    });
  };

  return (
    <Tooltip
      title={
        settings.themeMode === 'light'
          ? translate(`${i18Path}themes.light`)
          : settings.themeMode === 'dark'
          ? translate(`${i18Path}themes.dark`)
          : translate(`${i18Path}themes.auto`)
      }
    >
      <ButtonThemeSwitch
        onClick={() => {
          handleThemeSwitch();
        }}
      >
        {settings.themeMode === 'light' ? (
          <LightModeIcon />
        ) : settings.themeMode === 'dark' ? (
          <NightlightIcon />
        ) : (
          <BrightnessAutoIcon />
        )}
      </ButtonThemeSwitch>
    </Tooltip>
  );
};
