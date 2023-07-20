import {
    SET_SELECTED_EDIT,
    TOGGLE_SETTING_SWITCH,
    ADD_ADDRESS,
    ADDRESS_REMOVED,
    TOGGLE_ACCOUNT_TYPE,
    TOGGLE_PAYMENT_TYPE,
    TOGGLE_WALLET_ID_SHOW,
    SET_ACCOUNT_TYPE,
    SET_PAYMENT_TYPE,
    SET_FORM_PROFILE_IMAGE,
    CANCEL_PROFILE_UPDATE,
    SET_CREATE_ADDRESS,
    RECEIVED_ADDRESSES,
    ADDRESS_UPDATED,
    CLEAR_UPDATE_ADDRESS,
    RECEIVED_PROFILE_REQUEST,
    EDIT_ADDRESS_LOCATION,
    CHANGE_USER_CONTACT
} from '../modules/profile';
import {ADD_LOCATION_TO_FAV, REMOVE_LOCATION_FROM_FAV, CREATE_AND_FAV_LOCATION} from '../modules/rides/';
import {SET_USER_PROFILE, LOGOUT_SUCCESS} from '../modules/authentication/';

const initialState = {
    selectedEditProp: 'profiel',
    walletidshow: false,
    preferences: {
        contact: ''
    },
    addresses: {
        home: {},
        recent: [],
        favorites: [],
        user_specific: []
    },
    createAddress: {
        profile_id: '',
        lat: '',
        lon: '',
        address: '',
        zipcode: '',
        place: '',
        name: '',
        is_home: false,
        is_favorite: true
    },
    profileInformation: {
        profile_image: '',
        paymentType: '',

        showPaymentType: false,
        showAccountType: false,
        address: {
            place: null,
            zipcode: null,
            address: null,
            lat: null,
            lon: null
        }
    },

    profile: {
        type: ''
    }
};

/**
 * Returns new state based on action.
 * @param  {object} state  Global state.
 * @param  {object} action Defines what part of state to change.
 * @return {object}        Returns new state.
 */
export default function profile(state = initialState, action) {
    switch (action.type) {
        case TOGGLE_ACCOUNT_TYPE:
            return Object.assign({}, state, {
                profileInformation: {
                    ...state.profileInformation,
                    showAccountType: action.payload
                }
            });
            break;
        case EDIT_ADDRESS_LOCATION:
            return Object.assign({}, state, {
                profileInformation: {
                    ...state.profileInformation,
                    address: action.payload
                }
            });
            break;
        case TOGGLE_PAYMENT_TYPE:
            return Object.assign({}, state, {
                profileInformation: {
                    ...state.profileInformation,
                    showPaymentType: action.payload
                }
            });
            break;
        case TOGGLE_WALLET_ID_SHOW:
            return Object.assign({}, state, {
                profileInformation: {
                    ...state.profileInformation,
                    walletidshow: action.payload
                }
            });
            break;

        case SET_ACCOUNT_TYPE:
            return Object.assign({}, state, {
                profileInformation: {
                    ...state.profileInformation,
                    acccountType: action.payload
                }
            });
            break;
        case SET_PAYMENT_TYPE:
            return Object.assign({}, state, {
                profileInformation: {
                    ...state.profileInformation,
                    paymentType: action.payload
                }
            });
            break;
        case SET_SELECTED_EDIT:
            return Object.assign({}, state, {selectedEditProp: action.payload});
            break;
        case TOGGLE_SETTING_SWITCH:
            return Object.assign({}, state, {preferences: {...state.preferences, ...action.payload}});
            break;
        case ADD_ADDRESS:
            return Object.assign({}, state, {
                addresses: {
                    ...state.addresses,
                    user_specific: [...state.addresses.user_specific, action.payload]
                }
            });
            break;
        case ADDRESS_REMOVED:
            const filteredLocations = Object.assign({}, state).addresses.user_specific.filter((address) => {
                if (address.address_id !== action.payload) {
                    return address;
                }
            });

            return Object.assign({}, state, {addresses: {...state.addresses, user_specific: [...filteredLocations]}});
            break;
        case SET_USER_PROFILE:
            return Object.assign({}, state, {profile: {...state.profile, ...action.payload.profile}});
            break;
        case SET_FORM_PROFILE_IMAGE:
            return Object.assign({}, state, {
                profileInformation: {
                    ...state.profileInformation,
                    profile_image: action.payload
                }
            });
            break;
        case CANCEL_PROFILE_UPDATE:
            return Object.assign({}, state, {profileInformation: initialState.profileInformation});
            break;
        case SET_CREATE_ADDRESS:
            return Object.assign({}, state, {createAddress: {...state.createAddress, ...action.payload}});
            break;
        case RECEIVED_ADDRESSES:
            return Object.assign({}, state, {addresses: {...state.addresses, user_specific: action.payload}});
            break;
        case ADDRESS_UPDATED:
            const filteredAddresses = Object.assign({}, state).addresses.user_specific.map((address) => {
                if (address.address_id === action.payload.address_id) {
                    return action.payload;
                } else {
                    return address;
                }
            });

            return Object.assign({}, state, {addresses: {...state.addresses, user_specific: filteredAddresses}});
            break;
        case CLEAR_UPDATE_ADDRESS:
            return Object.assign({}, state, {createAddress: initialState.createAddress});
            break;
        case RECEIVED_PROFILE_REQUEST:
            return Object.assign({}, state, {
                addresses: {
                    ...state.addresses,
                    home: action.payload.home,
                    recent: action.payload.recent,
                    favorites: action.payload.favorites
                }
            });
            break;
        case CREATE_AND_FAV_LOCATION:
            return Object.assign({}, state, {
                addresses: {
                    ...state.addresses,
                    favorites: [...state.addresses.favorites, action.payload]
                }
            });
            break;
        case ADD_LOCATION_TO_FAV:
            const newFav = Object.assign({}, action.payload, {is_favorite: true});
            const recentList = Object.assign({}, state).addresses.recent.filter((recent) => {
                if (recent.address_id !== action.payload.address_id) {
                    return recent;
                }
            });

            return Object.assign({}, state, {
                addresses: {
                    ...state.addresses,
                    favorites: [newFav, ...state.addresses.favorites],
                    recent: recentList
                }
            });
            break;
        case REMOVE_LOCATION_FROM_FAV:
            const filteredFavorites = Object.assign({}, state).addresses.favorites.filter((favorite) => {
                if (favorite.address_id !== action.payload.address_id) {
                    return favorite;
                }
            });

            return Object.assign({}, state, {
                addresses: {
                    ...state.addresses,
                    favorites: filteredFavorites
                }
            });
            break;
        case CHANGE_USER_CONTACT:
            return Object.assign({}, state, {preferences: {contact: action.payload} });
            break;
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, initialState);
        default:
            return state;
    }

    return state;
}
