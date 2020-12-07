import * as ACTIONTYPES from '../actionTypes';
import { IBrand, IPlace, IProduct, ICategory } from '../../constants/objectInterfaces';
import { objectTypes } from '../../constants/general';

export function removeFromList(
    item: IBrand | IPlace | IProduct | ICategory,
    type: number
) {
    const itemId = item.id;
    switch (type) {
        case (objectTypes.brands):
            return {
                type: ACTIONTYPES.REMOVING_BRAND_FROM_LIST,
                itemId
            }
        case (objectTypes.places):
            return {
                type: ACTIONTYPES.REMOVING_PLACE_FROM_LIST,
                itemId
            }
        case (objectTypes.placesCategories):
            return {
                type: ACTIONTYPES.REMOVING_PLACE_CATEGORY_FROM_LIST,
                itemId
            }
        case (objectTypes.products):
            return {
                type: ACTIONTYPES.REMOVING_PRODUCT_FROM_LIST,
                itemId
            }
        case (objectTypes.productsCategories):
            return {
                type: ACTIONTYPES.REMOVING_PRODUCT_CATEGORY_FROM_LIST,
                itemId
            }
        default:
            return null;
    }
}
