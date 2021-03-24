// import * as objectInterfaces from '../../constants/objectInterfaces';
import { TCategoriesObject, TPlacesObject } from './types';
import { ICategory, IItemName } from 'constants/objectInterfaces';

interface IState {
    isLoading: boolean,
    categories: ICategory[],
    placeNames: IItemName[],
    placeCategoryNames: IItemName[],
    places: TPlacesObject,
    placeCategories: TCategoriesObject
    type: string
}

export function isLoading(state: { placeReducer: IState }) {
    return state.placeReducer.isLoading;
}

export function getPlaces(state: { placeReducer: IState }) {
    return state.placeReducer.places.data;
}

export function getPlacesCount(state: { placeReducer: IState }) {
    return state.placeReducer.places.totalCount;
}

export function getPlaceCategories(state: { placeReducer: IState }) {
    return state.placeReducer.placeCategories.data;
}
export function getPlaceCategoriesCount(state: { placeReducer: IState }) {
    return state.placeReducer.placeCategories.totalCount;
}

export function getPlaceNames(state: { placeReducer: IState }) {
    return state.placeReducer.placeNames;
}

export function getPlaceCategoryNames(state: { placeReducer: IState }) {
    return state.placeReducer.placeCategoryNames;
}
