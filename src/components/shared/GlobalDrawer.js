// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// REDUX
import { connect } from 'react-redux';

// COMPONENTS
import Drawer from 'react-native-drawer';
import Spinner from 'react-native-spinkit';

// REACT-NATIVE
import {
    View,
    ActivityIndicator,
    Image,
    Text,
    Platform,
    Modal,
    BackHandler
} from 'react-native';

// COMPONTENTS
import { Loader } from '../../components/';

// IMAGES
import splash from '../../img/home-screen/Splash.png';

// REDUX & ROUTER
import {Actions, DefaultRenderer} from 'react-native-router-flux';

// STYLES
import styles from '../styles/customDrawer';

class GlobalDrawer extends Component {

    componentWillMount () {
        BackHandler.addEventListener('hardwareBackPress', () => {
            try {
                Actions.pop();

                return true;
            }
            catch (err) {
                BackHandler.exitApp();

                return true;
            }
        });
    }

    renderApplicationLoader() {
        const { appLoading, initialized } = this.props;

        if (Platform.OS === 'ios') {
            return appLoading && initialized ? <Loader /> : null;
        }
        if (Platform.OS === 'android') {
            return appLoading && initialized ?
                <View>
                    <Modal visible={appLoading} transparent={appLoading} onRequestClose={() => {console.log('useless');}} style={{top: 0}}>
                        <View style={styles.androidIndicator}>
                            <Spinner color="#FFFFFF" isVisible={appLoading} type="Bounce" size={100} />
                        </View>
                    </Modal>
                </View>
            : null;
        }
    }

    render() {
        const state = this.props.navigationState;
        const children = state.children;
        const { chatNotification, onNavigate, message, appLoading, initialized } = this.props;

        return (
            <Drawer>
                {this.renderApplicationLoader()}

                <DefaultRenderer sceneStyle={{backgroundColor:'#FAFAFA', paddingTop: 0}} navigationState={children[0]} onNavigate={onNavigate} />

                {initialized === false ?
                    <View style={[styles.welcomeApp, {backgroundColor: '#F5C918'}]}>
                        <Image
                            style={[styles.welcomeApp]}
                            source={splash}
                        />
                    </View>
                : null}
            </Drawer>
        );
    }
}

GlobalDrawer.propTypes = {
    navigationState: PropTypes.object,
    onNavigate: PropTypes.func,
    chatNotification: PropTypes.bool,
    appLoading: PropTypes.bool
};

function select(state) {
    return {
        chatNotification: state.utility.chatNotification,
        initialized: state.utility.appInitialized,
        appLoading: state.utility.appLoading
    };
}

export default connect(select)(GlobalDrawer);
