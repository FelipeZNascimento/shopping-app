import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { fetchItems } from '../../../services/dataGetters';

// Selectors
import { returnItems } from '../../../store/main/selector';

import { TextField } from '@material-ui/core';
import { FormDialog, Autocomplete } from '../../../components/index';
import {
    product as productModel
} from '../../../constants/objectModels';

import {
    IProduct,
    ICategory
} from '../../../constants/objectInterfaces';

import { objectTypes } from '../../../constants/general';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (object: IProduct) => void;
}

const AddProductModal = ({
    isOpen,
    onClose,
    onConfirm
}: IProps) => {
    const categories: ICategory[] = useSelector((state) => returnItems(state, objectTypes.productsCategories));
    const [selectedItem, setSelectedItem] = useState<IProduct>(productModel);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchItems(objectTypes.productsCategories));
    }, []);

    const onDescriptionChange = (event: any) => {
        const value = event.target.value;

        if (value) {
            setSelectedItem({
                ...selectedItem,
                description: value
            });
        }
    };

    const onCategoryChange = (
        event: any,
        object: any = null
    ) => {
        if (object) {
            setSelectedItem({
                ...selectedItem,
                category_id: object.id
            });
        }
    };

    const renderAddDialogForm = () => (
        <>
            <TextField
                autoFocus
                fullWidth
                classes={{ root: 'of-white' }}
                id="description"
                label="Nome"
                type="text"
                onChange={onDescriptionChange}
            />
            <div className="min-padding">
                <Autocomplete
                    options={categories}
                    title="Categoria"
                    onChange={onCategoryChange}
                />
            </div>
        </>
    );

    return (
        <FormDialog
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={() => onConfirm(selectedItem)}
            title='Adicionar Novo Produto'
        >
            {renderAddDialogForm()}
        </FormDialog>
    );
};

export default AddProductModal;
