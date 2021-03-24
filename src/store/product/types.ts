import * as ACTIONTYPES from 'store/actionTypes';
import { ICategory, IProduct } from 'constants/objectInterfaces';

type TAction = {
    readonly response?: IProduct[] | ICategory[];
    readonly errorMessage?: string;
};

export type TFetchProductNames = TAction & {
    readonly names?: string[];
    readonly type: typeof ACTIONTYPES.FETCHING_PRODUCT_NAMES
    | typeof ACTIONTYPES.FETCHING_PRODUCT_NAMES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PRODUCT_NAMES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TFetchProductCategoryNames = TAction & {
    readonly names?: string[];
    readonly type: typeof ACTIONTYPES.FETCHING_PRODUCT_CATEGORY_NAMES
    | typeof ACTIONTYPES.FETCHING_PRODUCT_CATEGORY_NAMES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PRODUCT_CATEGORY_NAMES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TFetchProducts = TAction & {
    readonly products?: IProduct[];
    readonly type: typeof ACTIONTYPES.FETCHING_PRODUCTS
    | typeof ACTIONTYPES.FETCHING_PRODUCTS_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PRODUCTS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TFetchCategories = TAction & {
    readonly categories?: ICategory[];
    readonly type: typeof ACTIONTYPES.FETCHING_PLACES_CATEGORIES
    | typeof ACTIONTYPES.FETCHING_PLACES_CATEGORIES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PLACES_CATEGORIES_ERROR
    | typeof ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES
    | typeof ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TSaveCategory = TAction & {
    readonly type: typeof ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES
    | typeof ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_SUCCESS
    | typeof ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly newCategory?: ICategory;
};

export type TSaveProduct = TAction & {
    readonly type: typeof ACTIONTYPES.SAVING_PRODUCTS
    | typeof ACTIONTYPES.SAVING_PRODUCTS_SUCCESS
    | typeof ACTIONTYPES.SAVING_PRODUCTS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly newProduct?: IProduct;
};

export type TDeleteProduct = TAction & {
    readonly type: typeof ACTIONTYPES.DELETING_PRODUCTS
    | typeof ACTIONTYPES.DELETING_PRODUCTS_SUCCESS
    | typeof ACTIONTYPES.DELETING_PRODUCTS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly toBeDeleted?: IProduct;
};

export type TDeleteProductCategory = TAction & {
    readonly type: typeof ACTIONTYPES.DELETING_PRODUCT_CATEGORY
    | typeof ACTIONTYPES.DELETING_PRODUCT_CATEGORY_SUCCESS
    | typeof ACTIONTYPES.DELETING_PRODUCT_CATEGORY_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly toBeDeleted?: ICategory;
};

type TApiResponse = {
    readonly count: number,
    readonly totalCount: number,
}

export type TCategoriesObject = TApiResponse & {
    readonly data: ICategory[]
}

export type TProductsObject = TApiResponse & {
    readonly data: IProduct[]
}
