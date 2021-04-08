import * as ACTIONTYPES from 'store/actionTypes';
import { TProduct, TShoppingListItem } from 'constants/objectInterfaces';

type TAction = {
    readonly response?: TProduct[];
    readonly errorMessage?: string;
};

export type TState = {
    error: boolean,
    errorMessage: string,
    loading: boolean,
    shoppingList: TShoppingListItem[];
}

export type TSaveShoppingList = TAction & {
    readonly type: typeof ACTIONTYPES.ADDING_TO_SHOPPING_LIST
    | typeof ACTIONTYPES.ADDING_TO_SHOPPING_LIST_SUCCESS
    | typeof ACTIONTYPES.ADDING_TO_SHOPPING_LIST_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly newProduct?: TProduct;
}

export type TDeleteShoppingList = TAction & {
    readonly type: typeof ACTIONTYPES.DELETING_FROM_SHOPPING_LIST
    | typeof ACTIONTYPES.DELETING_FROM_SHOPPING_LIST_SUCCESS
    | typeof ACTIONTYPES.DELETING_FROM_SHOPPING_LIST_ERROR
    | typeof ACTIONTYPES.DELETING_SHOPPING_LIST
    | typeof ACTIONTYPES.DELETING_SHOPPING_LIST_SUCCESS
    | typeof ACTIONTYPES.DELETING_SHOPPING_LIST_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly toBeDeleted?: TProduct;

}

export type TFetchShoppingListAction = {
    readonly type: typeof ACTIONTYPES.FETCHING_SHOPPING_LIST
    | typeof ACTIONTYPES.FETCHING_SHOPPING_LIST_SUCCESS
    | typeof ACTIONTYPES.FETCHING_SHOPPING_LIST_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly response?: {
        totalCount: number,
        count: number,
        data: TProduct[];
    };
    readonly errorMessage?: string;
};