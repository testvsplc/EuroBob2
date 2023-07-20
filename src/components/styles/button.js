import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

let ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    main: {
        width: (ScreenWidth - 50),
        height: 50,
        marginTop: 10,
        marginLeft: 25,
        backgroundColor: '#F5C918',
        borderStyle: 'solid',
        borderWidth: 2,
        alignItems: 'center',
        borderColor: '#F5C918',
        overflow: 'hidden',
        borderRadius: 25
    },
    alternative: {
        width: (ScreenWidth - 50),
        height: 50,
        marginTop: 10,
        marginLeft: 25,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 2,
        alignItems: 'center',
        borderColor: '#F5C918',
        overflow: 'hidden',
        borderRadius: 25
    },
    white: {
        width: (ScreenWidth - 50),
        height: 50,
        marginTop: 10,
        marginLeft: 25,
        backgroundColor: '#F5C918',
        borderStyle: 'solid',
        borderWidth: 2,
        alignItems: 'center',
        borderColor: '#FFFFFF',
        overflow: 'hidden',
        borderRadius: 25
    },
    buttonText: {
        ...Platform.select({
            ios: {
                paddingTop: 11,
                fontSize: 18
            },
            android: {
                marginTop: 12
            }
        })
    }
});

export default styles;
