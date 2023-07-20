// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// REDUX
import { connect } from 'react-redux';

// COMPONENTS
import Drawer from 'react-native-drawer';
import SideMenu from './SideMenu';
import BlurModal from './BlurModal';
import { ReviewRide } from '../../modules/rides/';

// REACT-NATIVE
import {
    View,
    ActivityIndicator,
    Dimensions,
    Text
} from 'react-native';

// REDUX & ROUTER
import {Actions, DefaultRenderer} from 'react-native-router-flux';

// STYLES
import styles from '../styles/customDrawer';

// ACTIONS
import { toggleMenuBlur, toggleModal } from '../../utility/';

const deviceHeight = Dimensions.get('window').height;

const drawerStyles = {
    drawer: {
        height: deviceHeight
    }
};

class CustomDrawer extends Component {
    setBlur () {
        const { dispatch } = this.props;

        setTimeout(() => {
            dispatch(toggleMenuBlur(false));
        }, 10);

        setTimeout(() => {
            dispatch(toggleMenuBlur(true));
        }, 210);
    }

    render () {
        const state = this.props.navigationState;
        const children = state.children;
        const { utility, onNavigate } = this.props;

        return (
            <Drawer
                ref="navigation"
                open={state.open}
                onOpen={() => Actions.refresh({key: state.key, open: true})}
                onClose={() => { Actions.refresh({key: state.key, open: false}); this.setBlur(); }}
                styles={drawerStyles}
                content={state.open ? <SideMenu /> : null}
                type="overlay"
                tapToClose={true}
                openDrawerOffset={0.24}
                panCloseMask={0.24}
                tweenDuration={200}
                negotiatePan={true}
                tweenHandler={(ratio) => ({
                    main: { opacity:Math.max(0.54, 1 - ratio) }
                })}
            >

                <Drawer
                    ref="modal"
                    open={state.openModal}
                    onClose={() => Actions.refresh({key: state.key, openModal: false})}
                    onOpen={() => Actions.refresh({key: state.key, openModal: true})}
                    styles={drawerStyles}
                    content={state.openModal ? <BlurModal><ReviewRide reviewRide={state.reviewRide} /></BlurModal> : null}
                    type="overlay"
                    tweenDuration={1}
                    negotiatePan={true}
                    tweenHandler={(ratio) => ({
                        main: { opacity:Math.max(0.54, 1 - ratio) }
                    })}
                >
                    <DefaultRenderer sceneStyle={{backgroundColor: '#FAFAFA', paddingTop: 0}} navigationState={children[0]} onNavigate={onNavigate} />
                </Drawer>
            </Drawer>
        );
    }
}

CustomDrawer.propTypes = {
    navigationState: PropTypes.object,
    dispatch: PropTypes.func,
    utility: PropTypes.object,
    onNavigate: PropTypes.func
};

function select (state) {

    return {
        utility: state.utility
    };

}

export default connect(select)(CustomDrawer);
