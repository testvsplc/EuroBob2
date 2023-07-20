// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// REDUX & ROUTER
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

// REACT-NATIVE
import {
    View,
    Text,
    Image
} from 'react-native';

// COMPONENTS
import { Touchable, SearchBar} from '../index';

// IMAGES
import logoEuroBob from '../../img/logos/eurobobLogo.png';

// STYLES
import styles from '../styles/header';

// TRANSLATION
import translation from '../../translations/nl';

class Header extends Component {
    constructor (props) {
        super(props);

        this.renderTitle = this.renderTitle.bind(this);
        this.renderCenterButton = this.renderCenterButton.bind(this);
        this.renderLeftButton = this.renderLeftButton.bind(this);
    }

    renderTitle () {
        const { title, scheme } = this.props;
        const color = scheme === 'white' ? '#000000' : '#FFFFFF';

        return (
            <Text style={[styles.title, {color}]}>
                {title}
            </Text>
        );
    }

    renderLogo () {
        const { logoImage } = this.props;

        return (
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1
            }}
            >
                <Image
                    style={[styles.imageLogo]}
                    source={logoImage ? logoImage : logoEuroBob}
                    key={logoImage ? logoImage : logoEuroBob}
                    resizeMode='contain'
                />
            </View>
        );
    }

    renderSearch () {
        const { onSearchSubmit, customSearchBar } = this.props;
        if (customSearchBar) {
            return customSearchBar;
        }

        return <SearchBar onSearch={onSearchSubmit} />;
    }

    renderCenterButton () {
        const { search, logo, title } = this.props;

        if (logo) {
            return this.renderLogo();
        }
        if (search) {
            return this.renderSearch();
        }
        if (title.length >= 1) {
            return this.renderTitle();
        }
    }

    leftButtonAction () {
        if (this.props.leftButtonAction) {
            Actions.pop();
            this.props.leftButtonAction();
        } else {
            Actions.pop();
        }
    }

    calculateNotifications () {
        const { ride_notifications } = this.props;

        return ride_notifications.expired + ride_notifications.upcomming;
    }

    renderNotifications () {
        const { ride_notifications } = this.props;

        const notifications = this.calculateNotifications();

        if (notifications > 0) {
            return (
                <View style={styles.notification}>
                    <Text style={styles.notificationText}>{notifications}</Text>
                </View>
            );
        }
    }

    renderLeftButton () {
        const state = this.props.navigationState;
        if (state.index === 0 && !this.props.leftButtonText) {
            return;
        }

        if (this.props.leftButtonText) {
            return (
                <Touchable onPress={this.props.leftButtonAction} style={[styles.backButton, styles.backButtonImage, this.props.leftButtonStyle]}>
                    {this.props.leftButtonText}
                    {this.renderNotifications()}
                </Touchable>
            );
        }

        return (
            <Touchable onPress={() => this.leftButtonAction()} style={[styles.backButtonTextHolder, this.props.leftButtonStyle]}>
                <Text style={[styles.backButtonText, this.props.leftButtonTextStyle]}>
                    {translation.GENERAL_CANCEL}
                </Text>
            </Touchable>
        );
    }

    renderRightButton () {
        if (!this.props.rightButtonText) {
            return;
        }

        return (
            <Touchable onPress={this.props.rightButtonAction} style={[styles.rightButton, this.props.rightButtonStyle]}>
                {this.props.rightButtonText}
            </Touchable>
        );
    }

    render () {
        const { scheme, search } = this.props;
        const headerColor = scheme === 'white' ? '#FFFFFF' : '#F5C918';

        return (
            <View style={[styles.header, {backgroundColor: headerColor}]}>
                {this.renderCenterButton()}

                {this.renderLeftButton()}
                {this.renderRightButton()}
            </View>
        );
    }
}

Header.propTypes = {
    title: PropTypes.any,
    navigationState: PropTypes.object,
    logo: PropTypes.bool,
    search: PropTypes.bool,
    scheme: PropTypes.string,
    onSearchSubmit: PropTypes.func,
    leftButtonText: PropTypes.any,
    leftButtonAction: PropTypes.func,
    rightButtonText: PropTypes.any,
    rightButtonAction: PropTypes.func
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select (state) {
    return {
        ride_notifications: state.rides.plannedRides.notifications
    };
}

export default connect(select)(Header);
