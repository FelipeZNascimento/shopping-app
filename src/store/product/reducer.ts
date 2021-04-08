import * as ACTIONTYPES from '../actionTypes';

import {
    TCategoriesObject,
    TState
} from './types';
import {
    TCategory,
    TProduct,
    TProductHistoryItem
} from 'constants/objectInterfaces';

interface IAction {
    categories: TCategory[],
    errorMessage: string,
    itemId: number
    names: string[],
    productHistory: {
        product: TProduct,
        history: TProductHistoryItem[]
    },
    response: {
        count: number,
        totalCount: number,
        data: TProduct[] | TCategory[]
    }
    productCategories: TCategoriesObject,
    toBeDeleted: TProduct | TCategory,
    type: string
}

const initialState: TState = {
    error: false,
    errorMessage: '',
    loading: false,
    loadingCategories: false,
    loadingCategoryNames: false,
    loadingNames: false,
    productInfo: null,
    productHistory: [],
    products: {
        count: 0,
        totalCount: 0,
        data: []
    },
    productCategories: {
        count: 0,
        totalCount: 0,
        data: []
    },
    productNames: [],
    productCategoryNames: []
};

export default function productReducer(
    state = initialState,
    action: IAction
) {
    switch (action.type) {
        case ACTIONTYPES.FETCHING_PRODUCT:
        case ACTIONTYPES.FETCHING_PRODUCTS:
            return {
                ...state,
                loading: true,
                error: false
            };
        case ACTIONTYPES.FETCHING_PRODUCT_NAMES:
            return {
                ...state,
                loadingNames: true,
                error: false
            };
        case ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES:
            return {
                ...state,
                loadingCategories: true,
                error: false
            };
        case ACTIONTYPES.FETCHING_PRODUCT_CATEGORY_NAMES:
            return {
                ...state,
                loadingCategoryNames: true,
                error: false
            };
        case ACTIONTYPES.FETCHING_PRODUCT_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                productHistory: action.productHistory.history,
                productInfo: action.productHistory.product
            };
        case ACTIONTYPES.SAVING_PRODUCTS_SUCCESS:
        case ACTIONTYPES.DELETING_PRODUCTS_SUCCESS:
        case ACTIONTYPES.FETCHING_PRODUCTS_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                products: action.response
            };
        case ACTIONTYPES.FETCHING_PRODUCT_NAMES_SUCCESS:
            return {
                ...state,
                error: false,
                loadingNames: false,
                productNames: action.names
            };
        case ACTIONTYPES.FETCHING_PRODUCT_CATEGORY_NAMES_SUCCESS:
            return {
                ...state,
                error: false,
                loadingCategoryNames: false,
                productCategoryNames: action.names
            };
        case ACTIONTYPES.DELETING_PRODUCTS_CATEGORIES_SUCCESS:
        case ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_SUCCESS:
        case ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES_SUCCESS:
            return {
                ...state,
                error: false,
                loadingCategories: false,
                productCategories: action.response,
            };
        case ACTIONTYPES.FETCHING_PRODUCT_ERROR:
        case ACTIONTYPES.FETCHING_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.errorMessage,
            };
        case ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES_ERROR:
            return {
                ...state,
                loadingCategories: false,
                error: true,
                errorMessage: action.errorMessage,
            };
        case ACTIONTYPES.SAVING_PRODUCTS:
            return {
                ...state,
                loading: true
            };
        case ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES:
            return {
                ...state,
                loadingCategories: true
            };
        case ACTIONTYPES.SAVING_PRODUCTS_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.errorMessage,
                loading: false
            };
        case ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.errorMessage,
                loadingCategories: false
            };
        case ACTIONTYPES.DELETING_PRODUCTS:
            return {
                ...state,
                loading: true,
            };
        case ACTIONTYPES.DELETING_PRODUCTS_CATEGORIES:
            return {
                ...state,
                loadingCategories: true,
            };

        case ACTIONTYPES.DELETING_PRODUCTS_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.errorMessage,
                loading: false,
            };
        case ACTIONTYPES.DELETING_PRODUCTS_CATEGORIES_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.errorMessage,
                loadingCategories: false,
            };
        default:
            return state;
    }
}
