import { Dispatch } from 'react';
import * as ACTIONTYPES from 'store/actionTypes';

import { setPurchase } from 'services/dataSetters';
import { TSavePurchaseList } from './types';
import {
    IProduct,
    IPurchaseItem
} from 'constants/objectInterfaces';
import { productUnits } from 'constants/products';

export function convertToPurchase(productsList: IProduct[], purchaseListLength: number) {
    const purchaseList: IPurchaseItem[] = productsList.map((product, index) => ({
        id: index + purchaseListLength,
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
        promotion: false
    }));

    return {
        type: ACTIONTYPES.CONVERT_TO_PURCHASE,
        purchaseList
    }
}

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

export function clearList() {
    return {
        type: ACTIONTYPES.CLEAR_PURCHASE
    }
}

export function saveList() {
    return {
        type: ACTIONTYPES.SAVING_PURCHASE_LIST
    }
}

export const savePurchaseList = (
    newPurchase: IPurchaseItem[],
    date: string,
    placeId: number | null
) => async (dispatch: Dispatch<TSavePurchaseList>) => {
    const response = await setPurchase(newPurchase, date, placeId);
    dispatch({ type: ACTIONTYPES.SAVING_PURCHASE_LIST } as const);

    response()
        .then(() => {
            dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION, status: true });
            return dispatch({
                type: ACTIONTYPES.SAVING_PURCHASE_LIST_SUCCESS
            });
        })
        .catch((error) => {
            dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION, status: true });
            return dispatch({
                type: ACTIONTYPES.SAVING_PURCHASE_LIST_ERROR,
                errorMessage: error
            });
        })
};
