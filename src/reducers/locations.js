import { ADD_LOCATION_TO_FAV, REMOVE_LOCATION_FROM_FAV, FOUND_PREDICTIONS, PLACE_FAVORITE_MARK } from '../modules/rides/';
import { LOGOUT_SUCCESS } from '../modules/authentication/';

const initialState = {
    searchResults: []
};

/**
 * Returns new state based on action.
 * @param  {object} state  Global state.
 * @param  {object} action Defines what part of state to change.
 * @return {object}        Returns new state.
 */
export default function locations (state = initialState, action) {
    switch (action.type) {
    case FOUND_PREDICTIONS:
        return Object.assign({}, state, {searchResults: [...action.payload]});
        break;
    case PLACE_FAVORITE_MARK:
        const filteredSearches = Object.assign({}, state).searchResults.map((result) => {if (result === action.payload) { return Object.assign({}, action.payload, {is_favorite: true}); } else { return result; }});

        return Object.assign({}, state, {searchResults: filteredSearches});
        break;
    case LOGOUT_SUCCESS:
        return Object.assign({}, state, initialState);
        break;
    default:
        return state;
    }

    return state;
}
