import { TState } from './types';

export function getIsLoading(state: { productReducer: TState }) {
    return state.productReducer.loading;
}

export function getIsLoadingCategories(state: { productReducer: TState }) {
    return state.productReducer.loadingCategories;
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
