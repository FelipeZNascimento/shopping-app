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
        type: ACTIONTYPES.REMOVE_FROM_LIST,
        productId
    }
}