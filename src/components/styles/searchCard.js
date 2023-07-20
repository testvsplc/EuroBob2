import {
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	location: {
		backgroundColor: '#FFFFFF',
		position: 'relative',
		paddingLeft: 25,
	},
	locationStreet: {
		fontSize: 17,
		color: '#263340'
	},
	locationCity: {
		fontSize: 14,
		color: '#5C6773'
	},
	locationView: {
		borderBottomWidth: 1,
		borderColor: '#EBEBEB',
		paddingTop: 5,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingBottom: 5
	},
	removeBorder:{
		borderBottomWidth: 0,
	},
	locationAction: {
		marginTop: 8,
		marginRight: 25,
	}
});

export default styles;
