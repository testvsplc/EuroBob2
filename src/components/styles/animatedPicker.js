import {
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: 60
	},
	showtimeContainer: {
		borderTopColor: '#ededed',
		borderTopWidth:1
	},
	showtime: {
		padding:20,
		textAlign: 'center'
	},
	button: {
		marginTop:25,
		marginBottom:25
	},
	closeButtonContainer: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		borderTopColor: '#e2e2e2',
		borderTopWidth: 1,
		borderBottomColor: '#e2e2e2',
		borderBottomWidth:1
	},
	closeButton: {
		paddingRight:10,
		paddingTop:10,
		paddingBottom:10
	},
		buttonText: {
		textAlign: 'center'
	},
	closeButtonText: {
		color: '#5C6773',
		borderWidth: 2,
		paddingTop: 2,
		paddingLeft: 10,
		paddingRight: 7,

		borderRadius: 10,
		overflow: 'hidden',
		borderColor: '#F5C918'
	}
});

export default styles;
