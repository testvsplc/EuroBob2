import {
    StyleSheet,
    Platform
} from 'react-native';

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
    formImage: {
        position: 'absolute',
        right: 10,
        top: -30
    },
    forgotPassword: {
        textAlign: 'center',
        color: '#8595A6',
        marginTop: 15
    },
    forgotPasswordText: {
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: 15,
        marginBottom: 15,
        textAlign: 'center'
    }
});

export default styles;
