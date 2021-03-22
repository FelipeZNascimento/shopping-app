import { Dispatch } from 'react';
import * as ACTIONTYPES from '../actionTypes';

import { IBrand, IPlace, IProduct, ICategory } from 'constants/objectInterfaces';
import { objectTypes } from 'constants/general';

import { fetchItems } from 'services/dataGetters';
import { setItem } from 'services/dataSetters';

type GetPlacesAction = {
    readonly type: typeof ACTIONTYPES.FETCHING_PLACES
    | typeof ACTIONTYPES.FETCHING_PLACES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PLACES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly response?: IProduct[];
    readonly errorMessage?: string;
};

type GetProductsAction = {
    readonly type: typeof ACTIONTYPES.FETCHING_PRODUCTS
    | typeof ACTIONTYPES.FETCHING_PRODUCTS_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PRODUCTS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly response?: IProduct[];
    readonly errorMessage?: string;
};

type GetBrandsAction = {
    readonly type: typeof ACTIONTYPES.FETCHING_BRANDS
    | typeof ACTIONTYPES.FETCHING_BRANDS_SUCCESS
    | typeof ACTIONTYPES.FETCHING_BRANDS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly response?: IProduct[];
    readonly errorMessage?: string;
};

type GetCategoriesAction = {
    readonly type: typeof ACTIONTYPES.FETCHING_PLACES_CATEGORIES
    | typeof ACTIONTYPES.FETCHING_PLACES_CATEGORIES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PLACES_CATEGORIES_ERROR
    | typeof ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES
    | typeof ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly response?: IProduct[];
    readonly errorMessage?: string;
};

type SetCategoriesAction = {
    readonly type: typeof ACTIONTYPES.SAVING_PLACES_CATEGORIES
    | typeof ACTIONTYPES.SAVING_PLACES_CATEGORIES_SUCCESS
    | typeof ACTIONTYPES.SAVING_PLACES_CATEGORIES_ERROR
    | typeof ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES
    | typeof ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_SUCCESS
    | typeof ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly newCategory?: ICategory
    readonly errorMessage?: string;
};

export function removeFromList(
    item: IBrand | IPlace | IProduct | ICategory,
    type: number
) {
    const itemId = item.id;
    switch (type) {
        case (objectTypes.brands):
            return {
                type: ACTIONTYPES.REMOVING_BRAND_FROM_LIST,
                itemId
            }
        case (objectTypes.places):
            return {
                type: ACTIONTYPES.REMOVING_PLACE_FROM_LIST,
                itemId
            }
        case (objectTypes.placesCategories):
            return {
                type: ACTIONTYPES.REMOVING_PLACE_CATEGORY_FROM_LIST,
                itemId
            }
        case (objectTypes.products):
            return {
                type: ACTIONTYPES.REMOVING_PRODUCT_FROM_LIST,
                itemId
            }
        case (objectTypes.productsCategories):
            return {
                type: ACTIONTYPES.REMOVING_PRODUCT_CATEGORY_FROM_LIST,
                itemId
            }
        default:
            return null;
    }
}

export const getPlaces = (
    orderBy = 'description',
    sort = 'ASC'
) => async (dispatch: Dispatch<GetPlacesAction>) => {
    const response = await fetchItems(objectTypes.places, orderBy, sort);
    dispatch({ type: ACTIONTYPES.FETCHING_PLACES } as const);

    response()
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PLACES_SUCCESS,
                response: list
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_PLACES_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const getPlacesCategories = (
    orderBy = 'description',
    sort = 'ASC'
) => async (dispatch: Dispatch<GetCategoriesAction>) => {
    const response = await fetchItems(objectTypes.placesCategories, orderBy, sort);
    dispatch({ type: ACTIONTYPES.FETCHING_PLACES_CATEGORIES } as const);

    response()
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PLACES_CATEGORIES_SUCCESS,
                response: list
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_PLACES_CATEGORIES_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const setPlacesCategories = (
    newCategory: ICategory
) => async (dispatch: Dispatch<SetCategoriesAction>) => {
    const response = await setItem([newCategory], objectTypes.placesCategories);
    dispatch({ type: ACTIONTYPES.SAVING_PLACES_CATEGORIES } as const);

    response()
        .then(() => {
            return dispatch({
                type: ACTIONTYPES.SAVING_PLACES_CATEGORIES_SUCCESS,
                newCategory: newCategory
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.SAVING_PLACES_CATEGORIES_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const getProducts = (
    orderBy = 'description',
    sort = 'ASC'
) => async (dispatch: Dispatch<GetProductsAction>) => {
    const response = await fetchItems(objectTypes.products, orderBy, sort);
    dispatch({ type: ACTIONTYPES.FETCHING_PRODUCTS } as const);

    response()
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCTS_SUCCESS,
                response: list
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

export const getProductsCategories = (
    orderBy = 'description',
    sort = 'ASC'
) => async (dispatch: Dispatch<GetCategoriesAction>) => {
    const response = await fetchItems(objectTypes.productsCategories, orderBy, sort);
    dispatch({ type: ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES } as const);

    response()
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES_SUCCESS,
                response: list
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

export const setProductsCategories = (
    newCategory: ICategory
) => async (dispatch: Dispatch<SetCategoriesAction>) => {
    const response = await setItem([newCategory], objectTypes.productsCategories);
    dispatch({ type: ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES } as const);

    response()
        .then(() => {
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

export const getBrands = (
    orderBy = 'description',
    sort = 'ASC'
) => async (dispatch: Dispatch<GetBrandsAction>) => {
    const response = await fetchItems(objectTypes.brands, orderBy, sort);
    dispatch({ type: ACTIONTYPES.FETCHING_BRANDS } as const);

    response()
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_BRANDS_SUCCESS,
                response: list
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
