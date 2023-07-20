// REACT
import React, { Component } from 'react';

// REDUX
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

// COMPONENTS
import { Header } from '../../../components/';
import RegisterSuccessForm from '../forms/RegisterSuccessForm';

// REACT-NATIVE
import {
    View,
    Image
} from 'react-native';

// IMAGES
import navBarImage from '../../../img/dashboard/navBar-menuButton.png';

class RegisterSuccess extends Component {
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

    render () {
        return (
            <View>
                <RegisterSuccessForm/>
            </View>
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
    };
}

export default connect(select)(RegisterSuccess);
