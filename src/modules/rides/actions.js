import {
  PLAN_RIDE,
  ADD_PLAN_RIDE_COMMENT,
  ADD_LOCATION_TO_FAV,
  REMOVE_LOCATION_FROM_FAV,
  SET_FROM_LOCATION,
  SET_TO_LOCATION,
  SET_STOP_LOCATION,
  REMOVE_STOP_LOCATION,
  SET_RIDE_DATE,
  SET_EXPIRED_OR_UPCOMING,
  SET_RATING,
  SET_RATING_COMMENT,
  SEARCH_PREDICTIONS,
  FOUND_PREDICTIONS,
  FETCH_PREDICITON_PLACE,
  RECEIVE_PREDICITON_PLACE,
  PLAN_RIDE_PLANNED,
  PLANNED_RIDE_REQUEST,
  FETCH_RIDE_REQUEST,
  FETCH_RIDE_SUCCESS,
  CLEAR_PLAN_RIDE,
  REVIEW_RIDE,
  REVIEW_RIDE_SUCCESS,
  SHOW_PRICE,
  GOT_RIDE_DETAILS,
  GET_RIDE_DETAILS,
  SET_PAYMENT,
  SET_WALLETID,
  TOGGLE_WALLET_ID_SHOW,
  TOGGLE_PAYMENT_TYPE,
  GOT_RIDE_PRICE,
  GET_RIDE_PRICE,
  GET_RIDE_RATES,
  GOT_RIDE_RATES,
  CREATE_AND_FAV_LOCATION,
  CREATE_AND_FAV_LOCATION_SUCCESS,
  PLACE_FAVORITE_MARK,
  SET_RIDE_UPDATE_INFO,
  UPDATE_RIDE_REQUEST,
  UPDATE_RIDE_SUCCESS,
  PLAN_RIDE_ERROR,
  FETCH_OPEN_TIME,
  SET_OPEN_STATUS,
  SET_OPEN_TIME,
  RATES_ERROR
} from './constants';
import {
  API_KEY,
  API_URL,
  toggleSearch,
  setUpPredictionResults,
  checkHttpStatus,
  setUpSearch,
  setUpRides
} from '../../utility/';

import { Actions, ActionConst } from 'react-native-router-flux';

/**
 * @param {string} date Insert into payload.
 * @return {object} calls to reducer.
 */
export function setRideDate(date) {
  return {
    type: SET_RIDE_DATE,
    payload: date
  };
}

export function setOpenStatus(bool) {
  return {
    type: SET_OPEN_STATUS,
    payload: {
      open: bool
    }
  };
}

export function setPaymentType(type) {
  return {
    payload: type,
    type: SET_PAYMENT
  };
}

export function setWalletId(id) {
  return {
    payload: id,
    type: SET_WALLETID
  };
}

export function togglePaymentType(bool) {
  return {
    payload: bool,
    type: TOGGLE_PAYMENT_TYPE
  };
}

export function toggleWalletIdShow(bool) {
  return {
    payload: bool,
    type: TOGGLE_WALLET_ID_SHOW
  };
}

export function setOpenFrom(timeStr) {
  return {
    type: SET_OPEN_TIME,
    payload: {
      time: timeStr
    }
  };
}

/**
 * @return {object} calls to reducer.
 * @param token
 */
