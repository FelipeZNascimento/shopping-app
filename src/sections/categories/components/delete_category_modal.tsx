import React from 'react';

import { TextField } from '@material-ui/core';
import { TCategory } from 'constants/objectInterfaces';

import ConfirmationDialog from 'components/dialogs/confirmation_dialog';

interface IProps {
    category: TCategory | null;
    onClose: () => void;
    onConfirm: (object: any) => void;
}

const DeleteCategoryModal = ({
    onClose,
    onConfirm,
    category
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
                    value={category?.description}
                />
            </>
        );
    };

    return (
        <ConfirmationDialog
            open={category !== null}
            onClose={onClose}
            onConfirm={() => onConfirm(category)}
            title='Remover Categoria'
            content={renderContent()}
        />
    );
};

export default DeleteCategoryModal;
