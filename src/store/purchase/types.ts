import * as ACTIONTYPES from 'store/actionTypes';
import { IProduct, IPurchaseItem } from 'constants/objectInterfaces';

type TAction = {
    readonly response?: IProduct[];
    readonly errorMessage?: string;
};

export type TState = {
    error: boolean,
    errorMessage: string,
    loading: boolean,
    purchaseList: IPurchaseItem[]
}

export type TSavePurchaseList = TAction & {
    readonly type: typeof ACTIONTYPES.SAVING_PURCHASE_LIST
    | typeof ACTIONTYPES.SAVING_PURCHASE_LIST_SUCCESS
    | typeof ACTIONTYPES.SAVING_PURCHASE_LIST_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly status?: boolean;
};
