// REACT
import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import {Actions} from 'react-native-router-flux';
import PropTypes from 'prop-types';

// COMPONENTS
import {AnimatedPicker, Button, Touchable} from '../../../components/';
import ImagePicker from 'react-native-image-picker';

// REACT COMPONENTS
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// REACT-NATIVE
import {Alert, Animated, Dimensions, Image, Keyboard, Picker, Text, TextInput, View} from 'react-native';
// IMAGES
import formError from '../../../img/form/input-formValidation-wrong.png';
import formSuccess from '../../../img/form/input-formValidation-correct.png';
import formDropdown from '../../../img/form/input-dropDownButton-normal.png';

// STYLES
import styles from '../styles/profileOverview';
// IMAGES
import profileImage from '../../../img/profile/userAvatar.png';

// ACTIONS
import {
    setFormProfileImage,
    setPaymentType,
    toggleAccountType,
    togglePaymentType,
    toggleWalletIdShow,
    updateProfile
} from '../actions';
import {setPreferedWalletId, setWalletId, toggleUserProfile} from '../../authentication/';
import {togglePicker} from '../../../utility/';

// TRANSLATION
import translation from '../../../translations/nl';

// PICKER ITEM
const PickerItem = Picker.Item;

const deviceHeight = Dimensions.get('window').height;

class ProfileInformation extends Component {
    constructor(props) {
        super(props);

        this.chooseAvatar = this.chooseAvatar.bind(this);
        this.toggleProfileType = this.toggleProfileType.bind(this);
        this.closePicker = this.closePicker.bind(this);
        this.openPicker = this.openPicker.bind(this);
    }


    setPaymentType(type) {
        const {dispatch} = this.props;


        dispatch(setPaymentType(type));

    }

    setWalletId(id) {
        const {dispatch} = this.props;


        dispatch(setWalletId(id));
    }

    getCurrentWalletIdValue() {
        const {user} = this.props;

        walletoptions = [];
        for (var prop in user.wallets) {
            indivualwallet = user.wallets[prop];

            walletid = indivualwallet.id;
            walletname = indivualwallet.name;
            if (walletid == user.wallet_id) {
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

    componentWillMount() {
        const {dispatch, user} = this.props;
        dispatch(setWalletId(user.wallet_id_prefered));
        dispatch(togglePicker(false));
        dispatch(togglePaymentType(false));
    }

    componentWillUnmount() {
        const {dispatch} = this.props;

        dispatch(togglePicker(false));
        dispatch(togglePaymentType(false));
        dispatch(toggleWalletIdShow(false));
        dispatch(toggleAccountType(false));
    }

    chooseAvatar() {
        const {dispatch} = this.props;
        // More info on all the options is below in the README...just some common use cases shown here
        const options = {
            title: translation.PROFILE_INFO_CHOOSE_PICTURE,
            cancelButtonTitle: 'Annuleren',
            takePhotoButtonTitle: 'Foto maken...',
            chooseFromLibraryButtonTitle: 'Kies uit bibliotheek...',
            quality: 0.5,
            maxWidth: 100,
            maxHeight: 100,
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        };

        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
            } else if (response.error) {
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can display the image using either data...
                const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
                dispatch(setFormProfileImage(source.uri));
            }
        });
    }


    toggleProfileType(id) {
        const {dispatch, user} = this.props;
        dispatch(toggleUserProfile(id, user));
    }

    renderProfileImage() {
        const {profileInformation, user} = this.props;
        if (user.profile_image && profileInformation.profile_image === '') {
            return (
                <Image
                    style={{borderRadius: 22, width: 44, height: 44, marginTop: 3, marginBottom: 5}}
                    key="profile_image"
                    source={{uri: user.profile_image}}
                />
            );
        } else if (profileInformation.profile_image) {
            return (
                <Image
                    style={{borderRadius: 22, width: 44, height: 44, marginTop: 3, marginBottom: 5}}
                    key="profile_image_form"
                    source={{uri: profileInformation.profile_image}}
                />
            );
        }

        return (
            <Image
                style={{marginTop: 3, marginBottom: 5}}
                source={profileImage}
            />
        );
    }

