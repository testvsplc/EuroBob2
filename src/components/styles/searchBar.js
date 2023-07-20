import {
	StyleSheet,
	Platform
} from 'react-native';
import { getStatusBarHeight } from '../../utility';

const styles = StyleSheet.create({
	searchBar: {
		marginTop: getStatusBarHeight() + 8,
		position: 'absolute',
		left: 74,
		borderRadius: 6,
		paddingLeft: 15,
		height: 32,
		color: '#000000',
		backgroundColor: '#FFFFFF',
		width: 250,
		paddingVertical: 0
	}
});

export default styles;
