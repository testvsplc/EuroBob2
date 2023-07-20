import {
    Dimensions,
    StyleSheet
} from 'react-native';
import { getBottomSpace } from '../../utility';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    welcomeApp: {
        position: 'absolute',
        width: deviceWidth,
        height: deviceHeight,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0
    },
    notificationHolder: {
        height: 105,
        marginTop: deviceHeight - (100 + 10 + getBottomSpace())
    },
    activityIndicator: {
        backgroundColor: '#000000',
        opacity: 0.2,
        width: deviceWidth,
        height: deviceHeight,
        zIndex: 997,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    },
    indicator: {
        alignItems: 'center',
        width: 200,
        zIndex: 998,
        position: 'absolute',
        paddingTop: 85,
        top: (deviceHeight / 2) - 100,
        left: (deviceWidth / 2) - 100,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#263340',
        opacity: 0.7
    },
    androidSpinner: {
        backgroundColor: '#000000',
        opacity: 0.2,
        width: deviceWidth,
        height: deviceHeight,
        zIndex: 997,
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    },
    androidIndicator: {
        alignItems: 'center',
        width: 200,
        zIndex: 998,
        position: 'absolute',
        paddingTop: 55,
        top: (deviceHeight / 2) - 100,
        left: (deviceWidth / 2) - 100,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#263340',
        opacity: 0.7
    }
});

export default styles;
