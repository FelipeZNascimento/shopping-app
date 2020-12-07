import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";

// Actions
import { removeFromList } from '../../store/main/actions';
import { fetchItems } from '../../services/dataGetters';
import { setItem } from '../../services/dataSetters';
import deleteItem from '../../services/dataDeleters';

// Selectors
import { isLoading, returnItems } from '../../store/main/selector';

// Components
import { Fab } from '@material-ui/core';
import { AddCircle as AddIcon } from '@material-ui/icons';
import { Loading, Table } from '../../components/index';
import AddCategoryModal from './components/add_category_modal';
import DeleteCategoryModal from './components/delete_category_modal';

import { objectTypes } from '../../constants/general';
import { ICategory } from '../../constants/objectInterfaces';

const CategoriesSection = () => {
    const [objectType, setObjectType] = useState<number | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState<ICategory | null>(null);

    const isCategoriesLoading = useSelector(isLoading);
    const categories: ICategory[] = useSelector((state) => returnItems(state, objectType));

    const dispatch = useDispatch();
    const { pathname } = useLocation();

    useEffect(() => {
        const type = pathname.search('products_categories') !== -1
            ? objectTypes.productsCategories
            : objectTypes.placesCategories;

        console.log("New type: " + type);
        setObjectType(type);
        dispatch(fetchItems(type));
    }, [pathname]);

    const productCategoriesHeaders = [
        {
            key: 'description',
            value: 'Categoria de Produtos'
        }
    ];

    const placeCategoriesHeaders = [
        {
            key: 'description',
            value: 'Categoria de Lugares'
        }
    ];

    const headers = objectType === objectTypes.productsCategories
        ? productCategoriesHeaders
        : placeCategoriesHeaders;

    const color = objectType === objectTypes.productsCategories
        ? 'blue'
        : 'orange';

    const deleteCategory = () => {
        if (toBeDeleted && objectType) {
            dispatch(deleteItem(toBeDeleted?.id, objectType));
            dispatch(removeFromList(toBeDeleted, objectType));
        }
        setToBeDeleted(null);
    }

    const addNewCategory = (product: ICategory) => {
        dispatch(setItem([product], objectType));
        setIsAddModalOpen(false);
    };

    const onSortChange = (column: string, direction: string) => {
        console.log('Sorting by: ' + column + direction);
        dispatch(fetchItems(objectType, column, direction));
    };

    return (
        <>
            <Fab
                classes={{ root: `of-${color}-bg` }}
                className="fab-bottom"
                size="large"
                variant="extended"
                onClick={() => setIsAddModalOpen(true)}
            >
                <AddIcon />&nbsp;
                Nova categoria
            </Fab>
            <Table
                bodyColumns={categories}
                color={color}
                headerColumns={headers}
                onSecondaryAction={(brand: ICategory) => setToBeDeleted(brand)}
                onSortChange={(column: string, direction: string) => onSortChange(column, direction)}
            />
            {isCategoriesLoading && <Loading />}
            <AddCategoryModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onConfirm={addNewCategory}
            />
            <DeleteCategoryModal
                category={toBeDeleted}
                onClose={() => setToBeDeleted(null)}
                onConfirm={deleteCategory}
            />
        </>

    )
}

export default CategoriesSection;