    updateProfile() {
        const {fields, profileInformation, countryCode, profile, user, dispatch, homeAddress} = this.props;
        try {
            if ((fields.phone.value + "").length < 9) {
                throw Error("ups");
            }
            const obj = {
                profile_image: profileInformation.profile_image ? profileInformation.profile_image : user.profile_image,
                prefered_payment: profileInformation.paymentType ? profileInformation.paymentType : profile.prefered_payment,
                type: profile.type,
                lat: profileInformation.address.lat && profileInformation.address.lat.toString().length > 0 ? profileInformation.address.lat : homeAddress.lat,
                lon: profileInformation.address.lon && profileInformation.address.lon.toString().length > 0 ? profileInformation.address.lon : homeAddress.lon,
                address: profileInformation.address.address && profileInformation.address.address.length > 0 ? profileInformation.address.address : profile.address,
                company_name: fields.company_name.value,
                phone: countryCode + fields.phone.value,
                wallet_id: user.wallet_id,
                place: profileInformation.address.place && profileInformation.address.place.length > 0 ? profileInformation.address.place : profile.place,
                zipcode: profileInformation.address.zipcode && profileInformation.address.zipcode.length > 0 ? profileInformation.address.zipcode : profile.zipcode
            };

            if (!obj.address || !obj.place) {
                throw Error("Parameter missing");
            }

            dispatch(updateProfile(obj, profile.profile_id, user.api_token));
            dispatch(setPreferedWalletId(user.wallet_id_prefered));
        } catch (e) {
            if (profile.type == 'company') {
                Alert.alert("Fout", "Vul alle velden, zoals adres, telefoonnummer en bedrijfsnaam goed in")
            } else if (profile.type == 'private') {
                Alert.alert("Fout", "Vul alle velden zoals adres en telefoonnummer goed in")
            } else {
                Alert.alert("Fout", "Error")
            }
        }

    }

    openPicker() {
        Keyboard.dismiss();
        this.refs.scroll.scrollToPosition(0, 200, true);
    }

    closePicker() {
        this.refs.scroll.scrollToPosition(0, 0, true);
    }

    getProfilePayment() {
        const {profileInformation, profile, user} = this.props;

        if (profileInformation.paymentType.length > 0) {
            return profileInformation.paymentType;
        } else if (profile.prefered_payment.length > 0) {

            return profile.prefered_payment;
        } else if (user.company_profile.prefered_payment.length > 0) {

        }

        return 'pin';
    }

    getWalletId() {
        const {user} = this.props;
        return user.wallet_id;
    }


