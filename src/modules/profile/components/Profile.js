// REACT
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// COMPONENTS
import { Touchable } from '../../../components/';

// ROUTER
import { Actions } from 'react-native-router-flux';

// REACT-NATIVE
import {
    View,
    Text,
    Image,
    ScrollView,
    Platform
} from 'react-native';

// IMAGES
import formEdit from '../../../img/profile/navBar-editButton-dark.png';

// STYLES
import styles from '../styles/profileOverview';

// TRANSLATION
import translation from '../../../translations/nl';

class Profile extends Component {
    render () {
        const { profile, user } = this.props;

        const typeOptions = [
            {
                label: 'Zakelijk',
                value: 'company'
            },
            {
                label: 'Particulier',
                value: 'private'
            }
        ];
        const paymentOptions = [
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
            },
            {
                label: user.wallet_name,
                value: 'wallet'
            }
        ];

        const paymentType = paymentOptions.filter((type) => {
            if (type.value === profile.prefered_payment) {
                return true;
            }

            return false;
        });


        return (
            <ScrollView>
                <View style={styles.inputContainer}>
                    <View>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>{translation.PROFILE_DISPLAY_EMAIL}</Text>
                            <Text style={styles.inputContent}>{user.email}</Text>
                        </View>
                        <Touchable style={Platform.OS === 'android' ? styles.formImageAndroid : null} onPress={Actions.edit_email}>
                            <Image
                                style={styles.formImage}
                                source={formEdit}
                            />
                        </Touchable>
                    </View>

                    <View>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>{translation.PROFILE_DISPLAY_WACHTWOORD}</Text>
                            <Text style={styles.inputContent}>••••••••</Text>
                        </View>
                        <Touchable style={Platform.OS === 'android' ? [styles.formImageAndroid, {top: -8}] : null} onPress={Actions.edit_password}>
                            <Image
                                style={styles.formImage}
                                source={formEdit}
                            />
                        </Touchable>
                    </View>
                </View>

                <View style={{marginTop: 25, marginBottom: 10, paddingLeft: 20, paddingRight: 20, flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <Text style={{color: '#5C6773', fontSize: 17}}>{translation.PROFILE_DISPLAY_PROFILE_INFO}</Text>
                    <Touchable onPress={Actions.edit_profile} style={styles.editProfile}>
                        <Text style={{textAlign: 'center', color: '#FFFFFF', fontSize: 14}}>
                            {translation.PROFILE_DISPLAY_EDIT_PROFILE}
                        </Text>
                    </Touchable>
                </View>

                <View style={styles.inputContainer}>

                    <View>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>{translation.PROFILE_DISPLAY_NAME}</Text>
                            <Text style={styles.inputContent}>{user.name}</Text>
                        </View>
                    </View>


                        <View>
                            <View style={styles.input}>
                                <Text style={styles.inputLabel}>{translation.PROFILE_DISPLAY_COMPANY_NAME}</Text>
                                <Text style={styles.inputContent}>{profile.company_name}</Text>
                            </View>
                        </View>


                    <View>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>{translation.PROFILE_DISPLAY_ADDRESS}</Text>
                            <Text style={styles.inputContent}>{profile.address}</Text>
                        </View>
                    </View>

                    <View>
                        <View style={styles.input}>
                            <Text style={styles.inputLabel}>{translation.PROFILE_DISPLAY_PAYMENT}</Text>
                            <Text style={styles.inputContent}>{paymentType[0] ? paymentType[0].label : ''}</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

Profile.propTypes = {
    user: PropTypes.object,
    profile: PropTypes.object
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select (state) {
    return {
        user: state.authentication.user,
        profile: state.profile.profile
    };
}

export default connect(select)(Profile);
