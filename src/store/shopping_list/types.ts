import * as ACTIONTYPES from 'store/actionTypes';
import { IProduct } from 'constants/objectInterfaces';

type TAction = {
    readonly response?: IProduct[];
    readonly errorMessage?: string;
};

export type TSaveShoppingList = TAction & {
    readonly type: typeof ACTIONTYPES.ADDING_TO_SHOPPING_LIST
    | typeof ACTIONTYPES.ADDING_TO_SHOPPING_LIST_SUCCESS
    | typeof ACTIONTYPES.ADDING_TO_SHOPPING_LIST_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly newProduct?: IProduct;
}

export type TDeleteShoppingList = TAction & {
    readonly type: typeof ACTIONTYPES.DELETING_FROM_SHOPPING_LIST
    | typeof ACTIONTYPES.DELETING_FROM_SHOPPING_LIST_SUCCESS
    | typeof ACTIONTYPES.DELETING_FROM_SHOPPING_LIST_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly toBeDeleted?: IProduct;

}