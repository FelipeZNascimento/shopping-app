import * as ACTIONTYPES from 'store/actionTypes';
import { TCategory, TItemName, TPlace } from 'constants/objectInterfaces';

type TAction = {
    readonly response?: TPlace[] | TCategory[];
    readonly errorMessage?: string;
};

export type TState = {
    error: boolean,
    loading: boolean,
    loadingCategories: boolean,
    loadingCategoryNames: boolean,
    loadingNames: boolean,
    placeNames: TItemName[],
    placeCategoryNames: TItemName[],
    places: {
        count: number,
        totalCount: number,
        data: TPlace[]
    },
    placeCategories: {
        count: number,
        totalCount: number,
        data: TCategory[]
    }
};

export type TFetchPlaceNames = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_PLACE_NAMES
    | typeof ACTIONTYPES.FETCHING_PLACE_NAMES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PLACE_NAMES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly names?: TItemName[];
};

export type TFetchPlaceCategoryNames = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_PLACE_CATEGORY_NAMES
    | typeof ACTIONTYPES.FETCHING_PLACE_CATEGORY_NAMES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PLACE_CATEGORY_NAMES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly names?: TItemName[];
};

export type TFetchPlaces = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_PLACES
    | typeof ACTIONTYPES.FETCHING_PLACES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PLACES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly places?: TPlace[];
};

export type TFetchCategories = TAction & {
    readonly type: typeof ACTIONTYPES.FETCHING_PLACES_CATEGORIES
    | typeof ACTIONTYPES.FETCHING_PLACES_CATEGORIES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PLACES_CATEGORIES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly categories?: TCategory[];
};

export type TSaveCategory = TAction & {
    readonly type: typeof ACTIONTYPES.SAVING_PLACES_CATEGORIES
    | typeof ACTIONTYPES.SAVING_PLACES_CATEGORIES_SUCCESS
    | typeof ACTIONTYPES.SAVING_PLACES_CATEGORIES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly categories?: TCategory[];
};

export type TSavePlace = TAction & {
    readonly type: typeof ACTIONTYPES.SAVING_PLACES
    | typeof ACTIONTYPES.SAVING_PLACES_SUCCESS
    | typeof ACTIONTYPES.SAVING_PLACES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly places?: TPlace[];
};

export type TDeletePlace = TAction & {
    readonly type: typeof ACTIONTYPES.DELETING_PLACES
    | typeof ACTIONTYPES.DELETING_PLACES_SUCCESS
    | typeof ACTIONTYPES.DELETING_PLACES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly places?: TPlace[];
};

export type TDeletePlaceCategory = TAction & {
    readonly type: typeof ACTIONTYPES.DELETING_PLACES_CATEGORIES
    | typeof ACTIONTYPES.DELETING_PLACES_CATEGORIES_SUCCESS
    | typeof ACTIONTYPES.DELETING_PLACES_CATEGORIES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly categories?: TCategory[];
};
