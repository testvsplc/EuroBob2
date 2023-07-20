import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';
import {IsIphone6Plus} from "../../utility/index";

let ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    timeSlot: {
        height: 17,
        width: 26
    },
    digitMargin: {
        marginRight: 12,
        marginLeft: 6
    },
    letterSpacing: {
        ...Platform.select({
            ios: {
                letterSpacing: IsIphone6Plus(ScreenWidth) ? 10 : 12
            },
            android: {
                letterSpacing: 22.0
            }
        }),
        position: 'absolute',
        left: 6,
        fontSize: 24,
        top: 19,
        backgroundColor: 'transparent',
        zIndex: 10
    },
    time: {
        position: 'relative',
        marginRight: 10
    },
    timeType: {
        color: '#FFFFFF',
        fontSize: 13,
        textAlign: 'center'
    }
});

export default styles;
