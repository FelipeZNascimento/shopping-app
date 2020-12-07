import * as ACTIONTYPES from '../actionTypes';

import {
    IProduct
} from '../../constants/objectInterfaces';

export function addToList(product: IProduct) {
    return {
        type: ACTIONTYPES.ADD_TO_LIST,
        product
    }
}

export function removeFromList(product: IProduct) {
    const productId = product.id;

    return {
        type: ACTIONTYPES.REMOVING_FROM_LIST,
        productId
    }
}

export function clearShoppingList() {
    return {
        type: ACTIONTYPES.CLEAR_SHOPPING_LIST
    }
}