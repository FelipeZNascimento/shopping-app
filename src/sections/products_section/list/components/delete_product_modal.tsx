import React from 'react';

import { TextField } from '@material-ui/core';
import { IProduct } from 'constants/objectInterfaces';

import ConfirmationDialog from 'components/dialogs/confirmation_dialog';

interface IProps {
    product: IProduct | null;
    onClose: () => void;
    onConfirm: () => void;
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
        <ConfirmationDialog
            open={product !== null}
            onClose={onClose}
            onConfirm={onConfirm}
            title='Remover Produto'
            content={renderContent()}
        />
    );
};

export default DeleteProductModal;
