// REACT
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// COMPONENTS
import { Header, RadioButton } from '../../../components/';
import { Profile, Addresses, Preferences } from '../../profile/';

// ROUTER
import { Actions } from 'react-native-router-flux';

// REACT-NATIVE
import {
    View,
    Image,
    Platform,
    Dimensions,
    ScrollView
} from 'react-native';

// IMAGES
import navBarImage from '../../../img/dashboard/navBar-menuButton.png';
import navBarAdd from '../../../img/profile/navBar-addButton-dark.png';

// STYLES
import styles from '../styles/profileOverview';
const deviceWidth = Dimensions.get('window').width;

// ACTIONS
import { setSelectedEditProp, fetchAddresses, fetchProfile } from '../actions';

// TRANSLATION
import translation from '../../../translations/nl';

class ProfileOverview extends Component {
    static renderNavigationBar (props) {
        return (
            <Header
                leftButtonText={
                    <Image
                        source={navBarImage}
                    />
                }
                leftButtonAction={() => Actions.refresh({key: 'drawerDashboardApp', open: true })}
                rightButtonText={
                    props.addresses ?
                    <Image
                        source={navBarAdd}
                    />
                    : null
                }
                rightButtonAction={props.addresses ? () => Actions.edit_adresses() : null}
                navigationState={props.navigationState}
                logo={false}
                title={props.title}
            />
        );
    }

    componentWillMount () {
        const { dispatch, user, profile } = this.props;

        dispatch(fetchAddresses(profile.profile_id, user.api_token));
        dispatch(fetchProfile(profile.profile_id, user.api_token));
    }

    shouldComponentUpdate (nextProps) {
        const { user, dispatch, profile } = this.props;
        if (user.type !== nextProps.user.type) {
            console.log(nextProps);
            dispatch(fetchAddresses(nextProps.profile.profile_id, user.api_token));
        }

        return true;
    }

    // If current page is address page,
    // allow user to create new addresses via button.
    setCurrent (selected) {
        const { dispatch, addresses } = this.props;

        if (!addresses && selected === 'addressen') {
            Actions.refresh({addresses: true});
        } else if (addresses && selected !== 'addressen') {
            Actions.refresh({addresses: false});
        }

        dispatch(setSelectedEditProp(selected));
    }

    renderEditScreen () {
        const { selectedEditProp } = this.props;

        switch (selectedEditProp) {
        case 'profiel' :
            return (
                <Profile />
            );
            break;
        case 'addressen' :
            return (
                <Addresses />
            );
            break;
        case 'voorkeuren' :
            return (
                <Preferences />
            );
            break;
        default:
            return (
                <Profile />
            );
        }

        return <View />;
    }

    render () {
        const radioOptions = [
            {
                name: translation.PROFILE_OVERVIEW_RADIO_PROFILE,
                value: 'profiel'
            },
            {
                name: translation.PROFILE_OVERVIEW_RADIO_ADDRESSES,
                value: 'addressen'
            },
            {
                name: translation.PROFILE_OVERVIEW_RADIO_PREFERENCES,
                value: 'voorkeuren'
            }
        ];

        return (
            <View>
                <RadioButton borderWidth="line" activeTextColor="#5C6773" activeColor="#FFFFFF" normalColor="#FAFAFA" normalBorderColor="#E6E6E6" width={deviceWidth / 3} initialValue={radioOptions[0]} options={radioOptions} onSelect={(selected) => this.setCurrent(selected)} />

                <View style={styles.scrollViewStyles}>
                    <ScrollView>
                        {this.renderEditScreen()}
                    </ScrollView>
                </View>
            </View>
        );
    }
}

ProfileOverview.propTypes = {
    dispatch: PropTypes.func,
    selectedEditProp: PropTypes.string,
    profile: PropTypes.object,
    user: PropTypes.object
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select (state) {
    return {
        selectedEditProp: state.profile.selectedEditProp,
        profile: state.profile.profile,
        user: state.authentication.user
    };
}

export default connect(select)(ProfileOverview);
