import { RECEIVE_LOCATION, FETCH_LOCATION, FETCH_PLACE, RECEIVE_PLACE, NO_LOCATION } from './index';

import { API_KEY } from '../../utility/';

export function fetchLocation() {
	return {
        type: FETCH_LOCATION
    };
}

// get current location
export function getLocation(lat, lng) {
    return function (dispatch) {

        dispatch(fetchLocation());

        return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
			.then((response) => response.json())
            .then(response => {
                try {
					dispatch(receiveLocation(response.results[0]));
					dispatch(getPlace(response.results[0].place_id));
                } catch (e) {

                }
            })
            .catch(error => {
            });
    };
}

export function receiveLocation(location) {
	return {
        type: RECEIVE_LOCATION,
        payload: location
    };
}

export function fetchPlace() {
	return {
        type: FETCH_PLACE
    };
}

// get current place
export function getPlace(placeID) {
    return function (dispatch) {

        dispatch(fetchPlace());

        return fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&key=${API_KEY}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
			.then((response) => response.json())
            .then(response => {
                try {
					dispatch(receivePlace(response.result));
                } catch (e) {
                }
            })
            .catch(error => {
            });
    };
}

export function receivePlace(place) {
	return {
        type: RECEIVE_PLACE,
        payload: place
    };
}

export function noLocationAvailable() {
    return {
        type: NO_LOCATION
    };
}
