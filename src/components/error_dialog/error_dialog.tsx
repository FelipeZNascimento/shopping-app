import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type TProps = {
    error: boolean;
    errorMessage?: string;
    onClose: () => void;
}
const ErrorDialog = ({
    error,
    errorMessage = 'Error',
    onClose
}: TProps) => {
    return (
        <Dialog
            open={error}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Erro</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {errorMessage}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    autoFocus
                    disableElevation
                    classes={{ root: 'flex-grow' }}
                    color="secondary"
                    onClick={onClose}
                >
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ErrorDialog;