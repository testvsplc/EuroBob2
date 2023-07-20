import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    inputContainer: {
        position: 'relative',
        margin: 20,
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
    input: {
        height: 50
    },
    inputBorder: {
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderBottomWidth: 1,
        zIndex: 1,
        borderColor: '#EBEBEB'
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
    },
    inputError: {
        position: 'absolute',
        color: '#FFFFFF',
        padding: 1,
        paddingLeft: 3,
        paddingRight: 3,
        ...Platform.select({
            android: {
                height: 0
            }
        }),
        left: 0,
        bottom: -15,
        zIndex: 999,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#C3CED9'
    },
    inputErrorMobile: {
        position: 'absolute',
        color: '#FFFFFF',
        padding: 1,
        paddingLeft: 3,
        paddingRight: 3,
        ...Platform.select({
            android: {
                height: 0
            }
        }),
        left: 20,
        flex: 1,
        bottom: -15,
        zIndex: 999,
        borderRadius: 5,
        overflow: 'hidden',
        backgroundColor: '#C3CED9'
    },
    formImage: {
        position: 'absolute',
        right: 10,
        top: -30
    },
    labelWithInput: {
        color: '#8595A6',
        marginBottom: 2,
        marginTop: 5,
        fontSize: 10
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
    inputWithLabel: {
        height: 25,
        marginBottom: 5
    }
});

export default styles;
