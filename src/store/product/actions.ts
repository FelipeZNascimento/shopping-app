import { Dispatch } from 'react';

import * as ACTIONTYPES from 'store/actionTypes';
import deleteItems from 'services/dataDeleters';
import fetchItems from 'services/dataGetters';
import { setItem } from 'services/dataSetters';

import {
    TDeleteProduct,
    TDeleteProductCategory,
    TFetchCategories,
    TFetchProducts,
    TFetchProductNames,
    TFetchProductCategoryNames,
    TSaveCategory,
    TSaveProduct
} from './types';
import { ICategory, IProduct } from 'constants/objectInterfaces';
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
                errorMessage: error
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error
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
                errorMessage: error
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error
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
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCTS_SUCCESS,
                products: list
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCTS_ERROR,
                errorMessage: error
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error
            });
        })
};

export const fetchProductCategories = (
    currentPage = 0,
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
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES_SUCCESS,
                categories: list
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES_ERROR,
                errorMessage: error
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error
            });
        })
};

export const saveProductCategory = (
    newCategory: ICategory
) => async (dispatch: Dispatch<TSaveCategory>) => {
    dispatch({ type: ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES } as const);

    setItem({
        itemArray: [newCategory],
        objectType: objectTypes.productCategories
    })
        .then((responseBody) => {
            newCategory.id = responseBody.insertId;
            dispatch({
                type: ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_SUCCESS,
                newCategory: newCategory
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_ERROR,
                errorMessage: error
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error
            });
        })
};

export const saveProduct = (
    newProduct: IProduct
) => async (dispatch: Dispatch<TSaveProduct>) => {
    dispatch({ type: ACTIONTYPES.SAVING_PRODUCTS } as const);

    setItem({
        itemArray: [newProduct],
        objectType: objectTypes.products
    })
        .then((responseBody) => {
            newProduct.id = responseBody.insertId;

            dispatch({
                type: ACTIONTYPES.SAVING_PRODUCTS_SUCCESS,
                newProduct
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.SAVING_PRODUCTS_ERROR,
                errorMessage: error
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error
            });
        })
};

export const deleteProduct = (
    product: IProduct
) => async (dispatch: Dispatch<TDeleteProduct>) => {
    if (product.id === null) {
        return;
    }

    dispatch({ type: ACTIONTYPES.DELETING_PRODUCTS } as const);
    deleteItems({
        objectId: product.id,
        objectType: objectTypes.products
    })
        .then(() => {
            dispatch({
                type: ACTIONTYPES.DELETING_PRODUCTS_SUCCESS,
                toBeDeleted: product
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION
            });

        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_PRODUCTS_ERROR,
                errorMessage: error
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error
            });
        })
};

export const deleteProductCategory = (
    category: ICategory
) => async (dispatch: Dispatch<TDeleteProductCategory>) => {
    if (category.id === null) {
        return;
    }

    dispatch({ type: ACTIONTYPES.DELETING_PRODUCT_CATEGORY } as const);
    deleteItems({
        objectId: category.id,
        objectType: objectTypes.productCategories
    })
        .then(() => {
            dispatch({
                type: ACTIONTYPES.DELETING_PRODUCT_CATEGORY_SUCCESS,
                toBeDeleted: category
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_PRODUCT_CATEGORY_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};
