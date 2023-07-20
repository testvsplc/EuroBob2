import {
	StyleSheet,
	Dimensions
} from 'react-native';

let ScreenWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	contactBlock: {
		alignItems: 'center',
		width: 330,
		paddingTop: 65,
		height: 280
	},
	contactText: {
		color: '#263340',
		fontSize: 24,
		marginTop: 25
	}
});

export default styles;
