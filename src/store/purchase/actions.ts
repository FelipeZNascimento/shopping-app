import * as ACTIONTYPES from '../actionTypes';

import {
    IProduct,
    IPurchaseItem
} from '../../constants/objectInterfaces';

export function convertToPurchase(productsList: IProduct[], purchaseListLength: number) {
    const purchaseList: IPurchaseItem[] = productsList.map((product, index) => ({
        id: index + purchaseListLength,
        brand_description: '',
        brand_id: null,
        category_description: product.category_description,
        category_id: product.category_id,
        created: product.created,
        description: product.description,
        product_id: product.id,
        quantity: 0,
        unity: 0,
        price: 0,
        total_price: 0    
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