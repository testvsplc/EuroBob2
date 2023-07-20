// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { Header, Rates } from '../../../components/';

// ROUTER
import { Actions } from 'react-native-router-flux';

// REACT-NATIVE
import {
    View,
    Text,
    Image,
    ScrollView,
    Platform
} from 'react-native';

// IMAGES
import closeModal from '../../../img/plan-ride/navBar-closeButton-dark.png';
import callImage from '../../../img/plan-ride/navBar-callButton-dark.png';

// STYLES
import styles from '../styles/indication';

// TRANSLATION
import translation from '../../../translations/nl';

class PriceIndication extends Component {
    static renderNavigationBar (props) {
        return (
            <Header
                leftButtonText={
                    <Image
                        source={closeModal}
                        key={closeModal}
                    />
                }
                leftButtonAction={() => Actions.pop()}
                rightButtonText={
                    <Image
                        key={callImage}
                        source={callImage}
                    />
                }
                rightButtonAction={() => Actions.contact()}
                navigationState={props.navigationState}
                logo={false}
                title={props.title}
            />
        );
    }

    renderTop () {
        const { prices } = this.props;

        function renderCustomText () {

            if(prices.custom && !prices.out_of_area) {
                return <Text style={{fontSize: 13, textAlign: 'center'}}>Rit is boven 150 kilometer, bel ons voor een prijs op maat of boek de rit meteen.</Text>
            }

            if (prices.out_of_area){
                return <Text style={{fontSize: 13, textAlign: 'center'}}>Rit ligt buiten het verzorgingsgebied. Bel ons voor meer informatie.</Text>    
            }

            return <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent: 'center'}}>
                <Text style={{fontSize: 24}}> <Text style={{color: '#8595A6'}}>€</Text> {prices.total_min_price} - <Text style={{color: '#8595A6'}}>€</Text> {prices.total_max_price}</Text>
            </View>
        }

        if(typeof prices !== 'undefined') {
            return (
                <View style={{paddingTop: 25, paddingLeft: 25, paddingRight: 25}}>
                    <View style={styles.indication}>
                        <Text style={styles.heading}>{translation.RATES_ESTIMATE}</Text>
                        {renderCustomText()}
                    </View>
                </View>
            )
        }

        return null;
    }

    render () {
        return (
            <ScrollView>
                {this.renderTop()}

                <Rates />
            </ScrollView>
        );
    }
}

PriceIndication.propTypes = {
    prices: PropTypes.object
};

export default PriceIndication;
