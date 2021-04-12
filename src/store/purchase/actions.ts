import { Dispatch } from 'react';
import * as ACTIONTYPES from 'store/actionTypes';

import { setPurchase } from 'services/dataSetters';
import fetchItems from 'services/dataGetters';

import {
    TFetchPurchase,
    TFetchPurchases,
    TSavePurchaseList
} from './types';

import {
    TPlace,
    TProduct,
    TPurchaseItem
} from 'constants/objectInterfaces';
import { productUnits } from 'constants/products';
import { objectTypes } from 'constants/general';
import { dynamicSort } from 'utils/utils'

export function convertToPurchase(productsList: TProduct[], purchaseList: TPurchaseItem[]) {
    const nextId = purchaseList.length === 0 ? 0 : Math.max(...purchaseList.map(function (item) { return item.id; })) + 1;

    const newlyAddedItems: TPurchaseItem[] = productsList
        .sort(dynamicSort('description'))
        .map((product, index) => ({
        id: nextId + index,
        details: '',
        quantity: '1',
        unit: productUnits[0].id,
        price: '0',
        discount: false,
        brand: {
            id: null,
            description: ''
        },
        product: product
    }));

    return {
        type: ACTIONTYPES.CONVERT_TO_PURCHASE,
        newlyAddedItems
    }
}

export const fetchPurchases = () => async (dispatch: Dispatch<TFetchPurchases>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_PURCHASES } as const);

    fetchItems({
        objectType: objectTypes.purchases
    })
        .then((response) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PURCHASES_SUCCESS,
                response: response.data
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_PURCHASES_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const fetchPurchase = (
    purchaseId: number,
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    }
) => async (dispatch: Dispatch<TFetchPurchase>) => {
    const { orderBy, sort } = sortState;

    dispatch({ type: ACTIONTYPES.FETCHING_PURCHASE } as const);

    fetchItems({
        objectType: objectTypes.fullPurchase,
        id: purchaseId,
        orderBy: orderBy,
        sort: sort
    })
        .then((response) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PURCHASE_SUCCESS,
                response: response.data
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_PURCHASE_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export function removeFromList(item: TPurchaseItem) {
    const itemId = item.id;

    return {
        type: ACTIONTYPES.REMOVE_ITEM_FROM_PURCHASE,
        itemId
    }
}

export function updateList(purchaseList: TPurchaseItem[]) {
    return {
        type: ACTIONTYPES.UPDATE_PURCHASE_LIST,
        purchaseList
    }
}

export function updateItem(purchaseItem: TPurchaseItem, index: number) {
    return {
        type: ACTIONTYPES.UPDATE_PURCHASE_ITEM,
        purchaseItem,
        index
    }
}

export const savePurchaseList = (
    newPurchase: TPurchaseItem[],
    date: string,
    place: TPlace,
    total: number
) => async (dispatch: Dispatch<TSavePurchaseList>) => {
    dispatch({ type: ACTIONTYPES.SAVING_PURCHASE_LIST } as const);

    setPurchase({
        purchaseItems: newPurchase,
        date: date,
        place: place,
        total: total
    })
        .then(() => {
            dispatch({
                type: ACTIONTYPES.SAVING_PURCHASE_LIST_SUCCESS
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
            });
        })
        .catch((error) => {
            dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION, errorMessage: error.message });
            return dispatch({
                type: ACTIONTYPES.SAVING_PURCHASE_LIST_ERROR,
                errorMessage: error.message
            });
        })
};
