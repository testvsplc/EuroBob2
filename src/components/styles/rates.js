import {
    StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
    tableHolder: {
        shadowColor: '#000000',
        paddingTop: 25,
        paddingLeft: 25,
        paddingRight: 25,
        backgroundColor: '#FFFFFF',
        flexDirection:'column',
        flex: 1,
        marginBottom: 25,
        shadowOpacity: 0.1,
        shadowRadius: 3,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    tableHeading: {
        fontSize: 17,
        marginLeft: 25,
        marginBottom: 10,
        color: '#5C6773'
    },
    tableRow: {
        flexDirection:'row',
        flex: 1,
        marginBottom: 3
    },
    subRow: {
        fontSize: 10,
        color: '#8595A6'
    }
});


export default styles;
