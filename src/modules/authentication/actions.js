import {
    SET_SELECTED_PROP,
    SET_COUNTRY_CODE,
    REGISTER_SUCCESS,
    REGISTER_REQUEST,
    SET_USER,
    SET_USER_TOKEN,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    LOGOUT_REQUEST,
    REMOVE_TOKEN,
    REGISTER_COMPLETED,
    COMPLETE_REGISTER_REQUEST,
    SET_USER_PROFILE,
    SET_PAYMENT_OPTION,
    SET_USER_AVATAR,
    STORE_USER_PROFILE,
    GET_SET_USER_PROFILE,
    LOGIN_FAILURE,
    SET_WALLETS,
    SET_WALLET_NAME,
    SET_WALLETS_AMOUNT,
    SET_WALLET_ID,
    SET_WALLET_ID_PREFERED,
    USER_IDENTIFIED,
    REGISTER_USER_FAILURE,
    SET_ADDRESS_INFO,
    COMPLETE_REGISTER_REQUEST_ERROR,
    RESET_PASSWORD_BY_EMAIL_REQUEST,
    PASSWORD_RESET_BY_EMAIL,
    SETTING_NEW_ONE_SIGNAL_ID,
    SETTING_NEW_ONE_SIGNAL_ID_ERROR,
    NEW_ONE_SIGNAL_ID_SET
} from './constants';
import { API_URL, checkHttpStatus, initApp } from '../../utility/';

// REACT-NATIVE
import {
    AsyncStorage,
} from 'react-native';
import { Actions, ActionConst } from 'react-native-router-flux';

export function setWalletsAmount(amount) {

    return {
        type: SET_WALLETS_AMOUNT,
        payload: amount,

    }

}

export function setWalletId(id) {
    return {
        payload: id,
        type: SET_WALLET_ID
    };
}

export function setPreferedWalletId(id) {
    return {
        payload: id,
        type: SET_WALLET_ID_PREFERED
    };
}

export function setWallets(wallets, dispatch) {
    var result = 0;
    for(var prop in wallets) {
        if(result === 0){
            indivualwallet = wallets[prop];
            walletid = indivualwallet.id;
            dispatch(setWalletId(walletid));
        }
        result++;
    }






    dispatch(setWalletsAmount(result));
    return {
        type: SET_WALLETS,
        payload: wallets,

    }

}

export function setWalletName(walletname) {
    return {
        type: SET_WALLET_NAME,
        payload: walletname,

    }

}

export function setAddressInfo (location) {
    return {
        type: SET_ADDRESS_INFO,
        payload: location
    };
}

export function setSelected(name) {
    return {
        type: SET_SELECTED_PROP,
        payload: name
    };
}

export function setCountryCode(code) {
    return {
        type: SET_COUNTRY_CODE,
        payload: code
    };
}

export function setPaymentOption(option) {
    return {
        type: SET_PAYMENT_OPTION,
        payload: option
    };
}

export function completeRegisterUserRequest () {
    return {
        type: COMPLETE_REGISTER_REQUEST,
        loading: true
    };
}

