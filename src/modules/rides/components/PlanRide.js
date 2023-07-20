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
import DateTimePicker from "@react-native-community/datetimepicker";

// REACT-NATIVE
import {
    Alert,
    Animated,
    Dimensions,
    Image,
    Keyboard,
    Picker,
    Platform,
    ScrollView,
    Text,
    View
} from 'react-native';
// STYLES
import styles from '../styles/planRide';

// TRANSLATION
import translation from '../../../translations/nl';

// IMAGES
import navBarImageWhite from '../../../img/dashboard/navBar-menuButton.png';
import callImage from '../../../img/plan-ride/navBar-callButton-dark.png';
import callXsButton from '../../../img/plan-ride/ride-contact-icon-xs.png';
import rideFrom from '../../../img/dashboard/rideProgress-from.png';
import rideTo from '../../../img/dashboard/rideProgress-to.png';
import rideVia from '../../../img/plan-ride/rideProgress-via.png';
import viaButton from '../../../img/plan-ride/viaButton.png';
import minusButton from '../../../img/plan-ride/removeViaButton.png';
import rideTime from '../../../img/plan-ride/ride-icon-time-sm.png';
import priceIcon from '../../../img/plan-ride/ride-price-icon-xs.png';
import commentIcon from '../../../img/plan-ride/ride-comment-icon-xs.png';
import success from '../../../img/form/input-formValidation-correct.png';
import formDropdown from '../../../img/form/input-dropDownButton-normal.png';

// ACTIONS
import {
    cancelRide,
    clearPlanRide,
    fetchIsAppOpen,
    fetchRidePrice,
    removeStopLocation,
    savePlanRide,
    setPaymentType,
    setRideDate,
    setToLocation,
    setUpdatePlanRide,
    setWalletId,
    togglePaymentType,
    toggleWalletIdShow,
    updateRide
} from '../actions';
import {getWalletName, getWallets} from '../../authentication/actions'
import {togglePicker} from '../../../utility/';
import {fetchProfile} from '../../profile/';
import {IsIphone5} from "../../../utility/index";

moment.locale('nl');

// PICKER ITEM
const PickerItem = Picker.Item;

const deviceHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

class PlanRide extends Component {
    static renderNavigationBar(props) {
        return (
            <Header
                leftButtonText={
                    <Image
                        source={navBarImageWhite}
                        key={navBarImageWhite}
                    />
                }
                leftButtonAction={() => Actions.refresh({key: 'drawerDashboardApp', open: true})}
                rightButtonText={
                    <Image
                        key={callImage}
                        source={callImage}
                    />
                }
                rightButtonAction={() => Actions.contact()}
                navigationState={props.navigationState}
                logo={false}
                title={props.title}
            />
        );
    }

    constructor(props) {
        super(props);

        this.onDateChange = this.onDateChange.bind(this);
        this.planRide = this.planRide.bind(this);
        this.closePicker = this.closePicker.bind(this);
        this.openPicker = this.openPicker.bind(this);
    }

    componentWillMount() {
        const {dispatch, user, profile, ride} = this.props;
        dispatch(togglePaymentType(false));
        let rideDate = null;
        if (ride) {
            rideDate = new Date(ride.start_date * 1000);
            dispatch(setUpdatePlanRide(ride));
        } else {
            rideDate = new Date();
            rideDate.setHours((new Date()).getHours() + 1);
            rideDate.setMinutes((new Date()).getMinutes() + 5);
        }

        function checkHomeAddress(home) {
            if (home !== null) {
                dispatch(setToLocation(home))
            }
        }

        dispatch(getWallets(user.user_id, user.api_token));
        dispatch(getWalletName(user.user_id, user.api_token));
        dispatch(setWalletId(user.wallet_id_prefered));
        dispatch(setPaymentType(profile.prefered_payment));
        dispatch(fetchIsAppOpen(user.api_token));
        dispatch(setRideDate(rideDate));
        dispatch(fetchProfile(profile.profile_id, user.api_token, (addresses) => checkHomeAddress(addresses.home)));
    }

