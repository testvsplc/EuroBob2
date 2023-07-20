// REACT
import React, { Component } from 'react';
import {reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

// COMPONENTS
import { Button } from '../../../components/';

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
import styles from '../styles/loginForm';

// ACTIONS
import { resetPasswordByEmail } from '../../authentication/';

// TRANSLATION
import translation from '../../../translations/nl';
import { isValidEmail } from '../../../utility';

class ForgotPasswordForm extends Component {

    requestNewPassword () {
        const { dispatch, fields } = this.props;
        const obj = {
            email : fields.email.value
        };

        dispatch(resetPasswordByEmail(obj));
    }

    render () {
        const { fields: { email }, invalid, emailMessage } = this.props;

        return (
            <View>
                <Text style={styles.forgotPasswordText}>
                    Heeft u problemen met inloggen? Op basis van uw emailadres kunnen wij een nieuw wachtwoord voor u aanmaken.
                </Text>

                <View style={styles.inputContainer}>
                    <View style={styles.inputBorder}>
                        <TextInput underlineColorAndroid="transparent" style={styles.input} {...email} placeholder={translation.LOGINFORM_EMAIL} placeholderTextColor="#BCC8D5" />
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
                </View>

                <Button disabled={invalid} onPress={() => this.requestNewPassword()} title={translation.RESET_PASSWORD_BUTTON} style="main" />

                <Text style={styles.forgotPasswordText}>
                    {emailMessage}
                </Text>
            </View>
        );
    }
}

ForgotPasswordForm.propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func
};

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

    return errors;
};

ForgotPasswordForm = reduxForm({
    form: 'forgot_password',
    fields: [
        'email'
    ],
    validate
})(ForgotPasswordForm);

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select (state) {
    return {
        user: state.authentication.user,
        emailMessage: state.authentication.emailMessage
    };
}

export default connect(select)(ForgotPasswordForm);
