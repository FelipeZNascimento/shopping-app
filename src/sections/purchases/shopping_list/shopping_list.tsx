import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

// Selectors
import { shoppingList, getIsLoading } from 'store/shopping_list/selector';
import { getPurchaseListLength } from 'store/purchase/selector';

// Actions
import { fetchShoppingList, deleteFromShoppingList } from 'store/shopping_list/actions';
import { convertToPurchase } from 'store/purchase/actions';

// Interfaces
import {
    IProduct,
    IShoppingListItem,
    ISortingState
} from 'constants/objectInterfaces';

// Components
import { Loading, SearchInput, Table } from 'components/index';
import { IAutocompleteItem } from 'components/autocomplete/types';
import { AddShoppingCart } from '@material-ui/icons';
import { Fab } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

import { resultsPerPage } from 'constants/general';
import { routes } from 'constants/routes';
import { invertSort } from 'utils/utils';

const defaultSortState = {
    orderBy: 'description',
    sort: 'ASC'
};

const ShoppingList = () => {
    const [checkedProducts, setCheckedProducts] = useState<IProduct[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSortState, setCurrentSortState] = useState<ISortingState>(defaultSortState);
    const [searchField, setSearchField] = useState<string>('');

    const list: IShoppingListItem[] = useSelector(shoppingList);
    const isListLoading: boolean = useSelector(getIsLoading);
    const purchaseListLength: number = useSelector(getPurchaseListLength);
    const dispatch = useDispatch();
    const history = useHistory();

    const headers = [
        {
            key: 'category_description',
            value: 'Categoria',
            sortable: true
        },
        {
            key: 'description',
            value: 'Produto',
            sortable: true
        }
    ];

    useEffect(() => {
        dispatch(fetchShoppingList(currentPage - 1));
    }, []);

    if (shoppingList.length === 0) {
        return null;
    }

    const deleteProduct = (product: IShoppingListItem) => {
        dispatch(deleteFromShoppingList(product));
    };

    const onSortChange = (orderBy: string, sort: string) => {
        const newSort: string = orderBy === currentSortState.orderBy ? invertSort(currentSortState.sort) : sort;

        setCurrentSortState({ orderBy, sort: newSort });
        dispatch(fetchShoppingList(currentPage - 1, { orderBy, sort: newSort }, searchField));
    };

    const onCheckboxClick = (productList: IProduct[]) => {
        setCheckedProducts(productList);
    };

    const onConvertClick = () => {
        dispatch(convertToPurchase(checkedProducts, purchaseListLength));
        history.push(routes.PURCHASE_FORM);
    }

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
        dispatch(fetchShoppingList(newPage - 1, currentSortState, searchField));
    };

    const onSearch = (item: IAutocompleteItem | string) => {
        let newSearchInput;

        if (typeof item === 'string') {
            newSearchInput = item;
        } else {
            newSearchInput = item.description;
        }

        setSearchField(newSearchInput);

        if (newSearchInput.length >= 2 || newSearchInput.length === 0) {
            dispatch(fetchShoppingList(0, currentSortState, newSearchInput));
        }
    };

    const isFabButtonDisabled = checkedProducts.length === 0;
    return (
        <>
            <Fab
                classes={{ root: isFabButtonDisabled ? 'of-grey4-bg' : 'of-cyan-bg' }}
                className="fab-bottom"
                disabled={isFabButtonDisabled}
                size="large"
                variant="extended"
                onClick={onConvertClick}
            >
                <AddShoppingCart />&nbsp;
                Converter em compra
            </Fab>
            <SearchInput
                options={list}
                onSearch={onSearch}
            />
            <div className="bottom-padding-l">
                <Pagination
                    color="primary"
                    count={Math.ceil(list.length / resultsPerPage)}
                    page={currentPage}
                    size="large"
                    shape="rounded"
                    variant="outlined"
                    onChange={(event, newPage) => onPageChange(newPage)}
                />
            </div>
            <Table
                bodyColumns={isListLoading ? [] : list}
                checkedProducts={checkedProducts}
                color="cyan"
                headerColumns={headers}
                isLoading={isListLoading}
                sortState={currentSortState}
                onCheckboxAction={onCheckboxClick}
                onSecondaryAction={(product: IShoppingListItem) => deleteProduct(product)}
                onSortChange={onSortChange}
            />
            {isListLoading && <Loading />}
            <div className="top-padding-l">
                <Pagination
                    color="primary"
                    count={Math.ceil(list.length / resultsPerPage)}
                    page={currentPage}
                    size="large"
                    shape="rounded"
                    variant="outlined"
                    onChange={(event, newPage) => onPageChange(newPage)}
                />
            </div>

        </>
    );
};

export default ShoppingList;
