import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { setProductsCategories, getProductsCategories, removeFromList } from 'store/main/actions';
import deleteItem from 'services/dataDeleters';

// Selectors
import { returnItems } from 'store/main/selector';

// Components
import CategoriesSection from 'sections/categories/categories';

import { objectTypes } from 'constants/general';
import { ICategory } from 'constants/objectInterfaces';

const ProductsCategories = () => {
    const objectType = objectTypes.productsCategories;
    const categories: ICategory[] = useSelector((state) => returnItems(state, objectType));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductsCategories());
    }, []);

    const headers = {
        key: 'description',
        value: 'Categoria de Produtos',
        sortable: true
    };

    const color = 'orange';

    const deleteCategory = (category: ICategory) => {
        dispatch(deleteItem(category.id, objectType));
        dispatch(removeFromList(category, objectType));
    }

    const addNewCategory = (categoryName: string) => {
        const newCategory: ICategory = {
            id: undefined,
            description: categoryName
        }
        dispatch(setProductsCategories(newCategory));
    };

    const onSortChange = (column: string, direction: string) => {
        console.log('Sorting by: ' + column + direction);
        dispatch(getProductsCategories(column, direction));
    };

    return (
        <CategoriesSection
            bodyColumns={categories}
            color={color}
            headerColumns={headers}
            onAddNewCategory={addNewCategory}
            onDeleteCategory={deleteCategory}
            onSortChange={(column: string, direction: string) => onSortChange(column, direction)}
        />
    );
}

export default ProductsCategories;
