import React, { useState } from 'react';

import { TextField } from '@material-ui/core';
import { FormDialog } from 'components/index';
import { IBrand } from 'constants/objectInterfaces';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (newBrand: IBrand) => void;
}

const AddBrandModal = ({
    isOpen,
    onClose,
    onConfirm
}: IProps) => {
    const [brandName, setBrandName] = useState<string>('');

    const onDescriptionChange = (event: any) => {
        const value = event.target.value;
        setBrandName(value);
    };

    const onDialogConfirm = () => {
        const newBrand: IBrand = {
            id: null,
            created: '',
            description: brandName
        };

        onConfirm(newBrand);
    }

    return (
        <FormDialog
            isEnable={brandName !== ''}
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onDialogConfirm}
            title='Adicionar Nova Marca'
        >
            <TextField
                autoFocus
                fullWidth
                id="description"
                label="Nome"
                type="text"
                onChange={onDescriptionChange}
            />
        </FormDialog>
    );
};

export default AddBrandModal;
