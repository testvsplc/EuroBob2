// REACT
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// COMPONENTS
import { Touchable, Button } from '../../../components/';

// REACT COMPONENTS
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// ROUTER
import { Actions } from 'react-native-router-flux';

// REACT-NATIVE
import {
    View,
    Text,
    Image,
    TextInput
} from 'react-native';

// IMAGES
import ratingAngry from '../../../img/review/rating-angryStar-active.png';
import ratingBad from '../../../img/review/rating-badStar-active.png';
import ratingGood from '../../../img/review/rating-goodStar-active.png';
import ratingGreat from '../../../img/review/rating-greatStar-active.png';
import ratingOk from '../../../img/review/rating-okStar-active.png';

import ratingAngryGrey from '../../../img/review/rating-angryStar-normal-grey.png';
import ratingBadGrey from '../../../img/review/rating-badStar-normal-grey.png';
import ratingGoodGrey from '../../../img/review/rating-goodStar-normal-grey.png';
import ratingGreatGrey from '../../../img/review/rating-greatStar-normal-grey.png';
import ratingOkGrey from '../../../img/review/rating-okStar-normal-grey.png';

import yourBob from '../../../img/plan-ride/yourBobAvatar.png';

// STYLES
import styles from '../styles/reviewRide';

// ACTIONS
import { setRating, sendRideReview, setRatingComment } from '../../rides/';
import { splitBobName, splitBobFirstname } from '../../../utility';

// TRANSLATION
import translation from '../../../translations/nl';
import { ErrorMessages } from '../../../components/';

class ReviewRide extends Component {
    static renderNavigationBar(props) {
        return;
    }

    renderRatings() {
        const { dispatch, selectedRating } = this.props;
        const ratings = [
            {
                image: ratingAngry,
                grey: ratingAngryGrey,
                value: 1,
                label: 'Zeer slecht',
                selected: false
            },
            {
                image: ratingBad,
                grey: ratingBadGrey,
                value: 2,
                label: 'Slecht',
                selected: false
            },
            {
                image: ratingOk,
                grey: ratingOkGrey,
                value: 3,
                label: 'OK',
                selected: false
            },
            {
                image: ratingGood,
                grey: ratingGoodGrey,
                value: 4,
                label: 'Goed',
                selected: false
            },
            {
                image: ratingGreat,
                grey: ratingGreatGrey,
                value: 5,
                label: 'Geweldig',
                selected: false
            }
        ];

        return ratings.map((rating) =>
            <Touchable style={{ width: 60, alignItems: 'center' }} onPress={() => dispatch(setRating(rating.value))}
                key={rating.value}>
                <Image
                    style={{ width: 50, height: 50 }}
                    source={selectedRating.rating === rating.value ? rating.image : rating.grey}
                />
                <Text style={styles.ratingText}>{rating.label}</Text>
            </Touchable>
        );
    }

    reviewCurrentRide() {
        const { dispatch, selectedRating, reviewRide, user } = this.props;

        const obj = {
            rating: selectedRating.rating,
            rating_comment: selectedRating.comment,
            ride_id: reviewRide.ride_id
        };

        dispatch(sendRideReview(obj, user.api_token)).then(() => {
            Actions.my_rides({ startHistory: true });
        });
    }

    render() {
        const { dispatch, reviewRide, serverErrors, selectedRating } = this.props;
        const invalid = !selectedRating.rating || false;

        return (
            <KeyboardAwareScrollView ref="scroll"
                enableAutoAutomaticScroll={true}
                scrollEnabled={true}
            >
                <View>
                    <Text style={styles.reviewTitle}>{translation.REVIEW_IM_THERE}</Text>

                    <View style={{ alignItems: 'center', marginTop: 35, marginBottom: 35 }}>
                        <View style={styles.driverToBeReviewed}>
                            {reviewRide.bob_senior && reviewRide.bob_senior.profile_image ?
                                <Image
                                    style={{ width: 48, height: 48, borderRadius: 24 }}
                                    source={{ uri: reviewRide.bob_senior.profile_image }}
                                    key={reviewRide.bob_senior.profile_image}
                                />
                                :
                                <Image
                                    style={{ width: 48, height: 48, borderRadius: 24 }}
                                    source={yourBob}
                                    key={yourBob}
                                />
                            }
                            <Text style={{ color: '#d9d9d9', fontSize: 17, flex: 1, flexDirection: 'row', marginTop: 13, marginLeft: 15 }}>
                                UW BOB&nbsp;
                                {reviewRide.bob_senior ?
                                    <Text style={{ color: '#FFFFFF' }}>{splitBobName(reviewRide.bob_senior.name)}</Text>
                                    :
                                    <Text style={{ color: '#FFFFFF' }}>{splitBobFirstname('Kevin Hoogerwerf')}</Text>
                                }
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.reviewSubTitle}>{translation.REVIEW_THANKS_FOR}</Text>

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 10 }}>
                        {this.renderRatings()}
                    </View>

                    <View style={{ paddingLeft: 15, paddingRight: 15, marginTop: 25 }}>
                        <TextInput
                            ref="commentRef"
                            style={styles.textField}
                            placeholder={translation.REVIEW_PLACEHOLDER}
                            keyboardAppearance="dark"
                            placeholderTextColor="#FFFFFF"
                            multiline={true}
                            numberOfLines={4}
                            onFocus={() => { this.refs.scroll.scrollToPosition(0, 200, true); this.props.onKeyboardToggle(true); }}
                            onBlur={() => { this.refs.scroll.scrollToPosition(0, 0, true); this.props.onKeyboardToggle(false); }}
                            editable={true}
                            maxLength={255}
                            onChangeText={(text) => dispatch(setRatingComment(text))}
                        />
                    </View>

                    <ErrorMessages textStyle={{ color: '#fff' }} messages={serverErrors} />

                    <View style={{ marginBottom: 25 }}>
                        <Button disabled={invalid} onPress={() => { this.reviewCurrentRide(); }} title="Beoordeling bevestigen" style="main"
                            styles={{ marginLeft: 10 }} />
                    </View>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

ReviewRide.propTypes = {
    onKeyboardToggle: PropTypes.func,
    selectedRating: PropTypes.object,
    dispatch: PropTypes.func,
    serverErrors: PropTypes.object
};

/**
 * Returns object from state, to use for Component.
 * @param  {state} state object.
 * @return {object} with chosen items to use.
 */
function select(state) {
    return {
        serverErrors: state.errors.serverErrors,
        selectedRating: state.rides.rating,
        user: state.authentication.user
    };
}

export default connect(select)(ReviewRide);
