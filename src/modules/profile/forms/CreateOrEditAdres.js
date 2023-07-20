// REACT
import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

// COMPONENTS
import { Button, Touchable } from '../../../components/';

// REACT-NATIVE
import {
    View,
    Text,
    TextInput,
    Image
} from 'react-native';

// IMAGES
import formError from '../../../img/form/input-formValidation-wrong.png';
import formSuccess from '../../../img/form/input-formValidation-correct.png';

// STYLES
import styles from '../styles/profileOverview';

// ACTIONS
import { createNewAddress, setCreateAddress, updateAddress } from '../actions';

// TRANSLATION
import translation from '../../../translations/nl';

class CreateOrEditAdres extends Component {
    constructor (props) {
        super(props);

        this.submitAddress = this.submitAddress.bind(this);
    }

    componentWillMount () {
        const { target_address, dispatch } = this.props;

        if (target_address) {
            dispatch(setCreateAddress(target_address));
        }
    }

    submitAddress (data) {
        const { dispatch, createAddress, profile, user, target_address } = this.props;
        const obj = {
            ...createAddress,
            name        : data.nameLocation.value,
            profile_id  : profile.profile_id
        };

        if (target_address) {
            dispatch(updateAddress(obj, user.api_token));
        } else {
            dispatch(createNewAddress(obj, user.api_token));
        }
    }

    render () {
        const { fields: { nameLocation }, createAddress } = this.props;
        const validOrder = createAddress.address.length >= 1 && createAddress.place.length >= 1;
        return (
            <View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputBorder}>
                        <TextInput underlineColorAndroid="transparent" style={styles.inputForm} {...nameLocation} placeholder={translation.ADDRESSES_NAME_LOCATION_PLACEHOLDER} placeholderTextColor="#BCC8D5" />
                        {nameLocation.touched && nameLocation.error &&
                            <View>
                                <Image
                                    style={styles.formImageInput}
                                    source={formError}
                                />
                                <Text style={styles.inputError}>{nameLocation.error}</Text>
                            </View>
                        }
                        {nameLocation.touched && nameLocation.valid &&
                            <View>
                                <Image
                                    style={styles.formImageInput}
                                    source={formSuccess}
                                />
                            </View>
                        }
                    </View>

                    <Touchable onPress={() => Actions.search_location({dispatchType: 'address'})} style={styles.inputBorder}>
                        {createAddress.address ?
                            <Text style={[styles.inputForm, styles.inputFakeForm, {color: '#000000'}]}>
                                {createAddress.address}
                            </Text>
                        :
                            <Text style={[styles.inputForm, styles.inputFakeForm]}>
                                {translation.ADDRESSES_ADDRESS_PLACEHOLDER}
                            </Text>
                        }
                    </Touchable>

                    <Touchable onPress={() => Actions.search_location({dispatchType: 'address'})} style={styles.inputBorder}>
                        {createAddress.place ?
                            <Text style={[styles.inputForm, styles.inputFakeForm, {color: '#000000'}]}>
                                {createAddress.place}
                            </Text>
                        :
                            <Text style={[styles.inputForm, styles.inputFakeForm]}>
                                {translation.ADDRESSES_PLACE_PLACEHOLDER}
                            </Text>
                        }
                    </Touchable>
                </View>

                <View style={validOrder ? null : {opacity: 0.6}}>
                    <Button onPress={validOrder ? () => this.submitAddress(this.props.fields) : null} title={translation.ADDRESSES_NAME_SAVE_ADDRESS} style="main" />
                </View>
            </View>
        );
    }
}

CreateOrEditAdres.propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
    profile: PropTypes.object,
    createAddress: PropTypes.object,
    target_address: PropTypes.any
};


CreateOrEditAdres = reduxForm({
    form: 'adres',
    fields: [
        'nameLocation'
    ]
})(CreateOrEditAdres);

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select (state) {
    return {
        createAddress: state.profile.createAddress,
        profile: state.profile.profile,
        user: state.authentication.user,
        initialValues: {
            nameLocation: state.profile.createAddress.name
        }
    };
}

export default connect(select)(CreateOrEditAdres);
