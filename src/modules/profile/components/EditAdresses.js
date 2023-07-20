// REACT
import React, { Component } from 'react';

// COMPONENTS
import { Header } from '../../../components/';
import { CreateOrEditAdres } from '../../profile/';

// REACT-NATIVE
import {
    View
} from 'react-native';

import { clearAddressUpdate } from '../actions';

class EditAdresses extends Component {
    static renderNavigationBar (props) {
        const { dispatch } = props;

        return (
            <Header
                navigationState={props.navigationState}
                logo={false}
                title={props.title}
                leftButtonAction={() => dispatch(clearAddressUpdate())}
            />
        );
    }

    render () {
        return (
            <View>
                <CreateOrEditAdres target_address={this.props.target_address ? this.props.target_address : false} />
            </View>
        );
    }
}

EditAdresses.propTypes = {
};

export default EditAdresses;
