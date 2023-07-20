import {
	StyleSheet,
	Dimensions
} from 'react-native';

let deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
	mobileHeight: {
		height: deviceHeight
	},
	indication: {
		height: 60,
		backgroundColor: '#FFFFFF',
		padding: 10,
		shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 0
        }
	},
	heading: {
		color: '#8595A6',
		fontSize: 11,
		textAlign: 'center'
    },
});

export default styles;
