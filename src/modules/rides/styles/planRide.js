import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import { getBottomSpace, isIphoneX, getStatusBarHeight, getHeaderHeight } from '../../../utility';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        padding: 25,
        marginTop: 25,
    },
    heading: {
        fontSize: 24
    },
    heading_smaller: {
        fontSize: 15
    },
    textInputStyles: {
        height: 50,
        zIndex: 1,
        paddingLeft: 45,
        backgroundColor: '#FFFFFF'
    },
    inputBottom: {
        borderBottomWidth: 1,
        borderColor: '#EAEAEA'
    },
    inputPlaceholders: {
        ...Platform.select({
            ios: {
                color: '#BCC8D5',
                fontSize: 17,
                paddingTop: 15
            },
            android: {
                color: '#BCC8D5',
                fontSize: 17,
                marginTop: 12
            },
        }),
    },
    inputLocations: {
        marginTop: 50,
        marginBottom: 10,
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    textField: {
        textAlignVertical: 'top',
        height: 105,
        padding: 10,
        fontSize: 17,
        marginBottom: 15,
        backgroundColor: '#FFFFFF',
        shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    distanceLine: {
        height: 25,
        width: 2,
        backgroundColor: '#EAEAEA'
    },
    distanceLineStop: {
        height: 50,
        width: 2,
        backgroundColor: '#EAEAEA'
    },
    PlanRideTime: {
    },
    orderRide: {
        position: 'absolute',
        bottom: getHeaderHeight(),
        left: 0,
        right: 0,
        width: deviceWidth
    },
    orderButton: {
        height: 60 + (isIphoneX() ? (getBottomSpace()/1.5) : 0),
        paddingTop: 13,
        marginTop: 20,
        alignItems: 'center',
        backgroundColor: '#F5C918'
    },
    priceAndComment: {
        height: 35,
        paddingTop: 7,
        borderWidth: 1,
        borderColor: '#BFBFBF',
        borderStyle: 'dashed',
        width: (deviceWidth / 2) - 25
    },
    missingInfo: {
        height: 35,
        paddingTop: 7,
        marginTop: -34,
        borderWidth: 1,
        borderColor: '#BFBFBF',
        borderStyle: 'dashed',
        width: deviceWidth - 50
    },
    cancelRide: {
        height: 35,
        paddingTop: 7,
        marginTop: -1,
        borderWidth: 1,
        borderColor: '#BFBFBF',
        borderStyle: 'dashed',
        width: deviceWidth - 50
    },
    warning: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 12
    },
    waringBigger: {
        textAlign: 'center',
        fontSize: 15
    }
});


export default styles;