    componentDidUpdate(prevProps, prevState) {
        const {planRide} = this.props;
        const nextProps = planRide;
        const oldProps = prevProps.planRide;

        if (nextProps.to.address.length >= 2 && nextProps.from.address.length >= 2) {

            if (nextProps.stops.length !== oldProps.stops.length) {
                this.planRide(true);
            }
            if (nextProps.to.address !== oldProps.to.address || nextProps.from.address !== oldProps.from.address) {
                this.planRide(true);
            }
        }
    }

    // When component unmounts,
    // make sure the picker is closed
    componentWillUnmount() {
        const {dispatch, ride} = this.props;

        dispatch(togglePicker(false));
        dispatch(togglePaymentType(false));
        dispatch(toggleWalletIdShow(false));
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

    planRide(checkPrice = false) {
        const {dispatch, planRide, profile, user, ride} = this.props;

        let date = null;
        if (Platform.OS === 'android') {
            date = planRide.date + ":00";
        } else {
            date = this._convertDate(new Date(planRide.date))
        }

        const obj = {
            profile_id: profile.profile_id,
            payment: planRide.payment,
            wallet_id: planRide.wallet_id,
            start_date: date,
            comment: planRide.comment,
            start: {
                lat: planRide.from.lat,
                lon: planRide.from.lon,
                address: planRide.from.address,
                zipcode: planRide.from.zipcode,
                place: planRide.from.place
            },
            end: {
                lat: planRide.to.lat,
                lon: planRide.to.lon,
                address: planRide.to.address,
                zipcode: planRide.to.zipcode,
                place: planRide.to.place
            },
            via: planRide.stops
        };

        if (checkPrice) {
            dispatch(fetchRidePrice(obj, user.api_token));
        } else if (ride) {
            dispatch(updateRide(planRide.ride_id, obj, user.api_token)).then((data) => {
                dispatch(clearPlanRide());
            });
        } else {
            dispatch(savePlanRide(obj, user.api_token));
        }
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

    renderCompanyInfo() {
        const {profile, planRide} = this.props;

        if (profile.type === 'company' && profile.prefered_payment === '') {
            return (
                <View style={{flexDirection: 'row', flex: 1}}>
                    <Touchable onPress={() => Actions.edit_profile()}
                               style={[styles.missingInfo, {borderTopRightRadius: 5, borderTopLeftRadius: 5}]}>
                        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
                            <View>
                                <Image
                                    style={{marginTop: 0, marginRight: 10}}
                                    source={callXsButton}
                                />
                            </View>

                            <View>
                                <Text style={{color: planRide.comment ? '#263340' : '#8595A6', flex: 0.3}}>
                                    {translation.PLAN_RIDE_COMPANY}
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
                </View>
            );
        }
    }

    DetermineAction() {
        const {ride, user, dispatch} = this.props;

        const hourDiff = ((a, b) => {
            const _MS_PER_HOUR = 1000 * 60 * 60
            const distance = a - b;

            return Math.floor(distance / _MS_PER_HOUR);
        })(new Date(ride.start_date * 1000), new Date());

        if (hourDiff <= 2) {
            Communications.phonecall('310883650808', true)
        } else {
            Alert.alert("Rit annuleren", "Weet u zeker dat u deze rit wil annuleren?", [
                {
                    text: "Ja",
                    onPress: () => {
                        console.log(ride);
                        dispatch(cancelRide(ride.ride_id, user.api_token));
                        Alert.alert("Rit geannuleerd", "Uw rit is geannuleerd", [
                            {
                                text: "Ok",
                                onPress: () => {
                                    Actions.dashboard();
                                }
                            }
                        ]);
                    }
                },
                {
                    text: "Nee",
                    onPress: () => null
                }
            ])
        }

    }


    openPicker() {
        Keyboard.dismiss();
    }

    closePicker() {
    }

    getProfilePayment() {
        const {planRide, profile} = this.props;
        if (planRide.payment.length > 0) {
            return planRide.payment;
        } else if (profile.prefered_payment.length > 0) {
            return profile.prefered_payment;
        }

        return 'pin';
    }

    setPaymentType(type) {
        const {dispatch} = this.props;


        dispatch(setPaymentType(type));

    }

    getCurrentWalletIdValue() {
        const {user, planRide} = this.props;
        walletoptions = [];
        for (var prop in user.wallets) {
            indivualwallet = user.wallets[prop];

            walletid = indivualwallet.id;
            walletname = indivualwallet.name;
            if (walletid == planRide.wallet_id) {
                return walletname;
            }
            walletobjectvalues = {"label": walletname, "value": walletid};
            walletoptions.push(walletobjectvalues);
        }
        const walletTotalOptions = walletoptions;

        amount = user.walletsamount;
        if (amount == 0) {
            return '';
        } else {
            return walletTotalOptions[0].label;
        }
    }


    getWalletId() {
        const {planRide} = this.props;
        return planRide.wallet_id;
    }

    setWalletId(id) {
        const {dispatch} = this.props;


        dispatch(setWalletId(id));
    }

    render() {
        const {planRide, showPicker, dispatch, profile, profileInformation, user, ride, open, open_time} = this.props;
        const timeZoneOffsetInHours = (-1) * (new Date()).getTimezoneOffset() / 60;
        const date = new Date();
        const minDate = date.setHours(date.getHours() + 1);
        const offSet = new Animated.Value(deviceHeight);
        const currentOrder = planRide.stops.length;
        const validOrder = planRide.to.lat.toString().length >= 1 && planRide.from.lat.toString().length >= 1;
        const outOfArea = planRide.calculatedPrice.clickable ? planRide.calculatedPrice.price.out_of_area : false;
        const missingCompany = profile.type === 'company' && profile.prefered_payment === '';
        amount = user.walletsamount;

        if (amount === 0) {
            paymentOptionsPrivatedefault = [
                {
                    label: 'Pin',
                    value: 'pin'
                },
                {
                    label: 'Contant',
                    value: 'cash'
                }
            ];
            paymentOptionsCompanydefault = [
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
                }
            ];
        } else {
            paymentOptionsPrivatedefault = [
                {
                    label: 'Pin',
                    value: 'pin'
                },
                {
                    label: 'Contant',
                    value: 'cash'
                }
                ,
                {
                    label: 'Wallet',
                    value: 'wallet'
                }
            ];
            paymentOptionsCompanydefault = [
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
                    label: 'Wallet',
                    value: 'wallet'
                }
            ];
        }
        walletoptions = [];
        for (var prop in user.wallets) {
            indivualwallet = user.wallets[prop];

            walletid = indivualwallet.id;
            walletname = indivualwallet.name;
            walletobjectvalues = {"label": walletname, "value": walletid};
            walletoptions.push(walletobjectvalues);
        }
        const walletTotalOptions = walletoptions;

        const paymentOptionsPrivate = paymentOptionsPrivatedefault;
        const paymentOptionsCompany = paymentOptionsCompanydefault;

        const paymentOptions = profile.type === 'private' ? paymentOptionsPrivate : paymentOptionsCompany;

        const payment = paymentOptions.filter((type) => {
            if (planRide.payment) {
                if (type.value === planRide.payment) {
                    return true;
                }
            }

            return false;
        });


        return (open ?
                <ScrollView>
                    <View style={{height: deviceHeight}}>
                        <View style={[styles.container]}>
                            <Text style={[styles.heading]}>
                                {translation.PLAN_RIDE_TITLE}
                            </Text>

                            <View style={styles.inputLocations}>

                                <View style={[styles.inputBottom, {position: 'relative'}]}>
                                    <Touchable onPress={() => Actions.search_location({
                                        dispatchType: 'from',
                                        initialValue: planRide.from.address
                                    })}>
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
                                    <Touchable onPress={() => Actions.search_location({
                                        dispatchType: 'to',
                                        initialValue: planRide.to.address
                                    })}>
                                        <View style={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 15,
                                            zIndex: 5,
                                            alignItems: 'center'
                                        }}>
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
                                                Platform.OS === 'android' && !planRide.showPaymentType && !planRide.walletidshow ? this.refs.datepickerAndroid.onPressDate() : dispatch(togglePicker(true));
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
                                        <Touchable
                                            style={{alignItems: 'flex-end', flexDirection: 'row', alignItems: 'center'}}
                                            onPress={() => Actions.search_location({
                                                dispatchType: 'stop',
                                                order: currentOrder === 1 ? currentOrder : currentOrder + 1
                                            })}>
                                            <Text style={{
                                                textAlign: 'right',
                                                marginRight: 5,
                                                fontSize: 17,
                                                color: '#5C6773'
                                            }}>
                                                {translation.PLAN_RIDE_VIA}
                                            </Text>
                                            <View style={{}}>
                                                <Image
                                                    style={{marginRight: 2}}
                                                    source={viaButton}
                                                />
                                            </View>
                                        </Touchable>
                                    </View>
                                    : null}
                            </View>
                            <Text style={[styles.warning, planRide.error ? styles.waringBigger : null]}>U kunt geen rit
                                boeken
                                met een aanvang binnen 60 minuten.</Text>
                            <View style={{}}>
                                <Text style={{
                                    marginTop: 20,
                                    color: '#8595A6',
                                    fontSize: IsIphone5(ScreenWidth) ? 13 : 14
                                }}>
                                    {translation.PLAN_RIDE_PAYMENT}
                                </Text>
                            </View>
                            <Touchable onPress={() => {
                                dispatch(togglePaymentType(true));
                                this.openPicker();
                            }} style={styles.inputBorder}>
                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <View style={styles.inputWithLabel}>
                                        <Text style={{fontSize: 17}}>{payment[0] ? payment[0].label : ''}</Text>
                                    </View>
                                    <View>
                                        <Image
                                            style={{marginRight: 10, marginTop: 6}}
                                            source={formDropdown}
                                        />
                                    </View>
                                </View>
                            </Touchable>
                            {this.getProfilePayment() == "wallet" ?
                                <View>
                                    <View style={{}}>
                                        <Text style={{
                                            marginTop: 5,
                                            color: '#8595A6',
                                            fontSize: IsIphone5(ScreenWidth) ? 13 : 14
                                        }}>
                                            {translation.PLAN_RIDE_WALLET}
                                        </Text>
                                    </View>
                                    <Touchable onPress={() => {
                                        dispatch(toggleWalletIdShow(true));
                                        this.openPicker();
                                    }} style={styles.inputBorder}>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                            <View style={styles.inputWithLabel}>
                                                <Text style={{fontSize: 17}}>{this.getCurrentWalletIdValue()}</Text>
                                            </View>
                                            <View>
                                                <Image
                                                    style={{marginRight: 10, marginTop: 6}}
                                                    source={formDropdown}
                                                />
                                            </View>
                                        </View>
                                    </Touchable>
                                </View>
                                :
                                null

                            }


