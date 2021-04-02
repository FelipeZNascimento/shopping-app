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

import { objectTypes } from 'constants/general';
import { ICategory, IPlace } from 'constants/objectInterfaces';

export const fetchPlaceNames = () => async (dispatch: Dispatch<TFetchPlaceNames>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_PLACE_NAMES } as const);

    fetchItems({
        objectType: objectTypes.placeNames,
    })
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
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error
            });
        })
};

export const fetchPlaceCategoryNames = () => async (dispatch: Dispatch<TFetchPlaceCategoryNames>) => {
    dispatch({ type: ACTIONTYPES.FETCHING_PLACE_CATEGORY_NAMES } as const);

    fetchItems({
        objectType: objectTypes.placeCategoryNames,
    })
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
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error
            });
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
    dispatch({ type: ACTIONTYPES.FETCHING_PLACES } as const);

    fetchItems({
        objectType: objectTypes.places,
        currentPage: currentPage,
        orderBy: orderBy,
        sort: sort
    })
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
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error
            });
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
    dispatch({ type: ACTIONTYPES.FETCHING_PLACES_CATEGORIES } as const);

    fetchItems({
        objectType: objectTypes.placesCategories,
        currentPage: currentPage,
        orderBy: orderBy,
        sort: sort,
        searchField: searchField
    })
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
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error
            });
        })
};

export const savePlaceCategory = (
    newCategory: ICategory
) => async (dispatch: Dispatch<TSaveCategory>) => {
    dispatch({ type: ACTIONTYPES.SAVING_PLACES_CATEGORIES } as const);

    setItem({
        itemArray: [newCategory],
        objectType: objectTypes.placesCategories
    })
        .then((responseBody) => {
            newCategory.id = responseBody.insertId;
            dispatch({
                type: ACTIONTYPES.SAVING_PLACES_CATEGORIES_SUCCESS,
                newCategory: newCategory
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION
            });

        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.SAVING_PLACES_CATEGORIES_ERROR,
                errorMessage: error
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error
            });
        })
};

export const savePlace = (
    newPlace: IPlace
) => async (dispatch: Dispatch<TSavePlace>) => {
    dispatch({ type: ACTIONTYPES.SAVING_PLACES } as const);

    setItem({
        itemArray: [newPlace],
        objectType: objectTypes.places
    })
        .then((responseBody) => {
            newPlace.id = responseBody.insertId;

            dispatch({
                type: ACTIONTYPES.SAVING_PLACES_SUCCESS,
                newPlace: newPlace
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });

        })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: ACTIONTYPES.SAVING_PLACES_ERROR,
                errorMessage: error
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error
            });
        })
};

export const deletePlace = (
    place: IPlace
) => async (dispatch: Dispatch<TDeletePlace>) => {
    if (place.id === null) {
        return;
    }

    dispatch({ type: ACTIONTYPES.DELETING_PLACES } as const);
    deleteItems({
        objectId: place.id,
        objectType: objectTypes.places
    })
        .then(() => {
            dispatch({
                type: ACTIONTYPES.DELETING_PLACES_SUCCESS,
                toBeDeleted: place
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });

        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_PLACES_ERROR,
                errorMessage: error
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error
            });
        })
};

export const deletePlaceCategory = (
    category: ICategory
) => async (dispatch: Dispatch<TDeletePlaceCategory>) => {
    if (category.id === null) {
        return;
    }

    dispatch({ type: ACTIONTYPES.DELETING_PLACE_CATEGORY } as const);
    deleteItems({
        objectId: category.id,
        objectType: objectTypes.placesCategories
    })
        .then(() => {
            dispatch({
                type: ACTIONTYPES.DELETING_PLACE_CATEGORY_SUCCESS,
                toBeDeleted: category
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });

        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_PLACE_CATEGORY_ERROR,
                errorMessage: error
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};
