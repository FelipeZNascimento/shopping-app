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
    selectIsLoadingCategories,
    selectPlaceCategories,
    selectPlaceCategoriesCount
} from 'store/place/selector';

// Components
import CategoriesSection from 'sections/categories/categories';

// Types, Constants, Misc
import { IAutocompleteItem } from 'components/autocomplete/types';
import { TCategory } from 'constants/objectInterfaces';
import { TSortingState } from 'components/generic_table/types';

import { invertSort } from 'utils/utils';

const defaultSortState = {
    orderBy: 'description',
    sort: 'ASC'
};

const PlacesCategories = () => {
    const [currentSortState, setCurrentSortState] = useState<TSortingState>(defaultSortState);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchField, setSearchField] = useState<string>('');

    const categories: TCategory[] = useSelector(selectPlaceCategories);
    const isLoadingCategories: boolean = useSelector(selectIsLoadingCategories);
    const totalCount: number = useSelector(selectPlaceCategoriesCount);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPlaceCategories(0));
    }, []);

    const onDeleteCategory = (category: TCategory) => {
        dispatch(deletePlaceCategory(
            category,
            currentPage - 1,
            currentSortState,
            searchField
        ));
    }

    const onAddNewCategory = (categoryName: string) => {
        const newCategory: TCategory = {
            id: null,
            description: categoryName
        }

        dispatch(savePlaceCategory(
            newCategory,
            currentPage - 1,
            currentSortState,
            searchField
        ));
    };

    const onSortChange = (page: number, orderBy: string, sort: string) => {
        const newSort: string = orderBy === currentSortState.orderBy ? invertSort(currentSortState.sort) : sort;

        setCurrentSortState({ orderBy, sort: newSort });
        dispatch(fetchPlaceCategories(page - 1, { orderBy, sort: newSort }, searchField));
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
        setCurrentPage(newPage);
        dispatch(fetchPlaceCategories(newPage - 1, currentSortState, searchField));
    };

    return (
        <CategoriesSection
            color={'yellow'}
            data={categories}
            isLoading={isLoadingCategories}
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
