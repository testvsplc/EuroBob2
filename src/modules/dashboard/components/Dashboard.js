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
import { getLocation, noLocationAvailable } from '../actions';
import { startStateRefresh, stopStateRefresh, setUpSearch, requestLocationPermission } from '../../../utility/';
import { setFromLocation, fetchRides, updateSeenRides } from '../../rides/';

// REACT-NATIVE
import {
    View,
    Text,
    Image,
    ScrollView,
    RefreshControl,
    Platform,
    Linking
} from 'react-native';

// EXTERNAL COMPONENTS
import Communications from 'react-native-communications';
import Geolocation from '@react-native-community/geolocation';

// IMAGES
import navBarImageYellow from '../../../img/dashboard/navBar-menuButton-yellow.png';
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
import styles from '../styles/dashboard';

// TRANSLATION
import translation from '../../../translations/nl';
import { Dimensions } from "react-native";
import { fetchIsAppOpen } from "../../rides/actions";

import RNSettings from 'react-native-settings'

const ScreenWidth = Dimensions.get('window').width;

let watchID;
class Dashboard extends Component {
    static renderNavigationBar(props) {
        return (
            <Header
                leftButtonText={
                    <Image
                        source={navBarImageYellow}
                        key={navBarImageYellow}
                    />
                }
                leftButtonStyle={Platform.OS === 'android' ? { top: 0 } : { top: 0 }}
                leftButtonAction={() => Actions.refresh({ key: 'drawerDashboardApp', open: true })}
                rightButtonText={
                    <Image
                        key={settingButton}
                        source={settingButton}
                    />
                }
                rightButtonAction={Actions.profile}
                scheme="white"
                navigationState={props.navigationState}
                logo={true}
                title={props.title}
            />
        );
    }

    constructor(props) {
        super(props);

        this.onRefresh = this.onRefresh.bind(this);
        this.pickMeUp = this.pickMeUp.bind(this);
    }

