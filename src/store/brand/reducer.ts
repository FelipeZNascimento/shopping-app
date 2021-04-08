import * as ACTIONTYPES from '../actionTypes';

import { TState } from './types';
import { TBrand } from 'constants/objectInterfaces';

interface IAction {
    errorMessage: string,
    itemId: number
    names: string[],
    newBrand: TBrand,
    toBeDeleted: TBrand,
    type: string,
    brands: {
        totalCount: number;
        count: number;
        data: TBrand[];
    }
}

const initialState: TState = {
    error: false,
    loading: false,
    loadingNames: false,
    brands: {
        count: 0,
        totalCount: 0,
        data: []
    },
    brandNames: []
};

export default function brandReducer(
    state = initialState,
    action: IAction
) {
    switch (action.type) {
        case ACTIONTYPES.FETCHING_BRANDS:
            return {
                ...state,
                loading: true,
                error: false
            };
        case ACTIONTYPES.FETCHING_BRAND_NAMES:
            return {
                ...state,
                loadingNames: true,
                error: false
            };
        case ACTIONTYPES.FETCHING_BRANDS_SUCCESS:
        case ACTIONTYPES.SAVING_BRANDS_SUCCESS:
        case ACTIONTYPES.DELETING_BRANDS_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                brands: action.brands
            };
        case ACTIONTYPES.FETCHING_BRAND_NAMES_SUCCESS:
            return {
                ...state,
                error: false,
                loadingNames: false,
                brandNames: action.names
            };
        case ACTIONTYPES.FETCHING_BRAND_NAMES_ERROR:
            return {
                ...state,
                loadingNames: false,
                error: true,
                errorMessage: action.errorMessage,
            };
        case ACTIONTYPES.FETCHING_BRANDS_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.errorMessage,
            };

        case ACTIONTYPES.SAVING_BRANDS:
            return {
                ...state,
                loading: true
            };
        case ACTIONTYPES.SAVING_BRANDS_ERROR:
        case ACTIONTYPES.DELETING_BRANDS:
            return {
                ...state,
                loading: true,
            };
        case ACTIONTYPES.DELETING_BRANDS_ERROR:
        default:
            return state;
    }
}
