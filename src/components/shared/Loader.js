// REACT
import React, { Component } from 'react';

// REDUX
import { connect } from 'react-redux';

// REACT-NATICE
import {
	View,
	Text,
	ActivityIndicator
} from 'react-native';

// COMPONENTS
import Touchable from './Touchable';

// STYLES
import styles from '../styles/loader';

class Loader extends Component {
	constructor(props) {
		super(props);

		this.renderLoader = this.renderLoader.bind(this);
	}

	renderLoader() {
		const { appLoading } = this.props;

		return (
			<View>
				<View style={styles.activityIndicator} />
				<View style={appLoading ? styles.indicator : null}>
					<ActivityIndicator animating={appLoading} style={{zIndex: 999, transform: [{scale: 1.5}]}} color="#FFFFFF" size="large" />
				</View>
			</View>
		);
	}

    render() {
		const { appLoading } = this.props;
		console.log(appLoading);
        return (
			<View style={{zIndex: 999}}>
				{appLoading ? this.renderLoader() : null}
            </View>
        );
    }
}

Loader.propTypes = {
};

function select(state) {
    return {
        appLoading: state.utility.appLoading,
    };
}

export default connect(select)(Loader);
