// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { Header, SearchCard, SearchBar } from '../../../components/';

// ROUTER & REDUX
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

// REACT-NATIVE
import {
    View,
    ScrollView,
    Text,
    RefreshControl,
    Image
} from 'react-native';

// IMAGES
import closeModal from '../../../img/plan-ride/navBar-closeButton-dark.png';
import Geolocation from '@react-native-community/geolocation';

// STYLES
import styles from '../styles/searchLocation';

// ACTIONS
import { addLocationToFavoritesRequest, removeLocationToFavoritesRequest, setFromLocation, setToLocation, setStopLocation, fetchPredictions, fetchPredictionPlace, fetchPlaceAndCreateFavorite } from '../index';
import { toggleSearch, startStateRefresh, stopStateRefresh, setUpSearch, requestLocationPermission } from '../../../utility/';
import { setCreateAddress, editAddressLocation } from '../../profile/';
import { getLocation, noLocationAvailable } from '../../dashboard/';
import { setAddressInfo } from '../../authentication/';


// WatchID is used for updating the current position,
// id will be cleared on component unmount.
let watchID;

class SearchLocation extends Component {
    static renderNavigationBar (props) {
        const { dispatch } = props;
        console.log(props);

        return (
            <Header
                leftButtonText={
                    <Image
                        source={closeModal}
                        key={closeModal}
                    />
                }
                leftButtonAction={() => Actions.pop()}
                navigationState={props.navigationState}
                logo={false}
                title={props.title}
                search={true}
                customSearchBar={<SearchBar initialValue={props.initialValue} onSearch={(query) => dispatch(fetchPredictions(query))} />}
            />
        );
    }

    constructor (props) {
        super(props);

        this.addToFavorites = this.addToFavorites.bind(this);
        this.createAndAddFavorite = this.createAndAddFavorite.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
        this.removeFromFavorites = this.removeFromFavorites.bind(this);
        this.setLocationCallback = this.setLocationCallback.bind(this);
        this.renderCurrentLocation = this.renderCurrentLocation.bind(this);
    }

