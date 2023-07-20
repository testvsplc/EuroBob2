import React, {Component} from 'react';
import {connect} from 'react-redux';
import {reduxForm} from 'redux-form';
import {Actions} from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';
import PropTypes from 'prop-types';

// COMPONENTS
import {AnimatedPicker, Button, RadioButton} from '../../../components/';

// ACTIONS
import {registerUser, setCountryCode, setSelected} from '../actions';
import {isValidEmail, togglePicker} from '../../../utility/';

// REACT COMPONENTS

// REACT-NATIVE
import {Animated, Dimensions, Image, Keyboard, Picker, Text, TextInput, TouchableHighlight, View} from 'react-native';
// IMAGES
import formError from '../../../img/form/input-formValidation-wrong.png';
import formSuccess from '../../../img/form/input-formValidation-correct.png';

// STYLES
import styles from '../styles/registerForm';

// TRANSLATION
import translation from '../../../translations/nl';

// PICKER ITEM
const PickerItem = Picker.Item;

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

class RegisterForm extends Component {
    constructor(props) {
        super(props);

        // Binding 'this' to function,
        // it is possible to set new state with these functions now.
        this.setSelected = this.setSelected.bind(this);
        this.setCountryCode = this.setCountryCode.bind(this);
        this.registerUser = this.registerUser.bind(this);
    }

    // When component unmounts,
    // make sure the picker is closed
    componentWillUnmount() {
        const {dispatch} = this.props;
        dispatch(togglePicker(false));
    }

    // Call back.
    // Sets new type of business, received from custom RadioButton.
    setSelected(name) {
        const {dispatch} = this.props;
        dispatch(setSelected(name));
    }

    // Call back.
    // Sets new country code, received from custom Picker.
    setCountryCode(code) {
        const {dispatch} = this.props;
        dispatch(setCountryCode(code));
    }

    registerUser() {
        const {dispatch, fields, selectedProperty, countryCode, one_signal_player_id} = this.props;

        const obj = {
            // USER
            company_name: fields.company_name.value,
            name: fields.name.value,
            email: fields.email.value,
            phone: countryCode + fields.mobile.value,
            password: fields.password.value,
            type: selectedProperty,
            // MOBILE INFO
            one_signal_player_id: one_signal_player_id,
            unique_id: DeviceInfo.getUniqueID(),
            manufacturer: DeviceInfo.getManufacturer(),
            model: DeviceInfo.getModel(),
            system_name: DeviceInfo.getSystemName(),
            system_version: DeviceInfo.getSystemVersion(),
            bundle_id: DeviceInfo.getBundleId(),
            build_number: DeviceInfo.getBuildNumber(),
            version: DeviceInfo.getVersion(),
            readable_version: DeviceInfo.getReadableVersion()
        };

        dispatch(registerUser(obj));
    }

