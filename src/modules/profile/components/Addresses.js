// REACT
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// COMPONENTS
import Swipeout from 'react-native-swipeout';

// ROUTER
import { Actions } from 'react-native-router-flux';

// REACT-NATIVE
import {
    View,
    Text
} from 'react-native';

// STYLES
import styles from '../styles/profileOverview';

// ACTIONS
import { removeAddress, fetchAddresses } from '../actions';

class Addresses extends Component {
    constructor (props) {
        super(props);

        this.renderAddresses = this.renderAddresses.bind(this);
    }

    renderAddresses () {
        const { addresses, dispatch, user } = this.props;

        return addresses.user_specific.map((address, key) => {
            const swipeoutBtns = [
                {
                    text: 'Edit',
                    backgroundColor: '#F5C918',
                    color: '#FFFFFF',
                    onPress: () => Actions.edit_adresses({target_address: address})
                },
                {
                    text: 'Remove',
                    backgroundColor: '#8595A6',
                    color: '#FFFFFF',
                    onPress: () => dispatch(removeAddress(address, user.api_token))
                }
            ];

            return (
                <Swipeout key={key} right={swipeoutBtns} autoClose={true}>
                    <View style={{paddingTop: 20, paddingBottom: 20, paddingRight: 20, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderBottomColor: '#EBEBEB'}}>
                        <Text>{address.name && address.name.length > 0 ? address.name : address.address}, {address.place}</Text>
                    </View>
                </Swipeout>
            );
        });
    }

    render () {
        const { addresses } = this.props;

        return (
            <View style={styles.inputContainer}>
                {addresses ? this.renderAddresses() : null}
            </View>
        );
    }
}

Addresses.propTypes = {
    addresses: PropTypes.object,
    dispatch: PropTypes.func
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select (state) {
    return {
        addresses: state.profile.addresses,
        user: state.authentication.user
    };
}

export default connect(select)(Addresses);
