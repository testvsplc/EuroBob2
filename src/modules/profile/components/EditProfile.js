// REACT
import React, { Component } from 'react';

// COMPONENTS
import { Header } from '../../../components/';
import { ProfileInformation } from '../../profile/';

// REACT-NATIVE
import {
    View
} from 'react-native';

import { clearProfileUpdate } from '../actions';

class EditProfile extends Component {
    static renderNavigationBar (props) {
        const { dispatch } = props;

        return (
            <Header
                leftButtonAction={() => dispatch(clearProfileUpdate())}
                navigationState={props.navigationState}
                logo={false}
                title={props.title}
            />
        );
    }

    render () {
        return (
            <View>
                <ProfileInformation />
            </View>
        );
    }
}

EditProfile.propTypes = {
};

export default EditProfile;
