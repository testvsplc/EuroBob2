import {
	StyleSheet,
	Dimensions
} from 'react-native';
import { getBottomSpace } from '../../../utility';

let deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
	deviceHeight: {
		height: deviceHeight
	},
	ridePlanned: {
		position: 'absolute',
		bottom: 64,
		left: 0,
		right: 0
	},
	heading: {
		color: '#FFFFFF',
		fontSize: 24,
		paddingLeft: 15,
		paddingRight: 15,
		marginTop: 25,
		marginBottom: 25,
		textAlign: 'center'
	},
	subHeading: {
		color: '#FFFFFF',
		fontSize: 17,
		marginTop: 20,
		textAlign: 'center'
	},
	beerGraphic: {
		alignItems: 'center'
	}
});

export default styles;
