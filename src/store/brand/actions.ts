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
    const response = await fetchItems(objectTypes.brandNames);
    dispatch({ type: ACTIONTYPES.FETCHING_BRAND_NAMES } as const);

    response()
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_BRAND_NAMES_SUCCESS,
                names: list
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_BRAND_NAMES_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
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
    const response = await fetchItems(objectTypes.brands, currentPage, orderBy, sort, searchField);
    dispatch({ type: ACTIONTYPES.FETCHING_BRANDS } as const);

    response()
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_BRANDS_SUCCESS,
                brands: list
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_BRANDS_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const saveBrand = (
    newBrand: IBrand
) => async (dispatch: Dispatch<TSaveBrand>) => {
    const response = await setItem([newBrand], objectTypes.brands);
    dispatch({ type: ACTIONTYPES.SAVING_BRANDS } as const);

    response()
        .then((responseBody) => {
            newBrand.id = responseBody.insertId;

            return dispatch({
                type: ACTIONTYPES.SAVING_BRANDS_SUCCESS,
                newBrand: newBrand
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.SAVING_BRANDS_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const deleteBrand = (
    brand: IBrand
) => async (dispatch: Dispatch<TDeleteBrand>) => {
    const response = await deleteItems(brand.id, objectTypes.brands);
    dispatch({ type: ACTIONTYPES.DELETING_BRANDS } as const);
    response()
        .then(() => {
            return dispatch({
                type: ACTIONTYPES.DELETING_BRANDS_SUCCESS,
                toBeDeleted: brand
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_BRANDS_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};
