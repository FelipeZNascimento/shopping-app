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
    const response = await fetchItems(objectTypes.productNames);
    dispatch({ type: ACTIONTYPES.FETCHING_PRODUCT_NAMES } as const);

    response()
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
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const fetchProductCategoryNames = () => async (dispatch: Dispatch<TFetchProductCategoryNames>) => {
    const response = await fetchItems(objectTypes.productCategoryNames);
    dispatch({ type: ACTIONTYPES.FETCHING_PRODUCT_CATEGORY_NAMES } as const);

    response()
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
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
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
    const response = await fetchItems(objectTypes.products, currentPage, orderBy, sort, searchField);
    dispatch({ type: ACTIONTYPES.FETCHING_PRODUCTS } as const);

    response()
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
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
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
    const response = await fetchItems(objectTypes.productCategories, currentPage, orderBy, sort, searchField);
    dispatch({ type: ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES } as const);

    response()
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
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const saveProductCategory = (
    newCategory: ICategory
) => async (dispatch: Dispatch<TSaveCategory>) => {
    const response = await setItem([newCategory], objectTypes.productCategories);
    dispatch({ type: ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES } as const);

    response()
        .then((responseBody) => {
            newCategory.id = responseBody.insertId;
            return dispatch({
                type: ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_SUCCESS,
                newCategory: newCategory
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const saveProduct = (
    newProduct: IProduct
) => async (dispatch: Dispatch<TSaveProduct>) => {
    const response = await setItem([newProduct], objectTypes.products);
    dispatch({ type: ACTIONTYPES.SAVING_PRODUCTS } as const);

    response()
        .then((responseBody) => {
            newProduct.id = responseBody.insertId;

            return dispatch({
                type: ACTIONTYPES.SAVING_PRODUCTS_SUCCESS,
                newProduct: newProduct
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.SAVING_PRODUCTS_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const deleteProduct = (
    product: IProduct
) => async (dispatch: Dispatch<TDeleteProduct>) => {
    const response = await deleteItems(product.id, objectTypes.products);
    dispatch({ type: ACTIONTYPES.DELETING_PRODUCTS } as const);
    response()
        .then(() => {
            return dispatch({
                type: ACTIONTYPES.DELETING_PRODUCTS_SUCCESS,
                toBeDeleted: product
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_PRODUCTS_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const deleteProductCategory = (
    category: ICategory
) => async (dispatch: Dispatch<TDeleteProductCategory>) => {
    const response = await deleteItems(category.id, objectTypes.productCategories);
    dispatch({ type: ACTIONTYPES.DELETING_PRODUCT_CATEGORY } as const);
    response()
        .then(() => {
            return dispatch({
                type: ACTIONTYPES.DELETING_PRODUCT_CATEGORY_SUCCESS,
                toBeDeleted: category
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_PRODUCT_CATEGORY_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};
