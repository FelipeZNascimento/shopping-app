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
    TProduct,
    TCategory
} from 'constants/objectInterfaces';
import { IAutocompleteItem } from 'components/autocomplete/types';

import styles from './modal.module.scss';

interface IProps {
    isOpen: boolean;
    value: string;
    onClose: () => void;
    onConfirm: (object: TProduct) => void;
}

const AddProductModal = ({
    isOpen,
    value = '',
    onClose,
    onConfirm
}: IProps) => {
    const [selectedItem, setSelectedItem] = useState<TProduct>(productModel);
    const categories: TCategory[] = useSelector(selectProductCategories);

    const dispatch = useDispatch();

    useEffect(() => {
        if (isOpen) {
            dispatch(fetchProductCategories(null));
            setSelectedItem({
                ...selectedItem,
                description: value
            });
        }
    }, [isOpen]);

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
            const newCategory = {
                id: category.id,
                description: category.description
            };
            setSelectedItem({
                ...selectedItem,
                category: newCategory
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
                value={selectedItem.description}
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
            isEnable={selectedItem.description !== '' && selectedItem.category.id !== null}
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