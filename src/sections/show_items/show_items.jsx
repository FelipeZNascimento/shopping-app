import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import update from 'immutability-helper';
import clone from 'clone';

import TextField from '@material-ui/core/TextField';

import {
    AddDialog,
    ConfirmationDialog,
    Autocomplete,
    ErrorDialog,
    Loading,
    Table,
} from '../../components/index';

import { objectTypes, objectTypeInfo } from '../../constants/general';
import { arrayOfObjectsAreEqual } from '../../services/utilities';

const ShowItems = (props) => {
    const [arrayOfModifiedItems, setArrayOfModifiedItems] = useState([]);
    const [itemsToDisplay, setItemsToDisplay] = useState([]);
    const [itemObject, setItemObject] = useState(null);
    const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
    const [lineToDelete, setLineToDelete] = useState(null);
    const [isDialogEnabled, setIsDialogEnabled] = useState(false);
    const [isEditConfirmationOpen, setIsEditConfirmationOpen] = useState(false);

    const {
        isDeleting,
        isAddMode,
        isEditMode,
        isSaveMode,
        isError,
        errorMessage,
        items,
        isLoading,
        objectType,
        resetErrors,
        toggleAddMode,
        toggleEditMode,
        toggleSaveMode,
        updateItems,
    } = props;

    useEffect(() => {
        return function cleanup() {
            toggleEditMode(false);
        };
    }, [items, toggleEditMode]);


    useEffect(() => {
        const {
            categories,
            getAllItems,
            getCategories,
            objectModel,
        } = props;

        if (items.length === 0) {
            getAllItems();
        }
        if (categories.length === 0 && getCategories !== null) {
            getCategories();
        }

        setItemObject(objectModel);
    }, [props, items.length]);

    useEffect(() => {
        const clonedItems = clone(items);
        setItemsToDisplay(clonedItems);
    }, [items]);

    useEffect(() => {
        const modifiedItems = arrayOfObjectsAreEqual(items, itemsToDisplay);
        setArrayOfModifiedItems(modifiedItems);

        if (isSaveMode && modifiedItems.length > 0) {
            console.log(modifiedItems);
            updateItems(modifiedItems);
            // toggleEditMode(false);
            toggleSaveMode(false);
        }
    }, [isSaveMode]);

    useEffect(() => {
        const modifiedItems = arrayOfObjectsAreEqual(items, itemsToDisplay);
        if (!isEditMode && modifiedItems.length > 0) {
            setArrayOfModifiedItems(modifiedItems);
        }
        // if (!isEditMode
        //     && !isAddMode
        //     && !isSaveMode
        //     && items.length > 0
        //     && items.length === itemsToDisplay.length
        //     && modifiedItems.length > 0) {
        //     setIsEditConfirmationOpen(true);
        //     setArrayOfModifiedItems(modifiedItems);
        // }
    }, [isEditMode]);

    const closeDeleteConfirmation = (confirm) => {
        const { deleteItem } = props;

        if (confirm) {
            deleteItem(lineToDelete);
            setLineToDelete(null);
        }

        setIsDeleteConfirmationOpen(false);
    };

    const openDeleteConfirmation = (item) => {
        setIsDeleteConfirmationOpen(true);
        setLineToDelete(item);
    };

    const addNewItem = () => {
        const { saveNewItem } = props;
        saveNewItem(itemObject);
        toggleAddMode(false);
    };

    const onAddFormChange = (event, object = null) => {
        const newValue = object === null
            ? event.target.value
            : object.id;

        const property = object === null
            ? event.target.id
            : 'categoryId';

        const updatedObject = update(itemObject, {
            [property]: {
                $set: newValue,
            },
        });

        const dialogNewState = itemObject.description !== ''
            && (object === null
                || (itemObject.categoryId !== null && itemObject.categoryId !== undefined));

        setIsDialogEnabled(dialogNewState);
        setItemObject(updatedObject);
    };

    const onFieldChange = (event, changedItem) => {
        const newValue = event.target.value;
        const targetProperty = event.target.name;

        const index = itemsToDisplay.findIndex((item) => item.id === changedItem.id);
        const newArray = [...itemsToDisplay];
        newArray[index][targetProperty] = newValue;

        setItemsToDisplay(newArray);
    };

    const renderCategoryAutoComplete = (item = null) => {
        const { categories } = props;

        if (categories.length === 0) {
            return null;
        }

        return (
            <div className="min-padding">
                <Autocomplete
                    selected={item}
                    options={categories}
                    title="Categoria"
                    onChange={(e, object) => onAddFormChange(e, object)}
                />
            </div>
        );
    };

    const renderAddDialogForm = () => {
        const { objectModel } = props;
        return Object.keys(objectModel).map((property) => {
            if (property === 'description') {
                return (
                    <TextField
                        autoFocus
                        fullWidth
                        id="description"
                        label="Nome"
                        type="text"
                        onChange={(e) => onAddFormChange(e)}
                    />
                );
            }
            return renderCategoryAutoComplete();
        });
    };

    const closeConfirmDialog = (confirm) => {
        setIsEditConfirmationOpen(false);

        if (confirm) {
            const clonedItems = clone(items);
            setItemsToDisplay(clonedItems);
        } else {
            toggleEditMode(true);
        }
    };

    const renderConfirmationDialog = () => {
        const title = 'Alerta';
        const message = 'Suas alterações serão perdidas. Deseja continuar?';

        return (
            <ConfirmationDialog
                message={message}
                title={title}
                onClose={closeConfirmDialog}
            />
        );
    };

    const renderDeleteConfirmation = () => {
        const title = `Excluir "${lineToDelete.description}"`;
        const message = 'Essa ação não poderá ser desfeita. Deseja continuar?';

        return (
            <ConfirmationDialog
                message={message}
                title={title}
                onClose={closeDeleteConfirmation}
            />
        );
    };

    const headers = () => {
        if (objectType === objectTypes.places
            || objectType === objectTypes.products) return ['Id', 'Categoria', 'Nome'];
        if (objectType === objectTypes.brands
            || objectType === objectTypes.placesCategories
            || objectType === objectTypes.productsCategories) return ['Id', 'Nome'];

        return null;
    };

    return (
        <>
            {(isLoading || isDeleting) && <Loading fullscreen />}
            {isError
                && (
                    <ErrorDialog
                        error={isError}
                        errorMessage={errorMessage}
                        onClose={resetErrors}
                    />
                )}
            {isAddMode
                && (
                    <AddDialog
                        enabled={isDialogEnabled}
                        title={objectTypeInfo[objectType].description}
                        onClose={() => toggleAddMode(false)}
                        onConfirm={addNewItem}
                    >
                        {renderAddDialogForm()}
                    </AddDialog>
                )}
            {isDeleteConfirmationOpen && renderDeleteConfirmation()}
            {isEditConfirmationOpen && renderConfirmationDialog()}
            <h1>{objectTypeInfo[objectType].description}</h1>
            {itemsToDisplay.length > 0
                && (
                    <Table
                        bodyColumns={itemsToDisplay}
                        // autocomplete={renderCategoryAutoComplete}
                        color="green"
                        headerColumns={headers()}
                        isEditMode={isEditMode}
                        onItemDelete={(item) => openDeleteConfirmation(item)}
                        onFieldChange={onFieldChange}
                    />
                )}
        </>
    );
};