export function completeRegisterUserRequestError (validator) {
    return {
        type: COMPLETE_REGISTER_REQUEST_ERROR,
        payload: validator,
        loading: false
    };
}
export function getWallets(user_id, token) {
    return function (dispatch) {


        return fetch(`${API_URL}/wallets/${user_id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .then(response => {
                try {
                    dispatch(setWallets(response.wallets, dispatch));
                } catch (e) {
                    console.log('error completeRegisterUser:', e);
                }
            })
            .catch((error) => {
                error.response.json().then((errorObject) => {
                    console.log('error completeRegisterUser:', errorObject);
                });

            });
    };
}


export function getWalletName(user_id, token) {
    return function (dispatch) {


        return fetch(`${API_URL}/wallets/${user_id}/walletname`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .then(response => {
                try {
                    dispatch(setWalletName(response.name));
                    dispatch(setPreferedWalletId(response.wallet_id));

                } catch (e) {
                    console.log('error completeRegisterUser:', e);
                }
            })
            .catch((error) => {
                error.response.json().then((errorObject) => {
                    console.log('error completeRegisterUser:', errorObject);
                });

            });
    };
}

export function completeRegisterUser(profile, profile_id, token) {
    return function (dispatch) {

        dispatch(completeRegisterUserRequest());

        return fetch(`${API_URL}/profiles/${profile_id}/update`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
            body: JSON.stringify(profile)
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .then(response => {
                try {
                    dispatch(setUser(response.user));
                    dispatch(setUserProfile(profile.type, response.user[`${profile.type}_profile`]));
                    dispatch(userCompletedRegister());
                } catch (e) {
                    console.log('error completeRegisterUser:', e);
                    dispatch(completeRegisterUserRequestError());
                }
            })
            .catch((error) => {
                error.response.json().then((errorObject) => {
                    console.log('error completeRegisterUser:', errorObject);

                    dispatch(completeRegisterUserRequestError(errorObject.validator));
                });

            });
    };
}



export function userCompletedRegister() {
    Actions.drawerDashboardApp();
    return {
        type: REGISTER_COMPLETED,
        payload: false,
        loading: false
    };
}

// PROFILE
export function toggleUserProfile(id, user) {
    return function(dispatch) {
        dispatch(storeUserProfile(id));
        dispatch(setUserProfile(id, user[`${id}_profile`]));
    };
}

export function getAndSetUserProfile(user) {
    return function(dispatch) {
        AsyncStorage.getItem('@ProfileId', (err, id) => {
            if (id !== null) {
                if(user.type !== null) {
                    if (user.type == 'company') {
                        dispatch(setUserProfile('company', user.company_profile));
                    }else{
                        dispatch(setUserProfile('private', user.private_profile));
                    }
                }else{
                    dispatch(setUserProfile(id, user[`${id}_profile`]));
                }
                dispatch(getWallets(user.user_id, user.api_token));
                dispatch(getWalletName(user.user_id, user.api_token));
                dispatch(initApp(true));
                dispatch(loginUserSuccess());
            } else {
                if(user.type !== null) {
                    if (user.type == 'company') {
                        dispatch(setUserProfile('company', user.company_profile));
                    }else{
                        dispatch(setUserProfile('private', user.private_profile));
                    }
                }else{
                    dispatch(setUserProfile('private', user.private_profile));
                }
                dispatch(getWallets(user.user_id, user.api_token));
                dispatch(getWalletName(user.user_id, user.api_token));
                dispatch(initApp(true));
                dispatch(loginUserSuccess());
            }
        });
    };
}

export function storeUserProfile(active_profile) {
    AsyncStorage.setItem('@ProfileId', active_profile);

    return {
        type: STORE_USER_PROFILE,
    };
}

export function setUserProfile(active_profile, profile) {
    return {
        type: SET_USER_PROFILE,
        payload: {
            active_profile: active_profile,
            profile: profile
        }
    };
}

export function setUserAvatar(base64) {
    return {
        type: SET_USER_AVATAR,
        payload: base64
    };
}

// TOKEN
export function setUserToken(token) {
    AsyncStorage.setItem('@ApiToken', token);

    return {
        type: SET_USER_TOKEN,
        payload: token
    };
}

// LOGIN
export function loginUserRequest () {
    return {
        type: LOGIN_REQUEST,
        loading: true
    };
}

export function loginUser (user, checkOneSignal) {
    return function (dispatch) {

        dispatch(loginUserRequest());

        return fetch(`${API_URL}/authentication/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .catch((error) => {
                console.log("1",error);
                error.response.json().then((errorObject) => {
                    console.log('response failed', errorObject);
                    dispatch(loginUserFailure(errorObject.message));
                });
            })
            .then(response => {
                try {
                    dispatch(setUser(response.user));
                    dispatch(setUserToken(response.user.api_token));
                    dispatch(getAndSetUserProfile(response.user));
                    checkOneSignal(response.user.devices);
                } catch (error) {
                    console.log("2",error);
                    dispatch(loginUserFailure());
                    console.log('error loginUser:', error);
                }
            })
            .catch((error) => {
                console.log("3",error);
                error.response.json().then((errorObject) => {
                    console.log('error status register:', errorObject);

                    dispatch(loginUserFailure(errorObject.message));
                });
            });
    };
}

export function loginUserFailure (errorMessage) {
    return {
        type: LOGIN_FAILURE,
        loading: false,
        payload: {
            message: {login: [errorMessage]}
        }
    };
}

export function loginUserSuccess() {
    Actions.drawerDashboardApp();
    return {
        type: LOGIN_SUCCESS,
        loading: false
    };
}

export function clearUserInfo() {
    return {
        type: USER_IDENTIFIED,
        loading: false
    };
}

// REGISTER
export function registerUserRequest() {
    return {
        type: REGISTER_REQUEST,
        loading: true
    };
}

export function registerUserSuccess () {
    return {
        type: REGISTER_SUCCESS,
        payload: true,
        loading: false
    };
}

export function registerUserSuccessRedirect () {
    return function () {
        Actions.drawerDashboardApp();
    };
}

export function registerUserFailure (errorMessage) {
    return {
        type: REGISTER_USER_FAILURE,
        payload: {
            message: errorMessage
        },
        loading: false
    };
}

export function registerUser (user) {
    return function (dispatch) {

        dispatch(registerUserRequest());

        return fetch(`${API_URL}/authentication/register`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .catch((error) => {
                error.response.json().then((errorObject) => {
                    console.log('response failed', errorObject);
                });
            })
            .then((response) => {
                try {
                    console.log('response register', response);
                    dispatch(setUser(response.user));
                    dispatch(storeUserProfile(user.type));
                    dispatch(setUserProfile(user.type, response.user[`${user.type}_profile`]));
                    dispatch(setUserToken(response.user.api_token));
                    dispatch(registerUserSuccess());
                    dispatch(registerUserSuccessRedirect());
                } catch (error) {
                    dispatch(registerUserFailure('error'));
                }
            })
            .catch((error) => {
                error.response.json().then((errorObject) => {
                    console.log('error status register:', errorObject);

                    dispatch(registerUserFailure(errorObject.validator));
                });
            });
    };
}

// LOGOUT
export function logoutUserRequest () {
    return {
        type: LOGOUT_REQUEST,
        loading: true
    };
}

export function logoutUser (token) {
    return function (dispatch) {

        dispatch(logoutUserRequest());
        dispatch(removeUserToken());

        return fetch(`${API_URL}/authentication/logout`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .then(response => {
                try {
                    dispatch(logoutUserSuccess());
                } catch (e) {
                    console.log('error logoutUser:', e);
                }
            })
            .catch((error) => {
                console.log('error logoutUser:', error);
            });
    };
}

export function logoutUserSuccess () {
    Actions.welcomeApp({type: ActionConst.RESET});
    return {
        type: LOGOUT_SUCCESS,
        loading: false
    };
}

export function removeUserToken () {
    AsyncStorage.removeItem('@ApiToken');
    return {
        type: REMOVE_TOKEN
    };
}

export function userIdentified() {
    return {
        type: USER_IDENTIFIED,
        loading: false
    };
}

export function setUser(user) {
    return {
        type: SET_USER,
        payload: user
    };
}



export function identifyUser(token, checkOneSignal) {
    return function (dispatch) {

        return fetch(`${API_URL}/authentication/identity`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .then((response) => {
                try {
                    dispatch(setUser(response.user));
                    dispatch(getAndSetUserProfile(response.user));
                    dispatch(setUserToken(token));
                    dispatch(userIdentified(token));
                    checkOneSignal(response.user.devices);
                } catch (error) {
                    console.log('error identifyUser:', error.response);
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    AsyncStorage.removeItem('@ApiToken', () => {
                        dispatch(initApp(true));
                        Actions.welcomeApp({type: ActionConst.RESET});
                    });
                }
            });
    };
}

export function resetPasswordByEmailRequest () {
    return {
        type: RESET_PASSWORD_BY_EMAIL_REQUEST,
        loading: true
    };
}

export function passwordResetByEmail (message) {
    return {
        type: PASSWORD_RESET_BY_EMAIL,
        loading: false,
        payload: message
    };
}

export function resetPasswordByEmail (email) {
    return function (dispatch) {
        dispatch(resetPasswordByEmailRequest());

        return fetch(`${API_URL}/password/email`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .then((response) => {
                console.log(response);
                dispatch(passwordResetByEmail(response.message));
            })
            .catch((error) => {
                console.log(error);
            });
    };
}

export function settingNewOneSignalId () {
    return {
        type: SETTING_NEW_ONE_SIGNAL_ID
    };
}

export function settingNewOneSignalIdError () {
    return {
        type: SETTING_NEW_ONE_SIGNAL_ID_ERROR
    };
}

export function newOneSignalIdSet (device) {
    return {
        type: NEW_ONE_SIGNAL_ID_SET,
        payload: device
    };
}

export function setNewOneSignalId (id, player_id, token) {
    return function (dispatch) {

        dispatch(settingNewOneSignalId());

        return fetch(`${API_URL}/devices/${id}/player-id`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Authorization' : `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({one_signal_player_id: player_id})
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .then((response) => {
                console.log('new signal id set!', response);
                dispatch(newOneSignalIdSet(response.device));
            })
            .catch((error) => {
                dispatch(settingNewOneSignalIdError());
            });
    };
}
