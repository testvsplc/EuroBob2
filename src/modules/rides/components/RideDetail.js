// REACT
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// COMPONENTS
import { Header, PlannedRide, Timer, Touchable } from '../../../components/';

// ROUTER
import { Actions } from 'react-native-router-flux';

// REACT-NATIVE
import { View, Text, Image, Platform, ScrollView, Share } from 'react-native';

// IMAGES
import navBarImage from '../../../img/dashboard/navBar-menuButton.png';
import editImage from '../../../img/plan-ride/navBar-editButton-dark.png';
import callImage from '../../../img/plan-ride/navBar-callButton-dark.png';
import beerGraphic from '../../../img/plan-ride/beer-graphic-sm.png';
import priceIndication from '../../../img/plan-ride/ride-price-icon-xs.png';
import priceRide from '../../../img/plan-ride/arrowDown-sm.png';
import closeModal from '../../../img/plan-ride/close-price-modal.png';
import map from '../../../img/plan-ride/map.png';
import ratingAngry from '../../../img/review/rating-angryStar-active-small.png';
import ratingBad from '../../../img/review/rating-badStar-active-small.png';
import ratingGood from '../../../img/review/rating-goodStar-active-small.png';
import ratingGreat from '../../../img/review/rating-greatStar-active-small.png';
import ratingOk from '../../../img/review/rating-okStar-active-small.png';
import yourBob from '../../../img/plan-ride/yourBobAvatar.png';

// STYLES
import styles from '../styles/rideDetail';

// ACTIONS
import { toggleShowPrice } from '../actions';
import { splitBobName } from '../../../utility';

