// REACT
import React, { Component } from 'react';

// REDUX
import { connect } from 'react-redux';

// COMPONENTS
import { Header } from '../../../components/';
import RegisterForm from '../forms/RegisterForm';

// REACT COMPONENTS
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// REACT-NATIVE
import {
    ScrollView
} from 'react-native';

class Register extends Component {
    static renderNavigationBar (props) {
        return <Header navigationState={props.navigationState} logo={false} title={props.title} />;
    }

    render () {
        return (
            <KeyboardAwareScrollView ref="scroll_register">
                <RegisterForm/>
            </KeyboardAwareScrollView>
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

export default connect(select)(Register);
