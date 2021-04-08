import * as ACTIONTYPES from 'store/actionTypes';
import {
    TCategory,
    TItemName,
    TProduct,
    TProductHistoryItem
} from 'constants/objectInterfaces';

type TAction = {
    readonly response?: TProduct[] | TCategory[];
    readonly errorMessage?: string;
};

export type TState = {
    error: boolean,
    errorMessage: string,
    loading: boolean,
    loadingCategories: boolean,
    loadingCategoryNames: boolean,
    loadingNames: boolean,
    productNames: TItemName[],
    productCategoryNames: TItemName[],
    productHistory: TProductHistoryItem[],
    productInfo: null | TProduct,
    products: {
        count: number,
        totalCount: number,
        data: TProduct[]
    },
    productCategories: {
        count: number,
        totalCount: number,
        data: TCategory[]
    }
}

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
    readonly products?: TProduct[];
    readonly type: typeof ACTIONTYPES.FETCHING_PRODUCTS
    | typeof ACTIONTYPES.FETCHING_PRODUCTS_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PRODUCTS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TFetchProduct = TAction & {
    readonly productHistory?: TProductHistoryItem[];
    readonly productInfo?: TProductHistoryItem;
    readonly type: typeof ACTIONTYPES.FETCHING_PRODUCT
    | typeof ACTIONTYPES.FETCHING_PRODUCT_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PRODUCT_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TFetchCategories = TAction & {
    readonly categories?: TCategory[];
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
    readonly newCategory?: TCategory;
};

export type TSaveProduct = TAction & {
    readonly type: typeof ACTIONTYPES.SAVING_PRODUCTS
    | typeof ACTIONTYPES.SAVING_PRODUCTS_SUCCESS
    | typeof ACTIONTYPES.SAVING_PRODUCTS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly newProduct?: TProduct;
};

export type TDeleteProduct = TAction & {
    readonly type: typeof ACTIONTYPES.DELETING_PRODUCTS
    | typeof ACTIONTYPES.DELETING_PRODUCTS_SUCCESS
    | typeof ACTIONTYPES.DELETING_PRODUCTS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TDeleteProductCategory = TAction & {
    readonly type: typeof ACTIONTYPES.DELETING_PRODUCTS_CATEGORIES
    | typeof ACTIONTYPES.DELETING_PRODUCTS_CATEGORIES_SUCCESS
    | typeof ACTIONTYPES.DELETING_PRODUCTS_CATEGORIES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

type TApiResponse = {
    readonly count: number,
    readonly totalCount: number,
}

export type TCategoriesObject = TApiResponse & {
    readonly data: TCategory[]
}

export type TProductsObject = TApiResponse & {
    readonly data: TProduct[]
}
