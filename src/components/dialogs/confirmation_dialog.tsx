import React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@material-ui/core';

interface IProps {
    content?: React.ReactElement;
    message?: string;
    onClose: () => void;
    onConfirm: () => void;
    open: boolean;
    title: string;
}

const ConfirmationDialog = ({
    content,
    message,
    onClose,
    onConfirm,
    open,
    title
}: IProps) => {
    const renderContent = () => {
        if (message) {
            return (
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            );
        }

        return content;
    };

    return (
        <Dialog
            fullWidth
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            open={open}
            onClose={onClose}
        >
            <DialogTitle classes={{ root: 'align-center' }} id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                {renderContent()}
            </DialogContent>
            <DialogActions>
                <Button
                    disableElevation
                    classes={{ root: 'flex-grow of-grey5-bg of-white' }}
                    onClick={onClose}
                >
                    Cancelar
                </Button>
                <Button
                    autoFocus
                    disableElevation
                    classes={{ root: 'flex-grow of-grey5-bg of-red' }}
                    onClick={onConfirm}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;