                        </View>


                        <View style={styles.orderRide}>
                            <View style={{paddingLeft: 25, paddingRight: 25, flex: 1, flexDirection: 'row'}}>

                                {this.renderCompanyInfo()}

                                <Touchable onPress={() => Actions.planride_comment({comment: planRide.comment})}
                                           style={[styles.priceAndComment, {borderBottomLeftRadius: 5}, missingCompany ? null : {borderTopLeftRadius: 5}]}>
                                    <View style={{flex: 1, flexDirection: 'row', marginLeft: 20}}>
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
                                        borderBottomRightRadius: 5
                                    }, missingCompany ? null : {borderTopRightRadius: 5}]}>
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
                                            <Text
                                                style={{color: '#8595A6', fontSize: IsIphone5(ScreenWidth) ? 13 : 14}}>
                                                {translation.PLAN_RIDE_INDICATION}
                                            </Text>
                                        </View>
                                    </View>
                                </Touchable>
                            </View>

                            {ride ?
                                <Touchable onPress={() => {
                                    this.DetermineAction();
                                }}>
                                    <Text style={{
                                        textAlign: 'center',
                                        color: '#8595A6',
                                        marginBottom: -9,
                                        marginTop: 10
                                    }}>
                                        Rit annuleren
                                    </Text>
                                </Touchable>
                                : null}


                            <View style={validOrder && outOfArea !== true ? null : {opacity: 0.6}}>
                                <Touchable onPress={validOrder && outOfArea !== true ? () => this.planRide() : null}
                                           style={styles.orderButton}>
                                    {ride ?
                                        <Text style={{color: '#FFFFFF', fontSize: 24}}>Wijzig deze rit</Text>
                                        :
                                        <Text style={{color: '#FFFFFF', fontSize: 24}}>Boek deze rit</Text>
                                    }
                                </Touchable>
                            </View>
                        </View>
                        {planRide.showPaymentType ?

                            <AnimatedPicker style={{zIndex: 7}}
                                            closePicker={() => {
                                                {
                                                    this.getProfilePayment() == "wallet" ?
                                                        this.setWalletId(walletTotalOptions[0].value)
                                                        :
                                                        null
                                                }
                                                dispatch(togglePaymentType(false));
                                                this.closePicker();
                                            }}
                                            offSet={offSet}
                                            toValue={-50}
                            >
                                <Picker
                                    selectedValue={this.getProfilePayment()}
                                    onValueChange={(value) => this.setPaymentType(value)}
                                >
                                    {paymentOptions.map((option) => (
                                        <PickerItem
                                            key={option.value}
                                            value={option.value}
                                            label={option.label}
                                        />

                                    ))}
                                </Picker>

                            </AnimatedPicker>


                            : null}

                        {planRide.walletidshow && this.getProfilePayment() == "wallet" ?
                            <AnimatedPicker style={{zIndex: 7}}
                                            closePicker={() => {

                                                dispatch(toggleWalletIdShow(false));
                                                this.closePicker();
                                            }}
                                            offSet={offSet}
                                            toValue={-50}
                            >

                                <Picker
                                    selectedValue={this.getWalletId()}
                                    onValueChange={(value) => this.setWalletId(value)}
                                >
                                    {walletTotalOptions.map((option) => (
                                        <PickerItem
                                            key={option.value}
                                            value={option.value}
                                            label={option.label}
                                        />

                                    ))}
                                </Picker>


                            </AnimatedPicker>
                            :
                            null
                        }

                        {Platform.OS === 'android' && !planRide.showPaymentType && !planRide.walletidshow ?
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

                        {showPicker && Platform.OS !== 'android' && !planRide.showPaymentType && !planRide.walletidshow ?
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
                </ScrollView>
                :
                <View style={{height: deviceHeight}}>
                    <View style={styles.container}>
                        <Text style={styles.heading_smaller}>
                            {translation.PLAN_RIDE_CLOSED}
                            {open_time}
                            {translation.PLAN_RIDE_CLOSED_close}
                        </Text>
                    </View>
                </View>
        );
    }
}

PlanRide.propTypes = {
    planRide: PropTypes.object,
    profileInformation: PropTypes.object,
    user: PropTypes.object,
    dispatch: PropTypes.func,
    showPicker: PropTypes.bool,
    loading: PropTypes.bool,
    profile: PropTypes.object
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select(state) {
    return {
        profile: state.profile.profile,
        user: state.authentication.user,
        planRide: state.rides.planRide,
        profileInformation: state.profile.profileInformation,
        open: state.rides.open,
        open_time: state.rides.open_time,
        showPicker: state.utility.showPicker,
        homeAddress: state.profile.addresses.home,
    };
}

export default connect(select)(PlanRide);
