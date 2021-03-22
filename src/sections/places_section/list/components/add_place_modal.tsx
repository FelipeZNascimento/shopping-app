import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { fetchItems } from '../../../../services/dataGetters';

// Selectors
import { returnItems } from '../../../../store/main/selector';

import { TextField } from '@material-ui/core';
import { FormDialog, Autocomplete } from '../../../../components/index';

import {
    IPlace,
    ICategory
} from '../../../../constants/objectInterfaces';
import { objectTypes } from '../../../../constants/general';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (object: IPlace) => void;
}

const AddPlaceModal = ({
    isOpen,
    onClose,
    onConfirm
}: IProps) => {
    const categories: ICategory[] = useSelector((state) => returnItems(state, objectTypes.placesCategories));
    const [selectedItem, setSelectedItem] = useState<IPlace | null>(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchItems(objectTypes.placesCategories));
    }, []);

    const onDescriptionChange = (event: any) => {
        const value = event.target.value;

        if (value) {
            setSelectedItem({
                ...selectedItem,
                created: selectedItem?.created || '',
                category_id: selectedItem?.category_id,
                category_description: selectedItem?.category_description || '',
                description: value,
                id: selectedItem?.id
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
                created: selectedItem?.created || '',
                category_id: object.id,
                category_description: selectedItem?.category_description || '',
                description: selectedItem?.description || '',
                id: selectedItem?.id
            });
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
            onConfirm={() => selectedItem ? onConfirm(selectedItem) : null}
            title='Adicionar Novo Lugar'
        >
            {renderAddDialogForm()}
        </FormDialog>
    );
};

export default AddPlaceModal;
