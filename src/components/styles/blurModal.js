import {
    Dimensions,
    StyleSheet,
    Platform
} from 'react-native';
import { getHeaderHeight, getStatusBarHeight } from '../../utility';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    modalHeader: {
        paddingTop: 0,
        top: 0,
        backgroundColor: 'transparent',
        right: 0,
        left: 0,
        position: 'absolute',
        marginTop: getStatusBarHeight(),
        height: getHeaderHeight() - getStatusBarHeight()
    },
    headerShadow: {
        shadowColor: '#000000',
        shadowOpacity: 0.8,
        shadowRadius: 5,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    blurItem: {
        height: deviceHeight,
        backgroundColor: '#263340',
        paddingTop: 50,
        flex: 1,
        ...Platform.select({
            ios: {
                opacity: 0.95
            },
            android: {
                opacity: 0.9
            }
        })
    },
    closeModal: {
        position: 'absolute',
        ...Platform.select({
            ios: {
                top: 30
            },
            android: {
                top: 23
            }
        }),
        zIndex: 1,
        left: 10,
        width: 75,
        height: 37
    },
    blurModalTitle: {
        color: '#FFFFFF',
        fontSize: 19,
        textAlign: 'center',
        position: 'absolute',
        ...Platform.select({
            ios: {
                marginTop: 30
            },
            android: {
                marginTop: 18
            }
        }),
        left: 0,
        right: 0
    }
});

export default styles;
