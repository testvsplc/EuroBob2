import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Scene, Router, ActionConst, Switch } from 'react-native-router-flux';
import { Text, Platform } from 'react-native';
import * as Sentry from '@sentry/react-native';

// UTILITY
import {
  toggleLoading,
  setOneSignalPlayerIdUtils,
  getHeaderHeight
} from './utility/';

// ONESIGNAL
import OneSignal from 'react-native-onesignal';

// Notification Badges
import BadgeAndroid from 'react-native-android-badge';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

// SENTRY
Sentry.init({
  dsn: 'https://796ebd9d0d744c8eb7ada50ec563509c@sentry.codebridge.nl/15',
  enableNative: false,
  enableNativeNagger: false
});

// MIDDLEWARE
import thunkMiddleware from 'redux-thunk';

const loader = store => next => action => {
  if (action.loading) {
    store.dispatch(toggleLoading(true));

    return next(action);
  }
  if (action.loading === false) {
    store.dispatch(toggleLoading(false));

    return next(action);
  }

  return next(action);
};

// ROOT REDUCER
import reducers from './reducers';

// COMPONENTS
import {
  Welcome,
  About,
  CustomDrawer,
  AuthenticationDrawer,
  GlobalDrawer
} from './components/';
import {
  Register,
  Login,
  RegisterSuccess,
  Terms,
  Privacy,
  ForgotPassword
} from './modules/authentication/';
import { Dashboard } from './modules/dashboard/';
import { ContactOverview } from './modules/contact/';
import {
  ProfileOverview,
  EditEmail,
  EditPassword,
  EditProfile,
  EditAdresses
} from './modules/profile/';
import {
  PlanRide,
  RideComment,
  PriceIndication,
  SearchLocation,
  RidePlanned,
  RideDetail,
  MyRides,
  RideInProgress
} from './modules/rides/';
import { DashboardDemo, PlanRideDemo, LocationsDemo } from './modules/demo/';

// REACT-NATIVE
import { StyleSheet } from 'react-native';

