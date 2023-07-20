// REACT
import React, { Component } from 'react';

// COMPONENTS
import { Header, Touchable } from '../../../components/';

// ROUTER
import { Actions } from 'react-native-router-flux';

// EXTERNAL COMPONENTS
import Communications from 'react-native-communications';

// REACT-NATIVE
import {
    View,
    Text,
    Image,
    Linking
} from 'react-native';

// IMAGES

import closeModal from '../../../img/plan-ride/navBar-closeButton-dark.png';
import contactPhone from '../../../img/contact/contact-icon-phone.png';
import contactMessage from '../../../img/contact/contact-icon-message.png';

// STYLES
import styles from '../styles/contactOverview';

import translation from '../../../translations/nl';

class ContactOverview extends Component {
    static renderNavigationBar(props) {
        return (
            <Header
                leftButtonText={
                    <Image
                        source={closeModal}
                        key={closeModal}
                    />
                }
                leftButtonAction={() => Actions.pop()}
                navigationState={props.navigationState}
                logo={false}
                title={props.title}
            />
        );
    }

    render() {
        return (
            <View style={{ alignItems: 'center' }}>
                <Touchable onPress={() => Communications.phonecall('310883650808', true)} style={[styles.contactBlock, { borderBottomWidth: 1, borderBottomColor: '#E9E9E9' }]}>
                    <Image
                        source={contactPhone}
                    />
                    <Text style={styles.contactText}>{translation.CONTACT_OVERVIEW_TELEPHONE}</Text>
                </Touchable>
                <Touchable onPress={() => Linking.openURL('whatsapp://send?phone=310883650808').catch(() => {
                    alert('Zorg ervoor dat Whatsapp op uw apparaat is geïnstalleerd. Gebruik telefoonnummer 310883650808 om met Eurobob te chatten.');
                })} style={styles.contactBlock}>
                    <Image
                        source={contactMessage}
                    />
                    <Text style={styles.contactText}>{translation.CONTACT_OVERVIEW_CHAT}</Text>
                </Touchable>
            </View>
        );
    }
}

ContactOverview.propTypes = {
};

export default ContactOverview;