    render() {

        const {
            fields: {name, company_name, phone},
            invalid,
            profile,
            countryCode,
            profileInformation,
            showPicker,
            dispatch,
            user
        } = this.props;
        const offSet = new Animated.Value(deviceHeight);
        const typeOptions = [
            {
                label: translation.PROFILE_INFO_TYPE_OPTIONS_BUSI,
                value: 'company'
            },
            {
                label: translation.PROFILE_INFO_TYPE_OPTIONS_PART,
                value: 'private'
            }
        ];
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

        const pickerOptions = [
            {
                label: '+31',
                value: '+31'
            }
        ];

        const paymentOptions = profile.type === 'private' ? paymentOptionsPrivate : paymentOptionsCompany;

        const paymentType = paymentOptions.filter((type) => {
            if (profileInformation.paymentType) {
                if (type.value === profileInformation.paymentType) {
                    return true;
                }
            } else if (type.value === profile.prefered_payment) {
                return true;
            }

            return false;
        });


        return (
            <View>
                <KeyboardAwareScrollView ref="scroll"
                                         enableAutoAutomaticScroll={false}
                                         scrollEnabled={true}
                >
                    <View style={styles.inputContainer}>
                        <View style={styles.inputBorder}>
                            <Text style={styles.labelWithInput}>{translation.PROFILE_INFO_NAME}</Text>
                            <TextInput underlineColorAndroid="transparent" style={styles.inputWithLabel} {...name}
                                       editable={false} placeholder={translation.PROFILE_INFO_PLACEHOLDER}
                                       placeholderTextColor="#BCC8D5"
                                       blurOnSubmit={false}
                            />
                            {name.touched && name.error &&
                            <View>
                                <Image
                                    style={styles.formImageInput}
                                    source={formError}
                                />
                            </View>
                            }
                            {name.touched && name.valid &&
                            <View>
                                <Image
                                    style={styles.formImageInput}
                                    source={formSuccess}
                                />
                            </View>
                            }
                        </View>

                        <View style={styles.inputBorder}>
                            <View style={styles.mobileContainer}>
                                <Touchable style={styles.countryCode} underlayColor="transparent" onPress={() => {
                                    dispatch(togglePicker(true));
                                    this.openPicker();
                                }}>
                                    <Text style={{color: '#F5CB1F'}}>{countryCode}</Text>
                                </Touchable>
                                <TextInput underlineColorAndroid="transparent" keyboardType="numbers-and-punctuation"
                                           style={styles.inputMobile} {...phone}
                                           placeholder={translation.REGISTERFORM_MOBILE} placeholderTextColor="#BCC8D5"
                                           blurOnSubmit={false}
                                />
                            </View>
                            {phone.touched && phone.error &&
                            <View>
                                <Image
                                    style={styles.formImage}
                                    source={formError}
                                />
                                <Text style={styles.inputError}>{phone.error}</Text>
                            </View>
                            }
                            {phone.touched && phone.valid &&
                            <View>
                                <Image
                                    style={styles.formImage}
                                    source={formSuccess}
                                />
                            </View>
                            }
                        </View>

                        <View style={styles.inputBorder}>
                            <Text style={styles.labelWithInput}>{translation.PROFILE_INFO_PROFILE_PICTURE}</Text>
                            <View style={{
                                paddingRight: 20,
                                flex: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>
                                {this.renderProfileImage()}

                                <View>
                                    <Touchable style={styles.choosePhoto} onPress={() => this.chooseAvatar()}>
                                        <Text
                                            style={styles.choosePhotoText}>{translation.PROFILE_INFO_CHOOSE_PICTURE}</Text>
                                    </Touchable>
                                </View>
                            </View>
                        </View>

                        {profile.type === 'company' ?
                            <View style={styles.inputBorder}>
                                <Text style={styles.labelWithInput}>{translation.PROFILE_INFO_COMPANY_NAME}</Text>
                                <TextInput ref="company_name_field" underlineColorAndroid="transparent"
                                           style={styles.inputWithLabel} {...company_name}
                                           placeholder={translation.PROFILE_INFO_PLACEHOLDER}
                                           placeholderTextColor="#BCC8D5"
                                           blurOnSubmit={false}
                                />
                                {company_name.touched && company_name.error &&
                                <View>
                                    <Image
                                        style={styles.formImageInput}
                                        source={formError}
                                    />
                                </View>
                                }
                                {company_name.touched && company_name.valid &&
                                <View>
                                    <Image
                                        style={styles.formImageInput}
                                        source={formSuccess}
                                    />
                                </View>
                                }
                            </View>
                            : null}

                        <View style={styles.inputBorder}>
                            <Text
                                style={styles.labelWithInput}>{profile.type === 'company' ? translation.PROFILE_INFO_COMPANY_ADDRESS : translation.PROFILE_INFO_ADDRESS}</Text>
                            <Touchable style={styles.inputWithLabel}
                                       onPress={() => Actions.search_location({dispatchType: 'home_edit'})}>
                                {profileInformation.address.address && profileInformation.address.address.length > 0 ?
                                    <View style={[styles.input, {paddingTop: 3}]}>
                                        <Text style={{fontSize: 16}}>
                                            {profileInformation.address.address}
                                        </Text>
                                    </View>
                                    :
                                    <View>
                                        {profile.address.length > 0 ?
                                            <View style={[styles.input, {paddingTop: 3}]}>
                                                <Text style={{fontSize: 16}}>
                                                    {profile.address}
                                                </Text>
                                            </View>
                                            :
                                            <View style={[styles.input, {paddingTop: 3}]}>
                                                <Text style={{color: '#BCC8D5', fontSize: 16}}>
                                                    {translation.PROFILE_INFO_PLACEHOLDER}
                                                </Text>
                                            </View>
                                        }
                                    </View>
                                }
                            </Touchable>
                        </View>

                        <View style={styles.inputBorder}>
                            <Text style={styles.labelWithInput}>{translation.PROFILE_INFO_PLACE}</Text>
                            <Touchable style={styles.inputWithLabel}
                                       onPress={() => Actions.search_location({dispatchType: 'home_edit'})}>
                                {profileInformation.address.place && profileInformation.address.place.length > 0 ?
                                    <View style={[styles.input, {paddingTop: 3}]}>
                                        <Text style={{fontSize: 16}}>
                                            {profileInformation.address.place}
                                        </Text>
                                    </View>
                                    :
                                    <View>
                                        {profile.place.length > 0 ?
                                            <View style={[styles.input, {paddingTop: 3}]}>
                                                <Text style={{fontSize: 16}}>
                                                    {profile.place}
                                                </Text>
                                            </View>
                                            :
                                            <View style={[styles.input, {paddingTop: 3}]}>
                                                <Text style={{color: '#BCC8D5', fontSize: 16}}>
                                                    {translation.PROFILE_INFO_PLACEHOLDER}
                                                </Text>
                                            </View>
                                        }
                                    </View>
                                }
                            </Touchable>
                        </View>

                        <View style={styles.inputBorder}>
                            <Text style={styles.labelWithInput}>{translation.PROFILE_INFO_ZIPCODE}</Text>
                            <Touchable style={styles.inputWithLabel}
                                       onPress={() => Actions.search_location({dispatchType: 'home_edit'})}>
                                {profileInformation.address.zipcode && profileInformation.address.zipcode.length > 0 ?
                                    <View style={[styles.input, {paddingTop: 3}]}>
                                        <Text style={{fontSize: 16}}>
                                            {profileInformation.address.zipcode}
                                        </Text>
                                    </View>
                                    :
                                    <View>
                                        {profile.zipcode.length > 0 ?
                                            <View style={[styles.input, {paddingTop: 3}]}>
                                                <Text style={{fontSize: 16}}>
                                                    {profile.zipcode}
                                                </Text>
                                            </View>
                                            :
                                            <View style={[styles.input, {paddingTop: 3}]}>
                                                <Text style={{color: '#BCC8D5', fontSize: 16}}>
                                                    {translation.PROFILE_INFO_PLACEHOLDER}
                                                </Text>
                                            </View>
                                        }
                                    </View>
                                }
                            </Touchable>
                        </View>

                        <Touchable onPress={() => {
                            dispatch(togglePaymentType(true));
                            this.openPicker();
                        }} style={styles.inputBorder}>
                            <Text style={styles.labelWithInput}>{translation.PROFILE_INFO_PAYMENTMETHOD}</Text>
                            <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={styles.inputWithLabel}>
                                    <Text style={{fontSize: 17}}>{paymentType[0] ? paymentType[0].label : ''}</Text>
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
                                <Text style={styles.labelWithInput}>{translation.PROFILE_INFO_WALLET}</Text>
                                <Touchable onPress={() => {
                                    dispatch(toggleWalletIdShow(true));
                                    this.openPicker();
                                }} style={styles.inputBorder}>
                                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between'}}>
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

                    <Button disabled={invalid} onPress={() => this.updateProfile()}
                            title={translation.PROFILE_INFO_SAVE} style="main"/>
                </KeyboardAwareScrollView>

                {profileInformation.showAccountType ?
                    <AnimatedPicker
                        closePicker={() => {
                            dispatch(toggleAccountType(false));
                            this.closePicker();
                        }}
                        offSet={offSet}
                        toValue={-50}
                    >
                        <Picker
                            selectedValue={profile.type}
                            onValueChange={(value) => this.toggleProfileType(value)}
                        >
                            {typeOptions.map((option) => (
                                <PickerItem
                                    key={option.value}
                                    value={option.value}
                                    label={option.label}
                                />
                            ))}
                        </Picker>
                    </AnimatedPicker>
                    : null}

                {profileInformation.showPaymentType ?
                    <AnimatedPicker
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

                {profileInformation.walletidshow && this.getProfilePayment() == "wallet" ?
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

                {showPicker ?
                    <AnimatedPicker
                        closePicker={() => {
                            dispatch(togglePicker(false));
                            this.closePicker();
                        }}
                        offSet={offSet}
                        toValue={25}
                    >
                        <Picker
                            selectedValue={countryCode}
                            onValueChange={(value) => this.setCountryCode(value)}
                        >
                            {pickerOptions.map((option) => (
                                <PickerItem
                                    key={option.value}
                                    value={option.value}
                                    label={option.label}
                                />
                            ))}
                        </Picker>
                    </AnimatedPicker>
                    : null}
            </View>
        );
    }
}

ProfileInformation.propTypes = {
    fields: PropTypes.object,
    handleSubmit: PropTypes.func,
    dispatch: PropTypes.func,
    profile: PropTypes.object,
    profileInformation: PropTypes.object,
    user: PropTypes.object,
};

// Validation for current form,
// constant is injected into the reduxForm function
// beneath before exporting.
const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Verplicht*';
    }

    return errors;
};

ProfileInformation = reduxForm({
    form: 'profile_edit',
    fields: [
        'name',
        'company_name',
        'phone'
    ],
    validate
})(ProfileInformation);

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select(state) {
    return {
        profile: state.profile.profile,
        profileInformation: state.profile.profileInformation,
        homeAddress: state.profile.addresses.home,
        user: state.authentication.user,
        showPicker: state.utility.showPicker,
        countryCode: state.authentication.register.countryCode,
        initialValues: {
            ...state.profile.profile,
            phone: state.profile.profile.phone.replace('+31', ''),
            name: state.authentication.user.name
        }
    };
}

export default connect(select)(ProfileInformation);
