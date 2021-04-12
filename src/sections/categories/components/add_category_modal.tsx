import React, { useEffect, useState } from 'react';

import { TextField } from '@material-ui/core';
import { FormDialog } from 'components/index';

interface IProps {
    value: string;
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (object: any) => void;
}

const AddCategoryModal = ({
    isOpen,
    value = '',
    onClose,
    onConfirm
}: IProps) => {
    const [newCategory, setNewCategory] = useState<string>('');

    useEffect(() => {
        setNewCategory(value);
    }, [isOpen]);

    const onDescriptionChange = (event: any) => {
        const value = event.target.value;
        setNewCategory(value);
    };

    return (
        <FormDialog
            isEnable={newCategory !== ''}
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={() => onConfirm(newCategory)}
            title='Adicionar Nova Categoria'
        >
            <TextField
                autoFocus
                fullWidth
                id="description"
                label="Nome"
                type="text"
                value={newCategory}
                onChange={onDescriptionChange}
            />
        </FormDialog>
    );
};

export default AddCategoryModal;
