import { Dispatch } from 'react';
import * as ACTIONTYPES from 'store/actionTypes';
import { objectTypes } from 'constants/general';

import { fetchItems } from 'services/dataGetters';
// import { setPurchase } from 'services/dataSetters';

import {
    IProduct,
    IPurchaseItem
} from '../../constants/objectInterfaces';
import { productUnits } from 'constants/products';

type GetListAction = {
    readonly type: typeof ACTIONTYPES.FETCHING_PLACES
    | typeof ACTIONTYPES.FETCHING_PLACES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PLACES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly response?: IProduct[];
    readonly errorMessage?: string;
};

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

// export const getList = () => async (
//     dispatch: Dispatch<GetListAction>
// ) => {
//     dispatch({ type: ACTIONTYPES.FETCHING_PLACES } as const);

//     try {
//         const response = await fetchItems(objectTypes.places);
//         response().then((list) => {
//             return dispatch({
//                 type: ACTIONTYPES.FETCHING_PLACES_SUCCESS,
//                 response: list
//             });
//         })
//     } catch (error) {
//         let errorMessage;

//         dispatch({
//             type: ACTIONTYPES.FETCHING_PLACES_ERROR,
//             errorMessage
//         });
//         return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
//     }
// };

export function saveList() {
    return {
        type: ACTIONTYPES.SAVING_PURCHASE_LIST
    }
}