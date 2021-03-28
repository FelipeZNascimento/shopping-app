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
    getPlaceCategories,
    getPlaceCategoriesCount
} from 'store/place/selector';

// Components
import CategoriesSection from 'sections/categories/categories';
import { SearchInput } from 'components/index';
import { Pagination } from '@material-ui/lab';

// Types, Constants, Misc
import { resultsPerPage } from 'constants/general';
import { IAutocompleteItem } from 'components/autocomplete/types';
import { ICategory, ISortingState } from 'constants/objectInterfaces';
import { invertSort } from 'utils/utils';

const defaultSortState = {
    orderBy: 'description',
    sort: 'ASC'
};

const PlacesCategories = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchField, setSearchField] = useState<string>('');
    const [currentSortState, setCurrentSortState] = useState<ISortingState>(defaultSortState);

    const categories: ICategory[] = useSelector(getPlaceCategories);
    const totalCount: number = useSelector(getPlaceCategoriesCount);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPlaceCategories(currentPage - 1));
    }, []);

    const headers = {
        key: 'description',
        value: 'Categoria de Lugares',
        sortable: true
    };

    const color = 'orange';

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

    const onSortChange = (orderBy: string, sort: string) => {
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
        setCurrentPage(newPage);
        dispatch(fetchPlaceCategories(newPage - 1, currentSortState, searchField));
    };

    return (
        <>
            <SearchInput
                options={categories}
                onSearch={onSearch}
            />
            <div className="bottom-padding-l">
                <Pagination
                    color="primary"
                    count={Math.ceil(totalCount / resultsPerPage)}
                    page={currentPage}
                    size="large"
                    shape="rounded"
                    variant="outlined"
                    onChange={(event, newPage) => onPageChange(newPage)}
                />
            </div>

            <CategoriesSection
                bodyColumns={categories}
                color={color}
                headerColumns={headers}
                sortState={currentSortState}
                onAddNewCategory={onAddNewCategory}
                onDeleteCategory={onDeleteCategory}
                onSortChange={(column: string, direction: string) => onSortChange(column, direction)}
            />
            <div className="top-padding-l">
                <Pagination
                    color="primary"
                    count={Math.ceil(totalCount / resultsPerPage)}
                    page={currentPage}
                    size="large"
                    shape="rounded"
                    variant="outlined"
                    onChange={(event, newPage) => onPageChange(newPage)}
                />
            </div>
        </>
    );
}

export default PlacesCategories;
