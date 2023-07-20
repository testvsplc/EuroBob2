import {Dimensions, PermissionsAndroid, Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from "react-native-permissions";

export {
    API_KEY,
    API_URL,
    UTIL_IS_REFRESHING,
    UTIL_SHOW_PICKER,
    UTIL_BLUR_MENU,
    UTIL_IS_SEARCHING,
    UTIL_IS_LOADING,
    UTIL_TOGGLE_MODAL,
    UTIL_APP_INIT,
    UTIL_CHAT_NOTI,
    CLEAR_SERVER_ERRORS,
    SET_ONE_SIGNAL_PLAYER_ID_UTILS
} from './constants';

export {
    startStateRefresh,
    stopStateRefresh,
    togglePicker,
    toggleMenuBlur,
    toggleSearch,
    toggleLoading,
    toggleModal,
    initApp,
    checkHttpStatus,
    setUpPredictionResults,
    setUpSearch,
    setUpRides,
    toggleChatNotification,
    setUpRidesFixed,
    clearServerErrors,
    setOneSignalPlayerIdUtils,
    splitBobName,
    splitBobFirstname
} from './actions';

/**
 * @return {boolean}
 */
export function IsIphone5(width) {
    return width === 320;
}

/**
 * @return {boolean}
 */
export function IsIphone6Plus(width) {
    return width === 414;
}

export function isIphoneX() {
    const dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        ((dimen.height === 812 || dimen.width === 812) || (dimen.height === 896 || dimen.width === 896))
    );
}

export function ifIphoneX(iphoneXStyle, regularStyle) {
    if (isIphoneX()) {
        return iphoneXStyle;
    }
    return regularStyle;
}

export function getStatusBarHeight(safe) {
    return Platform.select({
        ios: ifIphoneX(safe ? 44 : 30, 20),
        android: 0
    });
}

export function getHeaderHeight(safe) {
    return getStatusBarHeight() + 48
}

export function getBottomSpace() {
    return isIphoneX() ? 34 : 0;
}

export async function requestLocationPermission() {
    if (Platform.OS === 'android') {
        try {
            const isGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (!isGranted) {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            }

            return true;
        } catch (err) {
            return false;
        }
    } else {
        try {
            const locationWhenInUse = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)

            if (locationWhenInUse !== 'granted') {
                const isGranted = request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

                return isGranted === RESULTS.GRANTED;
            }

            return true
        } catch (err) {
            return false
        }
    }

}

/**
 * More information: https://emailregex.com/
 * @param {string} email
 */
export const isValidEmail = (email) => {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(email);
}
