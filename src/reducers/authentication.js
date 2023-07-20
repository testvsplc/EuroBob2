import { SET_COUNTRY_CODE, SET_SELECTED_PROP, SET_USER, SET_USER_TOKEN, SET_WALLET_NAME, SET_WALLETS, SET_WALLET_ID, SET_WALLET_ID_PREFERED, SET_WALLETS_AMOUNT, REGISTER_SUCCESS, REGISTER_COMPLETED, SET_USER_PROFILE, SET_PAYMENT_OPTION, SET_USER_AVATAR, LOGIN_FAILURE, LOGOUT_SUCCESS, SET_ADDRESS_INFO, PASSWORD_RESET_BY_EMAIL, NEW_ONE_SIGNAL_ID_SET } from '../modules/authentication/';
import { CHANGE_USER_NOTIFICATIONS } from '../modules/profile/';

const initialState = {
    register: {
        selectedProperty: 'private',
        countryCode: '+31',
        payment: 'pin',
        initialRegister: false,
        address: {
            zipcode: '',
            address: '',
            place: '',
            lat: '',
            lon: ''
        }
    },
    login: {},
    formErrors: [],
    user: {
        wallet_name: '',
        wallet_id: 0,
        wallet_id_prefered: 0,
        wallets: '',
        walletsamount: 0,
        api_token: '',
        email: '',
        name: '',
        type: 'private',
        active_profile: 'private_profile',
        profile_image: '',
        push_notification: '',
        devices: [],
        slack_channel: '',
        slack_last_read_message: null,
        slack_username: '',
        user_id: null,
        company_profile: {
            address: '',
            company_id: null,
            phone: '',
            place: '',
            prefered_payment: '',
            profile_id: null,
            user_id: null,
            zipcode: ''
        },
        private_profile: {
            address: '',
            company_id: null,
            phone: '',
            place: '',
            prefered_payment: '',
            profile_id: null,
            user_id: null,
            zipcode: ''
        }
    },
    emailMessage: ''
};

/**
 * Returns new state based on action.
 * @param  {object} state  Global state.
 * @param  {object} action Defines what part of state to change.
 * @return {object}        Returns new state.
 */
export default function authentication (state = initialState, action) {
    switch (action.type) {
    case SET_COUNTRY_CODE:
        return Object.assign({}, state, {register: { ...state.register, countryCode: action.payload }});
        break;

    case SET_SELECTED_PROP:
        return Object.assign({}, state, {register: { ...state.register, selectedProperty: action.payload }});
        break;
    case SET_PAYMENT_OPTION:
        return Object.assign({}, state, {register: { ...state.register, payment: action.payload }});
        break;
    case SET_USER_AVATAR:
        return Object.assign({}, state, {user: { ...state.user, profile_image: action.payload }});
        break;
    case SET_USER:
        return Object.assign({}, state, {user: {...state.user, ...action.payload}});
        break;
    case SET_USER_PROFILE:
        return Object.assign({}, state, {user: { ...state.user, active_profile: `${action.payload.active_profile}_profile`, type: action.payload.active_profile }});
        break;
    case SET_WALLETS:
        return Object.assign({}, state, {user: { ...state.user, wallets: action.payload }});
        break;
    case SET_WALLET_NAME:
        return Object.assign({}, state, {user: { ...state.user, wallet_name: action.payload }});
        break;
    case SET_WALLET_ID:
        return Object.assign({}, state, {user: { ...state.user, wallet_id: action.payload }});
        break;
        case SET_WALLET_ID_PREFERED:
        return Object.assign({}, state, {user: { ...state.user, wallet_id_prefered: action.payload }});
        break;
    case SET_WALLETS_AMOUNT:
        return Object.assign({}, state, {user: { ...state.user, walletsamount: action.payload }});
        break;
    case SET_USER_TOKEN:
        return Object.assign({}, state, {user: { ...state.user, api_token: action.payload }});
        break;
    case REGISTER_SUCCESS:
        return Object.assign({}, state, {register: { ...state.register, initialRegister: action.payload }});
        break;
    case REGISTER_COMPLETED:
        return Object.assign({}, state, {register: { ...state.register, initialRegister: action.payload }});
        break;
    case CHANGE_USER_NOTIFICATIONS:
        return Object.assign({}, state, {user: { ...state.user, ...action.payload }});
        break;
    case LOGOUT_SUCCESS:
        return Object.assign({}, state, initialState);
        break;
    case SET_ADDRESS_INFO:
        return Object.assign({}, state, {register: { ...state.register, address: action.payload }});
        break;
    case PASSWORD_RESET_BY_EMAIL:
        return Object.assign({}, state, {emailMessage: action.payload});
        break;
    case NEW_ONE_SIGNAL_ID_SET:
        const newDevices = Object.assign({}, state.user.devices).map((device) => {
            if (device.device_id === action.payload.device_id) {
                return action.payload;
            }

            return device;
        });

        return Object.assign({}, state, {user: {...state.user, devices: newDevices}});
        break;
    default:
        return state;
    }

    return state;
}
