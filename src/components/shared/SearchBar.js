// REACT
import React, { Component } from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

// STYLES
import styles from '../styles/searchBar';

// REACT-NATIVE
import {
  TextInput
} from 'react-native';

class SearchBar extends Component {
    constructor (props) {
        super(props);

        this.updateQuery = this.updateQuery.bind(this);
        this.method = debounce(this.method, 200);
        this.state = {
            query: props.initialValue ? props.initialValue : ''
        };
    }

    method (query) {
        const { onSearch } = this.props;
        onSearch(query);
    }

    updateQuery (value) {
        this.method(value);
        this.setState({query: value});
    }

    render () {
        const { onSearch, initialValue } = this.props;
        console.log(initialValue);

        return (
            <TextInput
                onSubmitEditing={() => onSearch(this.state.query)}
                style={styles.searchBar}
                ref="searchInput"
                placeholder="Vind een locatie"
                underlineColorAndroid="transparent"
                returnKeyType="search"
                onChangeText={(text) => this.updateQuery(text)}
                onChange={() => {this.setState({query: this.refs.searchInput.value}); } }
                value={this.state.query}
            />
        );
    }
}

SearchBar.propTypes = {
    onSearch: PropTypes.func
};

export default SearchBar;
