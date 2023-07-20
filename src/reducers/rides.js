import {
    PLAN_RIDE,
    ADD_PLAN_RIDE_COMMENT,
    SET_FROM_LOCATION,
    SET_TO_LOCATION,
    SET_STOP_LOCATION,
    REMOVE_STOP_LOCATION,
    SET_RIDE_DATE,
    SET_EXPIRED_OR_UPCOMING,
    SET_RATING,
    SET_RATING_COMMENT,
    FETCH_RIDE_SUCCESS,
    CLEAR_PLAN_RIDE,
    SHOW_PRICE,
    GOT_RIDE_DETAILS,
    REVIEW_RIDE_SUCCESS,
    SET_WALLETID,
    TOGGLE_PAYMENT_TYPE,
    TOGGLE_WALLET_ID_SHOW,
    SET_PAYMENT,
    GOT_RIDE_PRICE,
    GOT_RIDE_RATES,
    SET_RIDE_UPDATE_INFO,
    UPDATE_RIDE_SUCCESS,
    GET_RIDE_PRICE,
    PLAN_RIDE_ERROR
} from '../modules/rides/';
import {LOGOUT_SUCCESS} from '../modules/authentication/';
import {SET_OPEN_STATUS, SET_OPEN_TIME} from "../modules/rides/constants";

const initialState = {
    planRide: {
        payment: 'pin',
        wallet_id: 0,
        walletidshow: false,
        showPaymentType: false,
        walletid: 0,
        date: (new Date()).setHours((new Date()).getHours() + 1),
        comment: '',
        from: {
            street: '',
            city: '',
            type: '',
            favorited: null,
            lat: '',
            lon: '',
            address: '',
            zipcode: '',
            place: ''
        },
        to: {
            street: '',
            city: '',
            type: '',
            favorited: null,
            lat: '',
            lon: '',
            address: '',
            zipcode: '',
            place: ''
        },
        stops: [],
        calculatedPrice: {
            clickable: false
        },
        error: false
    },
    plannedRides: {
        upcomingRides: [],
        expiredRides: [],
        notifications: {
            expired: 0,
            upcomming: 0
        }
    },
    displayValue: '',
    rating: {
        rating: '',
        comment: ''
    },
    rates: {},
    showPrice: false,
    open: true,
    open_time: "",
};

/**
 * Returns new state based on action.
 * @param  {object} state  Global state.
 * @param  {object} action Defines what part of state to change.
 * @return {object}        Returns new state.
 */
