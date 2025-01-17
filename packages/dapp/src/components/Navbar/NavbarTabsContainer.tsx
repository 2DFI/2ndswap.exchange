import CreditCardIcon from '@mui/icons-material/CreditCard';
import EvStationOutlinedIcon from '@mui/icons-material/EvStationOutlined';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import { useMediaQuery } from '@mui/material';
import { Breakpoint, useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { shallow } from 'zustand/shallow';
import { TrackingActions, TrackingCategories } from '../../const';
import { useUserTracking } from '../../hooks';
import { useSettingsStore } from '../../stores';
import { EventTrackingTools } from '../../types';
import { NavbarTab, NavbarTabs } from './Navbar.style';
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const NavbarTabsContainer = () => {
  const theme = useTheme();
  const { t: translate } = useTranslation();
  const i18Path = 'navbar.';
  const [activeTab, onChangeTab] = useSettingsStore(
    (state) => [state.activeTab, state.onChangeTab],
    shallow,
  );
  const isDesktop = useMediaQuery(theme.breakpoints.up('md' as Breakpoint));
  const { trackEvent } = useUserTracking();
  const isDarkMode = theme.palette.mode === 'dark';
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    onChangeTab(newValue);
  };

  return (
    <NavbarTabs
      value={!!isDesktop ? activeTab : false}
      onChange={handleChange}
      isDarkMode={isDarkMode}
      aria-label="tabs"
      indicatorColor="primary"
    >
      <NavbarTab
        onClick={() => {
          window.history.replaceState(null, document.title, '/swap');
          trackEvent({
            category: TrackingCategories.Navigation,
            action: TrackingActions.SwitchTab,
            label: 'swap',
            data: { tab: 'swap' },
            disableTrackingTool: [EventTrackingTools.arcx],
          });
        }}
        icon={
          <SwapHorizIcon
            sx={{
              marginRight: '6px',
              marginBottom: '0px !important',
              color: !!isDarkMode
                ? theme.palette.white.main
                : theme.palette.black.main,
            }}
          />
        }
        label={translate(`${i18Path}links.swap`)}
        {...a11yProps(0)}
      />
      <NavbarTab
        onClick={() => {
          window.history.replaceState(null, document.title, '/gas');
          trackEvent({
            category: TrackingCategories.Navigation,
            action: TrackingActions.SwitchTab,
            label: 'gas',
            data: { tab: 'gas' },
            disableTrackingTool: [EventTrackingTools.arcx],
          });
        }}
        label={translate(`${i18Path}links.refuel`)}
        icon={
          <EvStationOutlinedIcon
            sx={{
              marginRight: '6px',
              marginBottom: '0px !important',
              color: !!isDarkMode
                ? theme.palette.white.main
                : theme.palette.black.main,
            }}
          />
        }
        {...a11yProps(1)}
      />
      <NavbarTab
        onClick={() => {
          window.history.replaceState(null, document.title, '/buy');
          trackEvent({
            category: TrackingCategories.Navigation,
            action: TrackingActions.SwitchTab,
            label: 'gas',
            data: { tab: 'gas' },
            disableTrackingTool: [EventTrackingTools.arcx],
          });
        }}
        label={translate(`${i18Path}links.buy`)}
        icon={
          <CreditCardIcon
            sx={{
              marginRight: '6px',
              marginBottom: '0px !important',
              color: !!isDarkMode
                ? theme.palette.white.main
                : theme.palette.black.main,
            }}
          />
        }
        {...a11yProps(2)}
      />
    </NavbarTabs>
  );
};

export default NavbarTabsContainer;
