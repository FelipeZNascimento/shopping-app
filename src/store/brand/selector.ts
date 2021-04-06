import { TState } from './types';

export function selectIsLoading(state: { brandReducer: TState }) {
    return state.brandReducer.loading;
}

export function selectBrands(state: { brandReducer: TState }) {
    return state.brandReducer.brands.data;
}

export function selectBrandsCount(state: { brandReducer: TState }) {
    return state.brandReducer.brands.totalCount;
}

export function selectBrandNames(state: { brandReducer: TState }) {
    return state.brandReducer.brandNames;
}
