export {default as ProfileOverview} from './components/ProfileOverview';
export {default as Profile} from './components/Profile';
export {default as EditPassword} from './components/EditPassword';
export {default as EditEmail} from './components/EditEmail';
export {default as EditProfile} from './components/EditProfile';
export {default as Addresses} from './components/Addresses';
export {default as EditAdresses} from './components/EditAdresses';
export {default as Preferences} from './components/Preferences';

// FORM
export {default as NewPassword} from './forms/NewPassword';
export {default as ProfileInformation} from './forms/ProfileInformation';
export {default as CreateOrEditAdres} from './forms/CreateOrEditAdres';

export {
    SET_SELECTED_EDIT,
    TOGGLE_SETTING_SWITCH,
    REMOVE_ADDRESS,
    ADD_ADDRESS,
    SET_PAYMENT_TYPE,
    SET_ACCOUNT_TYPE,
    TOGGLE_ACCOUNT_TYPE,
    TOGGLE_PAYMENT_TYPE,
    TOGGLE_WALLET_ID_SHOW,
    SET_FORM_PROFILE_IMAGE,
    CLEAR_PROFILE_UPDATE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    CREATE_ADDRESS_SUCCESS,
    CREATE_ADDRESS_REQUEST,
    SET_CREATE_ADDRESS,
    RECEIVED_ADDRESSES,
    GET_ADDRESSES,
    ADDRESS_UPDATED,
    UPDATE_ADDRESS,
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

export {
    setSelectedEditProp,
    toggleSettingSwitchOne,
    toggleSettingSwitchTwo,
    addAddress,
    setFormProfileImage,
    clearProfileUpdate,
    updateProfileRequest,
    updateProfile,
    updateProfileSuccess,
    updateProfileRedirect,
    setCreateAddress,
    createAddressRequest,
    createNewAddress,
    createAddressSuccess,
    getAddresses,
    fetchAddresses,
    receivedAddresses,
    updateAddressRequest,
    addressUpdated,
    updateAddress,
    clearAddressUpdate,
    removeAddressRequest,
    removeAddress,
    addressRemoved,
    createdAddressRedirect,
    getProfileRequest,
    receivedProfileRequest,
    fetchProfile,
    changePassword,
    passwordChanged,
    setNewPassword,
    changeUserNotifications,
    userNotificationsChanged,
    setUserNotifications,
    updateProfileFailed,
    editAddressLocation,
    changeUserContact
} from './actions';
