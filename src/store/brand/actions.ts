import { Dispatch } from 'react';

import * as ACTIONTYPES from 'store/actionTypes';
import deleteItems from 'services/dataDeleters';
import fetchItems from 'services/dataGetters';
import { setItem } from 'services/dataSetters';

import {
    TDeleteBrand,
    TFetchBrands,
    TFetchBrandNames,
    TSaveBrand
} from './types';
import { IBrand } from 'constants/objectInterfaces';
import { objectTypes } from 'constants/general';

export const fetchBrandNames = () => async (dispatch: Dispatch<TFetchBrandNames>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_BRAND_NAMES } as const);

    fetchItems({ objectType: objectTypes.brandNames })
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_BRAND_NAMES_SUCCESS,
                names: list
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_BRAND_NAMES_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const fetchBrands = (
    currentPage = 0,
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    },
    searchField = ''
) => async (dispatch: Dispatch<TFetchBrands>) => {
    const { orderBy, sort } = sortState;
    dispatch({ type: ACTIONTYPES.FETCHING_BRANDS } as const);

    fetchItems({
        objectType: objectTypes.brands,
        currentPage: currentPage,
        orderBy: orderBy,
        sort: sort,
        searchField: searchField
    })
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_BRANDS_SUCCESS,
                brands: list
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_BRANDS_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const saveBrand = (
    newBrand: IBrand
) => async (dispatch: Dispatch<TSaveBrand>) => {
    dispatch({ type: ACTIONTYPES.SAVING_BRANDS } as const);

    setItem({
        itemArray: [newBrand],
        objectType: objectTypes.brands
    })
        .then((responseBody) => {
            newBrand.id = responseBody.insertId;

            dispatch({
                type: ACTIONTYPES.SAVING_BRANDS_SUCCESS,
                newBrand: newBrand
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.SAVING_BRANDS_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const deleteBrand = (
    brand: IBrand
) => async (dispatch: Dispatch<TDeleteBrand>) => {
    if (brand.id === null) {
        return;
    }

    dispatch({ type: ACTIONTYPES.DELETING_BRANDS } as const);
    deleteItems({
        objectId: brand.id,
        objectType: objectTypes.brands
    })
        .then(() => {
            dispatch({
                type: ACTIONTYPES.DELETING_BRANDS_SUCCESS,
                toBeDeleted: brand
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_BRANDS_ERROR,
                errorMessage: error.message.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};
