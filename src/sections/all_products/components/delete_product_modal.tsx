import React from 'react';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';

import { TextField } from '@material-ui/core';
import { IProduct } from '../../../constants/objectInterfaces';

interface IProps {
    product: IProduct | null;
    onClose: () => void;
    onConfirm: (object: any) => void;
}

const DeleteProductModal = ({
    onClose,
    onConfirm,
    product
}: IProps) => {
    const renderContent = () => {
        return (
            <>
                <TextField
                    disabled
                    fullWidth
                    className="bottom-padding-l"
                    id="description"
                    label="Categoria"
                    type="text"
                    value={product?.category_description}
                />
                <TextField
                    disabled
                    fullWidth
                    id="description"
                    label="Nome"
                    type="text"
                    value={product?.description}
                />
            </>
        );
    };

    return (
        <Dialog
            open={product !== null}
            fullWidth
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Remover Produto</DialogTitle>
            <DialogContent>
                {product !== null && renderContent()}
            </DialogContent>
            <DialogActions>
                <Button
                    disableElevation
                    classes={{ root: 'flex-grow' }}
                    color="secondary"
                    onClick={onClose}
                >
                    Cancelar
                </Button>
                <Button
                    disableElevation
                    classes={{ root: 'flex-grow' }}
                    color="primary"
                    variant="contained"
                    onClick={onConfirm}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteProductModal;
