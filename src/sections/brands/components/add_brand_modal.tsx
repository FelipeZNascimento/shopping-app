import React, { useEffect, useState } from 'react';

import { TextField } from '@material-ui/core';
import { FormDialog } from 'components/index';
import { TBrand } from 'constants/objectInterfaces';

interface IProps {
    isOpen: boolean;
    value: string;
    onClose: () => void;
    onConfirm: (newBrand: TBrand) => void;
}

const AddBrandModal = ({
    isOpen,
    value = '',
    onClose,
    onConfirm
}: IProps) => {
    const [brandName, setBrandName] = useState<string>('');
    useEffect(() => {
        setBrandName(value);
    }, [isOpen]);

    const onDescriptionChange = (event: any) => {
        const value = event.target.value;
        setBrandName(value);
    };

    const onDialogConfirm = () => {
        const newBrand: TBrand = {
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
                value={brandName}
                onChange={onDescriptionChange}
            />
        </FormDialog>
    );
};

export default AddBrandModal;
