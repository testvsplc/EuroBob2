// REACT
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// COMPONENTS
import { Header, PlannedRide, Button, RadioButton, Touchable } from '../../../components/';

// ROUTER
import { Actions } from 'react-native-router-flux';

// REACT-NATIVE
import {
    View,
    Text,
    Image,
    Dimensions,
    RefreshControl,
    ScrollView
} from 'react-native';

// IMAGES
import navBarImage from '../../../img/dashboard/navBar-menuButton.png';
import noRides from '../../../img/plan-ride/blankState-icon-car.png';

// TRANSLATION
import translation from '../../../translations/nl';

// STYLES
import styles from '../styles/myRides';
const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

// ACTIONS
import { setExpiredOrUpcoming, fetchRides } from '../actions';
import { startStateRefresh, stopStateRefresh } from '../../../utility/';

class MyRides extends Component {
    static renderNavigationBar (props) {
        return (
            <Header
                leftButtonText={
                    <Image
                        source={navBarImage}
                    />
                }
                leftButtonAction={() => Actions.refresh({key: 'drawerDashboardApp', open: true })}
                navigationState={props.navigationState}
                logo={false}
                title={props.title}
            />
        );
    }

    constructor (props) {
        super(props);

        this.onRefresh = this.onRefresh.bind(this);
    }

    onRefresh () {
        const { dispatch, profile, user } = this.props;

        dispatch(startStateRefresh());
        dispatch(fetchRides(profile.profile_id, user.api_token)).then(() => {
            dispatch(stopStateRefresh());
        });
    }

    redirectRide (ride) {
        if (ride.is_current) {
            Actions.ride_in_progress({ride});
        } else {
            Actions.ride_detail({ride});
        }
    }

    renderRides (plannedRides) {
        if (plannedRides.length < 1) {
            return null;
        }

        return plannedRides.map((ride, key) =>
            <Touchable onPress={() => this.redirectRide(ride)} key={key} style={styles.plannedRideContainer}>
                <PlannedRide displayRating={true} style={{borderRadius: 5}} currentRide={ride} />
            </Touchable>
        );
    }

    setCurrent (selected) {
        const { dispatch } = this.props;

        dispatch(setExpiredOrUpcoming(selected));
    }

    componentWillMount () {
        const { dispatch, profile, user } = this.props;

        // fetching user rides
        dispatch(fetchRides(profile.profile_id, user.api_token));
    }

    renderPlanRide () {
        const { plannedRides } = this.props;

        if (plannedRides.upcomingRides.length === 0) {
            return (
                <View>
                    <View style={styles.noRides}>
                        <Image
                            style={{marginTop: 15}}
                            source={noRides}
                        />
                        <Text style={{fontSize: 18, color: '#000000', marginTop: 20, marginBottom: 20}}>{translation.DASHBOARD_NO_RIDES}</Text>
                    </View>
                    <Button onPress={Actions.planride} title={translation.DASHBOARD_PLAN_RIDE} style="alternative" />
                </View>
            );
        }

        return null;
    }

    render () {
        const { displayValue, plannedRides, startHistory, isRefreshing } = this.props;

        const radioOptions = [
            {
                name: 'AANKOMENDE',
                value: 'aankomende',
                right: plannedRides.notifications.upcomming > 0 ? <View style={styles.notification}><Text style={styles.notificationText}>{plannedRides.notifications.upcomming}</Text></View> : null
            },
            {
                name: 'GESCHIEDENIS',
                value: 'geschiedenis',
                right: plannedRides.notifications.expired > 0 ? <View style={styles.notification}><Text style={styles.notificationText}>{plannedRides.notifications.expired}</Text></View> : null
            }
        ];

        return (
            <View style={{}}>
                
                <View style={[styles.scrollViewStyles,{}]}>

                    <RadioButton
                        borderWidth="line"
                        activeTextColor="#5C6773"
                        activeColor="#FFFFFF"
                        normalColor="#FAFAFA"
                        normalBorderColor="#E6E6E6"
                        width={deviceWidth - (deviceWidth / 2)}
                        initialValue={startHistory ? radioOptions[1] : radioOptions[0]}
                        options={radioOptions}
                        onSelect={(selected) => this.setCurrent(selected)}
                    />
                
                    <ScrollView
                        style={{marginTop: 30}}
                        refreshControl={
                            <RefreshControl
                                style={{backgroundColor: '#FAFAFA'}}
                                refreshing={isRefreshing}
                                enabled={true}
                                onRefresh={this.onRefresh}
                                title="loading..."
                                titleColor="#FAFAFA"
                                colors={['#FAFAFA', '#FFFFFF', '#FEFEFE']}
                                progressBackgroundColor="#FFFFFF"
                            />
                        }
                    >
                        {displayValue === 'aankomende' ?
                            <View>
                                {this.renderRides(plannedRides.upcomingRides)}
                                {this.renderPlanRide()}
                            </View>
                        : null}

                        {displayValue === 'geschiedenis' ?
                            <View>
                                {this.renderRides(plannedRides.expiredRides)}
                            </View>
                        : null}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

MyRides.propTypes = {
    plannedRides: PropTypes.object,
    displayValue: PropTypes.string,
    dispatch: PropTypes.func
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select (state) {
    return {
        plannedRides: state.rides.plannedRides,
        displayValue: state.rides.displayValue,
        user: state.authentication.user,
        isRefreshing: state.utility.isRefreshing,
        profile: state.profile.profile
    };
}

export default connect(select)(MyRides);
