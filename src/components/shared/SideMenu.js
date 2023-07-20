// REACT
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// REDUX
import {connect} from 'react-redux';

// ACTIONS
import {ActionConst, Actions} from 'react-native-router-flux';

// REACT-NATIVE
import {Image, Keyboard, Linking, Text, View} from 'react-native';

// COMPONENTS
import Touchable from './Touchable';

// EXTERNAL COMPONENTS
import Communications from 'react-native-communications';

// STYLES
import styles from '../styles/sideMenu';

// IMAGES
import homeImage from '../../img/sidemenu/sideMenu-icon-home.png';
import myRidesImage from '../../img/sidemenu/sideMenu-icon-myRides.png';
import callBobImage from '../../img/sidemenu/sideMenu-icon-phone.png';
import chatBobImage from '../../img/sidemenu/sideMenu-icon-message.png';
import aboutBobImage from '../../img/sidemenu/sideMenu-icon-about.png';
import panRideImage from '../../img/sidemenu/sideMenu-icon-plan.png';
import settingsImage from '../../img/sidemenu/navBar-settingsButton-dark.png';
import userAvatar from '../../img/profile/userAvatar.png';

// TRANSLATION
import translation from '../../translations/nl';

// ACTIONS
import {toggleUserProfile} from '../../modules/authentication/';

class SideMenu extends Component {
    constructor(props) {
        super(props);

        this.renderListItems = this.renderListItems.bind(this);
        this.toggleProfileType = this.toggleProfileType.bind(this);
    }

    componentWillMount() {
        Keyboard.dismiss();
    }

    sideMenuRedirect(scene) {
        Actions.refresh({key: 'drawerDashboardApp', open: false});

        setTimeout(() => {
            scene();
            Actions.refresh();
        }, 210);
    }

    renderListItems() {
        const {rides, user} = this.props;
        const amount = user.walletsamount;
        let listItems;

        if (amount === 0) {
            listItems = [
                {
                    image: homeImage,
                    content: 'Home',
                    onPress: () => this.sideMenuRedirect(() => Actions.dashboard({type: ActionConst.RESET}))
                },
                {
                    image: panRideImage,
                    content: 'Plan een rit',
                    onPress: () => this.sideMenuRedirect(() => Actions.planride())
                },
                {
                    image: myRidesImage,
                    content: translation.DASHBOARD_MY_RIDES,
                    noti: rides.notifications.expired + rides.notifications.upcomming,
                    onPress: () => this.sideMenuRedirect(() => Actions.my_rides())
                },
                {
                    image: callBobImage,
                    content: translation.DASHBOARD_CALL_BOB,
                    onPress: () => Communications.phonecall('310883650808', true)
                },
                {
                    image: chatBobImage,
                    content: translation.DASHBOARD_CHAT_BOB,
                    onPress: () => Linking.openURL('whatsapp://send?phone=310883650808').catch(() => {
                        alert('Zorg ervoor dat Whatsapp op uw apparaat is geïnstalleerd. Gebruik telefoonnummer 310883650808 om met EuroBob te chatten.');
                    })
                },
                {
                    image: aboutBobImage,
                    content: translation.DASHBOARD_ABOUT_EUROBOB,
                    onPress: () => this.sideMenuRedirect(() => Actions.about())
                }
            ];
        } else {
            listItems = [
                {
                    image: homeImage,
                    content: 'Home',
                    onPress: () => this.sideMenuRedirect(() => Actions.dashboard({type: ActionConst.RESET}))
                },
                {
                    image: panRideImage,
                    content: 'Plan een rit',
                    onPress: () => this.sideMenuRedirect(() => Actions.planride())
                },
                {
                    image: myRidesImage,
                    content: translation.DASHBOARD_MY_RIDES,
                    noti: rides.notifications.expired + rides.notifications.upcomming,
                    onPress: () => this.sideMenuRedirect(() => Actions.my_rides())
                },
                {
                    image: callBobImage,
                    content: translation.DASHBOARD_CALL_BOB,
                    onPress: () => Communications.phonecall('310883650808', true)
                },
                {
                    image: chatBobImage,
                    content: translation.DASHBOARD_CHAT_BOB,
                    onPress: () => Linking.openURL('whatsapp://send?phone=310883650808').catch(() => {
                        alert('Zorg ervoor dat Whatsapp op uw apparaat is geïnstalleerd. Gebruik telefoonnummer 310883650808 om met EuroBob te chatten.');
                    })
                },
                {
                    image: aboutBobImage,
                    content: translation.DASHBOARD_ABOUT_EUROBOB,
                    onPress: () => this.sideMenuRedirect(() => Actions.about())
                },
                {
                    image: myRidesImage,
                    content: translation.DASHBOARD_WALLET_EUROBOB,
                    onPress: () => {
                        Linking.openURL(`https://dashboard.eurobob.nl/loginwithtokentowallet/${user.api_token}`)
                    }
                }
            ];
        }

        return listItems.map((item, key) =>
            <Touchable key={key} onPress={item.onPress} style={styles.menuItemView}>
                <View style={{flex: 0.1, marginRight: 10}}>
                    <Image
                        source={item.image}
                    />
                </View>
                {item.noti && item.noti > 0 ?
                    <View style={{flex: 0.7, flexDirection: 'row'}}>
                        <Text style={styles.menuItem}>
                            {item.content}
                        </Text>
                        <View style={styles.notification}>
                            <Text style={styles.notificationText}>
                                {item.noti}
                            </Text>
                        </View>
                    </View>
                    :
                    <Text style={[styles.menuItem, {flex: 0.7}]}>
                        {item.content}
                    </Text>
                }
            </Touchable>
        );
    }

