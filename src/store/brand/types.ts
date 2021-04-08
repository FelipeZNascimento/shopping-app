import * as ACTIONTYPES from 'store/actionTypes';
import { TBrand, TCategory, TItemName } from 'constants/objectInterfaces';

type TAction = {
    readonly response?: TBrand[] | TCategory[];
    readonly errorMessage?: string;
};

export type TState = {
    error: boolean,
    loading: boolean,
    loadingNames: boolean,
    brands: {
        totalCount: number;
        count: number;
        data: TBrand[];
    }
    brandNames: TItemName[]
}

export type TFetchBrandNames = TAction & {
    readonly names?: string[];
    readonly type: typeof ACTIONTYPES.FETCHING_BRAND_NAMES
    | typeof ACTIONTYPES.FETCHING_BRAND_NAMES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_BRAND_NAMES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TFetchBrands = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_BRANDS
    | typeof ACTIONTYPES.FETCHING_BRANDS_SUCCESS
    | typeof ACTIONTYPES.FETCHING_BRANDS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly brands?: TBrand[];
};

export type TSaveBrand = TAction & {
    readonly type: typeof ACTIONTYPES.SAVING_BRANDS
    | typeof ACTIONTYPES.SAVING_BRANDS_SUCCESS
    | typeof ACTIONTYPES.SAVING_BRANDS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly brands?: TBrand[];
};

export type TDeleteBrand = TAction & {
    readonly type: typeof ACTIONTYPES.DELETING_BRANDS
    | typeof ACTIONTYPES.DELETING_BRANDS_SUCCESS
    | typeof ACTIONTYPES.DELETING_BRANDS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly brands?: TBrand[];
};
