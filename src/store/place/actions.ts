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
import { TCategory, TPlace } from 'constants/objectInterfaces';

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
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
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
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const fetchPlaces = (
    currentPage: number | null = 0,
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
        sort: sort,
        searchField: searchField
    })
        .then((response) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PLACES_SUCCESS,
                places: response
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_PLACES_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const fetchPlaceCategories = (
    currentPage: number | null = 0,
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
        .then((response) => {
            return dispatch({
                type: ACTIONTYPES.FETCHING_PLACES_CATEGORIES_SUCCESS,
                categories: response
            });
        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.FETCHING_PLACES_CATEGORIES_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const savePlaceCategory = (
    newCategory: TCategory,
    currentPage: number | null = 0,
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    },
    searchField = ''
) => async (dispatch: Dispatch<TSaveCategory>) => {
    const { orderBy, sort } = sortState;
    dispatch({ type: ACTIONTYPES.SAVING_PLACES_CATEGORIES } as const);

    setItem({
        itemArray: [newCategory],
        objectType: objectTypes.placesCategories,
        currentPage,
        orderBy,
        sort,
        searchField
    })
        .then((response) => {
            dispatch({
                type: ACTIONTYPES.SAVING_PLACES_CATEGORIES_SUCCESS,
                categories: response
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION
            });

        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.SAVING_PLACES_CATEGORIES_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const savePlace = (
    newPlace: TPlace,
    currentPage: number | null = 0,
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    },
    searchField = ''
) => async (dispatch: Dispatch<TSavePlace>) => {
    const { orderBy, sort } = sortState;
    dispatch({ type: ACTIONTYPES.SAVING_PLACES } as const);

    setItem({
        itemArray: [newPlace],
        objectType: objectTypes.places,
        currentPage,
        orderBy,
        sort,
        searchField
    })
        .then((response) => {
            dispatch({
                type: ACTIONTYPES.SAVING_PLACES_SUCCESS,
                places: response
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });

        })
        .catch((error) => {
            console.log(error);
            dispatch({
                type: ACTIONTYPES.SAVING_PLACES_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const deletePlace = (
    place: TPlace,
    currentPage: number | null = 0,
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    },
    searchField = ''
) => async (dispatch: Dispatch<TDeletePlace>) => {
    if (place.id === null) {
        return;
    }

    const { orderBy, sort } = sortState;
    dispatch({ type: ACTIONTYPES.DELETING_PLACES } as const);

    deleteItems({
        objectId: place.id,
        objectType: objectTypes.places,
        currentPage,
        orderBy,
        sort,
        searchField
    })
        .then((response) => {
            dispatch({
                type: ACTIONTYPES.DELETING_PLACES_SUCCESS,
                places: response
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });

        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_PLACES_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};

export const deletePlaceCategory = (
    category: TCategory,
    currentPage: number | null = 0,
    sortState = {
        orderBy: 'description',
        sort: 'ASC'
    },
    searchField = ''
) => async (dispatch: Dispatch<TDeletePlaceCategory>) => {
    if (category.id === null) {
        return;
    }

    const { orderBy, sort } = sortState;
    dispatch({ type: ACTIONTYPES.DELETING_PLACES_CATEGORIES } as const);

    deleteItems({
        objectId: category.id,
        objectType: objectTypes.placesCategories,
        currentPage,
        orderBy,
        sort,
        searchField
    })
        .then((response) => {
            console.log(response);
            dispatch({
                type: ACTIONTYPES.DELETING_PLACES_CATEGORIES_SUCCESS,
                categories: response
            });
            return dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });

        })
        .catch((error) => {
            dispatch({
                type: ACTIONTYPES.DELETING_PLACES_CATEGORIES_ERROR,
                errorMessage: error.message
            });
            return dispatch({
                type: ACTIONTYPES.TOGGLE_NOTIFICATION,
                errorMessage: error.message
            });
        })
};
