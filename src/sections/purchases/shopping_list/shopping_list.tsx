import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";

// Selectors
import { shoppingList, getIsLoading } from 'store/shopping_list/selector';
import { getPurchaseList } from 'store/purchase/selector';

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
import { GenericTable, Loading, SearchInput } from 'components/index';
import { IAutocompleteItem } from 'components/autocomplete/types';
import {
    AddShoppingCart,
    Delete as DeleteIcon,
} from '@material-ui/icons';
import { Checkbox, Fab, IconButton } from '@material-ui/core';
import { IPurchaseItem } from 'constants/objectInterfaces';

import { routes } from 'constants/routes';
import { invertSort } from 'utils/utils';

import styles from './shopping_list.module.scss';

const defaultSortState = {
    orderBy: 'description',
    sort: 'ASC'
};

const ShoppingList = () => {
    const [checkedProducts, setCheckedProducts] = useState<IProduct[]>([]);
    const [currentSortState, setCurrentSortState] = useState<ISortingState>(defaultSortState);
    const [searchField, setSearchField] = useState<string>('');

    const list: IShoppingListItem[] = useSelector(shoppingList);
    const isListLoading: boolean = useSelector(getIsLoading);
    const purchaseList: IPurchaseItem[] = useSelector(getPurchaseList);
    const dispatch = useDispatch();
    const history = useHistory();

    const headers = [
        {
            key: 'checkbox',
            value: '',
            sortable: false,
            showOnMobile: true
        },
        {
            key: 'category_description',
            value: 'Categoria',
            sortable: true,
            showOnMobile: false
        },
        {
            key: 'description',
            value: 'Produto',
            sortable: true,
            showOnMobile: true
        },
        {
            key: 'delete',
            value: '',
            sortable: false,
            showOnMobile: true
        }
    ];

    const onCheckboxClick = (item: IProduct) => {
        let updatedCheckedProducts;
        const index = checkedProducts.findIndex((product: IProduct) => product.id === item.id);
        if (index === -1) {
            updatedCheckedProducts = [
                ...checkedProducts,
                item
            ];
        } else {
            const filteredProducts = checkedProducts.filter((product: IProduct) => item.id !== product.id);
            updatedCheckedProducts = [...filteredProducts];
        }

        setCheckedProducts(updatedCheckedProducts);
    };

    const isChecked = (item: IProduct) => (checkedProducts.findIndex((product: IProduct) => product.id === item.id) !== -1);
    const renderCheckbox = (item: IProduct) => (
        <Checkbox
            checked={isChecked(item)}
            size="small"
            inputProps={{ 'aria-label': 'checkbox with small size' }}
            onClick={() => onCheckboxClick(item)}
        />
    );
    const renderDeleteIcon = (item: IProduct) => (
        <IconButton
            aria-label="delete"
            classes={{ root: styles.icon }}
            onClick={() => dispatch(deleteFromShoppingList(item))}
        >
            <DeleteIcon classes={{ root: styles.icon }} />
        </IconButton>
    );

    const bodyColumns = [
        {
            key: 'checkbox',
            renderFunction: (item: IProduct) => <td>{renderCheckbox(item)}</td>,
            showOnMobile: true
        },
        {
            key: 'category',
            renderFunction: (item: IShoppingListItem) => <td className="align-left">{item.category_description}</td>,
            showOnMobile: false
        },
        {
            key: 'description',
            renderFunction: (item: IShoppingListItem) => (
                <td className="align-left">
                    <Link to={routes.PRODUCT + `/${item.product_id}`}>{item.description}</Link>
                </td>
            ),
            showOnMobile: true
        },
        {
            key: 'delete',
            renderFunction: (item: IShoppingListItem) => <td>{renderDeleteIcon(item)}</td>,
            showOnMobile: true
        }
    ];

    useEffect(() => {
        dispatch(fetchShoppingList());
    }, []);

    if (shoppingList.length === 0) {
        return null;
    }

    const onSortChange = (orderBy: string, sort: string) => {
        const newSort: string = orderBy === currentSortState.orderBy ? invertSort(currentSortState.sort) : sort;

        setCurrentSortState({ orderBy, sort: newSort });
        dispatch(fetchShoppingList({ orderBy, sort: newSort }, searchField));
    };

    const onConvertClick = () => {
        dispatch(convertToPurchase(checkedProducts, purchaseList));
        history.push(routes.PURCHASE_FORM);
    }

    const onSearch = (item: IAutocompleteItem | string) => {
        let newSearchInput;

        if (typeof item === 'string') {
            newSearchInput = item;
        } else {
            newSearchInput = item.description;
        }

        setSearchField(newSearchInput);

        if (newSearchInput.length >= 2 || newSearchInput.length === 0) {
            dispatch(fetchShoppingList(currentSortState, newSearchInput));
        }
    };

    const isFabButtonDisabled = checkedProducts.length === 0;
    return (
        <>
            <Fab
                classes={{ root: isFabButtonDisabled ? 'of-grey4-bg' : 'of-orange-bg' }}
                className="fab-bottom"
                disabled={isFabButtonDisabled}
                size="large"
                variant="extended"
                onClick={onConvertClick}
            >
                <AddShoppingCart />&nbsp;
                Converter em compra
            </Fab>
            <div className={styles.container}>
                <SearchInput
                    options={list}
                    onSearch={onSearch}
                />
                <GenericTable
                    bodyColumns={isListLoading ? [] : bodyColumns}
                    color="orange"
                    data={list}
                    headerColumns={headers}
                    isLoading={isListLoading}
                    onSortChange={(column: string, direction: string) => onSortChange(column, direction)}
                />
                {isListLoading && <Loading />}
            </div>
        </>
    );
};

export default ShoppingList;
