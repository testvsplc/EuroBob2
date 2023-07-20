import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

// COMPONENTS
import { AnimatedPicker, Button, Touchable, ErrorMessages } from '../../../components/';

// ACTIONS
import { setPaymentOption, completeRegisterUser, setUserAvatar, userCompletedRegister } from '../actions';
import { togglePicker, toggleLoading } from '../../../utility/';

// REACT COMPONENTS
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// REACT-NATIVE
import {
    View,
    TextInput,
    Text,
    Animated,
    Dimensions,
    Image,
    Picker,
    Platform,
    ScrollView
} from 'react-native';

// PICKER ITEM
const PickerItem = Picker.Item;

// IMAGES
import formError from '../../../img/form/input-formValidation-wrong.png';
import formSuccess from '../../../img/form/input-formValidation-correct.png';
import profileImage from '../../../img/profile/userAvatar.png';

// STYLES
import styles from '../styles/registerForm';

// TRANSLATION
import translation from '../../../translations/nl';

const deviceHeight = Dimensions.get('window').height;
class RegisterSuccessForm extends Component {
    constructor(props) {
        super(props);

        // Binding 'this' to function,
        // it is possible to set new state with these functions now.
        this.setPaymentOption = this.setPaymentOption.bind(this);
        this.chooseAvatar = this.chooseAvatar.bind(this);
        this.completeRegistration = this.completeRegistration.bind(this);
        this.closePicker = this.closePicker.bind(this);
        this.openPicker = this.openPicker.bind(this);
    }

    // When component unmounts,
    // make sure the picker is closed
    componentWillUnmount() {
        const { dispatch } = this.props;
        dispatch(togglePicker(false));
    }

    // Call back.
    // Sets new country code, received from custom Picker.
    setPaymentOption(code) {
        const { dispatch } = this.props;
        dispatch(setPaymentOption(code));
    }

    completeRegistration() {
        const { dispatch, user, payment, profile, register } = this.props;
        const obj = {
            profile_image: user.profile_image,
            type: user.type,
            lat: register.lat,
            lon: register.lon,
            address: register.address,
            zipcode: register.zipcode,
            place: register.place,
            prefered_payment: payment,
            phone: profile.phone,
            company_name: profile.company_name
        };

        dispatch(completeRegisterUser(obj, user[user.active_profile].profile_id, user.api_token));
    }

