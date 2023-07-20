// REACT
import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

// COMPONENTS
import { Touchable } from '../../components/';

// REACT-NATIVE
import { View, Text, Image } from 'react-native';

// STYLES
import styles from '../styles/plannedRide';

// MomentJS
import moment from 'moment';
import 'moment/locale/nl';
moment.locale('nl');

// IMAGES
import plannedRideTime from '../../img/dashboard/ride-icon-time-xs.png';
import plannedRideDistance from '../../img/dashboard/ride-icon-distance-xs.png';
import plannedRideCar from '../../img/dashboard/plannedRideCar.png';
import rideFrom from '../../img/dashboard/rideProgress-from.png';
import rideTo from '../../img/dashboard/rideProgress-to.png';
import rideVia from '../../img/plan-ride/rideProgress-via.png';
import ratingAngry from '../../img/review/rating-angryStar-active-small.png';
import ratingBad from '../../img/review/rating-badStar-active-small.png';
import ratingGood from '../../img/review/rating-goodStar-active-small.png';
import ratingGreat from '../../img/review/rating-greatStar-active-small.png';
import ratingOk from '../../img/review/rating-okStar-active-small.png';
import arrowDown from '../../img/plan-ride/arrowDown-sm.png';
import arrowUp from '../../img/plan-ride/arrowDown-sm-active.png';

const _second = 1000;
const _minute = _second * 60;
const _hour = _minute * 60;
const _day = _hour * 24;

class PlannedRide extends Component {
  renderStops() {
    const { currentRide } = this.props;
    const stopsLength = currentRide.detail.stops;
    const newArray = [];

    for (var i = 0; i < stopsLength; i++) {
      newArray.push(stopsLength[i]);
    }

    return newArray.map((value, key) => (
      <Image
        key={key}
        style={{ width: 10, height: 10, marginTop: -4 }}
        source={rideVia}
      />
    ));
  }

  renderRemainingTime() {
    const { currentRide } = this.props;

    const remainingTime = this.remainingTime();

    const days =
      remainingTime.days > 1
        ? `${remainingTime.days} dagen `
        : remainingTime.days == 1
        ? `${remainingTime.days} dag `
        : '';
    const hours =
      remainingTime.hours > 0 ? `${remainingTime.hours} uur en ` : '';
    const minutes =
      remainingTime.minutes > 0 ? `${remainingTime.minutes} minuten` : '';

    if (
      currentRide.is_current ||
      currentRide.is_expired ||
      currentRide.status === 'Geannuleerd'
    ) {
      return null;
    } else {
      return (
        <Text style={[styles.smallText]}>
          {`Nog ${days + ''}${hours + ''}${minutes}`}
        </Text>
      );
    }
  }

  renderTopView() {
    const { currentRide, rideOverview, overViewOpen } = this.props;

    if (rideOverview) {
      return (
        <View style={[styles.flexContainer, { flex: 0.3 }]}>
          <Text style={[styles.averageText, { flex: 1 }]}>Rit overzicht</Text>

          <View style={[styles.moreInfoRight]}>
            {overViewOpen ? (
              <Touchable
                onPress={overViewOpen ? () => Actions.pop() : null}
                style={[
                  { flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }
                ]}
              >
                <Text style={[styles.averageText]}>Minder info</Text>
                <Image
                  style={[{ marginTop: 4, marginLeft: 4 }]}
                  source={arrowDown}
                />
              </Touchable>
            ) : (
              <View style={[styles.borderStyle, { flexDirection: 'row' }]}>
                <Text style={[styles.averageText, { lineHeight: 10 }]}>
                  Meer info
                </Text>
                <Image
                  style={[{ marginTop: 0, marginLeft: 4 }]}
                  source={arrowUp}
                />
              </View>
            )}
          </View>
        </View>
      );
    }

    return (
      <View style={[styles.flexContainer, { flex: 0.3 }]}>
        {currentRide.detail.stops ? (
          <Text style={[styles.smallText]}>
            VIA {currentRide.detail.stops}{' '}
            {currentRide.detail.stops === 1 ? 'tussenstop' : 'tussenstops'}
          </Text>
        ) : null}
        <View
          style={
            currentRide.detail.stops
              ? null
              : { alignItems: 'flex-end', flex: 1 }
          }
        >
          {this.renderRemainingTime()}
        </View>
      </View>
    );
  }

  remainingTime() {
    const { currentRide } = this.props;
    const obj = {
      days: '',
      hours: '',
      minutes: ''
    };

    const end = new Date(currentRide.start_date * 1000);
    const now = new Date();
    const distance = end - now;

    if (distance < 0) {
      return obj;
    }

    obj.days = Math.floor(distance / _day);
    obj.hours = Math.floor((distance % _day) / _hour);
    obj.minutes = Math.floor((distance % _hour) / _minute);

    return obj;
  }

