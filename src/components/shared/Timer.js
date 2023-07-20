// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import reactMixin from 'react-mixin';
import TimerMixin from 'react-timer-mixin';

// REACT-NATIVE
import {
    View,
    Text,
    Platform
} from 'react-native';

// STYLES
import styles from '../styles/timer';

// TRANSLATION
import translation from '../../translations/nl';

const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;
let timer;

class Timer extends Component {
    constructor (props) {
        super(props);

        this.state = {
            days: '',
            hours: '',
            minutes: '',
            seconds: '',
            finished: false
        };
        this._setTimer = this._setTimer.bind(this);
    }

    componentWillMount () {
        // Sets timer on mount, prevents from looking ugly.
        this._setTimer();

        // Bind const to interval,
        // We can clearInterval later because of this.
        timer = this.setInterval(this._setTimer, 1000);
        timer;
    }

    // Set up timer.
    _setTimer () {
        const { startDate } = this.props;
        const end = new Date(startDate * 1000);
        const now = new Date();

        const distance = end - now;
        if (distance < 0) {
            this.setState({finished: true});
            clearInterval(timer);

            return;
        }

        let days = Math.floor(distance / _day);
        let hours = Math.floor((distance % _day) / _hour);
        let minutes = Math.floor((distance % _hour) / _minute);
        let seconds = Math.floor((distance % _minute) / _second);

        days = days < 10 ? '0' + days : days;
        hours = hours < 10 ? '0' + hours : hours;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        this.setState({
            days,
            hours,
            minutes,
            seconds
        });
    }

    digitLengthCheck (digits) {
        if (Platform.OS === 'android') {

            const newDigits = Object.assign([], digits.toString().split(''));

            return newDigits.map((digit, key) => {
                return (
                    <View key={key} style={key === 0 ? styles.digitMargin : null} ><Text style={{fontSize: 24, marginTop: -22}}>{digit}</Text></View>
                );
            });
        }
    }

    render () {
        const { days, hours, minutes, seconds } = this.state;
        const { center } = this.props;

        return (
            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                {days !== '00' ?
                    <View style={styles.time}>
                        <Text style={[styles.timeType, center ? null : {textAlign: 'left'}]}>{translation.TIMER_DAYS}</Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={styles.timeHolder}>
                                <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', opacity: 0.9, borderTopRightRadius: 2, borderTopLeftRadius: 2, marginBottom: 1, marginRight: 1}]} />
                                <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', borderBottomRightRadius: 2, borderBottomLeftRadius: 2}]} />
                            </View>
                            <View style={styles.timeHolder}>
                                <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', opacity: 0.9, borderTopRightRadius: 2, borderTopLeftRadius: 2, marginBottom: 1, marginRight: 1}]} />
                                <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', borderBottomRightRadius: 2, borderBottomLeftRadius: 2}]} />
                            </View>
                        </View>
                        {
                            Platform.OS === 'android' ?
                                <View style={{flex: 1, flexDirection: 'row'}}>{this.digitLengthCheck(days)}</View>
                            :
                            <Text style={styles.letterSpacing}>{days}</Text>
                        }
                    </View>
                :
                    <View />
                }

                <View style={styles.time}>
                    <Text style={[styles.timeType, center ? null : {textAlign: 'left'}]}>{translation.TIMER_HOURS}</Text>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={styles.timeHolder}>
                            <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', opacity: 0.9, borderTopRightRadius: 2, borderTopLeftRadius: 2, marginBottom: 1, marginRight: 1}]} />
                            <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', borderBottomRightRadius: 2, borderBottomLeftRadius: 2}]} />
                        </View>
                        <View style={styles.timeHolder}>
                            <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', opacity: 0.9, borderTopRightRadius: 2, borderTopLeftRadius: 2, marginBottom: 1, marginRight: 1}]} />
                            <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', borderBottomRightRadius: 2, borderBottomLeftRadius: 2}]} />
                        </View>
                    </View>
                    {
                        Platform.OS === 'android' ?
                            <View style={{flex: 1, flexDirection: 'row'}}>{this.digitLengthCheck(hours)}</View>
                        :
                        <Text style={styles.letterSpacing}>{hours}</Text>
                    }
                </View>

                <View style={styles.time}>
                    <View>
                        <Text style={[styles.timeType, center ? null : {textAlign: 'left'}]}>{translation.TIMER_MIN}</Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={styles.timeHolder}>
                            <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', opacity: 0.9, borderTopRightRadius: 2, borderTopLeftRadius: 2, marginBottom: 1, marginRight: 1}]} />
                            <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', borderBottomRightRadius: 2, borderBottomLeftRadius: 2}]} />
                        </View>
                        <View style={styles.timeHolder}>
                            <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', opacity: 0.9, borderTopRightRadius: 2, borderTopLeftRadius: 2, marginBottom: 1, marginRight: 1}]} />
                            <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', borderBottomRightRadius: 2, borderBottomLeftRadius: 2}]} />
                        </View>
                    </View>
                    {
                        Platform.OS === 'android' ?
                            <View style={{flex: 1, flexDirection: 'row'}}>{this.digitLengthCheck(minutes)}</View>
                        :
                        <Text style={styles.letterSpacing}>{minutes}</Text>
                    }
                </View>

                {days !== '00' ?
                    <View />
                :
                    <View style={styles.time}>
                        <Text style={[styles.timeType, center ? null : {textAlign: 'left'}]}>{translation.TIMER_SEC}</Text>
                        <View style={{flex: 1, flexDirection: 'row'}}>
                            <View style={styles.timeHolder}>
                                <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', opacity: 0.9, borderTopRightRadius: 2, borderTopLeftRadius: 2, marginBottom: 1, marginRight: 1}]} />
                                <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', borderBottomRightRadius: 2, borderBottomLeftRadius: 2}]} />
                            </View>
                            <View style={styles.timeHolder}>
                                <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', opacity: 0.9, borderTopRightRadius: 2, borderTopLeftRadius: 2, marginBottom: 1, marginRight: 1}]} />
                                <View style={[styles.timeSlot, {backgroundColor: '#FFFFFF', borderBottomRightRadius: 2, borderBottomLeftRadius: 2}]} />
                            </View>
                        </View>
                        {
                            Platform.OS === 'android' ?
                                <View style={{flex: 1, flexDirection: 'row'}}>{this.digitLengthCheck(seconds)}</View>
                            :
                            <Text style={styles.letterSpacing}>{seconds}</Text>
                        }
                    </View>
                }
            </View>
        );
    }
}

Timer.propTypes = {
    center: PropTypes.bool
};

reactMixin.onClass(Timer, TimerMixin);

export default Timer;
