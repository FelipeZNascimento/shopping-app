import React, { useState } from 'react';

import { TextField } from '@material-ui/core';
import { FormDialog } from '../../../components/index';
import {
    category as categoryModel
} from '../../../constants/objectModels';

import { ICategory } from '../../../constants/objectInterfaces';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (object: any) => void;
}

const AddCategoryModal = ({
    isOpen,
    onClose,
    onConfirm
}: IProps) => {
    const [selectedItem, setSelectedItem] = useState<ICategory | null>(null);

    const onDescriptionChange = (event: any) => {
        const value = event.target.value;

        if (value && selectedItem) {
            setSelectedItem({
                ...selectedItem,
                description: value
            });
        }
    };

    return (
        <FormDialog
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={() => onConfirm(selectedItem)}
            title='Adicionar Nova Categoria'
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

export default AddCategoryModal;
