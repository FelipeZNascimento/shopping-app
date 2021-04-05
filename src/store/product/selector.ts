import { TState } from './types';

export function selectIsLoading(state: { productReducer: TState }) {
    return state.productReducer.loading;
}

export function getIsLoadingCategories(state: { productReducer: TState }) {
    return state.productReducer.loadingCategories;
}

export function selectProductHistory(state: { productReducer: TState }) {
    return state.productReducer.productHistory;
}

export function selectProductInfo(state: { productReducer: TState }) {
    return state.productReducer.productInfo;
}

export function getProducts(state: { productReducer: TState }) {
    return state.productReducer.products.data;
}

export function getProductsCount(state: { productReducer: TState }) {
    return state.productReducer.products.totalCount;
}

export function getProductCategories(state: { productReducer: TState }) {
    return state.productReducer.productCategories.data;
}
export function getProductCategoriesCount(state: { productReducer: TState }) {
    return state.productReducer.productCategories.totalCount;
}

export function getProductNames(state: { productReducer: TState }) {
    return state.productReducer.productNames;
}

export function getProductCategoryNames(state: { productReducer: TState }) {
    return state.productReducer.productCategoryNames;
}
