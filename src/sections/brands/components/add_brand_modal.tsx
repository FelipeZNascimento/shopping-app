import React, { useState } from 'react';

import { TextField } from '@material-ui/core';
import { FormDialog } from '../../../components/index';
import {
    brand as brandModel
} from '../../../constants/objectModels';

import { IBrand } from '../../../constants/objectInterfaces';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (object: IBrand) => void;
}

const AddBrandModal = ({
    isOpen,
    onClose,
    onConfirm
}: IProps) => {
    const [selectedItem, setSelectedItem] = useState<IBrand | null>(null);

    const onDescriptionChange = (event: any) => {
        const value = event.target.value;

        if (value && selectedItem) {
            setSelectedItem({
                ...selectedItem,
                description: value
            });
        }
    };

    const onFormConfirm = () => {
        if (selectedItem) {
            onConfirm(selectedItem);
        }
    };

    return (
        <FormDialog
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={onFormConfirm}
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
