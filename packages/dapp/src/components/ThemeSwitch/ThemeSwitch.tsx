import BrightnessAutoIcon from '@mui/icons-material/BrightnessAuto';
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightIcon from '@mui/icons-material/Nightlight';
import Tooltip from '@mui/material/Tooltip';
import type { SettingsContextProps } from '@transferto/shared/src/types/settings';
import { useTranslation } from 'react-i18next';
import { useUserTracking } from '../../hooks';
import { useDetectDarkModePreference } from '../../providers/ThemeProvider';
import { useSettingsStore } from '../../stores';
import { ButtonThemeSwitch } from './ThemeSwitch.style';
export const ThemeSwitch = () => {
  const isDarkMode = useDetectDarkModePreference();
  const themeMode = useSettingsStore(
    (state: SettingsContextProps) => state.themeMode,
  );
  const onChangeMode = useSettingsStore(
    (state: SettingsContextProps) => state.onChangeMode,
  );
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
        themeMode === 'light'
          ? translate(`${i18Path}themes.light`)
          : themeMode === 'dark'
          ? translate(`${i18Path}themes.dark`)
          : translate(`${i18Path}themes.auto`)
      }
    >
      <ButtonThemeSwitch
        onClick={() => {
          handleThemeSwitch();
        }}
      >
        {themeMode === 'light' ? (
          <LightModeIcon />
        ) : themeMode === 'dark' ? (
          <NightlightIcon />
        ) : (
          <BrightnessAutoIcon />
        )}
      </ButtonThemeSwitch>
    </Tooltip>
  );
};