import { TState } from './types';

export function selectIsLoading(state: { productReducer: TState }) {
    return state.productReducer.loading;
}

export function selectIsLoadingCategories(state: { productReducer: TState }) {
    return state.productReducer.loadingCategories;
}

export function selectProductHistory(state: { productReducer: TState }) {
    return state.productReducer.productHistory;
}

export function selectProductInfo(state: { productReducer: TState }) {
    return state.productReducer.productInfo;
}

export function selectProducts(state: { productReducer: TState }) {
    return state.productReducer.products.data;
}

export function selectProductsCount(state: { productReducer: TState }) {
    return state.productReducer.products.totalCount;
}

export function selectProductCategories(state: { productReducer: TState }) {
    return state.productReducer.productCategories.data;
}
export function selectProductCategoriesCount(state: { productReducer: TState }) {
    return state.productReducer.productCategories.totalCount;
}

export function selectProductNames(state: { productReducer: TState }) {
    return state.productReducer.productNames;
}

export function selectProductCategoryNames(state: { productReducer: TState }) {
    return state.productReducer.productCategoryNames;
}