export function fetchIsAppOpen(token) {
  return function(dispatch) {
    return fetch(`${API_URL}/app-settings/open`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(response => {
        try {
          dispatch(setOpenStatus(response.open));
          dispatch(setOpenFrom(response.first_open));
        } catch (error) {
          console.log('error isOpen:', error);
        }
      })
      .catch(error => {
        console.log('error isOpen:', error);
      });
  };
}

/**
 * @param {object} text Object with comment.
 * @return {object} calls to reducer.
 */
export function addPlanComment(text) {
  return {
    type: ADD_PLAN_RIDE_COMMENT,
    payload: text
  };
}

/**
 * @param {object} location Provides location details
 * @return {object} calls to reducer.
 */
export function addLocationToFavorites(location) {
  return {
    type: ADD_LOCATION_TO_FAV,
    payload: location
  };
}

/**
 * Request to add new favorite location.
 * @param {object} location Used to find address to favorite.
 * @param {string} token User token to identify.
 * @return {object} Returns response from server
 */
export function addLocationToFavoritesRequest(location, token) {
  return function(dispatch) {
    dispatch(addLocationToFavorites(location));

    return fetch(`${API_URL}/addresses/${location.address_id}/favorite`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(response => {
        try {
          console.log('favorited', response);
        } catch (error) {
          console.log('error addLocationToFavoritesRequest:', error);
        }
      })
      .catch(error => {
        console.log('error addLocationToFavoritesRequest:', error);
      });
  };
}

/**
 * @return {object} only returns type
 */
export function clearPlanRide() {
  return {
    type: CLEAR_PLAN_RIDE
  };
}

/**
 * @param  {object} location Provides location details.
 * @return {object} calls to reducer.
 */
export function removeLocationFromFavorites(location) {
  return {
    type: REMOVE_LOCATION_FROM_FAV,
    payload: location
  };
}

/**
 * Request to remove favorite location.
 * @param {object} location Used to find address to favorite.
 * @param {string} token User token to identify.
 * @return {object} Returns response from server
 */
export function removeLocationToFavoritesRequest(location, token) {
  return function(dispatch) {
    dispatch(removeLocationFromFavorites(location));

    return fetch(`${API_URL}/addresses/${location.address_id}/un-favorite`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(response => {
        try {
          console.log('favorited', response);
        } catch (error) {
          console.log('error removeLocationToFavoritesRequest:', error);
        }
      })
      .catch(error => {
        console.log('error removeLocationToFavoritesRequest:', error);
      });
  };
}

/**
 * @param {object} fromLocation Provides start location details.
 * @return {object} returns object to set from location in reducer.
 */
export function setFromLocation(fromLocation) {
  return {
    type: SET_FROM_LOCATION,
    payload: fromLocation
  };
}

/**
 * @param {object} toLocation Provides to location details.
 * @return {object} returns object to set from location in reducer.
 */
export function setToLocation(toLocation) {
  return {
    type: SET_TO_LOCATION,
    payload: toLocation
  };
}

/**
 * @param {object} stopLocation Provides stop location details.
 * @return {object} returns object to set stop location in reducer.
 */
export function setStopLocation(stopLocation) {
  return {
    type: SET_STOP_LOCATION,
    payload: stopLocation
  };
}

/**
 * @param {object} location Provides location to remove.
 * @return {object} returns object to compare with in reducer
 */
export function removeStopLocation(location) {
  return {
    type: REMOVE_STOP_LOCATION,
    payload: location
  };
}

/**
 * @param {string} value String to set current view
 * @return {object} calls to reducer.
 */
export function setExpiredOrUpcoming(value) {
  return {
    type: SET_EXPIRED_OR_UPCOMING,
    payload: value
  };
}

/**
 * @param {string} rating Object to set rating
 * @return {object} calls to reducer.
 */
export function setRating(rating) {
  return {
    type: SET_RATING,
    payload: rating
  };
}

/**
 * @param {string} rating Object to set rating coment
 * @return {object} calls to reducer.
 */
export function setRatingComment(comment) {
  return {
    type: SET_RATING_COMMENT,
    payload: comment
  };
}

/**
 * @param  {bool} bool Show and hide prices
 * @return {object} calls to reducer.
 */
export function toggleShowPrice(bool) {
  return {
    type: SHOW_PRICE,
    payload: bool
  };
}

/**
 * @return {object} Only return type
 */
export function searchPredictions() {
  return {
    type: SEARCH_PREDICTIONS
  };
}

/**
 * @param  {object} predictions Object with results from google
 * @return {object} calls to reducer.
 */
export function foundPredictions(predictions) {
  return {
    type: FOUND_PREDICTIONS,
    payload: predictions
  };
}

/**
 * @param  {string} query String to query google autocomplete.
 * @return {function} returns function to dispatch query.
 */
export function fetchPredictions(query) {
  return function(dispatch) {
    return fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${query}+netherlands&key=${API_KEY}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(setUpPredictionResults)
      .then(response => {
        try {
          dispatch(foundPredictions(response));
          dispatch(toggleSearch(true));
        } catch (error) {
          console.log(error);
        }
      })
      .catch(error => {
        console.log('error fetchPredictions:', error);
      });
  };
}

/**
 * @param  {boolean} loading determine to load or not.
 * @return {object} Platform needs to load.
 */
export function getPredictionPlace(loading) {
  return {
    type: FETCH_PREDICITON_PLACE,
    loading
  };
}

/**
 * @return {object} Platform can stop loading
 */
export function receivedPredictionPlace() {
  return {
    type: RECEIVE_PREDICITON_PLACE,
    loading: false
  };
}

/**
 * @param  {number} placeID Usesed to query google maps places.
 * @param  {function} callback Function to call with response.
 * @param  {boolean} loading Determine to load or not.
 * @param  {boolean} favorite Determine to favorite or not.
 * @return {function} returns function to dispatch query.
 */
export function fetchPredictionPlace(
  placeID,
  callback = null,
  loading = true,
  favorite = false
) {
  return function(dispatch) {
    dispatch(getPredictionPlace(loading));

    return fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeID}&key=${API_KEY}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(response => setUpSearch(response, favorite))
      .then(response => {
        try {
          callback(response);
          dispatch(receivedPredictionPlace());
        } catch (error) {
          console.log('error fetchPredictionPlace:', error);
        }
      })
      .catch(error => {
        console.log('error fetchPredictionPlace:', error);
      });
  };
}

/**
 * @return {object} Platform needs to load.
 */
export function planRideRequest() {
  return {
    type: PLANNED_RIDE_REQUEST,
    loading: true
  };
}

/**
 * @return {object} Platform can stop loading, error.
 */
export function planRideError() {
  return {
    type: PLAN_RIDE_ERROR,
    loading: false
  };
}

/**
 * @param  {object} ride Object to send to state.
 * @return {object} Platform can stop loading.
 */
export function ridePlanned(ride) {
  Actions.ride_planned({ ride });

  return {
    type: PLAN_RIDE_PLANNED,
    loading: false
  };
}

/**
 * @param {object} data Object to add to ride array
 * @return {object} calls to reducer.
 */
export function addNewRide(data) {
  return {
    type: PLAN_RIDE,
    payload: data
  };
}

/**
 *
 * @param rideId
 * @param token
 * @return {Function}
 */
export function cancelRide(rideId, token) {
  return function(dispatch) {
    console.log(`${API_URL}/rides/${rideId}/cancel`);

    return fetch(`${API_URL}/rides/${rideId}/cancel`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };
}

/**
 * @param  {object} ride Ride to save
 * @param  {string} token Used authenticate user
 * @return {function} returns function to dispatch query.
 */
export function savePlanRide(ride, token) {
  return function(dispatch) {
    dispatch(planRideRequest());

    return fetch(`${API_URL}/rides/store`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(ride)
    })
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(setUpRides)
      .then(response => {
        console.log(response);
        dispatch(addNewRide(response));
        dispatch(ridePlanned(response));
        dispatch(clearPlanRide());
      })
      .catch(error => {
        error.response.json().then(errorObject => {
          console.log('error savePlanRide:', errorObject);
          if (errorObject.validator.start_date.length >= 1) {
            dispatch(planRideError());
          }
        });
      });
  };
}

/**
 * @param  {object} ride Object to send to state.
 * @return {object} Object to send to reducer.
 */
export function setUpdatePlanRide(ride) {
  return {
    type: SET_RIDE_UPDATE_INFO,
    payload: ride
  };
}

/**
 * @return {object} Platform needs to load.
 */
export function updateRideRequest() {
  return {
    type: UPDATE_RIDE_REQUEST,
    loading: true
  };
}

/**
 * @param  {object} ride Object to send to state.
 * @return {object} Platform can stop loading.
 */
export function updateRideSuccess(ride) {
  Actions.ride_planned({ ride: [{ ride_updated: true, ...ride }] });

  return {
    type: UPDATE_RIDE_SUCCESS,
    payload: ride,
    loading: false
  };
}

/**
 * @param  {object} ride_id id to identify ride with
 * @param  {object} ride Ride to save
 * @param  {string} token Used authenticate user
 * @return {function} returns function to dispatch query.
 */
export function updateRide(ride_id, ride, token) {
  return function(dispatch) {
    dispatch(updateRideRequest());

    return fetch(`${API_URL}/rides/${ride_id}/update`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(ride)
    })
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(setUpRides)
      .then(response => {
        try {
          console.log('UPDATED RIDE!', response);

          dispatch(updateRideSuccess(response[0]));
        } catch (error) {
          console.log('error updateRide:', error);
        }
      })
      .catch(error => {
        console.log('error updateRide:', error);
      });
  };
}

/**
 * @return {object} Returns type only
 */
export function fetchRideRequest() {
  return {
    type: FETCH_RIDE_REQUEST
  };
}

/**
 * @return {object} calls to reducer.
 */
export function getRidePrice() {
  return {
    type: 'GET_RIDE_PRICE',
    payload: {
      clickable: false
    }
  };
}

/**
 * @param {object} price Calculated prices.
 * @return {object} calls to reducer.
 */
export function gotRidePrice(price) {
  return {
    type: 'GOT_RIDE_PRICE',
    payload: {
      ...price,
      clickable: true
    }
  };
}

/**
 * @param  {object} ride Ride to save
 * @param  {string} token Used authenticate user
 * @return {function} returns function to dispatch query.
 */
export function fetchRidePrice(ride, token) {
  return function(dispatch) {
    dispatch(getRidePrice());

    return fetch(`${API_URL}/rides/price-public`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(ride)
    })
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(setUpRides)
      .then(response => {
        try {
          dispatch(gotRidePrice(response[0]));
        } catch (error) {
          console.log('error fetchRidePrice:', error);
        }
      })
      .catch(error => {
        error.response.json().then(errorObject => {
          console.log('error fetchRidePrice:', errorObject);
        });
      });
  };
}

