import * as ACTIONTYPES from 'store/actionTypes';
import { ICategory, IItemName, IPlace } from 'constants/objectInterfaces';

type TAction = {
    readonly response?: IPlace[] | ICategory[];
    readonly errorMessage?: string;
};

export type TState = {
    error: boolean,
    loading: boolean,
    loadingCategories: boolean,
    loadingCategoryNames: boolean,
    loadingNames: boolean,
    placeNames: IItemName[],
    placeCategoryNames: IItemName[],
    places: TPlacesObject,
    placeCategories: TCategoriesObject
}

export type TFetchPlaceNames = TAction & {
    readonly names?: IItemName[];
    readonly type: typeof ACTIONTYPES.FETCHING_PLACE_NAMES
    | typeof ACTIONTYPES.FETCHING_PLACE_NAMES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PLACE_NAMES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TFetchPlaceCategoryNames = TAction & {
    readonly names?: IItemName[];
    readonly type: typeof ACTIONTYPES.FETCHING_PLACE_CATEGORY_NAMES
    | typeof ACTIONTYPES.FETCHING_PLACE_CATEGORY_NAMES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PLACE_CATEGORY_NAMES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TFetchPlaces = TAction & {
    readonly places?: IPlace[];
    readonly type: typeof ACTIONTYPES.FETCHING_PLACES
    | typeof ACTIONTYPES.FETCHING_PLACES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PLACES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TFetchCategories = TAction & {
    readonly categories?: ICategory[];
    readonly type: typeof ACTIONTYPES.FETCHING_PLACES_CATEGORIES
    | typeof ACTIONTYPES.FETCHING_PLACES_CATEGORIES_SUCCESS
    | typeof ACTIONTYPES.FETCHING_PLACES_CATEGORIES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
};

export type TSaveCategory = TAction & {
    readonly type: typeof ACTIONTYPES.SAVING_PLACES_CATEGORIES
    | typeof ACTIONTYPES.SAVING_PLACES_CATEGORIES_SUCCESS
    | typeof ACTIONTYPES.SAVING_PLACES_CATEGORIES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly newCategory?: ICategory;
};

export type TSavePlace = TAction & {
    readonly type: typeof ACTIONTYPES.SAVING_PLACES
    | typeof ACTIONTYPES.SAVING_PLACES_SUCCESS
    | typeof ACTIONTYPES.SAVING_PLACES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly newPlace?: IPlace;
};

export type TDeletePlace = TAction & {
    readonly type: typeof ACTIONTYPES.DELETING_PLACES
    | typeof ACTIONTYPES.DELETING_PLACES_SUCCESS
    | typeof ACTIONTYPES.DELETING_PLACES_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly toBeDeleted?: IPlace;
};

export type TDeletePlaceCategory = TAction & {
    readonly type: typeof ACTIONTYPES.DELETING_PLACE_CATEGORY
    | typeof ACTIONTYPES.DELETING_PLACE_CATEGORY_SUCCESS
    | typeof ACTIONTYPES.DELETING_PLACE_CATEGORY_ERROR
    | typeof ACTIONTYPES.TOGGLE_NOTIFICATION;
    readonly toBeDeleted?: ICategory;
};

type TApiResponse = {
    readonly count: number,
    readonly totalCount: number,
}

export type TCategoriesObject = TApiResponse & {
    readonly data: ICategory[]
}

export type TPlacesObject = TApiResponse & {
    readonly data: IPlace[]
}
