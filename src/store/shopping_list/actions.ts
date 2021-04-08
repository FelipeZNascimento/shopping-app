import { Dispatch } from 'react';
import * as ACTIONTYPES from 'store/actionTypes';

import { objectTypes } from 'constants/general';
import fetchItems from 'services/dataGetters';
import deleteItems from 'services/dataDeleters';
import { setItem } from 'services/dataSetters';

import {
    TDeleteShoppingList,
    TFetchShoppingListAction,
    TSaveShoppingList
} from './types';
import {
    TShoppingListItem,
    TProduct
} from 'constants/objectInterfaces';

export const addToShoppingList = (
    product: TProduct
) => async (dispatch: Dispatch<TSaveShoppingList>) => {
    dispatch({ type: ACTIONTYPES.ADDING_TO_SHOPPING_LIST } as const);

    setItem({
        itemArray: [product],
        objectType: objectTypes.shoppingList
    })
        .then((response) => {
            dispatch({
                type: ACTIONTYPES.ADDING_TO_SHOPPING_LIST_SUCCESS,
                response: response.data
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

export const deleteShoppingList = () => async (dispatch: Dispatch<TDeleteShoppingList>) => {
    dispatch({ type: ACTIONTYPES.DELETING_SHOPPING_LIST } as const);
    deleteItems({
        objectId: null,
        objectType: objectTypes.shoppingList
    })
        .then((response) => {
            dispatch({
                type: ACTIONTYPES.DELETING_SHOPPING_LIST_SUCCESS,
                response: response.data
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_SHOPPING_LIST_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const deleteFromShoppingList = (
    shoppingListItem: TShoppingListItem
) => async (dispatch: Dispatch<TDeleteShoppingList>) => {
    if (shoppingListItem.id === null) {
        return;
    }

    dispatch({ type: ACTIONTYPES.DELETING_FROM_SHOPPING_LIST } as const);
    deleteItems({
        objectId: shoppingListItem.id,
        objectType: objectTypes.shoppingList
    })
        .then((response) => {
            dispatch({
                type: ACTIONTYPES.DELETING_FROM_SHOPPING_LIST_SUCCESS,
                response: response.data
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

export const fetchShoppingList = (
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    },
    searchField = ''
) => async (dispatch: Dispatch<TFetchShoppingListAction>) => {
    const { orderBy, sort } = sortState;
    dispatch({ type: ACTIONTYPES.FETCHING_SHOPPING_LIST } as const);

    fetchItems({
        objectType: objectTypes.shoppingList,
        orderBy: orderBy,
        sort: sort,
        searchField: searchField
    })
        .then((response) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_SHOPPING_LIST_SUCCESS,
                response: response.data
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
