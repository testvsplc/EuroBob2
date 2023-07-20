// REACT
import React, { Component } from 'react';

// REDUX & ROUTER FUNCTIONS
import { connect } from 'react-redux';

// REACT-NATIVE
import {
    View,
    Text
} from 'react-native';

// TRANSLATION
import translation from '../../translations/nl';

// STYLES
import styles from '../styles/rates';

// ACTIONS
import { fetchRideRates } from '../../modules/rides/';

class Rates extends Component {
    renderRate (obj) {
        return obj.map((item) =>
            <View key={item.heading}>
                <View style={styles.tableRow}>
                    <View style={{flex: 0.4}}>
                        <Text>
                            {item.heading}
                        </Text>
                        <Text style={styles.subRow}>{item.headingContent}</Text>
                    </View>
                    <View style={{flex: 0.6}}>
                        <Text>{item.subHeading}</Text>
                        <Text style={styles.subRow}>{item.subContent}</Text>
                    </View>
                </View>
            </View>
        );
    }

    componentWillMount () {
        const { dispatch, user } = this.props;
        dispatch(fetchRideRates(user.api_token));
    }

    render () {
        const { rates } = this.props;
        const normalRates = [
            {
                heading: 'Instaptarief',
                headingContent: '',
                subHeading: `€ ${rates.boarding_rate}`,
                subContent: ''
            },
            {
                heading: 'Prijs per km',
                headingContent: '',
                subHeading: `€ ${rates.price_per_km}`,
                subContent: `MINIMAAL ${rates.minimal_km} KM`
            },
            {
                heading: 'Wachttarief',
                headingContent: `${rates.free_waiting_minutes} minuten wachttijd is inbegrepen`,
                subHeading: `€ ${rates.waiting_price}`,
                subContent: `PER ${rates.route_price_minutes} MINUTEN`
            },
            {
                heading: 'Tussenstop',
                headingContent: '',
                subHeading: `€ ${rates.stop_over_price}`,
                subContent: ''
            }
        ];
        const filteredArray = Object.assign([], rates.prices).filter((price) => {
            if (price.km_from &&price.km_from > 21) { return true; }
            return false;
        }).map((price) => (
            {
                heading: `${price.km_from} - ${price.km_to} km`,
                subHeading: `€ ${price.price}`,
                headingContent: '',
                subContent: ''
            }
        ));

        return (
            <View>
                <View style={{padding: 25}}>
                    <Text>
                        {translation.PLAN_RIDE_INDICATION_MODAL_CONTENT}
                    </Text>
                </View>

                <View>
                    <Text style={styles.tableHeading}>
                        {translation.RATES_STANDARD_RATE}
                    </Text>
                    <View style={styles.tableHolder}>
                        {this.renderRate(normalRates)}
                    </View>
                </View>

                <View>
                    <Text style={styles.tableHeading}>
                        {translation.RATES_BENEFIT_RATE}
                    </Text>
                    <View style={styles.tableHolder}>
                        {this.renderRate(filteredArray)}
                    </View>
                </View>

            </View>
        );
    }
}

Rates.propTypes = {
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select (state) {
    return {
        user: state.authentication.user,
        rates: state.rides.rates
    };
}

export default connect(select)(Rates);