    async componentWillMount() {
        const { dispatch, profile, user } = this.props;

        dispatch(fetchIsAppOpen(user.api_token));

        if (await requestLocationPermission()) {
            // Get current position of mobile,
            // if there's a position set it to initial position and since
            // this also is the 'last position' set it to last. dispatch position.
            Geolocation.getCurrentPosition(
                (position) => {
                    dispatch(getLocation(position.coords.latitude, position.coords.longitude));
                },
                (error) => {
                    dispatch(noLocationAvailable());
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );

            watchID = Geolocation.watchPosition((position) => {
                // if there's new position,
                // dispatch the new position.
                dispatch(getLocation(position.coords.latitude, position.coords.longitude));
            });
        } else {
            dispatch(noLocationAvailable());
        }

        // fetching user rides
        dispatch(fetchRides(profile.profile_id, user.api_token)).then(() => {
            this.checkExpired();
        });

    }

    // We dont want to watch for a new location if
    // we're not on the dashboard.
    componentWillUnmount() {
        if (typeof watchID !== 'undefined') {
            Geolocation.clearWatch(watchID);
        }
    }

    // callback for scrollview. User can scroll down and
    // refresh his location.
    async onRefresh() {
        const { dispatch, profile, user } = this.props;

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

        // fetching user rides
        dispatch(fetchRides(profile.profile_id, user.api_token));
    }

    renderDashboard() {
        const { notifications, plannedRides, chat_notifications } = this.props;

        const touchableItems = [
            {
                text: translation.DASHBOARD_PLAN_RIDE,
                style: [styles.dashboardTouchables, styles.touchableBottom, styles.touchableRight],
                image: dashboardCalendar,
                onPress: Actions.planride,
                imageStyle: styles.touchableImage
            },
            {
                text: translation.DASHBOARD_MY_RIDES,
                style: [styles.dashboardTouchables, styles.touchableBottom],
                image: dashboardCar,
                onPress: Actions.my_rides,
                noti: notifications.expired + notifications.upcomming,
                imageStyle: styles.touchableImage
            },
            {
                text: translation.DASHBOARD_CALL_BOB,
                style: [styles.dashboardTouchables, styles.touchableRight],
                image: dashboardMobile,
                onPress: () => Communications.phonecall('310883650808', true),
                imageStyle: styles.touchableImage
            },
            {
                text: translation.DASHBOARD_CHAT_BOB,
                style: styles.dashboardTouchables,
                image: dashboardMessages,
                onPress: () => Linking.openURL('whatsapp://send?phone=31310883650808').catch(() => {
                    alert('Zorg ervoor dat Whatsapp op uw apparaat is geïnstalleerd. Gebruik telefoonnummer 310883650808 om met Eurobob te chatten.');
                }),
                imageStyle: styles.touchableImage
            }
        ];

        return touchableItems.map((item, key) =>
            <Touchable key={key} style={item.style} onPress={item.onPress}>
                <View>
                    <Image
                        style={item.imageStyle}
                        source={item.image}
                    />
                    {item.noti && item.noti > 0 ?
                        <View style={{ flexDirection: 'row', flex: 1 }}>
                            <Text>{item.text}</Text>

                            <View style={styles.notification}><Text style={styles.notificationText}>{item.noti}</Text></View>
                        </View>
                        :
                        <Text style={{ textAlign: 'center' }}>{item.text}</Text>
                    }
                </View>
            </Touchable>
        );
    }

    renderLocationProvider() {
        const { place, user } = this.props;

        if (!place || (Object.keys(place).length === 0 && place.constructor.name === 'Object')) {
            return (
                <View style={styles.location}>
                    <View style={{ flex: 0.12 }}>
                        {user.profile_image ?
                            <Image
                                style={styles.imageStyles}
                                source={{ uri: user.profile_image }}
                                key={user.profile_image}
                            />
                            :
                            <Image
                                style={styles.imageStyles}
                                source={userAvatar}
                                key={userAvatar}
                            />
                        }
                    </View>

                    <View style={{ flex: 0.12 }}>
                        <Image
                            source={noLocation}
                        />
                    </View>

                    <View style={{ flex: 0.4, paddingTop: 3 }}>
                        <Text style={{ color: '#FFFFFF' }}>{translation.DASHBOARD_NO_GPS}</Text>
                        <Text style={{ color: '#FFFFFF' }}>{translation.DASHBOARD_NO_LOCATION}</Text>
                    </View>
                    <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
                        <Touchable onPress={() => this.openAppSettings()} style={{ marginTop: 6, width: 85, borderWidth: 2, borderColor: '#FFFFFF', borderRadius: 15, overflow: 'hidden' }}>
                            <Text style={styles.pickMeUp}>Schakel GPS in</Text>
                        </Touchable>
                    </View>
                </View>
            );
        }

        return (
            <View style={styles.location}>
                <View style={{ flex: 0.14 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <View style={{ flex: 0.14 }}>
                            {user.profile_image ?
                                <Image
                                    style={styles.imageStyles}
                                    source={{ uri: user.profile_image }}
                                    key={user.profile_image}
                                />
                                :
                                <Image
                                    style={styles.imageStyles}
                                    source={userAvatar}
                                    key={userAvatar}
                                />
                            }
                        </View>

                    </View>
                </View>
                <View style={{ flex: 0.12 }}>
                    <Image
                        source={locationPointer}
                    />
                </View>
                <View style={{ flex: 0.4, marginTop: 5 }}>
                    <Text style={{ color: '#FFFFFF' }}>{place.name}</Text>
                    <Text style={{ color: '#FFFFFF' }}>{place.vicinity}</Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'flex-end' }}>
                    <Touchable onPress={() => this.pickMeUp()} style={{ marginTop: 10, width: 85, borderWidth: 2, borderColor: '#FFFFFF', borderRadius: 15, overflow: 'hidden' }}>
                        <Text style={styles.pickMeUp}>{translation.DASHBOARD_PICK_ME_UP}</Text>
                    </Touchable>
                </View>
            </View>
        );
    }

    redirectRide(ride) {
        if (ride.is_current) {
            Actions.ride_in_progress({ ride });
        } else {
            Actions.ride_detail({ ride });
        }
    }

    renderRides() {
        const { plannedRides } = this.props;

        return plannedRides.map((ride, key) =>
            <Touchable onPress={() => this.redirectRide(ride)} key={key} style={styles.plannedRideContainer}>
                <PlannedRide style={{ borderRadius: 5 }} currentRide={ride} />
            </Touchable>
        );
    }


    pickMeUp() {
        const { dispatch, place } = this.props;
        const setupPlace = setUpSearch(place);

        dispatch(setFromLocation(setupPlace));
        Actions.planride();
    }

    renderScrollIndicator() {
        const { plannedRides } = this.props;

        if (plannedRides.length > 1) {
            return (
                <View style={styles.chevronDown}>
                    <Image
                        source={chevronDown}
                    />
                </View>
            );
        }

        return null;
    }
    checkExpired() {
        const { expiredRides, profile, user, dispatch } = this.props;

        if (expiredRides.length > 0) {

            departure = 0;
            remember = 0;
            for (i = 0; i < expiredRides.length; i++) {
                if (expiredRides[i].start_date >= departure && expiredRides[i].rating === 0 && expiredRides[i].seen_review == "false") {
                    departure = expiredRides[i].start_date;
                    remember = i + 1;
                }

            }

            if (remember > 0) {
                ride = expiredRides[remember - 1];

                dispatch(updateSeenRides(profile.profile_id, user.api_token)).then(() => {
                    Actions.refresh({
                        key: 'drawerDashboardApp',
                        openModal: true,
                        reviewRide: ride
                    })
                });
            }
        }
        return null;
    }

    async openAppSettings() {
        if (Platform.OS) {
            await Linking.canOpenURL('app-settings:');
            Linking.openURL('app-settings:')
        } else {
            await RNSettings.openSetting(RNSettings.ACTION_LOCATION_SOURCE_SETTINGS);
        }
    }

    render() {
        const { isRefreshing, plannedRides } = this.props;

        return (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        style={{ backgroundColor: '#F5C918' }}
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

                    <View style={[styles.flexContainer, { marginBottom: 5 }]}>
                        {this.renderDashboard()}
                    </View>

                    {plannedRides.length > 0 ?

                        <View style={{ marginTop: 15 }}>
                            {this.renderRides()}
                        </View>

                        :
                        <View style={{ marginBottom: 25 }}>
                            <View style={styles.noRides}>
                                <Image
                                    style={{ marginTop: 15 }}
                                    source={noRides}
                                />
                                <Text style={{ fontSize: 18, color: '#FFFFFF', marginTop: 10, marginBottom: 10 }}>{translation.DASHBOARD_NO_RIDES}</Text>
                            </View>

                            <Button onPress={Actions.planride} styles={{ button: { color: '#FFFFFF' } }} title={translation.DASHBOARD_PLAN_RIDE} style="white" />
                        </View>
                    }
                    {this.renderScrollIndicator()}

                </View>
            </ScrollView>
        );

    }
}

Dashboard.propTypes = {
    dispatch: PropTypes.func,
    place: PropTypes.object,
    isRefreshing: PropTypes.bool,
    noPlannedRides: PropTypes.bool,
    expiredRides: PropTypes.array,
    plannedRides: PropTypes.array,
    user: PropTypes.object,
    profile: PropTypes.object
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select(state) {
    return {
        place: state.dashboard.place,
        isRefreshing: state.utility.isRefreshing,
        noPlannedRides: state.dashboard.noPlannedRides,
        notifications: state.rides.plannedRides.notifications,
        expiredRides: state.rides.plannedRides.expiredRides,
        plannedRides: state.rides.plannedRides.upcomingRides,
        profile: state.profile.profile,
        user: state.authentication.user
    };
}

export default connect(select)(Dashboard);
