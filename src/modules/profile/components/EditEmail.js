// REACT
import React, { Component } from 'react';

// COMPONENTS
import { Header} from '../../../components/';

// REACT-NATIVE
import {
    View,
    Text
} from 'react-native';

// TRANSLATION
import translation from '../../../translations/nl';

class EditEmail extends Component {
    static renderNavigationBar (props) {
        return (
            <Header
                navigationState={props.navigationState}
                logo={false}
                title={props.title}
            />
        );
    }

    render () {
        return (
            <View style={{padding: 25}}>
                <Text style={{color: '#5C6773', fontSize: 14}}>{translation.EMAIL_EDIT_EMAIL}</Text>
            </View>
        );
    }
}

EditEmail.propTypes = {
};

export default EditEmail;
