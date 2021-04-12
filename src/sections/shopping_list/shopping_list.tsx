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
    TProduct,
    TShoppingListItem,
} from 'constants/objectInterfaces';

// Components
import {
    ConfirmationDialog,
    GenericTable,
    Loading,
    SearchInput
} from 'components/index';
import { TSortingState } from 'components/generic_table/types';
import { IAutocompleteItem } from 'components/autocomplete/types';
import {
    AddShoppingCart,
    Delete as DeleteIcon,
} from '@material-ui/icons';
import { Checkbox, Fab, IconButton } from '@material-ui/core';
import { TPurchaseItem } from 'constants/objectInterfaces';

import { routes } from 'constants/routes';
import { invertSort } from 'utils/utils';

import styles from './shopping_list.module.scss';

const defaultSortState = {
    orderBy: 'description',
    sort: 'ASC'
};

const ShoppingList = () => {
    const [checkedProducts, setCheckedProducts] = useState<number[]>([]);
    const [currentSortState, setCurrentSortState] = useState<TSortingState>(defaultSortState);
    const [searchField, setSearchField] = useState<string>('');
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);

    const shoppingList: TShoppingListItem[] = useSelector(selectShoppingList);
    const shoppingListProducts: TProduct[] = shoppingList.map((item) => item.product);
    const isLoading: boolean = useSelector(selectIsLoading);
    const purchaseList: TPurchaseItem[] = useSelector(selectPurchaseList);
    const dispatch = useDispatch();
    const history = useHistory();

    const renderHeaderCheckbox = () => {
        const isChecked = checkedProducts.length === shoppingList.length && shoppingList.length > 0;
        return (
            <Checkbox
                checked={isChecked}
                size="small"
                inputProps={{ 'aria-label': 'checkbox with small size' }}
                onClick={() => isChecked ? setCheckedProducts([]) : setCheckedProducts(shoppingList.map(item => item.id))}
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
            disabled={shoppingList.length === 0}
            onClick={() => setIsDeleteModalOpen(true)}
        >
            <DeleteIcon classes={{ root: shoppingList.length === 0 ? styles.disabled : styles.icon }} />
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
            key: 'id',
            renderFunction: () => 'Id',
            sortable: true,
            showOnMobile: false
        },
        {
            key: 'category',
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

    const onCheckboxClick = (item: TProduct) => {
        let updatedCheckedProducts;
        const index = checkedProducts.findIndex((itemId: number) => itemId === item.id);
        if (index === -1 && item.id !== null) {
            updatedCheckedProducts = [
                ...checkedProducts,
                item.id
            ];
        } else {
            const filteredProducts = checkedProducts.filter((itemId: number) => item.id !== itemId);
            updatedCheckedProducts = [...filteredProducts];
        }

        setCheckedProducts(updatedCheckedProducts);
    };

    const isChecked = (item: TProduct) => (checkedProducts.findIndex((itemId: number) => itemId === item.id) !== -1);
    const renderCheckbox = (item: TProduct) => (
        <Checkbox
            checked={isChecked(item)}
            size="small"
            inputProps={{ 'aria-label': 'checkbox with small size' }}
            onClick={() => onCheckboxClick(item)}
        />
    );
    const renderDeleteIcon = (item: TShoppingListItem) => (
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
            renderFunction: (item: TProduct) => <td>{renderCheckbox(item)}</td>,
            showOnMobile: true
        },
        {
            key: 'category',
            renderFunction: (item: TShoppingListItem) => <td className="align-left">{item.id}</td>,
            showOnMobile: false
        },
        {
            key: 'category',
            renderFunction: (item: TShoppingListItem) => <td className="align-left">{item.product.category.description}</td>,
            showOnMobile: false
        },
        {
            key: 'description',
            renderFunction: (item: TShoppingListItem) => (
                <td className="align-left">
                    <Link to={routes.PRODUCT + `/${item.product.id}`}>{item.product.description}</Link>
                </td>
            ),
            showOnMobile: true
        },
        {
            key: 'delete',
            renderFunction: (item: TShoppingListItem) => <td>{renderDeleteIcon(item)}</td>,
            showOnMobile: true
        }
    ];

    useEffect(() => {
        dispatch(fetchShoppingList());
    }, []);

    const onSortChange = (orderBy: string, sort: string) => {
        const newSort: string = orderBy === currentSortState.orderBy ? invertSort(currentSortState.sort) : sort;

        setCurrentSortState({ orderBy, sort: newSort });
        dispatch(fetchShoppingList({ orderBy, sort: newSort }, searchField));
    };

    const onConvertClick = () => {
        const convertingProducts: TProduct[] = [];
        checkedProducts.forEach((id) => {
            const foundItem = shoppingList.find((item) => item.id === id);
            if (foundItem !== undefined) {
                convertingProducts.push(foundItem.product);
            }
        })

        dispatch(convertToPurchase(convertingProducts, purchaseList));
        history.push(routes.NEW_PURCHASE);
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
                    options={shoppingListProducts}
                    onSearch={onSearch}
                />
                <GenericTable
                    bodyColumns={bodyColumns}
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
