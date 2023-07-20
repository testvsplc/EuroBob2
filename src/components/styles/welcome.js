import {
    StyleSheet,
    Image,
    Dimensions,
    Platform
} from 'react-native';

let ScreenHeight = Dimensions.get('window').height;
let ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    carouselWidth: {
        ...Platform.select({
            ios: {
                width: 375
            },
            android: {
                width: 375
            }
        })
    },
    containerCarousel: {
        width: ScreenWidth,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    container: {
        ...Platform.select({
            ios: {
                alignItems: 'center'
            },
            android: {
                flex: 1,
                justifyContent: 'center'
            }
        }),
        height: 446,
        marginBottom: 0,
        backgroundColor: '#F5C918'
    },
    heading: {
        fontSize: 25,
        textAlign: 'center',
        marginBottom: 5,
        marginTop: 0,
        color: '#FFFFFF'
    },
    content: {
        paddingLeft: 50,
        paddingRight: 50,
        alignItems: 'center',
        textAlign: 'center',
        color: '#FFFFFF'
    },
    image: {
        width: 275,
        height: 100,
        flex: 1
    },
    splash: {
        position: 'absolute',
        top: -64,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 999
    },
    explore: {
        textAlign: 'center',
        color: '#8595A6'
    }
});

export default styles;
