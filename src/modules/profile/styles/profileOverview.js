import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
        borderLeftWidth: 0,
        borderTopWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#EBEBEB',
        paddingLeft: 20,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    inputError: {
        position: 'absolute',
        color: '#FFFFFF',
        padding: 1,
        paddingLeft: 3,
        paddingRight: 3,
        left: 0,
        bottom: -15,
        zIndex: 999,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#C3CED9'
    },
    inputBorder: {
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 1,
        zIndex: 1,
        borderColor: '#EBEBEB',
    },
    input: {
        height: 60,
        paddingTop: 9,
    },
    inputForm: {
        height: 60,
        paddingTop: 4,
    },
    inputFakeForm: {
        paddingTop: 20,
        fontSize: 14,
        color: '#BCC8D5'
    },
    inputWithLabel: {
        ...Platform.select({
            ios: {
                height: 25,
            },
            android: {
                height: 35,
            },
        }),
        paddingLeft: 0,
        zIndex: 999,
        marginBottom: 5
    },
    labelWithInput: {
        color: '#8595A6',
        marginBottom: 2,
        marginTop: 5,
        fontSize: 10
    },
    formImage: {
        ...Platform.select({
            ios: {
                position: 'absolute',
                right: 10,
                top: -45
            }
        })
    },
    formImageAndroid: {
        flex: 1,
        flexDirection: 'row',
        marginRight: 10,
        marginTop: -35,
        justifyContent: 'flex-end'
    },
    formImageInput: {
        position: 'absolute',
        right: 10,
        top: -30
    },
    inputLabel: {
        color: '#8595A6',
        marginBottom: 5,
        fontSize: 10
    },
    inputContent: {
        color: '#263340',
        fontSize: 17
    },
    editProfile: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 5,
        paddingBottom: 5,
        backgroundColor: '#F5C918',
        borderRadius: 20,
        overflow: 'hidden'
    },
    choosePhoto: {
        paddingTop: 1,
        paddingBottom: 2,
        paddingLeft: 6,
        paddingRight: 6,
        marginTop: 5,
        borderWidth: 2,
        borderRadius: 13,
        borderColor: '#F5C918'
    },
    choosePhotoText: {
        textAlign: 'center',
        color: '#5C6773',
        fontSize: 14
    },
    textInputStyles: {
        height: 50,
        zIndex: 1,
        backgroundColor: '#FFFFFF'
    },
    settingLabel: {
        fontSize: 17,
        ...Platform.select({
            ios: {
                paddingTop: 15,
            },
            android: {
                marginTop: 12,
            },
        }),
    },
    preferencesSwitch: {
        ...Platform.select({
            ios: {
                marginTop: -4
            },
            android: {
                marginTop: -4
            },
        })
    },
    scrollViewStyles: {
        height: (deviceHeight - 101),
    },
    smallWarning: {
        color: '#8595A6',
        fontSize: 12,
        marginBottom: 5
    },
    mobileContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    countryCode: {
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 1,
        borderBottomWidth: 0,
        borderColor: '#EBEBEB',
        width: 50,
        alignItems: 'center',
        paddingTop: 6,
        marginTop: 10,
        height: 30
    },
    inputMobile: {
        height: 50,
        marginLeft: 15,
        width: deviceWidth - 65
    }
});

export default styles;
