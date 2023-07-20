// REACT
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// COMPONENTS
import {Touchable} from '../../components/';

// ROUTER
import {Actions} from 'react-native-router-flux';

// STYLES
import styles from '../styles/blurModal';

// REACT-NATIVE
import {
    View,
    Text,
    Image,
    Platform,
    ScrollView, Keyboard
} from 'react-native';

// IMAGES
import closeModal from '../../img/plan-ride/navBar-closeButton-dark.png';
import { getHeaderHeight } from '../../utility';

class BlurModal extends Component {
    constructor (props) {

        super(props);

        this.state = {
            scrollableHeader: false
        };

        this._toggleScrollable = this._toggleScrollable.bind(this);

    }

    _toggleScrollable (bool) {

        this.setState({
            scrollableHeader: bool
        });

    }

    render () {
        const childrenWithProps = React.Children.map(this.props.children,
            (child) => React.cloneElement(child, {
                onKeyboardToggle: (bool) => this._toggleScrollable(bool)
            })
        );

        return (
            <View style={styles.blurItem}>
                <View style={styles.modalHeader}>
                    <View style={[{
                        flex: 1,
                        height: 64,
                        backgroundColor: '#263340'
                    }, this.state.scrollableHeader ? styles.headerShadow : null]}>
                        <Touchable style={styles.closeModal} onPress={
                            () => {

                                Actions.refresh({
                                    key: 'drawerDashboardApp',
                                    openModal: false
                                });

                                Keyboard.dismiss();
                            }
                        }>
                            <Image
                                source={closeModal}
                            />
                        </Touchable>
                        <Text style={styles.blurModalTitle}>Beoordeel uw BOB</Text>
                    </View>
                </View>

                <ScrollView style={{marginTop: getHeaderHeight()}}>
                    {childrenWithProps}
                </ScrollView>
            </View>
        );
    }
}

BlurModal.propTypes = {
    children: PropTypes.any
};

export default BlurModal;
