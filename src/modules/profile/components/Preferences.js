// REACT
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// COMPONENTS
import {Touchable, AnimatedPicker} from '../../../components/';

// REACT-NATIVE
import {
    View,
    Text,
    Switch,
    AsyncStorage,
    Animated,
    Dimensions,
    Picker,
    Platform
} from 'react-native';

// PICKER ITEM
const PickerItem = Picker.Item;

import {
    MKSwitch,
    MKColor
} from 'react-native-material-kit';

// STYLES
import styles from '../styles/profileOverview';

// ACTIONS
import {setUserNotifications, changeUserContact} from '../actions';
import {logoutUser, removeUserToken} from '../../authentication/';
import {togglePicker} from '../../../utility/';

// TRANSLATION
import translation from '../../../translations/nl';

const deviceHeight = Dimensions.get('window').height;
class Preferences extends Component {
    constructor(props) {
        super(props);

        this.logoutUser = this.logoutUser.bind(this);
        this.closePicker = this.closePicker.bind(this);
        this.openPicker = this.openPicker.bind(this);
    }

    logoutUser() {
        const {dispatch, user} = this.props;

        dispatch(logoutUser(user.api_token));
    }

    changePushNotifications(value) {
        const {dispatch, user} = this.props;

        const obj = {
            push_notification: value,
            phone_notification: user.phone_notification,
            email_notification: user.email_notification
        };
        dispatch(setUserNotifications(obj, user.api_token));
    }

    changePhoneNotification(value) {
        const {dispatch, user} = this.props;

        const obj = {
            push_notification: user.push_notification,
            phone_notification: value,
            email_notification: user.email_notification
        };
        dispatch(setUserNotifications(obj, user.api_token));
    }

    openPicker() {
        const {dispatch} = this.props;

        dispatch(togglePicker(true));
    }

    closePicker() {
        const {dispatch} = this.props;

        dispatch(togglePicker(false));
    }

    returnContactOption(options, selected) {
        return options.filter((option) => {
            if (option.value === selected) {
                return option;
            }
        })[0];
    }

    render() {
        const {user, dispatch, showPicker, preferences} = this.props;
        const offSet = new Animated.Value(deviceHeight);
        const pickerOptions = [
            {
                label: 'Bellen',
                value: 'call'
            },
            {
                label: 'WhatsApp',
                value: 'app'
            },
            {
                label: 'SMS',
                value: 'text'
            }
        ];
        contact = preferences.contact ? this.returnContactOption(pickerOptions, preferences.contact) : this.returnContactOption(pickerOptions, user.phone_notification);
        return (
            <View>
                <View style={styles.inputContainer}>
                    <Touchable onPress={() => this.openPicker()} style={styles.inputBorder}>
                        <Text style={styles.labelWithInput}>{translation.PREFERENCES_CONTACT_PREFERENCE}</Text>
                        <View style={styles.inputWithLabel}>
                            <Text style={{fontSize: 17}}>{contact ? contact.label : 'Bellen'}</Text>
                        </View>
                    </Touchable>

                    <View style={styles.inputBorder}>
                        <View
                            style={[styles.textInputStyles, {flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingRight: 20}]}>
                            <Text style={styles.settingLabel}>Push notifications</Text>
                            <MKSwitch
                                trackSize={20}
                                trackLength={50}
                                style={styles.preferencesSwitch}
                                checked={user.push_notification}
                                onColor="rgba(245,201,24,0.3)"
                                thumbOnColor="#F5C918"
                                rippleColor="#F5C918"
                                onCheckedChange={(value) => this.changePushNotifications(value.checked)}
                            />
                        </View>
                        <Text style={styles.smallWarning}>
                            Als u uw pushnotificaties uitzet, kunnen wij u alleen op de hoogte houden door middel van bellen of smssen.
                        </Text>
                    </View>

                    <Touchable onPress={() => this.logoutUser()} style={styles.inputBorder}>
                        <View style={styles.textInputStyles}>
                            <Text style={styles.settingLabel}>{translation.GENERAL_LOGOUT}</Text>
                        </View>
                    </Touchable>
                </View>

                {showPicker ?
                    <AnimatedPicker
                        closePicker={() => this.closePicker()}
                        offSet={offSet}
                        toValue={-125}
                    >
                        <Picker
                            selectedValue={preferences.contact ? preferences.contact : user.phone_notification}
                            onValueChange={(value) => {dispatch(changeUserContact(value)); this.changePhoneNotification(value)}}
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

Preferences.propTypes = {
    preferences: PropTypes.object,
    dispatch: PropTypes.func,
    user: PropTypes.object
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select(state) {
    return {
        preferences: state.profile.preferences,
        user: state.authentication.user,
        showPicker: state.utility.showPicker,
    };
}

export default connect(select)(Preferences);
