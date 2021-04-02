import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    selectErrorMessage,
    selectHasError,
    isNotificationOpen
} from 'store/main/selector';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Notification = () => {
    const dispatch = useDispatch();
    const isOpen = useSelector(isNotificationOpen);
    const hasError = useSelector(selectHasError);
    const errorMessage = useSelector(selectErrorMessage);

    const toggleNotification = () => dispatch({
        type: 'TOGGLE_NOTIFICATION',
        status: false,
        error: false,
        errorMessage: ''
    });

    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            },
        },
    }));

    const classes = useStyles();

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
        <div className={classes.root}>
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Notification;
