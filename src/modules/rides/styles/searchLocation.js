import {
	StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
	headingBackground: {
		backgroundColor: '#EFF0F0',
		height: 25,
		paddingTop: 6,
		paddingLeft: 25
	},
	locationHeading: {
		fontSize: 13,
		color: '#5C6773'
	},
	locationCard: {
		marginBottom: 25,
		shadowColor: '#000000',
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 0
        }
	},
});

export default styles;
