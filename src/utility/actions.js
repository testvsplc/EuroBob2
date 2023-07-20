import {
    UTIL_IS_REFRESHING,
    UTIL_SHOW_PICKER,
    UTIL_BLUR_MENU,
    UTIL_IS_SEARCHING,
    UTIL_IS_LOADING,
    UTIL_TOGGLE_MODAL,
    UTIL_APP_INIT,
    UTIL_CHAT_NOTI,
    CLEAR_SERVER_ERRORS,
    SET_ONE_SIGNAL_PLAYER_ID_UTILS
} from './constants';

export function setOneSignalPlayerIdUtils(id) {
    return {
        type: SET_ONE_SIGNAL_PLAYER_ID_UTILS,
        payload: id
    };
}

export function stopStateRefresh() {
    return {
        type: UTIL_IS_REFRESHING,
        payload: false
    };
}

export function startStateRefresh() {
    return {
        type: UTIL_IS_REFRESHING,
        payload: true
    };
}

export function togglePicker(bool) {
    return {
        type: UTIL_SHOW_PICKER,
        payload: bool
    };
}

export function toggleMenuBlur(bool) {
    return {
        type: UTIL_BLUR_MENU,
        payload: bool
    };
}

export function toggleSearch(bool) {
    return {
        type: UTIL_IS_SEARCHING,
        payload: bool
    };
}

export function toggleLoading(bool) {
    return {
        type: UTIL_IS_LOADING,
        payload: bool
    };
}

export function toggleModal(bool) {
    return {
        type: UTIL_TOGGLE_MODAL,
        payload: bool
    };
}

export function initApp(bool) {
    return {
        type: UTIL_APP_INIT,
        payload: bool
    };
}

export function toggleChatNotification(bool) {
    return {
        type: UTIL_CHAT_NOTI,
        payload: bool
    };
}

export function clearServerErrors() {
    return {
        type: CLEAR_SERVER_ERRORS
    };
}

export function checkHttpStatus(response) {
    if (response.status >= 200 && response.status < 300) {

        return response;
    } else {
        const error = new Error(response.statusText);
        error.response = response;
        console.log('ERROR', error.response);

        throw error;
    }
}

export function setUpPredictionResults(searches) {
    return searches.predictions.map((search) => {
        const strings = search.description.split(',');

        return {
            street: strings[0].trim(),
            city: strings[1].trim(),
            id: search.place_id,
            type: 'search',
            is_favorite: false,
            actual_response: {
                ...search
            }
        };
    });
}

export function setUpSearch(search, favorite) {
    const searchComponent = search.result ? search.result : search;

    const zipcode = searchComponent.address_components.filter((address) => {
        const zipcodes = address.types.filter((type) => {
            if (type === 'postal_code') {
                return true;
            }

            return false;
        });

        return zipcodes.length ? true : false;
    });

    const strings = searchComponent.name.split(',');

    return {
        street: searchComponent.name,
        city: searchComponent.vicinity,
        type: 'search',
        is_favorite: favorite,
        lat: searchComponent.geometry.location.lat,
        lon: searchComponent.geometry.location.lng,
        address: strings[0].trim(),
        zipcode: zipcode.length > 0 ? zipcode[0].long_name : '',
        place: searchComponent.vicinity,
        actual_response: {
            ...searchComponent
        }
    };
}


function mapRides(rides) {
    return rides.map((ride) => {
        const { addresses, ...rideNormalized } = ride;

        const rideFromArray = addresses.filter((address) => {
            if (address.pivot.type === 'start') {
                return true;
            }
        });
        const rideFromObject = Object.assign({}, rideFromArray[0]);

        const rideToArray = addresses.filter((address) => {
            if (address.pivot.type === 'destination') {
                return true;
            }
        });
        const rideToObject = Object.assign({}, rideToArray[0]);

        const rideStops = addresses.filter((address) => {
            if (address.pivot.type === 'via') {
                return true;
            }
        });

        const rideStopsArray = Object.assign([], rideStops).map((stop) => {
            return {
                ...stop,
                order: stop.pivot.order
            };
        });

        return Object.assign({}, rideNormalized, { from: rideFromObject, to: rideToObject, stops: rideStopsArray });
    });
}

export function setUpRides(response) {
    if (typeof response.ride !== 'undefined') {
        return mapRides([response.ride])
    }

    const history = response.history;
    const upcoming = response.upcoming;

    const obj = {
        history: mapRides(history),
        upcoming: mapRides(upcoming)
    };

    return obj;
}

export function splitBobName(name) {
    let namePart = name;

    namePart = namePart.split(" ")[0];

    if (namePart.length > 12) {
        namePart = namePart.substr(0, 12) + '...';
    }

    return namePart;
}

export function splitBobFirstname(name) {
    const firstName = name.split(" ");

    if (name.length > 6) {
        if (firstName[0].length > 6) {
            firstName[0] = firstName[0].substr(0, 6) + '...';
        } else {
            firstName[0] = firstName[0] + '...';
        }
    }

    return firstName[0];
}