/**
 * @param  {array} rides Successfuly got all rides from backend
 * @return {object} calls to reducer.
 */
export function fetchRideSuccess(rides) {
  return {
    type: FETCH_RIDE_SUCCESS,
    payload: rides
  };
}

/**
 * @param  {number} id Used to get rides by profile
 * @param  {string} token Used to authenticate user.
 * @return {function} returns function to dispatch query.
 */
export function fetchRides(id, token) {
  return function(dispatch) {
    dispatch(fetchRideRequest());

    return fetch(`${API_URL}/rides/by-profile/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(setUpRides)
      .then(response => {
        try {
          dispatch(fetchRideSuccess(response));
        } catch (error) {
          console.log('error fetchRides:', error);
        }
      })
      .catch(error => {
        console.log('error fetchRides:', error);
      });
  };
}

export function updateSeenRides(id, token) {
  return function(dispatch) {
    return fetch(`${API_URL}/rides/update-rides-of-profile/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(response => response.json())
      .catch(error => {
        console.log('error updateSeenRides:', error);
      });
  };
}

/**
 * @return {object} Platform needs to load.
 */
export function reviewRide() {
  return {
    type: REVIEW_RIDE,
    loading: true
  };
}

/**
 * @param {object} ride Ride to update.
 * @return {object} Platform can stop loading.
 */
export function reviewRideSuccess(ride) {
  Actions.refresh({
    key: 'drawerDashboardApp',
    openModal: false,
    reviewRide: {}
  });

  return {
    type: REVIEW_RIDE_SUCCESS,
    loading: false,
    payload: ride
  };
}

/**
 * @param  {object} ride API needs to know which ride to rate
 * @param  {string} token User to authenticate user.
 * @return {function} returns function to dispatch query.
 */
export function sendRideReview(ride, token) {
  return function(dispatch) {
    dispatch(reviewRide());

    return fetch(`${API_URL}/rides/${ride.ride_id}/rate`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(ride)
    })
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(setUpRides)
      .then(response => {
        try {
          console.log(response);
          dispatch(reviewRideSuccess(response[0]));
        } catch (error) {
          console.log('error sendRideReview:', error);
          dispatch(rateFailure());
        }
      })
      .catch(error => {
        console.log('error sendRideReview:', error);
        error.response.json().then(errorObject => {
          dispatch(rateFailure(errorObject.validator));
        });
      });
  };
}

