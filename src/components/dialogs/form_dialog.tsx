import React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';

interface IProps {
    children: JSX.Element;
    isEnable?: boolean;
    isOpen: boolean;
    title: string;
    onClose: () => void;
    onConfirm: () => void;
}

const FormDialog = ({
    isEnable = false,
    children,
    onClose,
    onConfirm,
    isOpen,
    title
}: IProps) => (
    <Dialog
        open={isOpen}
        fullWidth
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
            {children}
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
                disableElevation
                disabled={!isEnable}
                classes={{ root: 'flex-grow of-grey4-bg of-green' }}
                onClick={onConfirm}
            >
                Confirmar
            </Button>
        </DialogActions>
    </Dialog>
);

export default FormDialog;
