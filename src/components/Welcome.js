// REACT
import React, { Component } from 'react';
import DeviceInfo from 'react-native-device-info';

// REDUX & ROUTER FUNCTIONS
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

// COMPONENTS
import Header from './shared/Header';
import Button from './shared/Button';
import Carousel from 'react-native-carousel';

// REACT-NATIVE
import {
    View,
    Text,
    Image,
    Platform,
    ScrollView,
    AsyncStorage,
    Dimensions
} from 'react-native';

// SLIDES
import slideEuroBob1 from '../img/home-screen/onboarding01.png';
import slideEuroBob2 from '../img/home-screen/onboarding02.png';
import slideEuroBob3 from '../img/home-screen/onboarding03.png';
import slideEuroBob4 from '../img/home-screen/onboarding04.png';

// STYLES
import styles from './styles/welcome';

// TRANSLATION
import translation from '../translations/nl';

import { identifyUser, removeUserToken, setNewOneSignalId } from '../modules/authentication/';
import { initApp } from '../utility/';

class Welcome extends Component {
    static renderNavigationBar (props) {
        return <Header navigationState={props.navigationState} logo={true} title={props.title} />;
    }

    componentWillMount () {
        const { dispatch } = this.props;
        let {width, height} = Dimensions.get('window');
        console.log(width, height);

        AsyncStorage.getItem('@ApiToken', (err, token) => {
            if (token !== null) {
                dispatch(identifyUser(token, (devices) => this.checkOneSignal(devices)));
            } else {
                dispatch(initApp(true));
            }
        });
    }

    checkOneSignal (devices) {
        const { dispatch, one_signal_player_id, authentication } = this.props;

        devices.map((device) => {
            const deviceID = DeviceInfo.getUniqueID();
            const playerID = device.one_signal_player_id;

            if (device.unique_id === deviceID && playerID !== one_signal_player_id) {
                dispatch(setNewOneSignalId(device.device_id, one_signal_player_id, authentication.user.api_token));
            }

            return device;
        });
    }

    renderSlides () {
        const slides = [
            {
                title   : translation.WELCOME_SLIDE_ONE_TITLE,
                content : translation.WELCOME_SLIDE_ONE_CONTENT,
                image   : slideEuroBob1
            },
            {
                title   : translation.WELCOME_SLIDE_TWO_TITLE,
                content : translation.WELCOME_SLIDE_TWO_CONTENT,
                image   : slideEuroBob2
            },
            {
                title   : translation.WELCOME_SLIDE_THREE_TITLE,
                content : translation.WELCOME_SLIDE_TRHEE_CONTENT,
                image   : slideEuroBob3
            },
            {
                title   : translation.WELCOME_SLIDE_FOUR_TITLE,
                content : translation.WELCOME_SLIDE_FOUR_CONTENT,
                image   : slideEuroBob4
            }
        ];

        return slides.map((slide, key) =>
            <View key={key} style={styles.containerCarousel}>
                <Text style={styles.heading}>
                    {slide.title}
                </Text>
                <Text style={styles.content}>
                    {slide.content}
                </Text>
                <Image
                    style={styles.image}
                    source={slide.image}
                    resizeMode='contain'
                />
            </View>
        );
    }

    render () {
        const { initialized } = this.props;

        return (
            <ScrollView style={{backgroundColor: '#f4c835'}}>
                <View style={{height: 2000, left:0, right:0, backgroundColor: '#FFFFFF', position: 'absolute'}}></View>
                <View style={styles.container}>
                    <Carousel
                        width={Dimensions.get('window').width}
                        delay={10000}
                        hideIndicators={false}
                        indicatorAtBottom={true}
                        indicatorOffset={5}
                        indicatorSize={25}
                        indicatorSpace={15}
                        indicatorColor="#FFFFFF"
                        inactiveIndicatorColor="#FAE48B"
                        flex="1"
                    >
                        {this.renderSlides()}
                    </Carousel>
                </View>
                <View style={{backgroundColor: '#FFFFFF'}}>
                    <Button onPress={Actions.signup} title={translation.WELCOME_AANMELDEN} style="main" />

                    <View style={{marginBottom: 10}}>
                        <Button onPress={Actions.login} title={translation.WELCOME_LOGIN} style="alternative" />
                    </View>

                    <View style={{marginBottom: 10}}>
                        <Text onPress={Actions.dashboard_demo} style={styles.explore}>Verken de Euro BOB app</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select (state) {
    return {
        initialized: state.utility.appInitialized,
        one_signal_player_id: state.utility.one_signal_player_id,
        authentication: state.authentication
    };
}

export default connect(select)(Welcome);
