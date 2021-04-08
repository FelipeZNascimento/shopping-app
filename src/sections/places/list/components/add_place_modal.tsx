import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { fetchPlaceCategories } from 'store/place/actions';

// Selectors
import { selectPlaceCategories } from 'store/place/selector';

import { TextField } from '@material-ui/core';
import { FormDialog, Autocomplete } from 'components/index';

import {
    TPlace,
    TCategory
} from 'constants/objectInterfaces';
import {
    place as placeModel
} from 'constants/objectModels';
import { IAutocompleteItem } from 'components/autocomplete/types';

import styles from './modal.module.scss';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (object: TPlace) => void;
}

const AddPlaceModal = ({
    isOpen,
    onClose,
    onConfirm
}: IProps) => {
    const [selectedItem, setSelectedItem] = useState<TPlace>(placeModel);
    const categories: TCategory[] = useSelector(selectPlaceCategories);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPlaceCategories(null));
    }, []);

    const onDescriptionChange = (event: any) => {
        const value = event.target.value;

        if (value) {
            const category = {
                id: selectedItem.category.id,
                description: selectedItem.category.description
            };

            setSelectedItem({
                ...selectedItem,
                created: selectedItem?.created || '',
                category: category,
                description: value,
                id: selectedItem?.id
            });
        }
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
            isEnable={selectedItem.description !== '' && selectedItem.category.id !== null}
            isOpen={isOpen}
            onClose={onClose}
            onConfirm={() => selectedItem ? onConfirm(selectedItem) : null}
            title='Adicionar Novo Lugar'
        >
            {renderAddDialogForm()}
        </FormDialog>
    );
};

export default AddPlaceModal;
