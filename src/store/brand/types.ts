import * as ACTIONTYPES from 'store/actionTypes';
import { IBrand, ICategory, IItemName } from 'constants/objectInterfaces';

type TAction = {
    readonly response?: IBrand[] | ICategory[];
    readonly errorMessage?: string;
};

export type TState = {
    error: boolean,
    loading: boolean,
    loadingNames: boolean,
    brands: TBrandsObject,
    brandNames: IItemName[]
}

export type TFetchBrandNames = TAction & {
    readonly names?: string[];
    readonly type: typeof ACTIONTYPES.FETCHING_BRAND_NAMES
    | typeof ACTIONTYPES.FETCHING_BRAND_NAMES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_BRAND_NAMES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TFetchBrands = TAction & {
    readonly brands?: IBrand[];
    readonly type: typeof ACTIONTYPES.FETCHING_BRANDS
    | typeof ACTIONTYPES.FETCHING_BRANDS_SUCCESS
    | typeof ACTIONTYPES.FETCHING_BRANDS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TSaveBrand = TAction & {
    readonly type: typeof ACTIONTYPES.SAVING_BRANDS
    | typeof ACTIONTYPES.SAVING_BRANDS_SUCCESS
    | typeof ACTIONTYPES.SAVING_BRANDS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly newBrand?: IBrand;
};

export type TDeleteBrand = TAction & {
    readonly type: typeof ACTIONTYPES.DELETING_BRANDS
    | typeof ACTIONTYPES.DELETING_BRANDS_SUCCESS
    | typeof ACTIONTYPES.DELETING_BRANDS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly toBeDeleted?: IBrand;
};

type TApiResponse = {
    readonly count: number,
    readonly totalCount: number,
}

export type TBrandsObject = TApiResponse & {
    readonly data: IBrand[]
}
