// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// REACT-NATIVE
import {
    View,
    Text,
    Animated,
    TouchableHighlight,
    Dimensions,
    Keyboard,
    Platform
} from 'react-native';

// CONST AND LET
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

// STYLES
import styles from '../styles/animatedPicker';

class AnimatedPicker extends Component {
    constructor (props) {
        super(props);

        this.closePicker = this.closePicker.bind(this);
    }

    componentWillUnmount () {
        this.keyboardWillShowListener.remove();
    }

    componentDidMount () {
        const { offSet, toValue } = this.props;
        Animated.timing(offSet, {
            duration: 400,
            toValue: deviceHeight - 305
        }).start();


        this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.closePicker);

        // Keyboard.addListener('keyboardWillShow', this.closePicker);
    }

    closePicker () {
        const { closePicker, offSet } = this.props;
        Animated.timing(offSet, {
            duration: 400,
            toValue: deviceHeight
        }).start(closePicker);
    }

    render () {
        const { offSet, children } = this.props;

        return (
            <View style={{height: deviceHeight, width: deviceWidth, position: 'absolute', top: 0, right: 0, left: 0}}>
                <Animated.View style={{transform: [{translateY: offSet}]}}>
                    <View style={[{backgroundColor: '#FFFFFF'}, Platform.OS === 'android' ? {height: 305} : null]}>
                        <View style={styles.closeButtonContainer}>
                            <TouchableHighlight onPress={this.closePicker} underlayColor="transparent" style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Klaar</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={{position: 'relative', zIndex: 999}}>
                            {children}
                        </View>
                    </View>
                </Animated.View>
            </View>
        );
    }
}

AnimatedPicker.propTypes = {
    children: PropTypes.any,
    closePicker: PropTypes.func.isRequired,
    offSet: PropTypes.object.isRequired,
    toValue: PropTypes.number.isRequired
};

export default AnimatedPicker;
