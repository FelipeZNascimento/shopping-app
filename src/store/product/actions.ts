import { Dispatch } from 'react';

import * as ACTIONTYPES from 'store/actionTypes';
import deleteItems from 'services/dataDeleters';
import fetchItems from 'services/dataGetters';
import { setItem } from 'services/dataSetters';

import {
    TDeleteProduct,
    TDeleteProductCategory,
    TFetchCategories,
    TFetchProduct,
    TFetchProducts,
    TFetchProductNames,
    TFetchProductCategoryNames,
    TSaveCategory,
    TSaveProduct
} from './types';
import { TCategory, TProduct } from 'constants/objectInterfaces';
import { objectTypes } from 'constants/general';

export const fetchProductNames = () => async (dispatch: Dispatch<TFetchProductNames>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_PRODUCT_NAMES } as const);

    fetchItems({
        objectType: objectTypes.productNames,
    })
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCT_NAMES_SUCCESS,
                names: list
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCT_NAMES_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const fetchProductCategoryNames = () => async (dispatch: Dispatch<TFetchProductCategoryNames>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_PRODUCT_CATEGORY_NAMES } as const);

    fetchItems({
        objectType: objectTypes.productCategoryNames,
    })
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCT_CATEGORY_NAMES_SUCCESS,
                names: list
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCT_CATEGORY_NAMES_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const fetchProductHistory = (
    productId: number,
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    }
) => async (dispatch: Dispatch<TFetchProduct>) => {
    const { orderBy, sort } = sortState;
    dispatch({ type: ACTIONTYPES.FETCHING_PRODUCT } as const);

    fetchItems({
        objectType: objectTypes.product,
        id: productId,
        orderBy: orderBy,
        sort: sort
    })
        .then((data) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCT_SUCCESS,
                productHistory: data
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCT_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const fetchProducts = (
    currentPage = 0,
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    },
    searchField = ''
) => async (dispatch: Dispatch<TFetchProducts>) => {
    const { orderBy, sort } = sortState;
    dispatch({ type: ACTIONTYPES.FETCHING_PRODUCTS } as const);

    fetchItems({
        objectType: objectTypes.products,
        currentPage: currentPage,
        orderBy: orderBy,
        sort: sort,
        searchField: searchField
    })
        .then((data) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCTS_SUCCESS,
                response: data
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCTS_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const fetchProductCategories = (
    currentPage: number | null = 0,
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    },
    searchField = ''
) => async (dispatch: Dispatch<TFetchCategories>) => {
    const { orderBy, sort } = sortState;
    dispatch({ type: ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES } as const);

    fetchItems({
        objectType: objectTypes.productCategories,
        currentPage: currentPage,
        orderBy: orderBy,
        sort: sort,
        searchField: searchField
    })
        .then((data) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES_SUCCESS,
                response: data
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const saveProduct = (
    newProduct: TProduct,
    currentPage: number | null = 0,
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    },
    searchField = ''
) => async (dispatch: Dispatch<TSaveProduct>) => {
    const { orderBy, sort } = sortState;
    dispatch({ type: ACTIONTYPES.SAVING_PRODUCTS } as const);

    setItem({
        itemArray: [newProduct],
        objectType: objectTypes.products,
        currentPage,
        orderBy,
        sort,
        searchField
    })
        .then((data) => {
            dispatch({
                type: ACTIONTYPES.SAVING_PRODUCTS_SUCCESS,
                response: data
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.SAVING_PRODUCTS_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const deleteProduct = (
    product: TProduct,
    currentPage: number | null = 0,
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    },
    searchField = ''
) => async (dispatch: Dispatch<TDeleteProduct>) => {
    if (product.id === null) {
        return;
    }

    const { orderBy, sort } = sortState;
    dispatch({ type: ACTIONTYPES.DELETING_PRODUCTS } as const);

    deleteItems({
        objectId: product.id,
        objectType: objectTypes.products,
        currentPage,
        orderBy,
        sort,
        searchField
    })
        .then((data) => {
            dispatch({
                type: ACTIONTYPES.DELETING_PRODUCTS_SUCCESS,
                response: data
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION
            });

        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_PRODUCTS_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const saveProductCategory = (
    newCategory: TCategory,
    currentPage: number | null = 0,
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    },
    searchField = ''
) => async (dispatch: Dispatch<TSaveCategory>) => {
    const { orderBy, sort } = sortState;
    dispatch({ type: ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES } as const);

    setItem({
        itemArray: [newCategory],
        objectType: objectTypes.productCategories,
        currentPage,
        orderBy,
        sort,
        searchField
    })
        .then((data) => {
            dispatch({
                type: ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_SUCCESS,
                response: data
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const deleteProductCategory = (
    category: TCategory,
    currentPage: number | null = 0,
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    },
    searchField = ''
) => async (dispatch: Dispatch<TDeleteProductCategory>) => {
    if (category.id === null) {
        return;
    }

    const { orderBy, sort } = sortState;
    dispatch({ type: ACTIONTYPES.DELETING_PRODUCTS_CATEGORIES } as const);

    deleteItems({
        objectId: category.id,
        objectType: objectTypes.productCategories,
        currentPage,
        orderBy,
        sort,
        searchField
    })
        .then((data) => {
            dispatch({
                type: ACTIONTYPES.DELETING_PRODUCTS_CATEGORIES_SUCCESS,
                response: data
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_PRODUCTS_CATEGORIES_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};
