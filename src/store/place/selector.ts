import { TState } from './types';

export function selectIsLoading(state: { placeReducer: TState }) {
    return state.placeReducer.loading;
}

export function selectIsLoadingCategories(state: { placeReducer: TState }) {
    return state.placeReducer.loadingCategories;
}

export function selectPlaces(state: { placeReducer: TState }) {
    return state.placeReducer.places.data;
}

export function selectPlacesCount(state: { placeReducer: TState }) {
    return state.placeReducer.places.totalCount;
}

export function selectPlaceCategories(state: { placeReducer: TState }) {
    return state.placeReducer.placeCategories.data;
}

export function selectPlaceCategoriesCount(state: { placeReducer: TState }) {
    return state.placeReducer.placeCategories.totalCount;
}

export function selectPlaceNames(state: { placeReducer: TState }) {
    return state.placeReducer.placeNames;
}

export function selectPlaceCategoryNames(state: { placeReducer: TState }) {
    return state.placeReducer.placeCategoryNames;
}
