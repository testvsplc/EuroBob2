import {
    StyleSheet,
    Dimensions
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
    radioText: {
        color: '#99ACBF'
    },
    radioTextActive: {
        color: '#FFFFFF'
    },
    radioButtonActive: {
        alignItems: 'center',
        height: 35,
        paddingTop: 2,
        backgroundColor: '#F5C918',
        borderStyle: 'solid',
        borderColor: '#F5C918',
        overflow: 'hidden'
    },
    radioButton: {
        alignItems: 'center',
        height: 35,
        paddingTop: 2,
        backgroundColor: '#FFFFFF',
        borderStyle: 'solid',
        borderColor: '#EBEBEB',
        overflow: 'hidden'
    },
    borderLine: {
        borderBottomWidth: 2
    },
    borderLineNormal: {
        borderBottomWidth: 1
    },
    borderRound: {
        borderWidth: 2,
        borderRadius: 3
    },
    borderRoundNormal: {
        borderWidth: 1,
        borderRadius: 3
    },
    radioButtonCirlcle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        position: 'absolute',
        left: 10,
        top: 6
    },
    radioButtonCirlcleNot: {
        backgroundColor: '#FAFAFA',
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },
    radioButtonCirlcleActive: {
        backgroundColor: '#ffffff'
    },
    activeImageStyle: {
        marginTop: 6,
        marginLeft: 4
    }
});
export default styles;
