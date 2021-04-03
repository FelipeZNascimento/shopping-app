import * as ACTIONTYPES from 'store/actionTypes';
import {
    IProduct,
    IPurchase,
    IPurchaseItem
} from 'constants/objectInterfaces';

type TAction = {
    readonly response?: IProduct[];
    readonly errorMessage?: string;
};

export type TState = {
    error: boolean,
    errorMessage: string,
    loading: boolean,
    purchaseHistory: IPurchase[],
    purchaseList: IPurchaseItem[],
    fullPurchase: IPurchaseItem[]
}

export type TSavePurchaseList = TAction & {
    readonly type: typeof ACTIONTYPES.SAVING_PURCHASE_LIST
    | typeof ACTIONTYPES.SAVING_PURCHASE_LIST_SUCCESS
    | typeof ACTIONTYPES.SAVING_PURCHASE_LIST_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly status?: boolean;
};

export type TFetchPurchases = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_PURCHASES
    | typeof ACTIONTYPES.FETCHING_PURCHASES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PURCHASES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly purchaseHistory?: IPurchase[];
    readonly errorMessage?: string;
}

export type TFetchPurchase = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_PURCHASE
    | typeof ACTIONTYPES.FETCHING_PURCHASE_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PURCHASE_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly fullPurchase?: IPurchaseItem[];
    readonly errorMessage?: string;

}