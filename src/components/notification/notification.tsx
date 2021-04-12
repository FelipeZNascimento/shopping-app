import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectErrorMessage,
    selectHasError,
    isNotificationOpen
} from 'store/main/selector';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(isNotificationOpen);
    const hasError = useSelector(selectHasError);
    const errorMessage = useSelector(selectErrorMessage);
    const isErrorRelevant = errorMessage.includes('AbortError') ? false : true;

    const toggleNotification = () => dispatch({
        type: 'TOGGLE_NOTIFICATION',
        status: false,
        error: false,
        errorMessage: ''
    });

    const handleClose = (_: any, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }

        toggleNotification();
    };

    const message = hasError
        ? errorMessage
        : 'Sua ação foi registrada com sucesso!';

    const severity = errorMessage
        ? 'error'
        : 'success';

    return (
        <Snackbar
            autoHideDuration={4000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={isOpen && isErrorRelevant}
            onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default Notification;
