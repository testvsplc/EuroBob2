import {
    Dimensions,
    StyleSheet
} from 'react-native';

let deviceHeight = Dimensions.get('window').height;
let deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
	sectionTitle: {
		color: '#5C6773',
		fontSize: 17,
		marginLeft: 20,
		marginBottom: 10
	},
	contentSection: {
		backgroundColor: '#FFFFFF',
		borderTopWidth: 1,
		paddingTop: 20,
		borderColor: '#EBEBEB',
		shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        width: deviceWidth,
        shadowOffset: {
            height: 1,
            width: 0
        }
	},
	textContent: {
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	creditJob: {
		fontSize: 10,
		color: '#8595A6'
	},
	creditTitle: {
		fontSize: 16
	},
	flexItem: {
		width: deviceWidth / 2,
		alignItems: 'center',
		height: 110,
		position: 'relative'
	},
	flexContainer: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
	}
});

export default styles;
