import { Dispatch } from 'react';

import * as ACTIONTYPES from 'store/actionTypes';
import deleteItems from 'services/dataDeleters';
import fetchItems from 'services/dataGetters';
import { setItem } from 'services/dataSetters';

import {
    TDeletePlace,
    TDeletePlaceCategory,
    TFetchCategories,
    TFetchPlaces,
    TFetchPlaceNames,
    TFetchPlaceCategoryNames,
    TSaveCategory,
    TSavePlace
} from './types';
// import { ICategory, IProduct } from 'constants/objectInterfaces';
import { objectTypes } from 'constants/general';
import { ICategory, IPlace } from 'constants/objectInterfaces';

export const fetchPlaceNames = () => async (dispatch: Dispatch<TFetchPlaceNames>) => {
    const response = await fetchItems(objectTypes.placeNames);
    dispatch({ type: ACTIONTYPES.FETCHING_PLACE_NAMES } as const);

    response()
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PLACE_NAMES_SUCCESS,
                names: list
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_PLACE_NAMES_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const fetchPlaceCategoryNames = () => async (dispatch: Dispatch<TFetchPlaceCategoryNames>) => {
    const response = await fetchItems(objectTypes.placeCategoryNames);
    dispatch({ type: ACTIONTYPES.FETCHING_PLACE_CATEGORY_NAMES } as const);

    response()
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PLACE_CATEGORY_NAMES_SUCCESS,
                names: list
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_PLACE_CATEGORY_NAMES_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const fetchPlaces = (
    currentPage = 0,
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    },
    searchField = ''
) => async (dispatch: Dispatch<TFetchPlaces>) => {
    const { orderBy, sort } = sortState;
    const response = await fetchItems(objectTypes.places, currentPage, orderBy, sort, searchField);
    dispatch({ type: ACTIONTYPES.FETCHING_PLACES } as const);

    response()
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PLACES_SUCCESS,
                places: list
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

export const fetchPlaceCategories = (
    currentPage = 0,
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    },
    searchField = ''
) => async (dispatch: Dispatch<TFetchCategories>) => {
    const { orderBy, sort } = sortState;
    const response = await fetchItems(objectTypes.placesCategories, currentPage, orderBy, sort, searchField);
    dispatch({ type: ACTIONTYPES.FETCHING_PLACES_CATEGORIES } as const);

    response()
        .then((list) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PLACES_CATEGORIES_SUCCESS,
                categories: list
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

export const savePlaceCategory = (
    newCategory: ICategory
) => async (dispatch: Dispatch<TSaveCategory>) => {
    const response = await setItem([newCategory], objectTypes.placesCategories);
    dispatch({ type: ACTIONTYPES.SAVING_PLACES_CATEGORIES } as const);

    response()
        .then((responseBody) => {
            newCategory.id = responseBody.insertId;
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

export const savePlace = (
    newPlace: IPlace
) => async (dispatch: Dispatch<TSavePlace>) => {
    const response = await setItem([newPlace], objectTypes.places);
    dispatch({ type: ACTIONTYPES.SAVING_PLACES } as const);

    response()
        .then((responseBody) => {
            newPlace.id = responseBody.insertId;

            return dispatch({
                type: ACTIONTYPES.SAVING_PLACES_SUCCESS,
                newPlace: newPlace
            });
        })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: ACTIONTYPES.SAVING_PLACES_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const deletePlace = (
    place: IPlace
) => async (dispatch: Dispatch<TDeletePlace>) => {
    const response = await deleteItems(place.id, objectTypes.places);
    dispatch({ type: ACTIONTYPES.DELETING_PLACES } as const);
    response()
        .then(() => {
            return dispatch({
                type: ACTIONTYPES.DELETING_PLACES_SUCCESS,
                toBeDeleted: place
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_PLACES_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};

export const deletePlaceCategory = (
    category: ICategory
) => async (dispatch: Dispatch<TDeletePlaceCategory>) => {
    const response = await deleteItems(category.id, objectTypes.placesCategories);
    dispatch({ type: ACTIONTYPES.DELETING_PLACE_CATEGORY } as const);
    response()
        .then(() => {
            return dispatch({
                type: ACTIONTYPES.DELETING_PLACE_CATEGORY_SUCCESS,
                toBeDeleted: category
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_PLACE_CATEGORY_ERROR,
                errorMessage: error
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
        })
};
