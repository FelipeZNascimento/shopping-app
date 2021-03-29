import * as ACTIONTYPES from '../actionTypes';
// import * as objectInterfaces from 'constants/objectInterfaces';

import { TProductsObject, TCategoriesObject } from './types';
import { ICategory, IProduct } from 'constants/objectInterfaces';
// import { dynamicSort } from 'utils/utils'

interface IAction {
    categories: ICategory[],
    errorMessage: string,
    itemId: number
    names: string[],
    newCategory: ICategory,
    newProduct: IProduct,
    products: TProductsObject,
    productCategories: TCategoriesObject,
    toBeDeleted: IProduct | ICategory,
    type: string
}

const initialState = {
    error: false,
    errorMessage: '',
    loading: false,
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
        case ACTIONTYPES.FETCHING_PRODUCTS:
        case ACTIONTYPES.FETCHING_PRODUCT_NAMES:
        case ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES:
            return {
                ...state,
                loading: true,
                error: false
            };
        case ACTIONTYPES.FETCHING_PRODUCTS_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                products: action.products
            };
        case ACTIONTYPES.FETCHING_PRODUCT_NAMES_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                productNames: action.names
            };
        case ACTIONTYPES.FETCHING_PRODUCT_CATEGORY_NAMES_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                productCategoryNames: action.names
            };
        case ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                productCategories: action.categories,
            };
        case ACTIONTYPES.FETCHING_PRODUCTS_ERROR:
        case ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.errorMessage,
            };

        case ACTIONTYPES.SAVING_PRODUCTS:
        case ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES:
            return {
                ...state,
                loading: true
            };
        case ACTIONTYPES.SAVING_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                products: {
                    ...state.products,
                    data: [action.newProduct, ...state.products.data]
                }

            };
        case ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                productCategories: {
                    ...state.productCategories,
                    data: [action.newCategory, ...state.productCategories.data]
                }
            };
        case ACTIONTYPES.SAVING_PRODUCTS_ERROR:
        case ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.errorMessage,
                loading: false
            };
        case ACTIONTYPES.DELETING_PRODUCTS:
        case ACTIONTYPES.DELETING_PRODUCT_CATEGORY:
            return {
                ...state,
                loading: true,
            };

        case ACTIONTYPES.DELETING_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                products: {
                    data: state.products.data.filter((product: IProduct) => product.id !== action.toBeDeleted.id),
                    count: state.products.count - 1,
                    totalCount: state.products.totalCount - 1
                }
            };
        case ACTIONTYPES.DELETING_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                productCategories: {
                    data: state.productCategories.data.filter((category: ICategory) => category.id !== action.toBeDeleted.id),
                    count: state.productCategories.count - 1,
                    totalCount: state.productCategories.totalCount - 1
                }
            };
        case ACTIONTYPES.DELETING_PRODUCTS_ERROR:
        case ACTIONTYPES.DELETING_PRODUCT_CATEGORY_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.errorMessage,
                loading: false,
            };


        default:
            return state;
    }
}