/**
 * letting app know we're fetching.
 * @return {object} Type to identify action by.
 */
export function getRideRates() {
  return {
    type: 'GET_RIDE_RATES'
  };
}

/**
 * Letting app know we fetched rates.
 * @param  {object} rates Rates to send to reducer
 * @return {object}       Type to let reducer know which action it is.
 */
export function gotRideRates(rates) {
  return {
    type: 'GOT_RIDE_RATES',
    payload: rates
  };
}

/**
 * Fetches rates for rides per km
 * @param  {string} token Needed to identify user
 * @return {function}     Returns function to fetch info from server
 */
export function fetchRideRates(token) {
  return function(dispatch) {
    dispatch(getRideRates());

    return fetch(`${API_URL}/app-settings/prices`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(response => {
        try {
          dispatch(gotRideRates(response.settings));
        } catch (error) {
          console.log('error fetchRideRates:', error);
        }
      })
      .catch(error => {
        console.log('error fetchRideRates:', error);
      });
  };
}

/**
 * Creates new address that automaticly is favorite
 * @param  {object} location to favorite
 * @return {object}          returns type and payload to set location.
 */
export function createAndFavoriteLocation(location) {
  return {
    type: CREATE_AND_FAV_LOCATION,
    payload: location
  };
}

/**
 * to let application know request is finished.
 * @return {object} returns type to communicate to reducer.
 */
export function createAndFavoriteLocationSuccess() {
  return {
    type: CREATE_AND_FAV_LOCATION_SUCCESS
  };
}

/**
 * creates request to create new address
 * @param  {object} location  to favorite.
 * @param  {string} token     to identify user.
 * @param  {int} profile_id   needed to set profile id
 * @return {function}         returns function to dispatch new location to.
 */
export function createAndFavoriteLocationRequest(location, token, profile_id) {
  return function(dispatch) {
    dispatch(createAndFavoriteLocation(location));

    return fetch(`${API_URL}/addresses/store`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ ...location, profile_id, is_home: false })
    })
      .then(checkHttpStatus)
      .then(response => response.json())
      .then(response => {
        try {
          console.log(response);
          dispatch(createAndFavoriteLocationSuccess());
        } catch (error) {
          console.log('error createAndFavoriteLocationRequest', error);
        }
      })
      .catch(error => {
        console.log('error createAndFavoriteLocationRequest', error);
      });
  };
}

/**
 * To show user that location has been favorited.
 * @param  {object} location object to favorite
 * @return {object}          type and payload to use in reducer.
 */
export function placeFavoriteMark(location) {
  return {
    type: PLACE_FAVORITE_MARK,
    payload: location
  };
}

/**
 * fetches place for prediction result and favorites it.
 * @param  {object}   location needed to fetch place.
 * @param  {string}   api_token needed to identify user.
 * @param  {int}      profile_id needed to set profile id
 * @return {function} dispatches fetched location to use.
 */
export function fetchPlaceAndCreateFavorite(location, api_token, profile_id) {
  return function(dispatch) {
    dispatch(placeFavoriteMark(location));
    dispatch(
      fetchPredictionPlace(
        location.id,
        response =>
          dispatch(
            createAndFavoriteLocationRequest(response, api_token, profile_id)
          ),
        false,
        true
      )
    );
  };
}

export function rateFailure(errorMessage) {
  return {
    type: RATES_ERROR,
    loading: false,
    payload: {
      message: errorMessage
    }
  };
}
