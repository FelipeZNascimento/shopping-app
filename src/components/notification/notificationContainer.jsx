import { connect } from 'react-redux';

import Notification from './notification';

import {
    errorMessage,
    isNotificationOpen,
    hasError,
} from '../../store/main/selector';

const mapDispatchToProps = (dispatch) => ({
    toggleNotification: () => dispatch({
        type: 'TOGGLE_NOTIFICATION',
        status: false,
    }),
});

function mapStateToProps(state) {
    return {
        hasError: hasError(state),
        isOpen: isNotificationOpen(state),
        errorMessage: errorMessage(state),
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Notification);
