import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Selectors
import { returnProductCategories } from '../../../store/main/selector';

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@material-ui/core';

import { TextField } from '@material-ui/core';
import { Autocomplete } from '../../../components/index';
import {
    product as productModel
} from '../../../constants/objectModels';

import {
    IProduct,
    IProductCategory
} from '../../../constants/objectInterfaces';

interface IProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (object: any) => void;
}

const AddProductModal = ({
    isOpen,
    onClose,
    onConfirm
}: IProps) => {
    const categories: IProductCategory[] = useSelector(returnProductCategories);
    const [selectedItem, setSelectedItem] = useState<IProduct>(productModel);

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
        console.log(object);
        if(object) {
            setSelectedItem({
                ...selectedItem,
                category_id: object.id
            });
        }
    };

    const renderAddDialogForm = () => {
        return (
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
    };

    return (
        <Dialog
            open={isOpen}
            fullWidth
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Adicionar Novo Produto</DialogTitle>
            <DialogContent>
                {renderAddDialogForm()}
            </DialogContent>
            <DialogActions>
                <Button
                    disableElevation
                    classes={{ root: 'flex-grow' }}
                    color="secondary"
                    onClick={onClose}
                >
                    Cancelar
                </Button>
                <Button
                    disableElevation
                    classes={{ root: 'flex-grow' }}
                    color="primary"
                    variant="contained"
                    onClick={() => onConfirm(selectedItem)}
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProductModal;