  render() {
    const { currentRide, style, displayRating } = this.props;
    const ridePrice = parseFloat(currentRide.detail.price.total_price).toFixed(
      0
    );

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

    const currentRating = currentRide.rating
      ? ratings
          .filter(rating => {
            if (rating.value === currentRide.rating) {
              return true;
            }

            return false;
          })
          .reduce(entry => entry[0])
      : null;

    return (
      <View style={styles.container}>
        <View
          style={[
            styles.ride,
            style,
            currentRide.is_expired && displayRating
              ? styles.rideReviewed
              : null,
            currentRide.status === 'Geannuleerd' ? styles.rideCancelled : null
          ]}
        >
          <View style={styles.rideSection}>
            {this.renderTopView()}

            <View
              style={[
                styles.flexContainer,
                { marginBottom: 10, justifyContent: 'space-between' }
              ]}
            >
              <View style={{ flex: 0.5, overflow: 'hidden' }}>
                <Text>{currentRide.from.address}</Text>
                <Text>{currentRide.from.place}</Text>
              </View>

              <View style={{ flex: 0.5, overflow: 'hidden' }}>
                <Text style={{ textAlign: 'right' }}>
                  {currentRide.to.address}
                </Text>
                <Text style={{ textAlign: 'right' }}>
                  {currentRide.to.place}
                </Text>
              </View>
            </View>

            <View style={{ marginBottom: 10 }}>
              <View style={[styles.flexContainer, { position: 'relative' }]}>
                <Image style={styles.rideFrom} source={rideFrom} />
                <View
                  style={{
                    height: 2,
                    backgroundColor: '#DFE1E3',
                    flex: 1,
                    zIndex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                  }}
                >
                  {this.renderStops()}
                </View>
                <Image style={styles.rideTo} source={rideTo} />
              </View>
            </View>

            <View style={[styles.flexContainer, { marginTop: 0 }]}>
              <View
                style={[
                  { flex: 0.4, position: 'relative' },
                  styles.borderRight
                ]}
              >
                <View style={[styles.flexContainer]}>
                  <View style={{ flex: 0.2 }}>
                    <Image style={{ marginTop: 17 }} source={plannedRideTime} />
                  </View>
                  <View style={{ flex: 0.8, paddingTop: 6 }}>
                    <Text>
                      {currentRide.is_current
                        ? 'Nu bezig'
                        : moment(
                            new Date(currentRide.start_date * 1000)
                          ).format('LT')}
                    </Text>

                    <Text>
                      {moment(new Date(currentRide.start_date * 1000)).calendar(
                        null,
                        {
                          sameDay: '[Vandaag]',
                          nextDay: '[Morgen]',
                          nextWeek: 'DD/MM/YYYY',
                          lastDay: '[Gisteren]',
                          lastWeek: 'DD/MM/YYYY',
                          sameElse: 'DD/MM/YYYY'
                        }
                      )}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={[{ flex: 0.3, paddingTop: 14 }, styles.borderRight]}>
                <View style={[styles.flexContainer, { marginLeft: 10 }]}>
                  <View style={{ flex: 0.3 }}>
                    <Image source={plannedRideDistance} />
                  </View>
                  <Text style={{ flex: 0.7 }}>
                    {currentRide.detail.distance_km} km
                  </Text>
                </View>
              </View>

              <View style={{ flex: 0.3, paddingTop: 14 }}>
                <View style={[styles.flexContainer, { marginLeft: 10 }]}>
                  <View style={{ flex: 0.3 }}>
                    <Image style={{ marginTop: 2 }} source={plannedRideCar} />
                  </View>
                  <Text style={{ flex: 0.7 }}>
                    {currentRide.detail.duration_minutes} min
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {displayRating &&
          currentRide.is_expired &&
          currentRide.rating > 0 &&
          currentRide.status !== 'Geannuleerd' ? (
            <View style={styles.rideReviewSection}>
              <View style={styles.flexContainer}>
                <View style={{ flex: 0.8 }}>
                  <Text>Beoordeeld als {currentRating.label}</Text>
                  <View style={{ marginTop: 6 }}>
                    <Image source={currentRating.image} />
                  </View>
                </View>
                <View
                  style={{ flex: 0.2, alignItems: 'flex-end', marginTop: 3 }}
                >
                  <Text style={styles.expiredPriceTitle}>PRIJS</Text>
                  <View>
                    <Text style={styles.expiredPrice}>€ {ridePrice}</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : null}

          {displayRating &&
          currentRide.is_expired &&
          currentRide.rating === 0 &&
          currentRide.status !== 'Geannuleerd' ? (
            <View style={styles.rideReviewSection}>
              <View style={styles.flexContainer}>
                <View style={{ flex: 0.8 }}>
                  <Text>Nog niet beoordeeld, hoe was uw BOB?</Text>
                  <Touchable
                    onPress={() =>
                      Actions.refresh({
                        key: 'drawerDashboardApp',
                        openModal: true,
                        reviewRide: currentRide
                      })
                    }
                    style={{
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginTop: 8
                    }}
                  >
                    <Text style={styles.reviewBob}>Beoordeel uw BOB</Text>
                    {currentRide.rating === 0 ? (
                      <View style={styles.notification}>
                        <Text style={styles.notificationText}>1</Text>
                      </View>
                    ) : null}
                  </Touchable>
                </View>
                <View
                  style={{ flex: 0.2, alignItems: 'flex-end', marginTop: 3 }}
                >
                  <Text style={styles.expiredPriceTitle}>PRIJS</Text>
                  <View>
                    <Text style={styles.expiredPrice}>€ {ridePrice}</Text>
                  </View>
                </View>
              </View>
            </View>
          ) : null}

          {currentRide.status === 'Geannuleerd' ? (
            <View style={styles.rideReviewSectionCancel}>
              <View style={styles.flexContainer}>
                <View style={{ flex: 0.8 }}>
                  <Text>Deze rit is geannuleerd</Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

PlannedRide.propTypes = {
  currentRide: PropTypes.object.isRequired,
  rideOverview: PropTypes.bool,
  overViewOpen: PropTypes.bool,
  style: PropTypes.object
};

export default PlannedRide;
