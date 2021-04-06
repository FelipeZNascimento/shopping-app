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
    IProduct,
    IPurchaseItem
} from 'constants/objectInterfaces';
import { productUnits } from 'constants/products';
import { objectTypes } from 'constants/general';

export function convertToPurchase(productsList: IProduct[], purchaseList: IPurchaseItem[]) {
    const nextId = purchaseList.length === 0 ? 0 : Math.max(...purchaseList.map(function(item) { return item.id; })) + 1;

    const newlyAddedItems: IPurchaseItem[] = productsList.map((product, index) => ({
        id: nextId + index,
        brand_description: '',
        brand_id: null,
        category_description: product.category_description,
        category_id: product.category_id,
        created: product.created,
        description: product.description,
        product_id: product.product_id,
        quantity: 1,
        unit: productUnits[0].id,
        price: 0,
        total_price: 0,
        discount: false
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
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PURCHASES_SUCCESS,
                purchaseHistory: list
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
        .then((data) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PURCHASE_SUCCESS,
                fullPurchase: data
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

export function removeFromList(item: IPurchaseItem) {
    const itemId = item.id;

    return {
        type: ACTIONTYPES.REMOVE_ITEM_FROM_PURCHASE,
        itemId
    }
}

export function updateList(purchaseList: IPurchaseItem[]) {
    return {
        type: ACTIONTYPES.UPDATE_PURCHASE_ITEM,
        purchaseList
    }
}

export const savePurchaseList = (
    newPurchase: IPurchaseItem[],
    date: string,
    placeId: number | null,
    total: number
) => async (dispatch: Dispatch<TSavePurchaseList>) => {
    dispatch({ type: ACTIONTYPES.SAVING_PURCHASE_LIST } as const);

    setPurchase({
        purchase: newPurchase,
        date: date,
        placeId: placeId,
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
