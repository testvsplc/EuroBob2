import {
	StyleSheet,
	Dimensions
} from 'react-native';

let deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
	reviewTitle: {
		fontSize: 24,
		color: '#FFFFFF',
		textAlign: 'center',
		paddingLeft: 35,
		paddingRight: 35,
	},
	ratingText: {
		fontSize: 12,
		textAlign: 'center',
		color: '#FFFFFF',
		marginTop: 10
	},
	driverToBeReviewed: {
		backgroundColor: '#4B535B',
		height: 64,
		borderRadius: 20,
		padding: 8,
		width: 225,
		flex: 1,
		flexDirection: 'row'
	},
	reviewSubTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center',
        paddingLeft: 45,
		paddingRight: 45,
    },
    textField: {
		textAlignVertical: 'top',
		height: 105,
		padding: 10,
		fontSize: 17,
		marginBottom: 15,
		borderRadius: 6,
		color: '#FFFFFF',
		backgroundColor: '#50565A',
		shadowColor: '#50565A',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 0
        }
	},
});

export default styles;
