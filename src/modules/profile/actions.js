import {
    SET_SELECTED_EDIT,
    TOGGLE_SETTING_SWITCH,
    ADD_ADDRESS,
    REMOVE_ADDRESS,
    SET_PAYMENT_TYPE,
    SET_ACCOUNT_TYPE,

    TOGGLE_ACCOUNT_TYPE,
    TOGGLE_PAYMENT_TYPE,
    TOGGLE_WALLET_ID_SHOW,
    SET_FORM_PROFILE_IMAGE,
    CLEAR_PROFILE_UPDATE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    CREATE_ADDRESS_REQUEST,
    CREATE_ADDRESS_SUCCESS,
    SET_CREATE_ADDRESS,
    RECEIVED_ADDRESSES,
    GET_ADDRESSES,
    UPDATE_ADDRESS,
    ADDRESS_UPDATED,
    CLEAR_UPDATE_ADDRESS,
    ADDRESS_REMOVED,
    GET_PROFILE_REQUEST,
    RECEIVED_PROFILE_REQUEST,
    SET_NEW_PASSWORD,
    PASSWORD_CHANGED,
    CHANGE_USER_NOTIFICATIONS,
    USER_NOTIFICATIONS_CHANGED,
    UPDATE_PROFILE_FAILED,
    EDIT_ADDRESS_LOCATION,
    CHANGE_USER_CONTACT
} from './constants';

import {API_URL, checkHttpStatus} from '../../utility/';
import {setUser, getAndSetUserProfile, getWalletName} from '../authentication/';
import {Actions} from 'react-native-router-flux';

export function setSelectedEditProp(value) {
    return {
        payload: value,
        type: SET_SELECTED_EDIT
    };
}

export function editAddressLocation(location) {
    return {
        type: EDIT_ADDRESS_LOCATION,
        payload: location
    };
}

export function toggleSettingSwitchOne(bool) {
    return {
        payload: {settingOne: bool},
        type: TOGGLE_SETTING_SWITCH
    };
}

export function toggleSettingSwitchTwo(bool) {
    return {
        payload: {settingTwo: bool},
        type: TOGGLE_SETTING_SWITCH
    };
}

export function addAddress(address) {
    return {
        payload: address,
        type: ADD_ADDRESS
    };
}

export function setPaymentType(type) {
    return {
        payload: type,
        type: SET_PAYMENT_TYPE
    };
}




export function setAccountType(type) {
    return {
        payload: type,
        type: SET_ACCOUNT_TYPE
    };
}

export function toggleAccountType(bool) {
    return {
        payload: bool,
        type: TOGGLE_ACCOUNT_TYPE
    };
}

export function togglePaymentType(bool) {
    return {
        payload: bool,
        type: TOGGLE_PAYMENT_TYPE
    };
}

export function toggleWalletIdShow(bool) {
    return {
        payload: bool,
        type: TOGGLE_WALLET_ID_SHOW
    };
}

export function setFormProfileImage(base64) {
    return {
        payload: base64,
        type: SET_FORM_PROFILE_IMAGE
    };
}

export function clearProfileUpdate() {
    return {
        type: CLEAR_PROFILE_UPDATE
    };
}

// UPDATE
export function updateProfileRequest() {
    return {
        type: UPDATE_PROFILE_REQUEST,
        loading: true
    };
}

export function updateProfileSuccess() {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        loading: false
    };
}

export function updateProfileFailed() {
    return {
        type: UPDATE_PROFILE_FAILED,
        loading: false
    };
}

export function updateProfileRedirect() {
    return function (dispatch) {
        dispatch(clearProfileUpdate());
        Actions.pop();
    };
}



export function updateProfile(profile, profile_id, token) {
    return function (dispatch) {

        dispatch(updateProfileRequest());

        return fetch(`${API_URL}/profiles/${profile_id}/update`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profile)
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .then((response) => {
                try {
                    dispatch(setUser(response.user));
                    dispatch(getAndSetUserProfile(response.user));
                    dispatch(getWalletName(response.user.user_id, token));
                    dispatch(updateProfileRedirect());
                    dispatch(updateProfileSuccess());
                } catch (error) {
                    console.log('updateProfile', error);
                }
            })
            .catch((error) => {
                error.response.json().then((errorObject) => {
                    console.log('updateProfile', errorObject);
                });
            });
    };
}

// CREATE ADDRESS
export function setCreateAddress(address) {
    return {
        type: SET_CREATE_ADDRESS,
        payload: address
    };
}

export function createdAddressRedirect() {
    return function (dispatch) {
        dispatch(clearAddressUpdate());
        Actions.pop();
    };
}

