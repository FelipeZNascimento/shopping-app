import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

// Selectors
import { shoppingList, isLoading } from 'store/shopping_list/selector';
import { getPurchaseListLength } from 'store/purchase/selector';

// Actions
import { getShoppingList, deleteFromShoppingList } from 'store/shopping_list/actions';
import { convertToPurchase } from 'store/purchase/actions';
import deleteItem from 'services/dataDeleters';

// Interfaces
import { IShoppingListItem, IProduct } from 'constants/objectInterfaces';

// Components
import { Loading, Table } from 'components/index';
import { AddShoppingCart } from '@material-ui/icons';
import { Fab } from '@material-ui/core';

import { objectTypes } from 'constants/general';
import { routes } from 'constants/routes';

const ShoppingList = () => {
    const [checkedProducts, setCheckedProducts] = useState<IProduct[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(0);

    const list: IShoppingListItem[] = useSelector(shoppingList);
    const isListLoading: boolean = useSelector(isLoading);
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
        dispatch(getShoppingList(currentPage));
    }, []);

    if (shoppingList.length === 0) {
        return null;
    }

    const deleteProduct = (product: IShoppingListItem) => {
        dispatch(deleteItem(product?.product_id, objectTypes.shoppingList));
        dispatch(deleteFromShoppingList(product));
    };

    const onSortChange = (column: string, direction: string) => {
        console.log('Sorting by: ' + column + direction);
        dispatch(getShoppingList(currentPage, column, direction));
    };

    const onCheckboxClick = (productList: IProduct[]) => {
        setCheckedProducts(productList);
    };

    const onConvertClick = () => {
        dispatch(convertToPurchase(checkedProducts, purchaseListLength));
        history.push(routes.PURCHASE_FORM);
    }

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

            {isListLoading && <Loading />}
            <Table
                bodyColumns={list}
                color="green"
                headerColumns={headers}
                onCheckboxAction={onCheckboxClick}
                onSecondaryAction={(product: IShoppingListItem) => deleteProduct(product)}
                onSortChange={(column: string, direction: string) => onSortChange(column, direction)}
            />
        </>
    );
};

export default ShoppingList;
