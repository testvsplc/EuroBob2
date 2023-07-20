// REACT
import React, {Component} from 'react';

// REDUX & ROUTER FUNCTIONS
import {Actions} from 'react-native-router-flux';

// COMPONENTS
import Header from './shared/Header';

// REACT-NATIVE
import {
    View,
    Text,
    Image,
    ScrollView
} from 'react-native';

// IMAGES
import navBarImage from '../img/dashboard/navBar-menuButton.png';
import contactHeader from '../img/contact/car2.png';
import euroBob from '../img/contact/ContactEurobob.png';
import codeBridge from '../img/contact/contactCodebridge.png';
import benzai from '../img/contact/contactBenzai.png';
import puppetBrain from '../img/contact/contactPuppetbrain.png';

// STYLES
import styles from './styles/about';

// TRANSLATION
import translation from '../translations/nl';

class About extends Component {
    static renderNavigationBar(props) {
        return (
            <Header
                leftButtonText={
                    <Image
                        source={navBarImage}
                    />
                }
                leftButtonAction={() => Actions.refresh({key: 'drawerDashboardApp', open: true})}
                navigationState={props.navigationState}
                logo={false}
                title={translation.ABOUT_EUROBOB_ABOUT_TITLE}
            />
        );
    }

    renderCredits() {
        const credits = [
            {
                source: euroBob,
                title: 'Euro BOB',
                job: 'OWNER'
            },
            {
                source: codeBridge,
                title: 'CodeBridge',
                job: 'SOFTWARE DEVELOPMENT'
            },
            {
                source: benzai,
                title: 'BENZAI',
                job: 'UI/UX DESIGN'
            },
            {
                source: puppetBrain,
                title: 'Puppetbrain',
                job: 'ILLUSTRATION'
            }
        ];

        return credits.map((credit, key) =>
            <View key={key} style={[styles.flexItem, {marginBottom: 15}]}>
                <View style={{height: 45, marginBottom: 15}}>
                    <Image source={credit.source}/>
                </View>

                <Text style={[styles.creditTitle, {textAlign: 'center'}]}>
                    {credit.title}
                </Text>
                <Text style={[styles.creditJob, {textAlign: 'center'}]}>
                    {credit.job}
                </Text>
            </View>
        );
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <Image
                        source={contactHeader}
                        style={{width: '100%'}}
                    />
                    <View style={styles.contentSection}>
                        <Text style={styles.textContent}>
                            {translation.ABOUT_EUROBOB_CONTENT}
                        </Text>
                        <Text style={styles.textContent}>
                            {translation.ABOUT_EUROBOB_EXTRA_CONTENT}
                        </Text>
                    </View>
                </View>

                <View style={{paddingTop: 20}}>
                    <Text style={styles.sectionTitle}>{translation.ABOUT_EUROBOB_CREDITS_TITLE}</Text>
                    <View style={styles.contentSection}>
                        <Text style={[styles.textContent, {marginBottom: 15}]}>
                            {translation.ABOUT_EUROBOB_WHO_WORKED}
                        </Text>

                        <View style={styles.flexContainer}>
                            {this.renderCredits()}
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default About;
