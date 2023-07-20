// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// STYLES
import styles from '../styles/searchCard';

// COMPONENTS
import Touchable from './Touchable';

// REACT-NATIVE
import {
    View,
    Text,
    Image
} from 'react-native';

// IMAGES
import currentLocation from '../../img/plan-ride/input-locationButton-active.png';
import homeLocation from '../../img/plan-ride/input-homeButton-active.png';
import locationFavActive from '../../img/plan-ride/input-saveButton-active.png';
import locationFavNormal from '../../img/plan-ride/input-saveButton-normal.png';

class SearchCard extends Component {
    setLocationImage (location) {
        if (location.is_home) {
            return homeLocation;
        }
        if (location.is_favorite) {
            return locationFavActive;
        }
        if (location.is_current) {
            return currentLocation;
        }

        return locationFavNormal;
    }

    render () {
        const { currentKey, length, onButtonClick, onImageClick, location} = this.props;

        return (
            <View style={styles.location}>
                {location ?
                    <View style={[styles.locationView, (currentKey === length - 1) ? styles.removeBorder : null]}>
                        <Touchable onPress={() => onButtonClick()} style={{flex: 0.9}}>
                            <Text style={styles.locationStreet}>
                                {location.street ? location.street : location.address}
                            </Text>
                            <Text style={styles.locationCity}>
                                {location.city ? location.city : location.place}
                            </Text>
                        </Touchable>

                        <Touchable onPress={onImageClick ? () => onImageClick() : null} style={[styles.locationAction, {flex: 0.1, alignItems: 'flex-end'}]}>
                            <Image
                                source={this.setLocationImage(location)}
                                key={this.setLocationImage(location)}
                            />
                        </Touchable>
                    </View>
                :
                    <View></View>
                }
            </View>
        );
    }
}

SearchCard.propTypes = {
    currentKey: PropTypes.number.isRequired,
    length: PropTypes.number.isRequired,
    onButtonClick: PropTypes.func,
    onImageClick: PropTypes.func,
    location: PropTypes.object
};

export default SearchCard;