    render() {
        const {
            fields: {name, email, mobile, password, company_name},
            dispatch,
            showPicker,
            countryCode,
            invalid,
            selectedProperty,
            serverErrors
        } = this.props;
        const offSet = new Animated.Value(deviceHeight);

        const radioOptions = [
            {
                name: translation.REGISTERFORM_PART,
                value: 'private',
                style: {
                    marginRight: 5
                }
            },
            {
                name: translation.REGISTERFORM_BUSI,
                value: 'company',
                style: {
                    marginLeft: 5
                }
            }
        ];

        const pickerOptions = [
            {
                label: '+31',
                value: '+31'
            }
        ];

        return (
            <View>
                <View style={{marginHorizontal: 20, marginTop: 20}}>
                    <RadioButton checkBoxes={true} activeTextColor="#FFFFFF" activeColor="#F5C918"
                                 normalBorderColor="#EBEBEB" normalColor="#FFFFFF"
                                 width={(deviceWidth - (deviceWidth / 2)) - 20} initialValue={{value: selectedProperty}}
                                 options={radioOptions} onSelect={(value) => this.setSelected(value)}/>
                </View>

                <View style={styles.inputContainer}>
                    {selectedProperty === 'company' ?
                        <View style={styles.inputBorder}>
                            <TextInput underlineColorAndroid="transparent" style={styles.input} {...company_name}
                                       placeholder={translation.REGISTERFORM_COMPANY_NAME}
                                       placeholderTextColor="#BCC8D5"
                                       onSubmitEditing={(event) => {
                                           this.refs['1'].focus();
                                       }}
                                       blurOnSubmit={false}
                                       returnKeyType="next"
                            />
                            {company_name.touched && company_name.error &&
                            <View>
                                <Image
                                    style={styles.formImage}
                                    source={formError}
                                />
                                <Text style={styles.inputError}>{company_name.error}</Text>
                            </View>
                            }
                            {company_name.touched && company_name.valid &&
                            <View>
                                <Image
                                    style={styles.formImage}
                                    source={formSuccess}
                                />
                            </View>
                            }
                        </View>
                        : null}
                    <View style={styles.inputBorder}>
                        <TextInput ref="1" underlineColorAndroid="transparent" style={styles.input} {...name}
                                   placeholder={translation.REGISTERFORM_NAME} placeholderTextColor="#BCC8D5"
                                   onSubmitEditing={(event) => {
                                       this.refs['2'].focus();
                                   }}
                                   blurOnSubmit={false}
                                   returnKeyType="next"
                        />
                        {name.touched && name.error &&
                        <View>
                            <Image
                                style={styles.formImage}
                                source={formError}
                            />
                            <Text style={styles.inputError}>{name.error}</Text>
                        </View>
                        }
                        {name.touched && name.valid &&
                        <View>
                            <Image
                                style={styles.formImage}
                                source={formSuccess}
                            />
                        </View>
                        }
                    </View>
                    <View style={styles.inputBorder}>
                        <TextInput ref="2" underlineColorAndroid="transparent" keyboardType="email-address"
                                   style={styles.input} {...email} placeholder={translation.REGISTERFORM_EMAIL}
                                   placeholderTextColor="#BCC8D5"
                                   onSubmitEditing={(event) => {
                                       this.refs['3'].focus();
                                   }}
                                   blurOnSubmit={false}
                                   returnKeyType="next"
                        />
                        {email.touched && email.error &&
                        <View>
                            <Image
                                style={styles.formImage}
                                source={formError}
                            />
                            <Text style={styles.inputError}>{email.error}</Text>
                        </View>
                        }
                        {email.touched && email.valid &&
                        <View>
                            <Image
                                style={styles.formImage}
                                source={formSuccess}
                            />
                        </View>
                        }
                    </View>
                    <View style={styles.inputBorder}>
                        <View style={styles.mobileContainer}>
                            <TouchableHighlight style={styles.countryCode} underlayColor="transparent" onPress={() => {
                                dispatch(togglePicker(true));
                                Keyboard.dismiss();
                            }}>
                                <Text style={{color: '#F5CB1F'}}>{countryCode}</Text>
                            </TouchableHighlight>
                            <TextInput ref="3" underlineColorAndroid="transparent"
                                       keyboardType="numbers-and-punctuation" style={styles.inputMobile} {...mobile}
                                       placeholder={translation.REGISTERFORM_MOBILE} placeholderTextColor="#BCC8D5"
                                       onSubmitEditing={(event) => {
                                           this.refs['4'].focus();
                                       }}
                                       blurOnSubmit={false}
                                       returnKeyType="next"
                            />
                        </View>
                        {mobile.touched && mobile.error &&
                        <View>
                            <Image
                                style={styles.formImage}
                                source={formError}
                            />
                            <Text style={styles.inputError}>{mobile.error}</Text>
                        </View>
                        }
                        {mobile.touched && mobile.valid &&
                        <View>
                            <Image
                                style={styles.formImage}
                                source={formSuccess}
                            />
                        </View>
                        }
                    </View>
                    <View>
                        <TextInput ref="4" underlineColorAndroid="transparent" secureTextEntry={true}
                                   style={styles.input} {...password} placeholder={translation.REGISTERFORM_PASSWORD}
                                   placeholderTextColor="#BCC8D5" returnKeyType="done"/>
                        {password.touched && password.error &&
                        <View>
                            <Image
                                style={styles.formImage}
                                source={formError}
                            />
                            <Text style={styles.inputError}>{password.error}</Text>
                        </View>
                        }
                        {password.touched && password.valid &&
                        <View>
                            <Image
                                style={styles.formImage}
                                source={formSuccess}
                            />
                        </View>
                        }
                    </View>
                </View>

                <Button onPress={() => this.registerUser()} disabled={invalid} title={translation.REGISTERFORM_REGISTER}
                        style="main"/>

                {typeof serverErrors === 'string' ?
                    <View style={{alignItems: 'center'}}>
                        <TouchableHighlight onPress={() => Actions.login()}>
                            <Text>{serverErrors === 'error' ? 'Dit e-mailadres is al in gebruik, klik hier om naar het inlogscherm te gaan' : null}</Text>
                        </TouchableHighlight>
                    </View>
                    : null
                }


                <View style={{position: 'absolute', right: 0, left: 0, top: deviceHeight - 125}}>
                    <View style={{alignItems: 'center'}}>
                        <View style={{width: 300, position: 'relative'}}>
                            <Text style={{color: '#8595A6', textAlign: 'center'}}>
                                Als u Nu registreren kiest gaat u akkoord met onze
                                <Text onPress={() => Actions.terms()} style={{color: '#6F7A86'}}>
                                    <Text> Voorwaarden </Text>
                                </Text>
                                en
                                <Text onPress={() => Actions.policy()} style={{color: '#6F7A86'}}>
                                    <Text> Privacy Policy.</Text>
                                </Text>
                            </Text>
                        </View>
                    </View>
                </View>

                {showPicker ?
                    <AnimatedPicker
                        closePicker={() => {
                            dispatch(togglePicker(false));
                        }}
                        offSet={offSet}
                        toValue={25}
                    >
                        <Picker
                            selectedValue={countryCode}
                            onValueChange={(value) => this.setCountryCode(value)}
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

    if (!values.email) {
        errors.email = translation.REGISTERFORM_REQUIRED;
    } else if (!isValidEmail(values.email)) {
        errors.email = translation.REGISTERFORM_ERROR_EMAIL;
    }
    if (!values.name) {
        errors.name = translation.REGISTERFORM_REQUIRED;
    }
    if (!values.mobile) {
        errors.mobile = translation.REGISTERFORM_REQUIRED;
    } else if (!/^[0-6]{2}\d{6,8}$/gm.test(values.mobile)) {
        errors.mobile = translation.REGISTERFORM_TEL;
    }
    if (!values.password) {
        errors.password = translation.REGISTERFORM_REQUIRED;
    }

    return errors;
};

RegisterForm.propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
    showPicker: PropTypes.bool,
    countryCode: PropTypes.string,
    selectedProperty: PropTypes.string,
    serverErrors: PropTypes.any,
    invalid: PropTypes.bool
};

RegisterForm = reduxForm({
    form: 'register',
    fields: [
        'name',
        'email',
        'mobile',
        'password',
        'company_name'
    ],
    validate
})(RegisterForm);

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select(state) {
    return {
        selectedProperty: state.authentication.register.selectedProperty,
        countryCode: state.authentication.register.countryCode,
        serverErrors: state.errors.serverErrors,
        showPicker: state.utility.showPicker,
        one_signal_player_id: state.utility.one_signal_player_id
    };
}

export default connect(select)(RegisterForm);
