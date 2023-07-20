import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

// COMPONENTS
import {
    Header,
    Button,
    Touchable,
    PlannedRide
} from '../../../components/';

// ACTIONS
import { getLocation, noLocationAvailable } from '../../dashboard/';
import { startStateRefresh, stopStateRefresh, setUpSearch, requestLocationPermission } from '../../../utility/';
import { setFromLocation, fetchRides } from '../../rides/';

// REACT-NATIVE
import {
    View,
    Text,
    Image,
    ScrollView,
    RefreshControl,
    Platform
} from 'react-native';

// EXTERNAL COMPONENTS
import Communications from 'react-native-communications';
import Geolocation from '@react-native-community/geolocation';

// IMAGES
import navBarImage from '../../../img/dashboard/navBar-menuButton-yellow.png';
import dashboardCalendar from '../../../img/dashboard/dashboard-icon-plan.png';
import dashboardCar from '../../../img/dashboard/dashboard-icon-myRides.png';
import dashboardMobile from '../../../img/dashboard/dashboard-icon-contact.png';
import dashboardMessages from '../../../img/dashboard/dashboard-icon-message.png';
import noRides from '../../../img/dashboard/icon-car.png';
import locationPointer from '../../../img/dashboard/input-locationButton-active-alt.png';
import noLocation from '../../../img/dashboard/input-locationButton-normal-alt.png';
import settingButton from '../../../img/dashboard/navBar-settingsButton.png';
import userAvatar from '../../../img/profile/userAvatar.png';
import chevronDown from '../../../img/dashboard/input-dropDownButton-normalWhite.png';

// STYLES
import styles from '../../dashboard/styles/dashboard';

// TRANSLATION
import translation from '../../../translations/nl';

// WatchID is used for updating the current position,
// id will be cleared on component unmount.
let watchID;

class DashboardDemo extends Component {
    static renderNavigationBar (props) {
        return (
            <Header
                leftButtonStyle={{top: 0}}
                leftButtonText={<Text style={{color: '#F5C918'}}>Terug</Text>}
                leftButtonAction={() => Actions.pop()}
                scheme="white"
                navigationState={props.navigationState}
                logo={true}
                title={props.title}
            />
        );
    }

    constructor (props) {
        super(props);

        this.onRefresh = this.onRefresh.bind(this);
        this.pickMeUp = this.pickMeUp.bind(this);
    }

