import {
    StyleSheet,
    Dimensions,
    Platform
} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    smallText: {
        fontSize: 12,
        color: '#5C6773'
    }
});

export default styles;
