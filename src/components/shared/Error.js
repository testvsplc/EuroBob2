// REACT
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

// REACT-NATICE
import {
    View,
    Text
} from 'react-native';

// STYLES
import styles from '../styles/errorMessage';

import {clearServerErrors} from '../../utility/';

class ErrorMessages extends Component {
    constructor(props) {
        super(props);

        this.renderErrors = this.renderErrors.bind(this);
    }

    componentWillUnmount() {
        const {dispatch} = this.props;

        dispatch(clearServerErrors());
    }

    renderErrors() {
        const {messages, textStyle} = this.props;
        
        let m = messages;
        if(typeof messages === 'string') {
            m = {};
        }

        return Object.keys(m).map((key, index) => {
            const obj = m[key];
            if (key === 'lat') {
                return null;
            }
            if (key === 'lon') {
                return null;
            }

            return obj.map((errorMessage) => (
                    <Text style={Object.assign({textAlign: 'center'}, textStyle)} key={errorMessage}>
                        {errorMessage}
                    </Text>
                )
            );
        });
    }

    render() {
        const {messages} = this.props;

        return (
            <View style={Object.keys(messages).length > 0 ? styles.errorHolder : null}>
                {this.renderErrors()}
            </View>
        );
    }
}

ErrorMessages.propTypes = {
    messages: PropTypes.any,
    textStyle: PropTypes.any
};

export default connect()(ErrorMessages);
