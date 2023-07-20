// REACT
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import { Header, Button } from '../../../components/';

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
import closeModal from '../../../img/plan-ride/navBar-closeButton-dark.png';

// STYLES
import styles from '../styles/planRide';

// ACTIONS
import { addPlanComment } from '../actions';

// TRANSLATION
import translation from '../../../translations/nl';

class RideComment extends Component {
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
                navigationState={props.navigationState}
                logo={false}
                title={props.title}
            />
        );
    }

    constructor (props) {
        super(props);

        this.state = {
            comment: props.comment
        };
        this.saveComment = this.saveComment.bind(this);
    }

    saveComment () {
        const { dispatch } = this.props;

        dispatch(addPlanComment(this.state.comment));
        Actions.pop();
    }

    render () {
        const { comment } = this.state;

        return (
            <View>
                <View style={{padding: 25}}>
                    <Text>
                        {translation.PLAN_RIDE_COMMENT_MODAL_CONTENT}
                    </Text>
                </View>

                <TextInput
                    ref="commentRef"
                    style={[styles.textField, {marginVertical: 15, marginHorizontal: 30}]}
                    placeholder="Opmerking"
                    placeholderTextColor="#BCC8D5"
                    multiline = {true}
                    numberOfLines = {4}
                    editable = {true}
                    underlineColorAndroid="transparent"
                    maxLength = {255}
                    onChangeText={(text) => this.setState({comment: text})}
                    value={comment}
                />

                <Button onPress={this.saveComment} title={translation.PLAN_RIDE_COMMENT_MODAL_SAVE} style="main" />
            </View>
        );
    }
}

RideComment.propTypes = {
    comment: PropTypes.string,
    dispatch: PropTypes.func
};

export default RideComment;