export default function utility(state = initialState, action) {
    switch (action.type) {
        case SET_RIDE_DATE:
            return Object.assign({}, state, {planRide: {...state.planRide, date: action.payload}});
        case SET_OPEN_STATUS:
            return Object.assign({}, state, {open: action.payload.open});
        case SET_OPEN_TIME:
            return Object.assign({}, state, {open_time: action.payload.time});
        case ADD_PLAN_RIDE_COMMENT:
            return Object.assign({}, state, {planRide: {...state.planRide, comment: action.payload}});
        case SET_FROM_LOCATION:
            return Object.assign({}, state, {planRide: {...state.planRide, from: action.payload}});
        case SET_PAYMENT:
            return Object.assign({}, state, {planRide: { ...state.planRide, payment: action.payload }});
        case SET_WALLETID:
            return Object.assign({}, state, {planRide: { ...state.planRide, wallet_id: action.payload }});
        case TOGGLE_PAYMENT_TYPE:
            return Object.assign({}, state, {planRide: { ...state.planRide, showPaymentType: action.payload }});
        case TOGGLE_WALLET_ID_SHOW:
            return Object.assign({}, state, {planRide: { ...state.planRide, walletidshow: action.payload }});
        case SET_TO_LOCATION:
            return Object.assign({}, state, {planRide: {...state.planRide, to: action.payload}});
        case SET_STOP_LOCATION:
            return Object.assign({}, state, {
                planRide: {
                    ...state.planRide,
                    stops: [...state.planRide.stops, action.payload]
                }
            });
        case REMOVE_STOP_LOCATION:
            const filteredLocations = Object.assign({}, state).planRide.stops.filter((stop) => {
                if (stop !== action.payload) {
                    return stop;
                }
            });

            return Object.assign({}, state, {
                planRide: {
                    ...state.planRide,
                    stops: filteredLocations
                }
            });
        case SET_RIDE_UPDATE_INFO:
            return Object.assign({}, state, {
                planRide: {
                    ...state.planRide, ...action.payload,
                    date: new Date(action.payload.start_date * 1000)
                }
            });
        case UPDATE_RIDE_SUCCESS:
            const filteredRides = Object.assign({}, state).plannedRides.upcomingRides.map((ride) => {
                if (ride.ride_id === action.payload.ride_id) {
                    return action.payload;
                } else {
                    return ride;
                }
            });

            return Object.assign({}, state, {plannedRides: {...state.plannedRides, upcomingRides: filteredRides}});
        case SET_EXPIRED_OR_UPCOMING:
            return Object.assign({}, state, {displayValue: action.payload});
        case SET_RATING:
            return Object.assign({}, state, {rating: {...state.rating, rating: action.payload}});
        case SET_RATING_COMMENT:
            return Object.assign({}, state, {rating: {...state.rating, comment: action.payload}});
        case REVIEW_RIDE_SUCCESS:
            const ratedRides = Object.assign({}, state).plannedRides.expiredRides.map((ride) => {
                if (ride.ride_id === action.payload.ride_id) {
                    return action.payload;
                } else {
                    return ride;
                }
            });
            const recountNoti = Object.assign([], ratedRides).filter((ride) => {
                if (ride.is_expired && ride.rating === 0 && ride.status !== 'Geannuleerd') {
                    return true;
                }
                return false;
            }).length;

            return Object.assign({}, state, {
                rating: initialState.rating,
                plannedRides: {
                    ...state.plannedRides,
                    expiredRides: ratedRides,
                    notifications: {...state.plannedRides.notifications, expired: recountNoti}
                }
            });
        case FETCH_RIDE_SUCCESS:
            const expiredRides = action.payload.history;

            const upcomingRides = action.payload.upcoming;
            const expiredNoti = Object.assign([], action.payload.history).filter((ride) => {
                if (ride.is_expired && ride.rating === 0 && ride.status !== 'Geannuleerd') {
                    return true;
                }
                return false;
            }).length;
            const upcommingNoti = upcomingRides.length;

            return Object.assign({}, state, {
                plannedRides: {
                    expiredRides,
                    upcomingRides,
                    notifications: {expired: expiredNoti, upcomming: upcommingNoti}
                }
            });
        case CLEAR_PLAN_RIDE:
            return Object.assign({}, state, {planRide: initialState.planRide});
        case PLAN_RIDE:
            return Object.assign({}, state, {
                plannedRides: {
                    ...state.plannedRides,
                    upcomingRides: [...state.plannedRides.upcomingRides, ...action.payload],
                    notifications: {
                        ...state.plannedRides.notifications,
                        upcomming: state.plannedRides.notifications.upcomming + 1
                    }
                }
            });
        case SHOW_PRICE:
            return Object.assign({}, state, {showPrice: action.payload});
        case GOT_RIDE_DETAILS:
            const newRidesList = Object.assign({}, state).plannedRides.upcomingRides.map((ride) => {
                if (ride.ride_id === action.payload.ride_id) {
                    console.log('new ride', Object.assign({}, ride, {detail: action.payload.detail}));
                    return Object.assign({}, ride, {detail: action.payload.detail});
                } else {
                    return ride;
                }
            });

            return Object.assign({}, state, {plannedRides: {...state.plannedRides, upcomingRides: newRidesList}});
        case GOT_RIDE_PRICE:
            return Object.assign({}, state, {planRide: {...state.planRide, calculatedPrice: action.payload}});
        case GET_RIDE_PRICE:
            return Object.assign({}, state, {
                planRide: {
                    ...state.planRide,
                    calculatedPrice: {...state.planRide.calculatedPrice, clickable: action.payload.clickable}
                }
            });
        case GOT_RIDE_RATES:
            return Object.assign({}, state, {rates: action.payload});
        case LOGOUT_SUCCESS:
            return Object.assign({}, state, initialState);
        case PLAN_RIDE_ERROR:
            return Object.assign({}, state, {planRide: {...state.planRide, error: true}});
        default:
            return state;
    }
}