export function createAddressRequest() {
    return {
        type: CREATE_ADDRESS_REQUEST,
        loading: true
    };
}

export function createNewAddress(address, token) {
    return function (dispatch) {

        dispatch(createAddressRequest());

        return fetch(`${API_URL}/addresses/store`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(address)
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .then(response => {
                try {
                    dispatch(addAddress(response.address));
                    dispatch(createAddressSuccess());
                    dispatch(createdAddressRedirect());
                } catch (e) {
                    console.log('error', e);
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
}

export function createAddressSuccess() {
    return {
        type: CREATE_ADDRESS_SUCCESS,
        loading: false
    };
}

// FETCH ADDRESS
export function getAddresses() {
    return {
        type: GET_ADDRESSES
    };
}

export function fetchAddresses(profile_id, token) {
    return function (dispatch) {

        dispatch(getAddresses());

        return fetch(`${API_URL}/addresses/by-profile/${profile_id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .then(response => {
                try {
                    dispatch(receivedAddresses(response.addresses));
                } catch (e) {
                    console.log('error', e);
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
}

export function receivedAddresses(addresses) {
    return {
        type: RECEIVED_ADDRESSES,
        payload: addresses
    };
}

// UPDATE ADDRESS
export function clearAddressUpdate() {
    return {
        type: CLEAR_UPDATE_ADDRESS
    };
}

export function updateAddressRequest() {
    return {
        type: UPDATE_ADDRESS,
        loading: true
    };
}

export function updateAddress(address, token) {
    return function (dispatch) {

        dispatch(updateAddressRequest());

        return fetch(`${API_URL}/addresses/${address.address_id}/update`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(address)
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .then(response => {
                try {
                    dispatch(addressUpdated(response.address));
                    dispatch(updateAddressRedirect());
                } catch (e) {
                    console.log('error', e);
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
}

export function addressUpdated(address) {
    return {
        type: ADDRESS_UPDATED,
        payload: address,
        loading: false
    };
}

export function updateAddressRedirect() {
    return function (dispatch) {
        dispatch(clearAddressUpdate());
        Actions.pop();
    };
}

// DELETE ADDRESS
export function removeAddressRequest() {
    return {
        type: REMOVE_ADDRESS
    };
}

export function addressRemoved(address) {
    return {
        type: ADDRESS_REMOVED,
        payload: address
    };
}

export function removeAddress(address, token) {
    return function (dispatch) {

        dispatch(removeAddressRequest());
        dispatch(addressRemoved(address.address_id));

        return fetch(`${API_URL}/addresses/${address.address_id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(address)
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .then((response) => {
                try {

                } catch (error) {
                    console.log('error', error);
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
}

export function getProfileRequest() {
    return {
        type: GET_PROFILE_REQUEST
    };
}

export function receivedProfileRequest(addresses) {
    return {
        type: RECEIVED_PROFILE_REQUEST,
        payload: addresses
    };
}

export function fetchProfile(profile_id, token, callback = () => {
}) {
    return function (dispatch) {

        dispatch(getProfileRequest());

        return fetch(`${API_URL}/profiles/${profile_id}/all`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .then((response) => {
                try {
                    dispatch(receivedProfileRequest(response.addresses));
                    callback(response.addresses);
                } catch (error) {
                    console.log('error', error);
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
}

export function setNewPassword() {
    return {
        type: SET_NEW_PASSWORD,
        loading: true
    };
}

export function passwordChanged() {
    Actions.pop();

    return {
        type: PASSWORD_CHANGED,
        loading: false
    };
}

export function changePassword(password, token) {
    console.log('change le pass');
    return function (dispatch) {

        dispatch(setNewPassword());

        return fetch(`${API_URL}/authentication/change-password`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(password)
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .then((response) => {
                try {
                    dispatch(passwordChanged());
                } catch (error) {
                    console.log('error', error);
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
}

export function changeUserNotifications(notifications) {
    return {
        type: CHANGE_USER_NOTIFICATIONS,
        payload: notifications
    };
}

export function userNotificationsChanged() {
    return {
        type: USER_NOTIFICATIONS_CHANGED
    };
}

export function setUserNotifications(notifications, token) {
    return function (dispatch) {
        dispatch(changeUserNotifications(notifications));

        return fetch(`${API_URL}/settings/update`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(notifications)
        })
            .then(checkHttpStatus)
            .then((response) => response.json())
            .then((response) => {
                try {
                    dispatch(userNotificationsChanged());
                } catch (error) {
                    console.log('error', error);
                }
            })
            .catch((error) => {
                console.log('error', error);
            });
    };
}

export function changeUserContact(value) {
    return {
        type: CHANGE_USER_CONTACT,
        payload: value
    }
}