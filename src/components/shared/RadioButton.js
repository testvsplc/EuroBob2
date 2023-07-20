// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// REACT-NATICE
import {
    View,
    Text,
    Image
} from 'react-native';

// COMPONENTS
import Touchable from './Touchable';

// STYLES
import styles from '../styles/radioButton';

// IMAGES
import checkImage from '../../img/form/check.png';

class RadioButton extends Component {
    constructor(props) {
        super(props);

        this.setNewState = this.setNewState.bind(this);
        this.setActiveStyling = this.setActiveStyling.bind(this);
        this.renderActiveImage = this.renderActiveImage.bind(this);
        this.state = {
            selected: props.initialValue.value
        };
    }

    componentWillMount() {
        const { initialValue } = this.props;

        this.setNewState(initialValue);
    }

    setNewState(option) {
        const { onSelect } = this.props;

        if (option.value) {
            this.setState({selected: option.value});

            onSelect(option.value);
        }
    }

    setActiveStyling (value, type) {
        const { activeColor, normalColor, width, normalBorderColor, activeTextColor, borderWidth } = this.props;

        if (value === this.state.selected && type === 'text') {
            return [styles.radioTextActive, {color: activeTextColor}];
        } else if (value !== this.state.selected && type === 'text') {
            return styles.radioText;
        }

        if (value === this.state.selected && type === 'button') {
            return [styles.radioButtonActive, {backgroundColor: activeColor, width}, borderWidth === 'line' ? styles.borderLine : styles.borderRound];
        } else if (value !== this.state.selected && type === 'button') {
            return [styles.radioButton, {backgroundColor: normalColor, width, borderColor: normalBorderColor}, borderWidth === 'line' ? styles.borderLineNormal : styles.borderRoundNormal];
        }

        if (value === this.state.selected && type === 'circle') {
            return styles.radioButtonCirlcleActive;
        } else if (value !== this.state.selected && type === 'circle') {
            return styles.radioButtonCirlcleNot;
        }
    }

    renderActiveImage (value) {
        if (value === this.state.selected) {
            return (
                <Image
                    style={styles.activeImageStyle}
                    source={checkImage}
                />
            );
        }

        return (
            <View></View>
        );
    }

    renderRadioButtons () {
        const { options, borderWidth, normalBorderColor, checkBoxes } = this.props;

        return options.map((option, key) => {
            return (
                <Touchable style={[{...option.style, flexDirection: 'row', flex: 1, justifyContent: 'center'}, this.setActiveStyling(option.value, 'button'), (key === 0 && borderWidth === 'line') ? {borderRightWidth: 1, borderRightColor: normalBorderColor} : null]} key={option.value}
                    onPress={() => {
                        this.setNewState(option);

                        if (option.callback) {
                            option.callback();
                        }
                    }}
                >
                    {checkBoxes ?
                        <View style={[styles.radioButtonCirlcle, this.setActiveStyling(option.value, 'circle')]}>
                            {this.renderActiveImage(option.value)}
                        </View>
                    : null}

                    <Text style={this.setActiveStyling(option.value, 'text')}>{option.name}</Text>
                    {option.right}
                </Touchable>
            );
        });
    }

    render () {
        const { style, children } = this.props;

        return (
            <View style={[styles.container, style]}>
                {this.renderRadioButtons(this.props.initialValue)}
            </View>
        );
    }
}

RadioButton.propTypes = {
    options: PropTypes.array,
    initialValue: PropTypes.object,
    onSelect: PropTypes.func,
    width: PropTypes.number,
    style: PropTypes.number,
    activeColor: PropTypes.string,
    checkBoxes: PropTypes.any,
    normalColor: PropTypes.string,
    normalBorderColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    borderWidth: PropTypes.string
};

export default RadioButton;