const RouterWithRedux = connect()(Router);
const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  loader
)(createStore);
const store = createStoreWithMiddleware(
  reducers,
  // Add Redux DevTools integration
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const onIdsAvailable = device => {
  store.dispatch(setOneSignalPlayerIdUtils(device.userId));
};

const onNotificationOpened = (message, data, isActive) => {
  const notification = { message: message, data: data, isActive: isActive };
};

OneSignal.init('f9ca1245-958b-4e92-b538-d3fe8e502c72', {
  kOSSettingsKeyAutoPrompt: true
});

OneSignal.addEventListener('ids', onIdsAvailable);
OneSignal.addEventListener('opened', onNotificationOpened);

const styles = StyleSheet.create({
  alternative: {
    backgroundColor: '#FAFAFA',
    paddingTop: getHeaderHeight()
  },
  main: {
    backgroundColor: '#F5C918',
    paddingTop: getHeaderHeight()
  }
});

// reset badge counters
if (Platform.OS === 'android') {
  BadgeAndroid.setBadge(0);
} else if (Platform.OS === 'ios') {
  PushNotificationIOS.setApplicationIconBadgeNumber(0);
}

const Main = () => {
  Text.defaultProps = Text.defaultProps || {};
  Text.defaultProps.allowFontScaling = false;

  return (
    <Provider store={store}>
      <RouterWithRedux>
        <Scene key="app" component={GlobalDrawer}>
          <Scene initial={true} key="welcomeApp">
            <Scene
              initial={true}
              key="welcome"
              component={Welcome}
              title="Welcome"
              sceneStyle={styles.alternative}
            />

            <Scene
              key="signup"
              component={Register}
              title="Maak een account aan"
              sceneStyle={styles.alternative}
            />
            <Scene
              key="login"
              component={Login}
              title="Inloggen bij Euro BOB"
              sceneStyle={styles.alternative}
            />
            <Scene
              key="forgot_password"
              component={ForgotPassword}
              title="Wachtwoord vergeten?"
              sceneStyle={styles.alternative}
            />
            <Scene
              key="terms"
              component={Terms}
              title="Voorwaarden"
              sceneStyle={styles.alternative}
              direction="vertical"
              panHandlers={null}
            />
            <Scene
              key="policy"
              component={Privacy}
              title="Privacy Policy"
              sceneStyle={styles.alternative}
              direction="vertical"
              panHandlers={null}
            />

            <Scene
              key="dashboard_demo"
              component={DashboardDemo}
              title="Dashboard"
              duration={200}
              sceneStyle={styles.main}
            />
            <Scene
              key="planride_demo"
              ride={false}
              component={PlanRideDemo}
              title="Een rit plannen"
              duration={200}
              sceneStyle={styles.alternative}
            />
            <Scene
              key="search_location_demo"
              component={LocationsDemo}
              title="Search"
              duration={200}
              panHandlers={null}
              direction="vertical"
              sceneStyle={styles.alternative}
            />
          </Scene>

          <Scene
            type={ActionConst.RESET}
            key="drawerDashboardApp"
            component={CustomDrawer}
            reviewRide={{}}
            openModal={false}
            open={false}
            duration={1}
          >
            <Scene
              key="switcher"
              component={connect(state => ({
                register: state.authentication.register
              }))(Switch)}
              tabs={true}
              unmountScenes
              selector={props => {
                if (props.register.initialRegister) {
                  return 'signup_complete_wrapper';
                }

                return 'dashboardApp';
              }}
            >
              <Scene key="dashboardApp" duration={200}>
                <Scene
                  key="dashboard"
                  component={Dashboard}
                  title="Dashboard"
                  duration={200}
                  initial={true}
                  sceneStyle={styles.main}
                />

                <Scene
                  key="planride"
                  ride={false}
                  component={PlanRide}
                  title="Een rit plannen"
                  duration={200}
                  sceneStyle={styles.alternative}
                />

                <Scene
                  key="planride_comment"
                  component={RideComment}
                  title="Opmerking toevoegen"
                  duration={200}
                  direction="vertical"
                  sceneStyle={styles.alternative}
                />

                <Scene
                  key="planride_prices"
                  component={PriceIndication}
                  title="Prijsindicatie"
                  duration={200}
                  panHandlers={null}
                  direction="vertical"
                  sceneStyle={styles.alternative}
                />

                <Scene
                  key="search_location"
                  initialValue=""
                  component={SearchLocation}
                  title="Search"
                  duration={200}
                  panHandlers={null}
                  direction="vertical"
                  sceneStyle={styles.alternative}
                />

                <Scene
                  key="ride_detail"
                  component={RideDetail}
                  title="Uw rit"
                  duration={200}
                  direction="vertical"
                  sceneStyle={styles.alternative}
                  panHandlers={null}
                />

                <Scene
                  type={ActionConst.RESET}
                  key="ride_planned"
                  component={RidePlanned}
                  title="Uw rit"
                  duration={1}
                  sceneStyle={styles.main}
                />

                <Scene
                  type={ActionConst.RESET}
                  key="ride_in_progress"
                  component={RideInProgress}
                  title="Uw rit"
                  duration={1}
                  sceneStyle={styles.main}
                />

                <Scene
                  key="my_rides"
                  startHistory={false}
                  component={MyRides}
                  title="Mijn ritten"
                  duration={200}
                  sceneStyle={styles.alternative}
                />

                <Scene
                  key="contact"
                  component={ContactOverview}
                  title="Neem contact op"
                  duration={200}
                  direction="vertical"
                  sceneStyle={styles.alternative}
                />

                <Scene
                  key="profile"
                  component={ProfileOverview}
                  title="Profiel"
                  addresses={false}
                  duration={200}
                  sceneStyle={styles.alternative}
                />

                <Scene
                  key="edit_email"
                  component={EditEmail}
                  title="Email wijzigen"
                  duration={200}
                  sceneStyle={styles.alternative}
                />

                <Scene
                  key="edit_password"
                  component={EditPassword}
                  title="Wachtwoord wijzigen"
                  duration={200}
                  sceneStyle={styles.alternative}
                />

                <Scene
                  key="edit_profile"
                  component={EditProfile}
                  title="Profiel wijzigen"
                  duration={200}
                  sceneStyle={styles.alternative}
                />

                <Scene
                  key="edit_adresses"
                  component={EditAdresses}
                  title="Adres toevoegen"
                  duration={200}
                  sceneStyle={styles.alternative}
                  target_address={false}
                />

                <Scene
                  key="about"
                  component={About}
                  title="About"
                  duration={200}
                  sceneStyle={styles.alternative}
                />
              </Scene>

              <Scene key="signup_complete_wrapper">
                <Scene
                  key="signup_complete"
                  component={RegisterSuccess}
                  title="Registratie gelukt!"
                  duration={200}
                  initial={true}
                  sceneStyle={styles.alternative}
                />

                <Scene
                  key="search_location_register"
                  component={SearchLocation}
                  title="Search"
                  duration={200}
                  panHandlers={null}
                  direction="vertical"
                  sceneStyle={styles.alternative}
                />
              </Scene>
            </Scene>
          </Scene>
        </Scene>
      </RouterWithRedux>
    </Provider>
  );
};

export default Main;
