import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    plannedRideContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },
    scrollViewStyles: {
        height: (deviceHeight - 101)
    },
    notification: {
        backgroundColor: '#000000',
        width: 12,
        marginTop: -20,
        marginLeft: 2,
        height: 12,
        borderRadius: 100,
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
    },
    noRides: {
        alignItems: 'center',
        marginTop: 100
    }
});

export default styles;
