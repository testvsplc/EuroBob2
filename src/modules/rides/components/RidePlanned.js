// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

// COMPONENTS
import { Header, PlannedRide, Timer, Touchable } from '../../../components/';

// ROUTER
import { Actions } from 'react-native-router-flux';

// REACT-NATIVE
import {
    View,
    Text,
    Image,
    Platform
} from 'react-native';

// IMAGES
import navBarImage from '../../../img/dashboard/navBar-menuButton.png';
import editImage from '../../../img/plan-ride/navBar-editButton-dark.png';
import callImage from '../../../img/plan-ride/navBar-callButton-dark.png';
import beerGraphic from '../../../img/plan-ride/beer-graphic-md.png';

// STYLES
import styles from '../styles/ridePlanned';
import plannedRideStyle from '../../../components/styles/plannedRide'

// TRANSLATION
import translation from '../../../translations/nl';
import { getBottomSpace } from '../../../utility';

class RidePlanned extends Component {
    static renderNavigationBar (props) {
        function determineRightAction (a, b) {
            const _MS_PER_HOUR = 1000 * 60 * 60
            const distance = a - b;

            return Math.floor(distance / _MS_PER_HOUR);
        }

        const hourDiff = determineRightAction(new Date(props.ride.start_date * 1000), new Date());

        return (
            <Header
                leftButtonText={
                    <Image
                        source={navBarImage}
                    />
                }
                rightButtonText={
                    <Image
                        key={editImage}
                        source={props.ride.is_current || hourDiff <= 0 ? callImage : editImage}
                    />
                }
                leftButtonAction={() => Actions.refresh({key: 'drawerDashboardApp', open: true })}
                rightButtonAction={props.ride.is_current || hourDiff <= 0 ? () => Actions.contact() : () => Actions.planride({ride: props.ride[0]})}
                navigationState={props.navigationState}
                logo={false}
                title={props.title}
            />
        );
    }

    render () {
        const ride = this.props.ride[0];

        return (
            <View style={styles.deviceHeight}>
                <Text style={styles.heading}>
                    {ride.ride_updated ? translation.RIDE_PLANNED_PLANNED_UPDATED : translation.RIDE_PLANNED_PLANNED}
                </Text>

                <View style={styles.beerGraphic}>
                    <Image
                        source={beerGraphic}
                    />
                </View>

                <View style={{marginTop: 25, flex: 0.1 }}>
                    <Timer startDate={ride.start_date} center={true} />
                </View>
                <Text style={styles.subHeading}>{translation.RIDE_PLANNED_ARRIVAL}</Text>

                <Touchable onPress={() => Actions.ride_detail({ride})} style={styles.ridePlanned}>
                    {ride ?
                        <PlannedRide currentRide={ride} rideOverview={true} overViewOpen={false} style={{ height: plannedRideStyle.ride.height + getBottomSpace()}} />
                    : null}
                </Touchable>
            </View>
        );
    }
}

RidePlanned.propTypes = {
    plannedRides: PropTypes.object
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select (state) {
    return {
        plannedRides: state.rides.plannedRides
    };
}

export default connect(select)(RidePlanned);
