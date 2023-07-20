// REACT
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// COMPONENTS
import { Header, PlannedRide, Timer, Touchable } from '../../../components/';

// ROUTER
import { Actions } from 'react-native-router-flux';

// REACT-NATIVE
import {
    View,
    Text,
    Image,
    Share
} from 'react-native';

// IMAGES
import navBarImage from '../../../img/dashboard/navBar-menuButton.png';
import editImage from '../../../img/plan-ride/navBar-editButton-dark.png';
import Bob from '../../../img/plan-ride/avatar-daan-final.png';

// STYLES
import styles from '../styles/ridePlanned';
import { getBottomSpace } from '../../../utility';
import plannedRideStyle from '../../../components/styles/plannedRide'

class RideInProgress extends Component {
    static renderNavigationBar(props) {
        return (
            <Header
                leftButtonText={
                    <Image
                        source={navBarImage}
                    />
                }
                leftButtonAction={() => Actions.refresh({ key: 'drawerDashboardApp', open: true })}
                navigationState={props.navigationState}
                logo={false}
                title={props.title}
            />
        );
    }

    shareRide(type) {
        const { ride } = this.props;
        Share.share({
            title: 'Euro BOB rit!',
            message: 'De Euro BOB rit was geweldig! Boek nu je eigen rit!',
            url: 'http://eurobob.nl/'
        }).catch(err => console.log(err))
    }

    render() {
        const { ride } = this.props;

        return (
            <View style={styles.deviceHeight}>
                <Text style={styles.heading}>
                    Uw rit is bezig. BOB brengt u veilig en vertrouwd naar huis.
                </Text>

                <View style={styles.beerGraphic}>
                    <Image
                        source={Bob}
                    />
                </View>

                <Text style={[styles.subHeading, { marginTop: 25, marginBottom: 10 }]}>Deel jouw rit</Text>

                <Touchable onPress={() => Actions.ride_detail({ ride })} style={styles.ridePlanned}>
                    {ride ?
                        <PlannedRide currentRide={ride} style={{ height: plannedRideStyle.ride.height + getBottomSpace() }} />
                        : null}
                </Touchable>
            </View>
        );
    }
}

RideInProgress.propTypes = {
    ride: PropTypes.object
};

function select(state) {
    return {
        plannedRides: state.rides.plannedRides
    };
}

export default connect(select)(RideInProgress);
