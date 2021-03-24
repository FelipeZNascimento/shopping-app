import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { setPlacesCategories, getPlacesCategories, removeFromList } from 'store/main/actions';
import deleteItem from 'services/dataDeleters';

// Selectors
import { returnItems } from 'store/main/selector';

// Components
import CategoriesSection from 'sections/categories/categories';

import { objectTypes } from 'constants/general';
import { ICategory } from 'constants/objectInterfaces';

const PlacesCategories = () => {
    const [currentPage, setCurrentPage] = useState<number>(0);

    const objectType = objectTypes.placesCategories;
    const categories: ICategory[] = useSelector((state) => returnItems(state, objectType));

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPlacesCategories(currentPage));
    }, []);

    const headers = {
        key: 'description',
        value: 'Categoria de Lugares',
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
        dispatch(setPlacesCategories(newCategory));
    };

    const onSortChange = (column: string, direction: string) => {
        console.log('Sorting by: ' + column + direction);
        dispatch(getPlacesCategories(currentPage, column, direction));
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

export default PlacesCategories;
