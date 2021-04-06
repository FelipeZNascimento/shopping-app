import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { fetchProductCategories } from 'store/product/actions';

// Selectors
import { selectProductCategories } from 'store/product/selector';

import { TextField } from '@material-ui/core';
import { FormDialog, Autocomplete } from 'components/index';
import {
    product as productModel
} from 'constants/objectModels';

import {
    IProduct,
    ICategory
} from 'constants/objectInterfaces';
import { IAutocompleteItem } from 'components/autocomplete/types';

import styles from './modal.module.scss';

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
    const [selectedItem, setSelectedItem] = useState<IProduct>(productModel);
    const categories: ICategory[] = useSelector(selectProductCategories);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductCategories(null));
    }, []);

    const onDescriptionChange = (event: any) => {
        const newDescription = event.target.value;
        setSelectedItem({
            ...selectedItem,
            description: newDescription
        });
    };

    const onCategoryChange = (
        category: IAutocompleteItem | string
    ) => {
        if (typeof category !== 'string') {
            setSelectedItem({
                ...selectedItem,
                category_id: category.id,
                category_description: category.description
            })
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
            <div className={styles.minPadding}>
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
            isEnable={selectedItem.description !== '' && selectedItem.category_id !== null}
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