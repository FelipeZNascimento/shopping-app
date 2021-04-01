import { TState } from './types';

export function getIsLoading(state: { brandReducer: TState }) {
    return state.brandReducer.loading;
}

export function getIsLoadingNames(state: { brandReducer: TState }) {
    return state.brandReducer.loadingNames;
}

export function getBrands(state: { brandReducer: TState }) {
    return state.brandReducer.brands.data;
}

export function getBrandsCount(state: { brandReducer: TState }) {
    return state.brandReducer.brands.totalCount;
}

export function getBrandNames(state: { brandReducer: TState }) {
    return state.brandReducer.brandNames;
}
