import React from 'react';

import { TextField } from '@material-ui/core';
import { IBrand } from 'constants/objectInterfaces';

import { ConfirmationDialog } from 'components/index';

interface IProps {
    brand: IBrand | null;
    onClose: () => void;
    onConfirm: () => void;
}

const DeleteBrandModal = ({
    onClose,
    onConfirm,
    brand
}: IProps) => {
    const renderContent = () => {
        return (
            <>
                <TextField
                    disabled
                    fullWidth
                    id="description"
                    label="Nome"
                    type="text"
                    value={brand?.description}
                />
            </>
        );
    };

    return (
        <ConfirmationDialog
            open={brand !== null}
            onClose={onClose}
            onConfirm={onConfirm}
            title='Remover Marca'
            content={renderContent()}
        />
    );
};

export default DeleteBrandModal;
