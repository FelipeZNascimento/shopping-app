import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";

// Selectors
import { selectShoppingList, selectIsLoading } from 'store/shopping_list/selector';
import { selectPurchaseList } from 'store/purchase/selector';

// Actions
import { fetchShoppingList, deleteFromShoppingList, deleteShoppingList } from 'store/shopping_list/actions';
import { convertToPurchase } from 'store/purchase/actions';

// Interfaces
import {
    IProduct,
    IShoppingListItem,
    ISortingState
} from 'constants/objectInterfaces';

// Components
import {
    ConfirmationDialog,
    GenericTable,
    Loading,
    SearchInput
} from 'components/index';
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
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const shoppingList: IShoppingListItem[] = useSelector(selectShoppingList);
    const isLoading: boolean = useSelector(selectIsLoading);
    const purchaseList: IPurchaseItem[] = useSelector(selectPurchaseList);
    const dispatch = useDispatch();
    const history = useHistory();

    const renderHeaderCheckbox = () => {
        const isChecked = checkedProducts.length === shoppingList.length;
        return (
            <Checkbox
                checked={isChecked}
                size="small"
                inputProps={{ 'aria-label': 'checkbox with small size' }}
                onClick={() => isChecked ? setCheckedProducts([]) : setCheckedProducts([...shoppingList])}
            />
        )
    };

    const onDeleteAllShoppingList = () => {
        setIsDeleteModalOpen(false);
        dispatch(deleteShoppingList());
    };
    const renderDeleteAll = () => (
        <IconButton
            aria-label="delete"
            classes={{ root: styles.icon }}
            onClick={() => setIsDeleteModalOpen(true)}
        >
            <DeleteIcon classes={{ root: styles.icon }} />
        </IconButton>
    );

    const headers = [
        {
            key: 'checkbox',
            renderFunction: () => renderHeaderCheckbox(),
            sortable: false,
            showOnMobile: true
        },
        {
            key: 'category_description',
            renderFunction: () => 'Categoria',
            sortable: true,
            showOnMobile: false
        },
        {
            key: 'description',
            renderFunction: () => 'Produto',
            sortable: true,
            showOnMobile: true
        },
        {
            key: 'delete',
            renderFunction: () => renderDeleteAll(),
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
            {isDeleteModalOpen && <ConfirmationDialog
                open={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={onDeleteAllShoppingList}
                title='Deseja remover todos os itens da lista de mercado?'
            />}
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
                    options={shoppingList}
                    onSearch={onSearch}
                />
                <GenericTable
                    bodyColumns={isLoading ? [] : bodyColumns}
                    color="orange"
                    data={shoppingList}
                    headerColumns={headers}
                    isLoading={isLoading}
                    sortState={currentSortState}
                    onSortChange={(column: string, direction: string) => onSortChange(column, direction)}
                />
                {isLoading && <Loading />}
            </div>
        </>
    );
};

export default ShoppingList;
