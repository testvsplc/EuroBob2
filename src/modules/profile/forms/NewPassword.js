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
import styles from '../styles/profileOverview';

// ACTIONS
import { changePassword } from '../../profile/';

// TRANSLATION
import translation from '../../../translations/nl';

class NewPassword extends Component {

    submitNewPassword () {
        const { fields, dispatch, user } = this.props;

        const obj = {
            password: fields.newPassword.value
        };
        dispatch(changePassword(obj, user.api_token));
    }

    render () {
        const { fields: { oldPassword, newPassword, repeatNewPassword }, invalid } = this.props;

        return (
            <View>
                <View style={styles.inputContainer}>
                    <View style={styles.inputBorder}>
                        <TextInput underlineColorAndroid="transparent" secureTextEntry={true} style={styles.inputForm} {...oldPassword} placeholder={translation.CHANGE_PASSWORD_OLD_PASSWORD} placeholderTextColor="#BCC8D5" />
                        {oldPassword.touched && oldPassword.error &&
                            <View>
                                <Image
                                    style={styles.formImageInput}
                                    source={formError}
                                />
                                <Text style={styles.inputError}>{oldPassword.error}</Text>
                            </View>
                        }
                        {oldPassword.touched && oldPassword.valid &&
                            <View>
                                <Image
                                    style={styles.formImageInput}
                                    source={formSuccess}
                                />
                            </View>
                        }
                    </View>

                    <View style={styles.inputBorder}>
                        <TextInput underlineColorAndroid="transparent" secureTextEntry={true} style={styles.inputForm} {...newPassword} placeholder={translation.CHANGE_PASSWORD_NEW_PASSWORD} placeholderTextColor="#BCC8D5" />
                        {newPassword.touched && newPassword.error &&
                            <View>
                                <Image
                                    style={styles.formImageInput}
                                    source={formError}
                                />
                                <Text style={styles.inputError}>{newPassword.error}</Text>
                            </View>
                        }
                        {newPassword.touched && newPassword.valid &&
                            <View>
                                <Image
                                    style={styles.formImageInput}
                                    source={formSuccess}
                                />
                            </View>
                        }
                    </View>

                    <View style={styles.inputBorder}>
                        <TextInput underlineColorAndroid="transparent" secureTextEntry={true} style={styles.inputForm} {...repeatNewPassword} placeholder={translation.CHANGE_PASSWORD_R_NEW_PASSWORD} placeholderTextColor="#BCC8D5" />
                        {repeatNewPassword.touched && repeatNewPassword.error &&
                            <View>
                                <Image
                                    style={styles.formImageInput}
                                    source={formError}
                                />
                                <Text style={styles.inputError}>{repeatNewPassword.error}</Text>
                            </View>
                        }
                        {repeatNewPassword.touched && repeatNewPassword.valid &&
                            <View>
                                <Image
                                    style={styles.formImageInput}
                                    source={formSuccess}
                                />
                            </View>
                        }
                    </View>
                </View>

                <Button disabled={invalid} onPress={() => this.submitNewPassword()} title={translation.CHANGE_PASSWORD_BUTTON} style="main" />
            </View>
        );
    }
}

NewPassword.propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func
};

// Validation for current form,
// constant is injected into the reduxForm function
// beneath before exporting.
const validate = (values) => {
    const errors = {};
    if (!values.oldPassword) {
        errors.oldPassword = 'Verplicht*';
    }
    if (!values.newPassword) {
        errors.newPassword = 'Verplicht*';
    }
    if (!values.repeatNewPassword) {
        errors.repeatNewPassword = 'Verplicht*';
    }
    if (values.repeatNewPassword !== values.newPassword) {
        errors.repeatNewPassword = 'Wachtwoorden niet hetzelfde';
    }

    return errors;
};

NewPassword = reduxForm({
    form: 'edit_password',
    fields: [
        'oldPassword',
        'newPassword',
        'repeatNewPassword'
    ],
    validate
})(NewPassword);

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select (state) {
    return {
        user: state.authentication.user
    };
}

export default connect(select)(NewPassword);
