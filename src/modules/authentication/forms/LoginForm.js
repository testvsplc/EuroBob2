// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// REDUX & ROUTER
import {reduxForm} from 'redux-form';
import { Actions } from 'react-native-router-flux';
import DeviceInfo from 'react-native-device-info';

// COMPONENTS
import { Button, ErrorMessages } from '../../../components/';

// REACT-NATIVE
import {
    View,
    TextInput,
    Text,
    Image
} from 'react-native';

// IMAGES
import formError from '../../../img/form/input-formValidation-wrong.png';
import formSuccess from '../../../img/form/input-formValidation-correct.png';

// STYLES
import styles from '../styles/loginForm';

// TRANSLATION
import translation from '../../../translations/nl';

// ACTIONS
import { loginUser, setNewOneSignalId } from '../actions';
import { isValidEmail } from '../../../utility';

class LoginForm extends Component {
    loginUser () {
        const { dispatch, fields } = this.props;
        const obj = {
            email            : fields.email.value,
            password         : fields.password.value
        };

        dispatch(loginUser(obj, (devices) => this.checkOneSignal(devices)));
    }

    checkOneSignal (devices) {
        const { dispatch, one_signal_player_id, authentication } = this.props;

        devices.map((device) => {
            const deviceID = DeviceInfo.getUniqueID();
            const playerID = device.one_signal_player_id;

            if (device.unique_id === deviceID && playerID !== one_signal_player_id) {
                dispatch(setNewOneSignalId(device.device_id, one_signal_player_id, authentication.user.api_token));
            }

            return device;
        });
    }

    render () {
        const { fields: {email, password}, invalid, serverErrors } = this.props;

        return (
            <View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputBorder}>
                        <TextInput underlineColorAndroid="transparent" keyboardType="email-address" style={styles.input} {...email} placeholder={translation.LOGINFORM_EMAIL} placeholderTextColor="#BCC8D5"
                            onSubmitEditing={(event) => {
                                this.refs['1'].focus();
                            }}
                            blurOnSubmit={false}
                            returnKeyType="next"
                            autoCapitalize = 'none'
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
                    <View>
                        <TextInput ref="1" underlineColorAndroid="transparent" secureTextEntry={true} style={styles.input} {...password} placeholder={translation.LOGINFORM_PASSWORD} placeholderTextColor="#BCC8D5" returnKeyType="done" />
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

                <Button onPress={() => this.loginUser()} disabled={invalid} title={translation.LOGINFORM_LOGIN} style="main" />

                <ErrorMessages messages={serverErrors} />

                <Text onPress={Actions.forgot_password} forgot_password style={styles.forgotPassword}>
                    Wachtwoord vergeten?
                </Text>
            </View>
        );
    }
}

// Validation for current form,
// constant is injected into the reduxForm function
// beneath, before exporting.
const validate = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = translation.LOGINFORM_REQUIRED;
    } else if (!isValidEmail(values.email)) {
        errors.email = translation.LOGINFORM_ERROR_EMAIL;
    }
    if (!values.password) {
        errors.password = translation.LOGINFORM_REQUIRED;
    }

    return errors;
};

LoginForm.propTypes = {
    fields: PropTypes.object,
    invalid: PropTypes.bool,
    serverErrors: PropTypes.object
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select (state) {
    return {
        serverErrors: state.errors.serverErrors,
        authentication: state.authentication
    };
}

LoginForm = reduxForm({
    form: 'login',
    fields: [
        'email',
        'password'
    ],
    validate
}, select)(LoginForm);

export default LoginForm;