    async componentWillMount () {
        const { dispatch, profile, user } = this.props;

        if (await requestLocationPermission()) {
            // Get current position of mobile,
            // if there's a position set it to initial position and since
            // This also is the 'last position' aslo set it to last. dispatch position.
            Geolocation.getCurrentPosition(
                (position) => {
                    dispatch(getLocation(position.coords.latitude, position.coords.longitude));
                },
                (error) => {
                    dispatch(noLocationAvailable());
                },
                {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
            );

            watchID = Geolocation.watchPosition((position) => {
                // if there's new position,
                // dispatch the new position.
                dispatch(getLocation(position.coords.latitude, position.coords.longitude));
            });
        } else {
            dispatch(noLocationAvailable());
        }
    }

    componentWillUnmount () {
        const { dispatch } = this.props;
        if (typeof watchID !== 'undefined') {
            Geolocation.clearWatch(watchID);
        }

        dispatch(toggleSearch(false));
    }

    // callback for scrollview. User can scroll down and
    // refresh his location.
    async onRefresh () {
        const { dispatch } = this.props;

        if (await requestLocationPermission()) {
            // Setting isRefreshing state to true so we can
            // display the loader. Dispatch gives us a on success callback,
            // hide loader when API call gives back a success.
            dispatch(startStateRefresh());
            Geolocation.getCurrentPosition(
                (newPosition) => {
                    dispatch(getLocation(newPosition.coords.latitude, newPosition.coords.longitude))
                        .then(() => setTimeout(() => dispatch(stopStateRefresh()), 2000));
                },
                (error) => {
                    dispatch(stopStateRefresh());
                    dispatch(noLocationAvailable());
                }
            );
        } else {
            dispatch(noLocationAvailable());
        }
    }

    // Adding favorites, doh.
    addToFavorites (location) {
        const { dispatch, user } = this.props;

        dispatch(addLocationToFavoritesRequest(location, user.api_token));
    }

    // creating and adding favorites, doh.
    createAndAddFavorite (location) {
        const { dispatch, user, profile } = this.props;

        dispatch(fetchPlaceAndCreateFavorite(location, user.api_token, profile.profile_id));
    }

    // removing favorites, doh.
    removeFromFavorites (location) {
        const { dispatch, user } = this.props;

        dispatch(removeLocationToFavoritesRequest(location, user.api_token));
    }

    // Check if we need to pass a to or from location.
    // Set correct dispatch, go back scene when dispatched.
    setLocationCallback (location) {
        const { dispatchType, dispatch, order } = this.props;

        if (dispatchType === 'from') {
            dispatch(setFromLocation(location));
            Actions.pop();
        }
        if (dispatchType === 'to') {
            dispatch(setToLocation(location));
            Actions.pop();
        }
        if (dispatchType === 'stop') {
            const locationWithOrder = {
                ...location,
                order
            };

            dispatch(setStopLocation(locationWithOrder));
            Actions.pop();
        }
        if (dispatchType === 'address') {
            dispatch(setCreateAddress(location));
            Actions.pop();
        }
        if (dispatchType === 'home') {
            dispatch(setAddressInfo(location));
            Actions.pop();
        }

        if (dispatchType === 'home_edit') {
            dispatch(editAddressLocation(location));
            Actions.pop();
        }
    }

    getAndSetPlace (location) {
        const { dispatch } = this.props;
        if (location.address_id) {
            this.setLocationCallback(location);
        } else if (location.actual_response) {
            dispatch(fetchPredictionPlace(location.actual_response.place_id, this.setLocationCallback));
        } else {
            dispatch(fetchPredictionPlace(location.id, this.setLocationCallback));
        }
    }

    renderSearches (locations, onPress) {
        return locations.map((location, key) =>
            <SearchCard key={key} currentKey={key} location={location} length={locations.length} onButtonClick={() => this.getAndSetPlace(location)} onImageClick={() => onPress(location)} />
        );
    }

    renderCurrentLocation () {
        const { place } = this.props;

        if (!place || (Object.keys(place).length === 0 && place.constructor.name === 'Object')) {
            return;
        }

        const currentSetup = setUpSearch(place);
        const currentLocation = Object.assign({}, currentSetup, {is_current: true});

        return this.renderSearches([currentLocation], () => null);
    }

    render () {
        const { locations, profileLocations, searching, isRefreshing } = this.props;

        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        style={{backgroundColor: '#FAFAFA'}}
                        refreshing={isRefreshing}
                        onRefresh={this.onRefresh}
                        title="loading..."
                        titleColor="#FAFAFA"
                        colors={['#F5C918', '#F5C918', '#F5C918']}
                        progressBackgroundColor="#F5C918"
                    />
                }
            >
                {searching ?
                    <View style={styles.locationCard}>
                        {this.renderSearches(locations.searchResults, this.createAndAddFavorite)}
                    </View>
                :
                    <View>
                        <View style={styles.locationCard}>
                            <View style={styles.headingBackground}>
                                <Text style={styles.locationHeading}>
                                    HUIDIGE LOCATIE
                                </Text>
                            </View>
                            {this.renderCurrentLocation()}
                        </View>

                        <View style={styles.locationCard}>
                            <View style={styles.headingBackground}>
                                <Text style={styles.locationHeading}>
                                    THUIS
                                </Text>
                            </View>
                            {this.renderSearches([profileLocations.home],() => null)}
                        </View>

                        <View style={styles.locationCard}>
                            <View style={styles.headingBackground}>
                                <Text style={styles.locationHeading}>
                                    FAVORIETEN
                                </Text>
                            </View>
                            {this.renderSearches(profileLocations.favorites, this.removeFromFavorites)}
                        </View>

                        <View style={styles.locationCard}>
                            <View style={styles.headingBackground}>
                                <Text style={styles.locationHeading}>
                                    RECENTE ADRESSEN
                                </Text>
                            </View>
                            {this.renderSearches(profileLocations.recent, this.addToFavorites)}
                        </View>
                    </View>
                }
            </ScrollView>
        );
    }
}

SearchLocation.propTypes = {
    locations: PropTypes.object,
    dispatch: PropTypes.func,
    dispatchType: PropTypes.string,
    searching: PropTypes.bool,
    initialValue: PropTypes.string
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select (state) {
    return {
        locations: state.locations,
        isRefreshing: state.utility.isRefreshing,
        profileLocations: state.profile.addresses,
        profile: state.profile.profile,
        place: state.dashboard.place,
        user: state.authentication.user,
        searching: state.utility.searching
    };
}


export default connect(select)(SearchLocation);