ShowItems.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
    })),
    errorMessage: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        category_id: PropTypes.number,
        description: PropTypes.string.isRequired,
    })),
    isAddMode: PropTypes.bool.isRequired,
    isDeleting: PropTypes.bool,
    isEditMode: PropTypes.bool.isRequired,
    isError: PropTypes.bool,
    isLoading: PropTypes.bool,
    isSaveMode: PropTypes.bool.isRequired,
    objectType: PropTypes.number.isRequired,

    objectModel: PropTypes.shape({
        categoryId: PropTypes.number,
        description: PropTypes.string.isRequired,
    }).isRequired,

    deleteItem: PropTypes.func.isRequired,
    getAllItems: PropTypes.func.isRequired,
    getCategories: PropTypes.func,
    resetErrors: PropTypes.func.isRequired,
    saveNewItem: PropTypes.func.isRequired,
    toggleAddMode: PropTypes.func.isRequired,
    toggleEditMode: PropTypes.func.isRequired,
    toggleSaveMode: PropTypes.func.isRequired,
    updateItems: PropTypes.func.isRequired,
};

ShowItems.defaultProps = {
    categories: [],
    errorMessage: '',
    getCategories: null,
    isError: false,
    isDeleting: false,
    isLoading: false,
    items: [],
};

export default ShowItems;
