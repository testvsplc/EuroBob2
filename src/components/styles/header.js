import {
    StyleSheet,
    Platform,
} from 'react-native';

import { getHeaderHeight, getStatusBarHeight } from '../../utility';

const styles = StyleSheet.create({
    header: {
        paddingTop: 0,
        top: 0,
        height: getHeaderHeight(),
        right: 0,
        left: 0,
        position: 'absolute',
    },
    title: {
        textAlign: 'center',
        marginTop: 15,
        fontSize: 15,
        position: 'absolute',
        top: getStatusBarHeight(),
        left: 0,
        right: 0
    },
    imageLogo: {
        alignItems: 'center',
        display: 'flex',
        justifyContent:'center',
        marginTop: getStatusBarHeight(),
        height: getHeaderHeight() - getStatusBarHeight()
    },
    backButton: {
        position: 'absolute',
        zIndex: 1,
        left: 10,
        display: 'flex',
        justifyContent:'center',
        width: 75,
        marginTop: getStatusBarHeight(),
        height: getHeaderHeight() - getStatusBarHeight()
    },
    backButtonTextHolder: {
        position: 'absolute',
        zIndex: 1,
        width: 75,
        display: 'flex',
        justifyContent:'center',
        alignItems: "center",
        marginTop: getStatusBarHeight(),
        height: getHeaderHeight() - getStatusBarHeight()
    },
    rightButton: {
        position: 'absolute',
        display: 'flex',
        justifyContent:'center',
        zIndex: 1,
        right: 10,
        top: getStatusBarHeight(),
        height: getHeaderHeight() - getStatusBarHeight(),
    },
    backButtonText: {
        color: '#FFFFFF'
    },
    notification: {
        backgroundColor: '#000000',
        width: 12,
        marginTop: -20,
        marginLeft: 12,
        height: 12,
        borderRadius: 6,
        overflow: 'hidden'
    },
    notificationText: {
        color: '#ffffff',
        textAlign: 'center',
        ...Platform.select({
            ios: {
                paddingTop: 0
            },
            android: {
                paddingTop: -1
            }
        }),
        fontSize: 9
    }
});

export default styles;
