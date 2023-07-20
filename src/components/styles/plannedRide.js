import {
    StyleSheet,
    Dimensions
} from 'react-native';

const ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    ride: {
        backgroundColor: '#FFFFFF',
        height: 157,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    rideSection: {
        height: 157,
        padding: 10
    },
    rideReviewed: {
        height: 225
    },
    rideCancelled: {
        height: 195
    },
    flexContainer: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    smallText: {
        fontSize: 10
    },
    averageText: {
        fontSize: 10
    },
    borderRight: {
        borderRightWidth: 1,
        borderColor: '#EBEBEB'
    },
    rideFrom: {
        position: 'absolute',
        left: 0,
        top: -4,
        height: 10,
        zIndex: 2,
        width: 10
    },
    rideTo: {
        position: 'absolute',
        right: 0,
        top: -4,
        height: 10,
        zIndex: 2,
        width: 10
    },
    rideReviewSection: {
        height: 68,
        padding: 10,
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
        backgroundColor: '#FAFAFA'
    },
    rideReviewSectionCancel: {
        height: 38,
        padding: 10,
        borderBottomRightRadius: 3,
        borderBottomLeftRadius: 3,
        backgroundColor: '#FAFAFA'
    },
    expiredPrice: {
        fontSize: 24
    },
    expiredPriceTitle: {
        color: '#8595A6'
    },
    reviewBob: {
        borderWidth: 2,
        color: '#5C6773',
        borderRadius: 10,
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
        overflow: 'hidden',
        borderColor: '#F5C918'
    },
    notification: {
        backgroundColor: '#000000',
        width: 15,
        marginTop: -3,
        marginLeft: -9,
        height: 15,
        borderRadius: 100,
        overflow: 'hidden'
    },
    notificationText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 11
    },
    moreInfoRight: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "flex-end"
    },
    borderStyle: {
        borderWidth: 1,
        borderColor: '#F2C718',
        padding: 3,
        borderRadius: 12
    }
});

export default styles;
