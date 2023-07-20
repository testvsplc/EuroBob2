import {
    StyleSheet,
    Dimensions,
    Image
} from 'react-native';
import {IsIphone6Plus, getBottomSpace, getHeaderHeight} from "../../../utility/index";

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    screenHeight: {
        height: deviceHeight
    },
    map: {
        width: '100%',
        height: '100%'
    },
    container: {
        display: 'flex',
        flex: 1
    },
    middle: {
        flex: 1,
        position: 'relative'
    },
    middleBottomContent: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display:'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 10
    },
    middleBottomContentLeft: {
        paddingLeft: 10,
        paddingBottom: 10
    },
    middleBottomContentRight: {
        paddingRight: 10,
        paddingBottom: 10
    },
    timeInfo: {
        flexBasis: 72 + getBottomSpace(),
        paddingHorizontal: 15,
        backgroundColor: '#F2C718'
    },
    priceIndication: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        borderRadius: 4,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 10,
        paddingBottom: 10,
        width: 125,
        height: 40,
        backgroundColor: '#FFFFFF'
    },
    yourBob: {
        borderRadius: 25,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 5,
        paddingBottom: 10,
        height: 40,
        backgroundColor: '#FFFFFF'
    },
    yourBobTekst: {
        marginLeft: 8,
        marginTop: 6
    },
    reviewButton: {
        borderWidth: 2,
        borderColor: '#FFFFFF',
        overflow: 'hidden',
        borderRadius: 13,
        paddingTop: 2,
        marginTop: 4,
        paddingBottom: 2,
        width: 130
    },
    currentRidePrice: {
        borderRadius: 4,
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 6,
        paddingBottom: 10,
        width: 100,
        height: 40,
        backgroundColor: '#FFFFFF'
    },
    ridePriceInformation: {
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 10,
        top: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 3,
        shadowColor: '#000000',
        shadowOpacity: 0.2,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    pricesHeading: {
        fontSize: 16
    },
    pricesItem: {
        fontSize: 16
    },
    imageStyles: {
        height: 30,
        width: 30,
        borderRadius: 15
    },
    totalPrice: {
        borderRadius: 25,
        paddingLeft: 15,
        fontSize: 20,
        paddingRight: 8,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#FFFFFF'
    },
    pricesHolder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    pricesHolderStyle: {
        fontSize: 13,
        color: '#8595A6'
    },
    pricesHolderTouchable: {
        borderColor: '#F5C918',
        borderWidth: 1,
        borderRadius: 10,
        overflow: 'hidden',
        marginRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
        paddingRight: 5,
        paddingLeft: 5
    }
});

export default styles;
