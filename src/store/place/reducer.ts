import * as ACTIONTYPES from '../actionTypes';

import { TState } from './types';
import { TCategory, TPlace } from 'constants/objectInterfaces';

interface IAction {
    errorMessage: string,
    names: string[],
    categories: {
        count: number,
        totalCount: number,
        data: TCategory[]
    },
    places: {
        count: number,
        totalCount: number,
        data: TPlace[]
    }
    toBeDeleted: TPlace | TCategory,
    type: string
}

const initialState: TState = {
    error: false,
    loading: false,
    loadingCategories: false,
    loadingCategoryNames: false,
    loadingNames: false,
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
            return {
                ...state,
                loading: true,
                error: false
            };
        case ACTIONTYPES.FETCHING_PLACE_NAMES:
            return {
                ...state,
                loadingNames: true,
                error: false
            };
        case ACTIONTYPES.FETCHING_PLACES_CATEGORIES:
            return {
                ...state,
                loadingCategories: true,
                error: false
            };
        case ACTIONTYPES.FETCHING_PLACE_CATEGORY_NAMES:
            return {
                ...state,
                loadingCategoryNames: true,
                error: false
            };
        case ACTIONTYPES.DELETING_PLACES_SUCCESS:
        case ACTIONTYPES.SAVING_PLACES_SUCCESS:
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
                loadingNames: false,
                placeNames: action.names
            };
        case ACTIONTYPES.FETCHING_PLACE_CATEGORY_NAMES_SUCCESS:
            return {
                ...state,
                error: false,
                loadingCategoryNames: false,
                placeCategoryNames: action.names
            };
        case ACTIONTYPES.SAVING_PLACES_CATEGORIES_SUCCESS:
        case ACTIONTYPES.DELETING_PLACES_CATEGORIES_SUCCESS:
        case ACTIONTYPES.FETCHING_PLACES_CATEGORIES_SUCCESS:
            return {
                ...state,
                error: false,
                loadingCategories: false,
                placeCategories: action.categories
            };
        case ACTIONTYPES.FETCHING_PLACES_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.errorMessage,
            };
        case ACTIONTYPES.FETCHING_PLACES_CATEGORIES_ERROR:
            return {
                ...state,
                loadingCategories: false,
                error: true,
                errorMessage: action.errorMessage,
            };

        case ACTIONTYPES.SAVING_PLACES:
            return {
                ...state,
                loading: true
            };
        case ACTIONTYPES.SAVING_PLACES_CATEGORIES:
            return {
                ...state,
                loadingCategories: true
            };

        case ACTIONTYPES.SAVING_PLACES_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.errorMessage,
                loading: false
            };
        case ACTIONTYPES.SAVING_PLACES_CATEGORIES_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.errorMessage,
                loadingCategories: false
            };
        case ACTIONTYPES.DELETING_PLACES:
            return {
                ...state,
                loading: true,
            };
        case ACTIONTYPES.DELETING_PLACES_CATEGORIES:
            return {
                ...state,
                loadingCategories: true,
            };
        case ACTIONTYPES.DELETING_PLACES_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.errorMessage,
                loading: false,
            };
        case ACTIONTYPES.DELETING_PLACES_CATEGORIES_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.errorMessage,
                loadingCategories: false,
            };

        default:
            return state;
    }
}
