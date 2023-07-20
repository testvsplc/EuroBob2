import {
    UTIL_IS_REFRESHING,
    UTIL_SHOW_PICKER,
    UTIL_BLUR_MENU,
    UTIL_IS_SEARCHING,
    UTIL_IS_LOADING,
    UTIL_TOGGLE_MODAL,
    UTIL_APP_INIT,
    UTIL_CHAT_NOTI,
    SET_ONE_SIGNAL_PLAYER_ID_UTILS
} from '../utility/';
import {ActionConst} from 'react-native-router-flux';
import {LOGOUT_SUCCESS} from '../modules/authentication/';

const initialState = {
    isRefreshing: false,
    showPicker: false,
    showMenu: false,
    searching: false,
    appLoading: false,
    showModal: false,
    blurMenu: true,
    chatNotification: false,
    appInitialized: false,
    currentScene: '',
    one_signal_player_id: ''
};

/**
 * Returns new state based on action.
 * @param  {object} state  Global state.
 * @param  {object} action Defines what part of state to change.
 * @return {object}        Returns new state.
 */
export default function utility(state = initialState, action) {
    switch (action.type) {
        case SET_ONE_SIGNAL_PLAYER_ID_UTILS:
            return Object.assign({}, state, {one_signal_player_id: action.payload});
            break;
        case UTIL_IS_REFRESHING:
            return Object.assign({}, state, {isRefreshing: action.payload});
            break;
        case UTIL_SHOW_PICKER:
            return Object.assign({}, state, {showPicker: action.payload});
            break;
        case UTIL_BLUR_MENU:
            return Object.assign({}, state, {blurMenu: action.payload});
        case UTIL_IS_SEARCHING:
            return Object.assign({}, state, {searching: action.payload});
            break;
        case UTIL_IS_LOADING:
            return Object.assign({}, state, {appLoading: action.payload});
            break;
        case UTIL_TOGGLE_MODAL:
            return Object.assign({}, state, {showModal: action.payload});
            break;
        case UTIL_APP_INIT:
            return Object.assign({}, state, {appInitialized: action.payload});
            break;
        case UTIL_CHAT_NOTI:
            return Object.assign({}, state, {chatNotification: action.payload});
            break;
        case ActionConst.PUSH:
            return Object.assign({}, state, {currentScene: action.key});
            break;
        case ActionConst.RESET:
            return Object.assign({}, state, {currentScene: action.key});
            break;
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, {...initialState, one_signal_player_id: state.one_signal_player_id});
            break;
        default:
            return state;
    }

    return state;
}