   async componentWillMount () {
        const { dispatch } = this.props;

        if (await requestLocationPermission()) {

            console.log('GET STUFF');
            // Get current position of mobile,
            // if there's a position set it to initial position and since
            // This also is the 'last position' aslo set it to last. dispatch position.
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log('GOT ACTUAL STUFF');
                    dispatch(getLocation(position.coords.latitude, position.coords.longitude));
                },
                (error) => {
                    console.log(error);
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

    // We dont want to watch for a new location if
    // we're not on the dashboard.
    componentWillUnmount () {
        if (typeof watchID !== 'undefined') {
            Geolocation.clearWatch(watchID);
        }
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

    renderDashboard () {
        const touchableItems = [
            {
                text        : translation.DASHBOARD_PLAN_RIDE,
                style       : [styles.dashboardTouchables, styles.touchableBottom, styles.touchableRight],
                image       : dashboardCalendar,
                onPress     : Actions.planride_demo,
                imageStyle  : styles.touchableImage
            },
            {
                text        : translation.DASHBOARD_MY_RIDES,
                style       : [styles.dashboardTouchables, styles.touchableBottom],
                image       : dashboardCar,
                onPress     : Actions.signup,
                imageStyle  : styles.touchableImage
            },
            {
                text        : translation.DASHBOARD_CALL_BOB,
                style       : [styles.dashboardTouchables, styles.touchableRight],
                image       : dashboardMobile,
                onPress     : () => Communications.phonecall('310883650808', true),
                imageStyle  : styles.touchableImage
            },
            {
                text        : translation.DASHBOARD_CHAT_BOB,
                style       : styles.dashboardTouchables,
                image       : dashboardMessages,
                onPress     : Actions.signup,
                imageStyle  : styles.touchableImage
            }
        ];

        return touchableItems.map((item, key) =>
            <Touchable key={key} style={item.style} onPress={item.onPress}>
                <View>
                    <Image
                        style={item.imageStyle}
                        source={item.image}
                    />
                    <Text>{item.text}</Text>
                </View>
            </Touchable>
        );
    }

    renderLocationProvider () {
        const { place } = this.props;

        if (!place || (Object.keys(place).length === 0 && place.constructor.name === 'Object')) {
            return (
                <View style={styles.location}>
                    <View style={{flex:0.12}}>
                        <Image
                            style={styles.imageStyles}
                            source={userAvatar}
                            key={userAvatar}
                        />
                    </View>

                    <View style={{flex:0.12}}>
                        <Image
                            source={noLocation}
                        />
                    </View>

                    <View style={{flex: 0.7, paddingTop: 3}}>
                        <Text style={{color: '#FFFFFF'}}>{translation.DASHBOARD_NO_GPS}</Text>
                        <Text style={{color: '#FFFFFF'}}>{translation.DASHBOARD_NO_LOCATION}</Text>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.location}>
                <View style={{flex: 0.2}}>
                    <View style={{flexDirection: 'row', flex: 1}}>
                        <View style={{flex:0.2}}>
                            <Image
                                style={styles.imageStyles}
                                source={userAvatar}
                                key={userAvatar}
                            />
                        </View>
                        <View style={{flex:0.2}}>
                            <Image
                                source={locationPointer}
                            />
                        </View>
                    </View>
                </View>
                <View style={{flex: 0.4, marginTop: 5}}>
                    <Text style={{color: '#FFFFFF'}}>{place.name}</Text>
                    <Text style={{color: '#FFFFFF'}}>{place.vicinity}</Text>
                </View>
                <View style={{flex: 0.3, alignItems: 'flex-end'}}>
                    <Touchable onPress={() => this.pickMeUp()} style={{ marginTop: 10, width: 85, borderWidth: 2, borderColor: '#FFFFFF', borderRadius: 15, overflow: 'hidden'}}>
                        <Text style={styles.pickMeUp}>{translation.DASHBOARD_PICK_ME_UP}</Text>
                    </Touchable>
                </View>
            </View>
        );
    }

    pickMeUp () {
        const { dispatch, place } = this.props;
        const setupPlace = setUpSearch(place);

        dispatch(setFromLocation(setupPlace));
        Actions.planride_demo();
    }


    render () {
        const { isRefreshing } = this.props;

        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        style={{backgroundColor: '#F5C918'}}
                        refreshing={isRefreshing}
                        enabled={true}
                        onRefresh={this.onRefresh}
                        tintColor="#FFFFFF"
                        title="loading..."
                        titleColor="#F5C918"
                        colors={['#F5C918', '#FFFFFF', '#FEFEFE']}
                        progressBackgroundColor="#FFFFFF"
                    />
                }
            >
                <View>
                    <View>
                        {this.renderLocationProvider()}
                    </View>

                    <View style={[styles.flexContainer, {marginBottom: 5}]}>
                        {this.renderDashboard()}
                    </View>

                    <View style={{marginBottom: 25}}>
                        <View style={styles.noRides}>
                            <Image
                                style={{marginTop: 15}}
                                source={noRides}
                            />
                            <Text style={{fontSize: 18, color: '#FFFFFF', marginTop: 10, marginBottom: 10}}>{translation.DASHBOARD_NO_RIDES}</Text>
                        </View>

                        <Button onPress={Actions.planride_demo} styles={{button: {color: '#FFFFFF'}}} title={translation.DASHBOARD_PLAN_RIDE} style="white" />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

DashboardDemo.propTypes = {
    dispatch: PropTypes.func,
    place: PropTypes.object,
    isRefreshing: PropTypes.bool
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select (state) {
    return {
        place: state.dashboard.place,
        isRefreshing: state.utility.isRefreshing,
        noPlannedRides: state.dashboard.noPlannedRides
    };
}

export default connect(select)(DashboardDemo);
