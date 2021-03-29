import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import {
    deleteProductCategory,
    fetchProductCategories,
    saveProductCategory
} from 'store/product/actions';

// Selectors
import { getProductCategories, getProductCategoriesCount } from 'store/product/selector';

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

const ProductsCategories = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [searchField, setSearchField] = useState<string>('');
    const [currentSortState, setCurrentSortState] = useState<ISortingState>(defaultSortState);

    const categories: ICategory[] = useSelector(getProductCategories);
    const totalCount: number = useSelector(getProductCategoriesCount);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductCategories(currentPage - 1));
    }, []);

    const headers = {
        key: 'description',
        value: 'Categoria de Produtos',
        sortable: true
    };

    const color = 'green';

    const onDeleteCategory = (category: ICategory) => {
        dispatch(deleteProductCategory(category));
    }

    const onAddNewCategory = (categoryName: string) => {
        const newCategory: ICategory = {
            id: null,
            description: categoryName
        }

        dispatch(saveProductCategory(newCategory));
    };

    const onSortChange = (orderBy: string, sort: string) => {
        const newSort: string = orderBy === currentSortState.orderBy ? invertSort(currentSortState.sort) : sort;

        setCurrentSortState({ orderBy, sort: newSort });
        dispatch(fetchProductCategories(currentPage - 1, { orderBy, sort: newSort }, searchField));
    };

    const onSearch = (item: IAutocompleteItem | string | null) => {
        let newSearchInput = '';
        if (item !== null) {
            newSearchInput = typeof (item) === 'string' ? item : item.description;
        }

        setSearchField(newSearchInput);
        if (newSearchInput.length >= 2 || newSearchInput.length === 0) {
            dispatch(fetchProductCategories(0, currentSortState, newSearchInput));
        }
    };

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
        dispatch(fetchProductCategories(newPage - 1, currentSortState, searchField));
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

export default ProductsCategories;