    toggleProfileType(id) {
        const {dispatch, user} = this.props;

        dispatch(toggleUserProfile(id, user));
    }


    render() {

        const {utility, user, profile, rides} = this.props;

        return (
            <View style={[styles.sideMenu]}>

                <View style={{
                    display: 'flex',
                    flexDirection: "row",
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 20
                }}>

                    <View>
                        {user.profile_image ?
                            <Image
                                style={styles.imageStyles}
                                source={{uri: user.profile_image}}
                            />
                            :
                            <Image
                                style={styles.imageStyles}
                                source={userAvatar}
                            />
                        }
                    </View>

                    <Touchable onPress={() => this.sideMenuRedirect(() => Actions.profile())}>
                        <Image
                            source={settingsImage}
                        />
                    </Touchable>

                </View>

                <View style={{marginBottom: 10}}>
                    <Text style={styles.sideMenuHeading}>
                        {user.name}
                    </Text>
                    <Text style={styles.subHeading}>
                        {profile.company_name ? `@${profile.company_name}` : ''}
                    </Text>
                </View>

                <View style={[styles.textContainer, {display: 'flex', flexDirection: "row", marginBottom: 20}]}>
                    <Text style={[styles.textContainer, {paddingRight: 10}]}>
                        <Text style={styles.amountText}>{rides.expiredRides.length}</Text>
                        <Text style={styles.smallText}> Ritten</Text>
                    </Text>
                    <Text style={styles.textContainer}>
                        <Text style={styles.amountText}>{rides.expiredRides.length - rides.notifications.expired}</Text>
                        <Text style={styles.smallText}> Beoordelingen</Text>
                    </Text>
                </View>

                <View>
                    {this.renderListItems()}
                </View>

            </View>
        );
    }
}

SideMenu.propTypes = {
    utility: PropTypes.object,
    user: PropTypes.object,
    profile: PropTypes.object,
    dispatch: PropTypes.func
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select(state) {
    return {
        utility: state.utility,
        rides: state.rides.plannedRides,
        user: state.authentication.user,
        profile: state.profile.profile
    };
}

export default connect(select)(SideMenu);
