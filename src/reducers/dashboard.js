import { RECEIVE_PLACE, NO_LOCATION } from '../modules/dashboard/';
import { LOGOUT_SUCCESS } from '../modules/authentication/';

const initialState = {
    place: {},
    plannedRides: [
        {
            fromLocation  : 'Amsterdam Arena',
            fromCity      : 'Amsterdam',
            toLocation    : 'Grote Markt 5a',
            toCity        : 'Heemstede',
            totalDistance : '70km',
            totalTime     : '60min',
            totalStops    : '2',
            timeRemaining : '2 UUR EN 30 MIN',
            pickupTime    : '20:45',
            plannedDay    : 'Vandaag',
            stops         : []
        },
        {
            fromLocation  : 'Zaalbergstraat 19',
            fromCity      : 'Alphen aan den rijn',
            toLocation    : 'Amsterdam Arena',
            toCity        : 'Amsterdam',
            totalDistance : '120km',
            totalTime     : '130min',
            totalStops    : '0',
            timeRemaining : '3 UUR EN 15 MIN',
            pickupTime    : '21:45',
            plannedDay    : 'Tomorrow',
            stops         : []
        }
    ],
    noPlannedRides: false
};

/**
 * Returns new state based on action.
 * @param  {object} state  Global state.
 * @param  {object} action Defines what part of state to change.
 * @return {object}        Returns new state.
 */
export default function dashboard(state = initialState, action) {
    switch (action.type) {
    case RECEIVE_PLACE:
        return Object.assign({}, state, { place: action.payload});
        break;
    case NO_LOCATION:
        return Object.assign({}, state, { place: {}});
        break;
    case LOGOUT_SUCCESS:
        return Object.assign({}, state, initialState);
        break;
    default:
        return state;
    }

    return state;
}
