import * as ACTIONTYPES from '../actionTypes';
// import * as objectInterfaces from 'constants/objectInterfaces';

import { TPlacesObject, TCategoriesObject } from './types';
import { ICategory, IPlace } from 'constants/objectInterfaces';
// import { dynamicSort } from 'utils/utils'

interface IAction {
    categories: ICategory[],
    errorMessage: string,
    itemId: number
    names: string[],
    newCategory: ICategory,
    newPlace: IPlace,
    places: TPlacesObject,
    placeCategories: TCategoriesObject,
    toBeDeleted: IPlace | ICategory,
    type: string
}

const initialState = {
    error: false,
    loading: false,
    places: {
        count: 0,
        totalCount: 0,
        data: []
    },
    placeCategories: {
        count: 0,
        totalCount: 0,
        data: []
    },
    placeNames: [],
    placeCategoryNames: []
};

export default function placeReducer(
    state = initialState,
    action: IAction
) {
    switch (action.type) {
        case ACTIONTYPES.FETCHING_PLACES:
        case ACTIONTYPES.FETCHING_PLACE_NAMES:
        case ACTIONTYPES.FETCHING_PLACES_CATEGORIES:
            return {
                ...state,
                loading: true,
                error: false
            };
        case ACTIONTYPES.FETCHING_PLACES_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                places: action.places
            };
        case ACTIONTYPES.FETCHING_PLACE_NAMES_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                placeNames: action.names
            };
        case ACTIONTYPES.FETCHING_PLACE_CATEGORY_NAMES_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                placeCategoryNames: action.names
            };
        case ACTIONTYPES.FETCHING_PLACES_CATEGORIES_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                placeCategories: action.categories
            };
        case ACTIONTYPES.FETCHING_PLACES_ERROR:
        case ACTIONTYPES.FETCHING_PLACES_CATEGORIES_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.errorMessage,
            };

        case ACTIONTYPES.SAVING_PLACES:
        case ACTIONTYPES.SAVING_PLACES_CATEGORIES:
            return {
                ...state,
                loading: true
            };
        case ACTIONTYPES.SAVING_PLACES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                places: {
                    ...state.places,
                    data: [action.newPlace, ...state.places.data]
                }

            };
        case ACTIONTYPES.SAVING_PLACES_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                placeCategories: {
                    ...state.placeCategories,
                    data: [action.newCategory, ...state.placeCategories.data]
                }
            };
        case ACTIONTYPES.SAVING_PLACES_ERROR:
        case ACTIONTYPES.SAVING_PLACES_CATEGORIES_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.errorMessage,
                loading: false
            };
        case ACTIONTYPES.DELETING_PLACES:
        case ACTIONTYPES.DELETING_PLACE_CATEGORY:
            return {
                ...state,
                loading: true,
            };

        case ACTIONTYPES.DELETING_PLACES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                places: {
                    data: state.places.data.filter((place: IPlace) => place.id !== action.toBeDeleted.id),
                    count: state.places.count - 1,
                    totalCount: state.places.totalCount - 1
                }
            };
        case ACTIONTYPES.DELETING_PLACE_CATEGORY_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                placeCategories: {
                    data: state.placeCategories.data.filter((category: ICategory) => category.id !== action.toBeDeleted.id),
                    count: state.placeCategories.count - 1,
                    totalCount: state.placeCategories.totalCount - 1
                }
            };
        case ACTIONTYPES.DELETING_PLACES_ERROR:
        case ACTIONTYPES.DELETING_PLACE_CATEGORY_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.errorMessage,
                loading: false,
            };


        default:
            return state;
    }
}
