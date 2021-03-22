import { Dispatch } from 'react';
import * as ACTIONTYPES from 'store/actionTypes';

import { objectTypes } from 'constants/general';
import { fetchItems } from 'services/dataGetters';

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

export function addToList(product: IProduct) {
    return {
        type: ACTIONTYPES.ADD_TO_SHOPPING_LIST,
        product
    }
}

export function removeFromList(product: IProduct) {
    const productId = product.id;

    return {
        type: ACTIONTYPES.REMOVE_FROM_SHOPPING_LIST,
        productId
    }
}

export function clearShoppingList() {
    return {
        type: ACTIONTYPES.CLEAR_SHOPPING_LIST
    }
}

export const getShoppingList = (
    orderBy = 'description',
    sort = 'ASC'
) => async (dispatch: Dispatch<GetShoppingListAction>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_SHOPPING_LIST } as const);

    const response = await fetchItems(objectTypes.shoppingList, orderBy, sort);
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