    chooseAvatar() {
        const { dispatch } = this.props;
        // More info on all the options is below in the README...just some common use cases shown here
        const options = {
            title: 'Select Avatar',
            quality: 0.5,
            maxWidth: 100,
            maxHeight: 100,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
        * The first arg is the options object for customization (it can also be null or omitted for default options),
        * The second arg is the callback which sends object: response (more info below in README)
        */
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else {
                // You can display the image using either data...
                const source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };
                dispatch(setUserAvatar(source.uri));
            }
        });
    }

    openPicker() {
        const { dispatch } = this.props;

        dispatch(togglePicker(true));
        this.refs.scroll_register_success.scrollToPosition(0, 200, true);
    }

    closePicker() {
        const { dispatch } = this.props;

        dispatch(togglePicker(false));
        this.refs.scroll_register_success.scrollToPosition(0, 0, true);
    }

    render() {
        const { dispatch, showPicker, payment, invalid, user, profile, register, serverErrors } = this.props;
        const offSet = new Animated.Value(deviceHeight);

        const pickerOptionsPrivate = [
            {
                label: 'Pin',
                value: 'pin'
            },
            {
                label: 'Contant',
                value: 'cash'
            }
        ];
        const pickerOptionsCompany = [
            {
                label: 'Pin',
                value: 'pin'
            },
            {
                label: 'Factuur',
                value: 'invoice'
            },
            {
                label: 'Contant',
                value: 'cash'
            }
        ];

        const pickerOptions = profile.type === 'private' ? pickerOptionsPrivate : pickerOptionsCompany;
        const paymentOption = payment ? pickerOptions.filter((option) => { if (option.value === payment) { return option; } }) : '';

        return (
            <View>
                <KeyboardAwareScrollView ref="scroll_register_success"
                    enableAutoAutomaticScroll={false}
                    scrollEnabled={true}
                >
                    <View style={{ padding: 20 }}>
                        <Text>
                            Uw registratie is gelukt! Als u uw aanvullende gegevens van uw profiel kunt invullen kunnen wij u beter van dienst zijn. U kunt het ook later doen.
                        </Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <View style={styles.inputBorder}>
                            <Text style={styles.labelWithInput}>PROFIEL FOTO</Text>
                            <View style={{ paddingRight: 20, flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                {user.profile_image ?
                                    <Image
                                        style={{ borderRadius: 22, width: 44, height: 44, marginTop: 3, marginBottom: 5 }}
                                        key="profile_image"
                                        source={{ uri: user.profile_image }}
                                    />
                                    :
                                    <Image
                                        style={{ marginTop: 3, marginBottom: 5 }}
                                        source={profileImage}
                                    />
                                }

                                <View>
                                    <Touchable style={styles.choosePhoto} onPress={() => this.chooseAvatar()}>
                                        <Text style={styles.choosePhotoText}>Foto kiezen</Text>
                                    </Touchable>
                                </View>
                            </View>
                        </View>

                        <View style={styles.inputBorder}>
                            <Touchable onPress={() => Actions.search_location_register({ dispatchType: 'home' })}>
                                {register.address.length > 0 ?
                                    <View style={[styles.input, { paddingTop: 14 }]}>
                                        <Text style={{ fontSize: 16 }}>
                                            {register.address}
                                        </Text>
                                    </View>
                                    :
                                    <View style={[styles.input, { paddingTop: 14 }]}>
                                        <Text style={{ color: '#BCC8D5', fontSize: 16 }}>
                                            {profile.type === 'private' ? translation.REGISTER_SUCCESS_ADDRESS : translation.REGISTER_SUCCESS_COMPANY_ADDRESS}
                                        </Text>
                                    </View>
                                }
                            </Touchable>
                        </View>

                        <View style={styles.inputBorder}>
                            <Touchable onPress={() => Actions.search_location_register({ dispatchType: 'home' })}>
                                {register.zipcode.length > 0 ?
                                    <View style={[styles.input, { paddingTop: 14 }]}>
                                        <Text style={{ fontSize: 16 }}>
                                            {register.zipcode}
                                        </Text>
                                    </View>
                                    :
                                    <View style={[styles.input, { paddingTop: 14 }]}>
                                        <Text style={{ color: '#BCC8D5', fontSize: 16 }}>
                                            {translation.REGISTER_SUCCESS_POSCODE}
                                        </Text>
                                    </View>
                                }
                            </Touchable>
                        </View>

                        <View style={styles.inputBorder}>
                            <Touchable onPress={() => Actions.search_location_register({ dispatchType: 'home' })}>
                                {register.place.length > 0 ?
                                    <View style={[styles.input, { paddingTop: 14 }]}>
                                        <Text style={{ fontSize: 16 }}>
                                            {register.place}
                                        </Text>
                                    </View>
                                    :
                                    <View style={[styles.input, { paddingTop: 14 }]}>
                                        <Text style={{ color: '#BCC8D5', fontSize: 16 }}>
                                            {translation.REGISTER_SUCCESS_PLACE}
                                        </Text>
                                    </View>
                                }
                            </Touchable>
                        </View>

                        <Touchable onPress={() => this.openPicker()} style={styles.inputBorder}>
                            <Text style={styles.labelWithInput}>BETAALWIJZE</Text>
                            <View style={styles.inputWithLabel}>
                                <Text style={{ fontSize: 17 }}>{paymentOption[0].label}</Text>
                            </View>
                        </Touchable>
                    </View>

                    <Button onPress={() => this.completeRegistration()} disabled={invalid} title={translation.REGISTER_SUCCESS_BUTTON} style="main" />

                    <Touchable style={{ marginTop: 15 }} onPress={() => dispatch(userCompletedRegister())}>
                        <Text style={{ fontSize: 14, color: '#8595A6', textAlign: 'center' }}>
                            Later pas doen
                        </Text>
                    </Touchable>

                    <ErrorMessages messages={serverErrors} />
                </KeyboardAwareScrollView>

                {showPicker ?
                    <AnimatedPicker
                        closePicker={() => this.closePicker()}
                        offSet={offSet}
                        toValue={-125}
                    >
                        <Picker
                            selectedValue={payment}
                            onValueChange={(value) => this.setPaymentOption(value)}
                        >
                            {pickerOptions.map((option) => (
                                <PickerItem
                                    key={option.value}
                                    value={option.value}
                                    label={option.label}
                                />
                            ))}
                        </Picker>
                    </AnimatedPicker>
                    : null}
            </View>
        );
    }
}

// Validation for current form,
// constant is injected into the reduxForm function
// beneath before exporting.
const validate = (values) => {
    const errors = {};

    return errors;
};

RegisterSuccessForm.propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
    showPicker: PropTypes.bool,
    countryCode: PropTypes.string,
    register: PropTypes.object,
    invalid: PropTypes.bool,
    user: PropTypes.object,
    payment: PropTypes.string
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select(state) {
    return {
        register: state.authentication.register.address,
        payment: state.authentication.register.payment,
        showPicker: state.utility.showPicker,
        user: state.authentication.user,
        profile: state.profile.profile,
        serverErrors: state.errors.serverErrors
    };
}

export default connect(select)(RegisterSuccessForm);
