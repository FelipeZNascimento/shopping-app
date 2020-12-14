import * as ACTIONTYPES from '../actionTypes';

import {
    IProduct
} from '../../constants/objectInterfaces';

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