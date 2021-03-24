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

type GetShoppingListAction = {
    readonly type: typeof ACTIONTYPES.FETCHING_SHOPPING_LIST
    | typeof ACTIONTYPES.FETCHING_SHOPPING_LIST_SUCCESS
    | typeof ACTIONTYPES.FETCHING_SHOPPING_LIST_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly response?: IProduct[];
    readonly errorMessage?: string;
};

export const addToShoppingList = (
    product: IProduct
) => async (dispatch: Dispatch<TSaveShoppingList>) => {
    const response = await setItem([product], objectTypes.shoppingList);
    dispatch({ type: ACTIONTYPES.ADDING_TO_SHOPPING_LIST } as const);

    response()
        .then(() => {
            return dispatch({
                type: ACTIONTYPES.ADDING_TO_SHOPPING_LIST_SUCCESS,
                newProduct: product
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.ADDING_TO_SHOPPING_LIST_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const deleteFromShoppingList = (
    product: IProduct
) => async (dispatch: Dispatch<TDeleteShoppingList>) => {
    const response = await deleteItems(product.id, objectTypes.shoppingList);
    dispatch({ type: ACTIONTYPES.DELETING_FROM_SHOPPING_LIST } as const);

    response()
        .then(() => {
            return dispatch({
                type: ACTIONTYPES.DELETING_FROM_SHOPPING_LIST_SUCCESS,
                toBeDeleted: product
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_FROM_SHOPPING_LIST_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export function clearShoppingList() {
    return {
        type: ACTIONTYPES.CLEAR_SHOPPING_LIST
    }
}

export const getShoppingList = (
    currentPage = 0,
    orderBy = 'description',
    sort = 'ASC'
) => async (dispatch: Dispatch<GetShoppingListAction>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_SHOPPING_LIST } as const);
    const response = await fetchItems(objectTypes.shoppingList, currentPage, orderBy, sort);

    response()
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_SHOPPING_LIST_SUCCESS,
                response: list
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_SHOPPING_LIST_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};
