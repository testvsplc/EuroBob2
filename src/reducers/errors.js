import { LOGIN_FAILURE, LOGOUT_SUCCESS, REGISTER_USER_FAILURE, COMPLETE_REGISTER_REQUEST_ERROR } from '../modules/authentication/';
import { RATES_ERROR } from '../modules/rides'
import { CLEAR_SERVER_ERRORS } from '../utility/';

const initialState = {
    serverErrors: {}
};

/**
 * Returns new state based on action.
 * @param  {object} state  Global state.
 * @param  {object} action Defines what part of state to change.
 * @return {object}        Returns new state.
 */
export default function authentication (state = initialState, action) {
    switch (action.type) {
    case LOGIN_FAILURE:
        return Object.assign({}, state, {serverErrors: action.payload.message});
    case RATES_ERROR:
        return Object.assign({}, state, {serverErrors: action.payload.message});
    case REGISTER_USER_FAILURE:
        return Object.assign({}, state, {serverErrors: action.payload.message});
    case COMPLETE_REGISTER_REQUEST_ERROR:
        return Object.assign({}, state, {serverErrors: action.payload});
    case CLEAR_SERVER_ERRORS:
        return Object.assign({}, initialState);
    case LOGOUT_SUCCESS:
        return Object.assign({}, state, initialState);
    default:
        return state;
    }

    return state;
}
