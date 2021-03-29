import { Dispatch } from 'react';
import * as ACTIONTYPES from '../actionTypes';

import { IBrand, IPlace, IProduct, ICategory } from 'constants/objectInterfaces';
import { objectTypes } from 'constants/general';

import fetchItems from 'services/dataGetters';
import { setItem } from 'services/dataSetters';

export type TGetAction = {
    readonly response?: IProduct[];
    readonly errorMessage?: string;
};

type TToggleNotification = {
    readonly type: typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly status: boolean;
};

type GetPlacesAction = TGetAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_PLACES
    | typeof ACTIONTYPES.FETCHING_PLACES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PLACES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly status?: boolean;
};

type GetBrandsAction = TGetAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_BRANDS
    | typeof ACTIONTYPES.FETCHING_BRANDS_SUCCESS
    | typeof ACTIONTYPES.FETCHING_BRANDS_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

type GetCategoriesAction = TGetAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_PLACES_CATEGORIES
    | typeof ACTIONTYPES.FETCHING_PLACES_CATEGORIES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PLACES_CATEGORIES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

type SetCategoriesAction = TGetAction & {
    readonly type: typeof ACTIONTYPES.SAVING_PLACES_CATEGORIES
    | typeof ACTIONTYPES.SAVING_PLACES_CATEGORIES_SUCCESS
    | typeof ACTIONTYPES.SAVING_PLACES_CATEGORIES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly newCategory?: ICategory;
};

export function removeFromList(
    item: IBrand | IPlace | ICategory,
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
        default:
            return null;
    }
}

export const getPlaces = (
    currentPage = 0,
    orderBy = 'description',
    sort = 'ASC'
) => async (dispatch: Dispatch<GetPlacesAction>) => {
    const response = await fetchItems(objectTypes.places, currentPage, orderBy, sort);
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
    currentPage = 0,
    orderBy = 'description',
    sort = 'ASC'
) => async (dispatch: Dispatch<GetCategoriesAction>) => {
    const response = await fetchItems(objectTypes.placesCategories, currentPage, orderBy, sort);
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

export const getBrands = (
    currentPage = 0,
    orderBy = 'description',
    sort = 'ASC'
) => async (dispatch: Dispatch<GetBrandsAction>) => {
    const response = await fetchItems(objectTypes.brands, currentPage, orderBy, sort);
    dispatch({ type: ACTIONTYPES.FETCHING_BRANDS } as const);

    response()
        .then((list) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_BRANDS_SUCCESS,
                response: list
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_BRANDS_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const toggleNotification = (
    status = false
) => async (dispatch: Dispatch<TToggleNotification>) => {
    dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION, status } as const);
};