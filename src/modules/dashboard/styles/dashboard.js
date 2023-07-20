import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import {IsIphone6Plus} from "../../../utility/index";
const ScreenWidth = Dimensions.get('window').width;
const ScreenHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    plannedRideContainer: {
        paddingLeft: 23,
        paddingRight: 23,
        paddingBottom: 23
    },
    flexContainer: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    dashboardTouchables: {
        width: ScreenWidth / 2,
        height: 160,
        alignItems: 'center',
        backgroundColor: '#FFFFFF'
    },
    touchableImage: {
        marginTop: 20
    },
    touchableRight: {
        borderRightWidth: 1,
        borderColor: '#EBEBEB',
    },
    touchableBottom: {
        borderBottomWidth: 1,
        borderColor: '#EBEBEB',
    },
    noRides: {
        alignItems: 'center',
    },
    location: {
        flex: 1,
        marginTop: 20,
        paddingRight: 5,
        paddingLeft: 5,
        flexDirection: 'row'
    },
    pickMeUp: {
        paddingLeft: 2,
        paddingRight: 2,
        paddingBottom: 3,
        ...Platform.select({
            ios: {
                paddingTop: 3
            },
            android: {
                paddingTop: 1
            }
        }),
        textAlign: 'center',
        color: '#FFFFFF',
        fontSize: IsIphone6Plus(ScreenWidth) ? 12 : 14,
    },
    pickMeUpContainer: {
        borderWidth: 2,
        borderColor: '#FFFFFF',
        borderRadius: 25,
        overflow: 'hidden'
    },
    imageStyles: {
        height: 44,
        width: 44,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderRadius: 22,
        marginRight: 10,
        marginLeft: 4
    },
    notification: {
        backgroundColor: '#F5C918',
        width: 18,
        marginLeft: 4,
        marginTop: 1,
        height: 18,
        borderRadius: 9,
        overflow: 'hidden'
    },
    notificationText: {
        color: '#ffffff',
        fontSize: 14,
        textAlign: 'center',
        ...Platform.select({
            ios: {
                paddingTop: 0
            },
            android: {
                paddingTop: -1
            }
        })
    },
    chevronDown: {
        position: 'absolute',
        width: ScreenWidth,
        top: ScreenHeight - 75,
        alignItems: 'center'
    }
});

export default styles;
