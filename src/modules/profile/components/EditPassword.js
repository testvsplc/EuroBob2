// REACT
import React, { Component } from 'react';

// COMPONENTS
import { Header } from '../../../components/';
import { NewPassword } from '../../profile/';

// REACT-NATIVE
import {
    View
} from 'react-native';

class EditPassword extends Component {
    static renderNavigationBar (props) {
        return (
            <Header
                navigationState={props.navigationState}
                logo={false}
                title={props.title}
            />
        );
    }

    render () {
        return (
            <View>
                <NewPassword />
            </View>
        );
    }
}

EditPassword.propTypes = {
};

export default EditPassword;
