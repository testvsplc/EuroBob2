import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import {IsIphone5} from "../../utility/index";

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    sideMenu: {
        height: ScreenHeight,
        backgroundColor: '#263340',
        opacity: 0.95,
        paddingTop: IsIphone5(ScreenWidth) ? 25 : 50,
        paddingLeft: 15,
        position: 'relative',
        paddingRight: 15,
        flex: 1
    },
    menuItem: {
        ...Platform.select({
            ios: {
                paddingTop: 10,
            },
            android: {
                marginTop: 7,
            },
        }),
        color: '#FFFFFF',
        marginLeft: 15,
        fontSize: IsIphone5(ScreenWidth) ? 15 : 18,
    },
    menuItemView: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        borderColor: '#979797',
        paddingBottom: IsIphone5(ScreenWidth) ? 5 : 10,
        marginBottom: IsIphone5(ScreenWidth) ? 5 : 10,
    },
    sideMenuHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
    },
    subHeading: {
        fontSize: 15,
        color: '#FFFFFF',
    },
    radioStyles: {
        position: 'absolute',
        bottom: 20
    },
    flexContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    smallText: {
        color: '#FFFFFF',
        opacity: 0.7
    },
    textHeading: {
        color: '#F2C718'
    },
    textContainer: {
        color: '#FFFFFF',
    },
    amountText: {
        color: '#F2C718'
    },
    imageStyles: {
        height: 44,
        width: 44,
        borderRadius: 22
    },
    radioButton: {
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    notification: {
        backgroundColor: '#F5C918',
        width: 18,
        marginLeft: 4,
        marginTop: 13,
        height: 18,
        borderRadius: 9,
        overflow: 'hidden'
    },
    notificationText: {
        color: '#ffffff',
        fontSize: 14,
        ...Platform.select({
            ios: {
                paddingTop: 0
            },
            android: {
                paddingTop: -1
            }
        }),
        textAlign: 'center'
    }
});

export default styles;
