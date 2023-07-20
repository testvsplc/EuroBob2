import React, { Component } from 'react';
import { connect } from 'react-redux';

// COMPONENTS
import { Header } from '../../../components/';
import ForgotPasswordForm from '../forms/ForgotPasswordForm';

import {
    ScrollView
} from 'react-native';

class ForgotPassword extends Component {
    static renderNavigationBar (props) {
        return <Header navigationState={props.navigationState} logo={false} title={props.title} />;
    }

    render () {
        return (
        <ScrollView>
            <ForgotPasswordForm />
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

export default connect(select)(ForgotPassword);
