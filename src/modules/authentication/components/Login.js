import React, { Component } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import { Header } from '../../../components/';
import LoginForm from '../forms/LoginForm';

import {
    ScrollView
} from 'react-native';

class Login extends Component {
    static renderNavigationBar (props) {
        return <Header navigationState={props.navigationState} logo={false} title={props.title} />;
    }

    render () {
        return (
        <ScrollView>
            <LoginForm />
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
    };
}

export default connect(select)(Login);
