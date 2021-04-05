import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import {
    deletePlaceCategory,
    fetchPlaceCategories,
    savePlaceCategory
} from 'store/place/actions';

// Selectors
import {
    getIsLoadingCategories,
    getPlaceCategories,
    getPlaceCategoriesCount
} from 'store/place/selector';

// Components
import CategoriesSection from 'sections/categories/categories';

// Types, Constants, Misc
import { IAutocompleteItem } from 'components/autocomplete/types';
import { ICategory, ISortingState } from 'constants/objectInterfaces';
import { invertSort } from 'utils/utils';

const defaultSortState = {
    orderBy: 'description',
    sort: 'ASC'
};

const PlacesCategories = () => {
    const [searchField, setSearchField] = useState<string>('');
    const [currentSortState, setCurrentSortState] = useState<ISortingState>(defaultSortState);

    const categories: ICategory[] = useSelector(getPlaceCategories);
    const isCategoriesLoading: boolean = useSelector(getIsLoadingCategories);
    const totalCount: number = useSelector(getPlaceCategoriesCount);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPlaceCategories(0));
    }, []);

    const onDeleteCategory = (category: ICategory) => {
        dispatch(deletePlaceCategory(category));
    }

    const onAddNewCategory = (categoryName: string) => {
        const newCategory: ICategory = {
            id: null,
            description: categoryName
        }

        dispatch(savePlaceCategory(newCategory));
    };

    const onSortChange = (currentPage: number, orderBy: string, sort: string) => {
        const newSort: string = orderBy === currentSortState.orderBy ? invertSort(currentSortState.sort) : sort;

        setCurrentSortState({ orderBy, sort: newSort });
        dispatch(fetchPlaceCategories(currentPage - 1, { orderBy, sort: newSort }, searchField));
    };

    const onSearch = (item: IAutocompleteItem | string | null) => {
        let newSearchInput = '';
        if (item !== null) {
            newSearchInput = typeof (item) === 'string' ? item : item.description;
        }

        setSearchField(newSearchInput);
        if (newSearchInput.length >= 2 || newSearchInput.length === 0) {
            dispatch(fetchPlaceCategories(0, currentSortState, newSearchInput));
        }
    };

    const onPageChange = (newPage: number) => {
        dispatch(fetchPlaceCategories(newPage - 1, currentSortState, searchField));
    };

    return (
        <CategoriesSection
            color={'yellow'}
            data={categories}
            isLoading={isCategoriesLoading}
            searchOptions={categories}
            sortState={currentSortState}
            totalCount={totalCount}
            onAddNewCategory={onAddNewCategory}
            onDeleteCategory={onDeleteCategory}
            onPageChange={onPageChange}
            onSearch={onSearch}
            onSortChange={onSortChange}
        />
    );
}

export default PlacesCategories;