// TRANSLATION
import translation from '../../../translations/nl';
import { IsIphone6Plus } from '../../../utility/index';
import { Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

class RideDetail extends Component {
  static renderNavigationBar(props) {
    function determineRightAction(a, b) {
      const _MS_PER_HOUR = 1000 * 60 * 60;
      const distance = a - b;

      return Math.floor(distance / _MS_PER_HOUR);
    }

    const hourDiff = determineRightAction(
      new Date(props.ride.start_date * 1000),
      new Date()
    );

    return (
      <Header
        leftButtonText={<Image source={navBarImage} />}
        rightButtonText={
          <Image
            key={editImage}
            source={
              props.ride.is_current || hourDiff <= 0 ? callImage : editImage
            }
          />
        }
        leftButtonAction={() =>
          Actions.refresh({ key: 'drawerDashboardApp', open: true })
        }
        rightButtonAction={
          props.ride.is_current || hourDiff <= 0
            ? () => Actions.contact()
            : () => Actions.planride({ ride: props.ride })
        }
        navigationState={props.navigationState}
        logo={false}
        title={props.ride.is_current ? 'Bestemming bereikt' : props.title}
      />
    );
  }

  renderInfo() {
    const { ride, dispatch } = this.props;

    const ratings = [
      {
        image: ratingAngry,
        value: 1,
        label: 'Zeer slecht',
        selected: false
      },
      {
        image: ratingBad,
        value: 2,
        label: 'Slecht',
        selected: false
      },
      {
        image: ratingOk,
        value: 3,
        label: 'OK',
        selected: false
      },
      {
        image: ratingGood,
        value: 4,
        label: 'Goed',
        selected: false
      },
      {
        image: ratingGreat,
        value: 5,
        label: 'Geweldig',
        selected: false
      }
    ];

    const currentRating = ride.rating
      ? ratings
          .filter(rating => {
            if (rating.value === ride.rating) {
              return true;
            }

            return false;
          })
          .reduce(entry => entry[0])
      : null;

    if (ride.is_expired) {
      return (
        <View style={{ paddingTop: 11, flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.8 }}>
            {ride.is_expired && ride.rating > 0 ? (
              <View>
                <Text style={{ color: '#fff' }}>
                  Beoordeeld als {currentRating.label}
                </Text>
                <View style={{ marginTop: 6 }}>
                  <Image source={currentRating.image} />
                </View>
              </View>
            ) : (
              <View>
                <Text style={{ color: '#FFFFFF', fontSize: 14 }}>
                  {translation.RIDE_DETAIL_NOT_RATED}
                </Text>

                <Touchable
                  onPress={() =>
                    Actions.refresh({
                      key: 'drawerDashboardApp',
                      openModal: true,
                      reviewRide: ride
                    })
                  }
                  style={styles.reviewButton}
                >
                  <Text
                    style={{
                      color: '#FFFFFF',
                      textAlign: 'center',
                      fontSize: 14
                    }}
                  >
                    {translation.RIDE_DETAIL_RATE_BOB}
                  </Text>
                </Touchable>
              </View>
            )}
          </View>
        </View>
      );
    }

    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 0.8, flexDirection: 'row' }}>
          <View style={{ marginRight: 15, marginTop: 16 }}>
            <Image source={beerGraphic} />
          </View>

          <View style={{ marginTop: 8 }}>
            <Timer startDate={ride.start_date} center={false} />
          </View>
        </View>
      </View>
    );
  }

  renderPrices(ride) {
    const prices = [];

    if (ride.detail.price.rate > 0.0) {
      prices.push({
        heading: 'Standaardtarief',
        price: ride.detail.price.rate,
        symbol: '€'
      });
    }

    if (ride.detail.price.stops > 0.0) {
      prices.push({
        heading: `Tussenstops (${ride.detail.stops})`,
        price: ride.detail.price.stops,
        symbol: '€'
      });
    }

    if (ride.detail.price.waiting > 0.0) {
      prices.push({
        heading: 'Wachttarief',
        price: ride.detail.price.waiting,
        symbol: '€'
      });
    }

    if (ride.detail.price.area > 0.0) {
      prices.push({
        heading: 'Gebiedstoeslag',
        price: ride.detail.price.area,
        symbol: '€'
      });
    }

    if (ride.detail.price.area_price_start > 0.0) {
      prices.push({
        heading: 'Gebiedsprijs start',
        price: ride.detail.price.area_price_start,
        symbol: '€'
      });
    }

    if (ride.detail.price.area_price_destination > 0.0) {
      prices.push({
        heading: 'Gebiedsprijs eind',
        price: ride.detail.price.area_price_destination,
        symbol: '€'
      });
    }

    for (let line of ride.detail.price.lines) {
      if (line != null) {
        prices.push({
          heading: line.description,
          price: line.price,
          symbol: '€'
        });
      }
    }

    return prices.map((price, key) => (
      <View
        key={key}
        style={{ flex: 1, flexDirection: 'row', marginBottom: 25 }}
      >
        <View style={{ flex: 0.6 }}>
          <Text style={styles.pricesHeading}>{price.heading}</Text>
        </View>
        <View style={{ flex: 0.4 }}>
          {price.symbol.length > 0 ? (
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Text
                style={[styles.pricesItem, { flex: 0.5, textAlign: 'right' }]}
              >
                {price.symbol}
              </Text>
              <Text
                style={[styles.pricesItem, { flex: 0.5, textAlign: 'right' }]}
              >
                {parseFloat(price.price).toFixed(0)}
              </Text>
            </View>
          ) : (
            <Text style={[styles.pricesItem, { textAlign: 'right' }]}>
              {parseFloat(price.price).toFixed(0)}
            </Text>
          )}
        </View>
      </View>
    ));
  }

  renderIndication() {
    const { ride, dispatch, showPrice } = this.props;

    if (ride.is_expired) {
      return (
        <Touchable
          onPress={() => {
            dispatch(toggleShowPrice(true));
          }}
          style={[
            styles.currentRidePrice,
            showPrice ? { borderRadius: 0 } : null
          ]}
        >
          {!showPrice ? (
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 0.8 }}>
                <Text style={{ fontSize: 24 }}>
                  € {ride.detail.price.total_price.toFixed(0)}
                </Text>
              </View>
              <View style={{ flex: 0.2 }}>
                <Image
                  style={{ marginLeft: 4, marginTop: 12 }}
                  source={priceRide}
                />
              </View>
            </View>
          ) : (
            <Text style={{ fontSize: 24, textAlign: 'right', marginRight: 15 }}>
              € {ride.detail.price.total_price.toFixed(0)}
            </Text>
          )}
        </Touchable>
      );
    }

    return (
      <Touchable
        onPress={() => Actions.planride_prices({ prices: ride.detail.price })}
        style={styles.priceIndication}
      >
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 0.2 }}>
            <Image style={{ marginRight: 4 }} source={priceIndication} />
          </View>
          <View style={{ flex: 0.8 }}>
            <Text style={{ fontSize: IsIphone6Plus(ScreenWidth) ? 13 : 14 }}>
              {translation.RIDE_DETAIL_PRICE_INDICATION}
            </Text>
          </View>
        </View>
      </Touchable>
    );
  }

  renderBob() {
    const { ride, showPrice, dispatch } = this.props;

    return (
      <View style={styles.yourBob}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {ride.bob_senior && ride.bob_senior.profile_image ? (
            <Image
              style={styles.imageStyles}
              source={{ uri: ride.bob_senior.profile_image }}
              key={ride.bob_senior.profile_image}
            />
          ) : (
            <Image style={styles.imageStyles} source={yourBob} key={yourBob} />
          )}
          <Text style={styles.yourBobTekst}>
            Uw BOB {ride.bob_senior ? splitBobName(ride.bob_senior.name) : ''}
          </Text>
        </View>
      </View>
    );
  }

  shareRide(type) {
    const { ride } = this.props;
    Share.share({
      title: 'Euro BOB rit!',
      message: `Ik word veilig en vertrouwd in mijn eigen auto door @Eurobob van ${ride.from.place} naar ${ride.to.place}`,
      url: 'https://itunes.apple.com/nl/app/euro-bob/id1144865453?ls=1&mt=8'
    }).catch(err => console.log(err));
  }

  render() {
    const { ride, showPrice, dispatch } = this.props;

    const staticMap = {
      uri: 'data:image/jpeg;base64,' + ride.detail.static_map
    };

    return (
      <View style={styles.container}>
        {ride ? (
          <PlannedRide
            displayRating={false}
            currentRide={ride}
            rideOverview={true}
            overViewOpen={true}
          />
        ) : null}
        <View style={styles.middle}>
          <Image
            style={styles.map}
            source={{ uri: staticMap.uri }}
            resizeMode="contain"
          />
          <View style={styles.middleBottomContent}>
            <View style={styles.middleBottomContentLeft}>
              {!showPrice ? (
                this.renderBob()
              ) : (
                <View>
                  <Text style={styles.totalPrice}>Totaalprijs</Text>
                </View>
              )}
            </View>
            <View style={styles.middleBottomContentRight}>
              {this.renderIndication()}
            </View>
          </View>
          {showPrice ? (
            <View style={styles.ridePriceInformation}>
              <Touchable
                onPress={() => {
                  dispatch(toggleShowPrice(false));
                }}
              >
                <Image
                  style={{
                    width: 18,
                    height: 18,
                    marginLeft: -5,
                    marginTop: -5
                  }}
                  source={closeModal}
                />
              </Touchable>

              <View style={styles.pricesHolder}>
                <Text style={[styles.pricesHolderStyle, { paddingLeft: 25 }]}>
                  PRIJSOPBOUW
                </Text>
                <Touchable
                  onPress={Actions.planride_prices}
                  style={styles.pricesHolderTouchable}
                >
                  <Text style={{ color: '#5C6773' }}>Tarieven</Text>
                </Touchable>
              </View>

              <ScrollView style={{ padding: 25 }}>
                {this.renderPrices(ride)}
              </ScrollView>
            </View>
          ) : null}
        </View>
        <View style={styles.timeInfo}>{this.renderInfo()}</View>
      </View>
    );
  }
}

RideDetail.propTypes = {
  ride: PropTypes.object,
  dispatch: PropTypes.func
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select(state) {
  return {
    plannedRides: state.rides.plannedRides,
    showPrice: state.rides.showPrice
  };
}

export default connect(select)(RideDetail);
