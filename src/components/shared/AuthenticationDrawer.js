// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// REDUX
import { connect } from 'react-redux';

// COMPONENTS
import Drawer from 'react-native-drawer';

// REACT-NATIVE
import {
    View,
    Image,
    Dimensions
} from 'react-native';

// REDUX & ROUTER
import { Actions, DefaultRenderer } from 'react-native-router-flux';

import splash from '../../img/home-screen/Splash.png';

// STYLES
import styles from '../styles/customDrawer';

const deviceHeight = Dimensions.get('window').height;
const drawerStyles = {
    drawer: {
        height: deviceHeight
    }
};

class AuthenticationDrawer extends Component {

    render () {
        const state = this.props.navigationState;
        const children = state.children;
        const { utility, onNavigate, initialized } = this.props;

        return (
            <Drawer
                type="overlay"
                styles={drawerStyles}
            >
                <DefaultRenderer sceneStyle={{backgroundColor:'#FAFAFA', paddingTop: 0}} navigationState={children[0]} onNavigate={onNavigate} />
            </Drawer>
        );
    }
}

AuthenticationDrawer.propTypes = {
    navigationState: PropTypes.object,
    dispatch: PropTypes.func,
    utility: PropTypes.object,
    onNavigate: PropTypes.func,
    initialized: PropTypes.bool
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select (state) {
    return {
        initialized: state.utility.appInitialized,
        utility: state.utility
    };
}

export default connect(select)(AuthenticationDrawer);
