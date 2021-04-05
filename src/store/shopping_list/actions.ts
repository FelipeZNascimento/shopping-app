import { Dispatch } from 'react';
import * as ACTIONTYPES from 'store/actionTypes';

import { objectTypes } from 'constants/general';
import fetchItems from 'services/dataGetters';
import deleteItems from 'services/dataDeleters';
import { setItem } from 'services/dataSetters';

import { TDeleteShoppingList, TSaveShoppingList } from './types';
import {
    IProduct
} from 'constants/objectInterfaces';

type fetchShoppingListAction = {
    readonly type: typeof ACTIONTYPES.FETCHING_SHOPPING_LIST
    | typeof ACTIONTYPES.FETCHING_SHOPPING_LIST_SUCCESS
    | typeof ACTIONTYPES.FETCHING_SHOPPING_LIST_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly products?: IProduct[];
    readonly errorMessage?: string;
};

export const addToShoppingList = (
    product: IProduct
) => async (dispatch: Dispatch<TSaveShoppingList>) => {
    dispatch({ type: ACTIONTYPES.ADDING_TO_SHOPPING_LIST } as const);

    setItem({
        itemArray: [product],
        objectType: objectTypes.shoppingList
    })
        .then((response) => {
            const purchaseItem = {
                ...product,
                product_id: product.id,
                id: response.insertId
            };

            dispatch({
                type: ACTIONTYPES.ADDING_TO_SHOPPING_LIST_SUCCESS,
                newProduct: purchaseItem
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.ADDING_TO_SHOPPING_LIST_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const deleteFromShoppingList = (
    purchaseItem: IProduct
) => async (dispatch: Dispatch<TDeleteShoppingList>) => {
    if (purchaseItem.id === null) {
        return;
    }

    dispatch({ type: ACTIONTYPES.DELETING_FROM_SHOPPING_LIST } as const);
    deleteItems({
        objectId: purchaseItem.id,
        objectType: objectTypes.shoppingList
    })
        .then(() => {
            dispatch({
                type: ACTIONTYPES.DELETING_FROM_SHOPPING_LIST_SUCCESS,
                toBeDeleted: purchaseItem
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_FROM_SHOPPING_LIST_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export function clearShoppingList() {
    return {
        type: ACTIONTYPES.CLEAR_SHOPPING_LIST
    }
}

export const fetchShoppingList = (
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    },
    searchField = ''
) => async (dispatch: Dispatch<fetchShoppingListAction>) => {
    const { orderBy, sort } = sortState;
    dispatch({ type: ACTIONTYPES.FETCHING_SHOPPING_LIST } as const);

    fetchItems({
        objectType: objectTypes.shoppingList,
        orderBy: orderBy,
        sort: sort,
        searchField: searchField
    })
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_SHOPPING_LIST_SUCCESS,
                products: list
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_SHOPPING_LIST_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};
