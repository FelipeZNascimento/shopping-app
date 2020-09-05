import React from 'react';
import PropTypes from 'prop-types';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Notification = (props) => {
    const classes = useStyles();
    const {
        errorMessage,
        hasError,
        isOpen,
        toggleNotification,
    } = props;

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        toggleNotification();
    };

    const message = hasError
        ? errorMessage
        : 'Sua ação foi registrada com sucesso!';

    const severity = hasError
        ? 'error'
        : 'success';

    return (
        <div className={classes.root}>
            <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    { message }
                </Alert>
            </Snackbar>
        </div>
    );
};

Notification.propTypes = {
    hasError: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool,
    errorMessage: PropTypes.string.isRequired,
    toggleNotification: PropTypes.func.isRequired,
};

Notification.defaultProps = {
    isOpen: false,
};

export default Notification;
