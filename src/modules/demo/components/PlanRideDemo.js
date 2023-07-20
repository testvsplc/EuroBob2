import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import PropTypes from 'prop-types';

// MomentJS
import moment from 'moment';
import 'moment/locale/nl';
// COMPONENTS
import {AnimatedPicker, Header, Touchable} from '../../../components/';

// EXTERNAL COMPONENTS
import Communications from 'react-native-communications';
import DatePicker from 'react-native-datepicker';
import DateTimePicker from '@react-native-community/datetimepicker';

// REACT-NATIVE
import {Animated, Dimensions, Image, Platform, Text, View} from 'react-native';

// STYLES
import styles from '../../rides/styles/planRide';

// TRANSLATION
import translation from '../../../translations/nl';

// IMAGES
import rideFrom from '../../../img/dashboard/rideProgress-from.png';
import rideTo from '../../../img/dashboard/rideProgress-to.png';
import rideVia from '../../../img/plan-ride/rideProgress-via.png';
import viaButton from '../../../img/plan-ride/viaButton.png';
import minusButton from '../../../img/plan-ride/removeViaButton.png';
import rideTime from '../../../img/plan-ride/ride-icon-time-sm.png';
import priceIcon from '../../../img/plan-ride/ride-price-icon-xs.png';
import commentIcon from '../../../img/plan-ride/ride-comment-icon-xs.png';
import success from '../../../img/form/input-formValidation-correct.png';

// ACTIONS
import {clearPlanRide, removeStopLocation, setRideDate} from '../../rides';
import {IsIphone5, togglePicker} from '../../../utility/';

moment.locale('nl');

const ScreenWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class PlanRideDemo extends Component {
    static renderNavigationBar(props) {
        return (
            <Header
                navigationState={props.navigationState}
                logo={false}
                title={props.title}
            />
        );
    }

    constructor(props) {
        super(props);

        this.onDateChange = this.onDateChange.bind(this);
    }


    // When component unmounts,
    // make sure the picker is closed
    componentWillUnmount() {
        const {dispatch, ride} = this.props;

        dispatch(togglePicker(false));

        if (ride) {
            dispatch(clearPlanRide());
        }
    }

    // Callback, creates a new ride
    // give to DateTimePicker as prop.
    onDateChange(event, date) {
        const {dispatch} = this.props;

        dispatch(setRideDate(date));
    }

    _convertDate(date) {
        const now = date;
        const year = '' + now.getFullYear();

        let month = '' + (now.getMonth() + 1);
        if (month.length === 1) {
            month = '0' + month;
        }
        let day = '' + now.getDate();
        if (day.length === 1) {
            day = '0' + day;
        }
        let hour = '' + now.getHours();
        if (hour.length === 1) {
            hour = '0' + hour;
        }
        let minute = '' + now.getMinutes();
        if (minute.length === 1) {
            minute = '0' + minute;
        }
        let second = '' + now.getSeconds();
        if (second.length === 1) {
            second = '0' + second;
        }

        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
    }

    renderStops() {
        const {planRide, dispatch} = this.props;

        return planRide.stops.map((stop, key) =>
            <View key={key} style={[styles.inputBottom, {position: 'relative'}]}>
                <View>
                    <View style={{position: 'absolute', bottom: 0, left: 20, zIndex: 5, alignItems: 'center'}}>
                        <View style={{position: 'absolute', left: -2, zIndex: 6, top: 21}}>
                            <Image
                                source={rideVia}
                            />
                        </View>
                        <View style={styles.distanceLineStop}/>
                    </View>
                    <View style={styles.textInputStyles}>
                        <View style={{paddingTop: 7}}>
                            <Text style={{
                                color: '#99ACBF',
                                fontSize: 17
                            }}>{stop.street ? stop.street : stop.address}</Text>
                            <Text style={{color: '#99ACBF', fontSize: 14}}>{stop.city ? stop.city : stop.place}</Text>
                        </View>
                    </View>
                    <Touchable
                        style={{position: 'absolute', bottom: 0, top: 25, right: 20, zIndex: 5, alignItems: 'center'}}
                        onPress={() => dispatch(removeStopLocation(stop))}>
                        <Image
                            source={minusButton}
                        />
                    </Touchable>
                </View>
            </View>
        );
    }

    render() {
        const {planRide, showPicker, dispatch, ride} = this.props;
        const timeZoneOffsetInHours = (-1) * (new Date()).getTimezoneOffset() / 60;
        const date = new Date();
        const minDate = date.setHours(date.getHours() + 1);
        const offSet = new Animated.Value(deviceHeight);
        const currentOrder = planRide.stops.length;
        const validOrder = planRide.to.lat.toString().length >= 1 && planRide.from.lat.toString().length >= 1;

        return (
            <View style={{height: deviceHeight}}>
                <View style={styles.container}>
                    <Text style={styles.heading}>
                        {translation.PLAN_RIDE_TITLE}
                    </Text>

                    <View style={styles.inputLocations}>

                        <View style={[styles.inputBottom, {position: 'relative'}]}>
                            <Touchable onPress={() => Actions.search_location_demo({dispatchType: 'from'})}>
                                <View style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 15,
                                    zIndex: 5,
                                    alignItems: 'center'
                                }}>
                                    <Image
                                        source={rideFrom}
                                    />
                                    <View style={styles.distanceLine}/>
                                </View>
                                <View style={styles.textInputStyles}>
                                    {planRide.from.city || planRide.from.place ?
                                        <View style={{paddingTop: 7}}>
                                            <Text style={{
                                                color: '#263340',
                                                fontSize: 17
                                            }}>{planRide.from.street ? planRide.from.street : planRide.from.address}</Text>
                                            <Text style={{
                                                color: '#5C6773',
                                                fontSize: 14
                                            }}>{planRide.from.city ? planRide.from.city : planRide.from.place}</Text>
                                        </View>
                                        :
                                        <Text
                                            style={styles.inputPlaceholders}>{translation.PLAN_RIDE_FORM_FROM_LOCATION}</Text>
                                    }
                                </View>
                            </Touchable>
                        </View>

                        {this.renderStops()}

                        <View style={{position: 'relative'}}>
                            <Touchable onPress={() => Actions.search_location_demo({dispatchType: 'to'})}>
                                <View style={{position: 'absolute', top: 0, left: 15, zIndex: 5, alignItems: 'center'}}>
                                    <View style={styles.distanceLine}/>
                                    <Image
                                        source={rideTo}
                                    />
                                </View>
                                <View style={styles.textInputStyles}>
                                    {planRide.to.city || planRide.to.place ?
                                        <View style={{paddingTop: 7}}>
                                            <Text style={{
                                                color: '#263340',
                                                fontSize: 17
                                            }}>{planRide.to.street ? planRide.to.street : planRide.to.address}</Text>
                                            <Text style={{
                                                color: '#5C6773',
                                                fontSize: 14
                                            }}>{planRide.to.city ? planRide.to.city : planRide.to.place}</Text>
                                        </View>
                                        :
                                        <Text
                                            style={styles.inputPlaceholders}>{translation.PLAN_RIDE_FORM_DESTINATION}</Text>
                                    }
                                </View>
                            </Touchable>
                        </View>
                    </View>

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <View style={[styles.PlanRideTime]}>
                            <View style={{alignItems: 'flex-end', flexDirection: 'row'}}>
                                <View style={{marginRight: 10}}>
                                    <Image
                                        source={rideTime}
                                    />
                                </View>
                                <View style={{}}>
                                    <Touchable onPress={() => {
                                        Platform.OS === 'android' ? this.refs.datepickerAndroid.onPressDate() : dispatch(togglePicker(true));
                                    }}>
                                        <Text style={{paddingTop: 1, fontSize: 17}}>
                                            {moment(planRide.date)
                                                .calendar(null, {
                                                    sameDay: '[Vandaag] LT',
                                                    nextDay: '[Morgen] LT',
                                                    nextWeek: 'DD/MM/YYYY LT',
                                                    lastDay: '[Gisteren] LT',
                                                    lastWeek: 'DD/MM/YYYY LT',
                                                    sameElse: 'DD/MM/YYYY LT'
                                                })
                                            }
                                        </Text>
                                    </Touchable>
                                </View>
                            </View>
                        </View>
                        {planRide.stops.length < 3 ?
                            <View style={{}}>
                                <Touchable style={{alignItems: 'flex-end', flexDirection: 'row', alignItems: 'center'}}
                                           onPress={() => Actions.search_location_demo({
                                               dispatchType: 'stop',
                                               order: currentOrder === 1 ? currentOrder : currentOrder + 1
                                           })}>
                                    <Text style={{textAlign: 'right', marginRight: 5, fontSize: 17, color: '#5C6773'}}>
                                        {translation.PLAN_RIDE_VIA}
                                    </Text>
                                    <View style={{}}>
                                        <Image
                                            style={{marginTop: 5, marginRight: 2}}
                                            source={viaButton}
                                        />
                                    </View>
                                </Touchable>
                            </View>
                            : null}
                    </View>
                    <Text style={styles.warning}>U kunt geen rit boeken met een aanvang binnen 60 minuten</Text>
                </View>

                <View style={styles.orderRide}>
                    <View style={{paddingLeft: 25, paddingRight: 25, flex: 1, flexDirection: 'row'}}>

                        <Touchable onPress={() => Actions.planride_comment({comment: planRide.comment})}
                                   style={[styles.priceAndComment, {
                                       borderBottomLeftRadius: 5,
                                       borderTopLeftRadius: 5
                                   }]}>
                            <View style={{flex: 1, flexDirection: 'row', marginLeft: 20, opacity: 0.3}}>
                                <View style={{flex: 0.2}}>
                                    <Image
                                        style={{marginTop: 2}}
                                        source={commentIcon}
                                    />
                                </View>

                                <View style={{flex: 0.8, flexDirection: 'row'}}>
                                    <Text style={{
                                        color: planRide.comment ? '#263340' : '#8595A6',
                                        fontSize: IsIphone5(ScreenWidth) ? 13 : 14
                                    }}>
                                        {translation.PLAN_RIDE_COMMENT}
                                    </Text>
                                    <View style={{flex: 0.1, marginTop: 5}}>
                                        {planRide.comment ?
                                            <Image
                                                source={success}
                                            />
                                            : null}
                                    </View>
                                </View>

                            </View>
                        </Touchable>

                        <Touchable
                            onPress={planRide.calculatedPrice.clickable ? () => Actions.planride_prices({prices: planRide.calculatedPrice.price}) : null}
                            style={[styles.priceAndComment, {
                                marginLeft: -1,
                                borderBottomRightRadius: 5,
                                borderTopRightRadius: 5
                            }]}>
                            <View style={[{
                                flex: 1,
                                flexDirection: 'row',
                                marginLeft: 20
                            }, planRide.calculatedPrice.clickable ? null : {opacity: 0.3}]}>
                                <View style={{flex: 0.2}}>
                                    <Image
                                        source={priceIcon}
                                    />
                                </View>
                                <View style={{flex: 0.8}}>
                                    <Text style={{color: '#8595A6', fontSize: IsIphone5(ScreenWidth) ? 13 : 14}}>
                                        {translation.PLAN_RIDE_INDICATION}
                                    </Text>
                                </View>
                            </View>
                        </Touchable>
                    </View>

                    {ride ?
                        <Touchable onPress={() => Communications.phonecall('310883650808', true)}>
                            <Text style={{textAlign: 'center', color: '#8595A6', marginBottom: -9, marginTop: 10}}>
                                Rit annuleren
                            </Text>
                        </Touchable>
                        : null}

                    <View style={validOrder ? null : {opacity: 0.6}}>
                        <Touchable onPress={validOrder ? () => Actions.signup() : null} style={styles.orderButton}>
                            {ride ?
                                <Text style={{color: '#FFFFFF', fontSize: 24}}>Wijzig deze rit</Text>
                                :
                                <Text style={{color: '#FFFFFF', fontSize: 24}}>Boek deze rit</Text>
                            }
                        </Touchable>
                    </View>
                </View>
                {Platform.OS === 'android' ?
                    <DatePicker
                        style={{width: 200}}
                        date={new Date(planRide.date)}
                        mode="datetime"
                        ref="datepickerAndroid"
                        placeholder="select date"
                        format="YYYY-MM-DD LT"
                        minDate={date}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                height: 0,
                                width: 0,
                                opacity: 0
                            },
                            dateInput: {
                                height: 0,
                                width: 0,
                                opacity: 0
                            }
                        }}
                        onDateChange={(dateChanged) => {
                            this.onDateChange(dateChanged);
                        }}
                    />
                    : null}

                {showPicker && Platform.OS !== 'android' ?
                    <AnimatedPicker
                        closePicker={() => {
                            dispatch(togglePicker(false));
                        }}
                        offSet={offSet}
                        toValue={25}
                    >
                        <DateTimePicker
                            style={{backgroundColor: '#f9cd28'}}
                            value={new Date(planRide.date)}
                            mode="datetime"
                            minimumDate={date}
                            display="spinner"
                            timeZoneOffsetInMinutes={timeZoneOffsetInHours * 60}
                            onChange={this.onDateChange}
                        />
                    </AnimatedPicker>
                    : null}
            </View>
        );
    }
}

PlanRideDemo.propTypes = {
    planRide: PropTypes.object,
    dispatch: PropTypes.func,
    showPicker: PropTypes.bool,
    loading: PropTypes.bool,
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select(state) {
    return {
        planRide: state.rides.planRide,
        showPicker: state.utility.showPicker
    };
}

export default connect(select)(PlanRideDemo);
