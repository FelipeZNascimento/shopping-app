import { TState } from './types';

export function getIsLoading(state: { placeReducer: TState }) {
    return state.placeReducer.loading;
}

export function getIsLoadingCategories(state: { placeReducer: TState }) {
    return state.placeReducer.loadingCategories;
}

export function getPlaces(state: { placeReducer: TState }) {
    return state.placeReducer.places.data;
}

export function getPlacesCount(state: { placeReducer: TState }) {
    return state.placeReducer.places.totalCount;
}

export function getPlaceCategories(state: { placeReducer: TState }) {
    return state.placeReducer.placeCategories.data;
}
export function getPlaceCategoriesCount(state: { placeReducer: TState }) {
    return state.placeReducer.placeCategories.totalCount;
}

export function getPlaceNames(state: { placeReducer: TState }) {
    return state.placeReducer.placeNames;
}

export function getPlaceCategoryNames(state: { placeReducer: TState }) {
    return state.placeReducer.placeCategoryNames;
}
