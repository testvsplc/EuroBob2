// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// REACT-NATIVE
import { Text, View } from 'react-native';

// COMPONENTS
import { Touchable } from '../../components/';

// STYLES
import styles from '../styles/button';

class NativeButton extends Component {
    setStyle () {
        const { style } = this.props;

        if (style === 'alternative') {
            return styles.alternative;
        } else if (style === 'white') {
            return styles.white;
        }

        return styles.main;
    }
    render () {
        const { title, onPress, disabled, style} = this.props;
        const customStyling = this.props.styles;

        return (
            <View style={[disabled ? {opacity: 0.6} : null ]}>
                <Touchable onPress={disabled ? null : onPress}  style={[this.setStyle()]}>
                    <Text style={[style === 'main' ? {color: '#FFFFFF'} : null, styles.buttonText, customStyling ? customStyling.button : null]}>{title}</Text>
                </Touchable>
            </View>
        );
    }
}

NativeButton.propTypes = {
    style: PropTypes.string,
    title: PropTypes.string,
    onPress: PropTypes.func,
    styles: PropTypes.object,
    disabled: PropTypes.bool
};

export default NativeButton;
