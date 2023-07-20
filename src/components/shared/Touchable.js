// REACT
import React, { Component } from 'react';

// REACT-NATIVE
import {
	TouchableOpacity
} from 'react-native';

class Touchable extends Component {
    render() {
        return (
			<TouchableOpacity {...this.props}>
				{this.props.children}
			</TouchableOpacity>
        );
    }
}

Touchable.propTypes = {

};

export default Touchable;
