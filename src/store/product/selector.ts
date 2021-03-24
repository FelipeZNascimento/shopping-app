// import * as objectInterfaces from '../../constants/objectInterfaces';
import { TCategoriesObject, TProductsObject } from './types';
import { ICategory, IItemName } from 'constants/objectInterfaces';

interface IState {
    isLoading: boolean,
    categories: ICategory[],
    productNames: IItemName[],
    productCategoryNames: IItemName[],
    products: TProductsObject,
    productCategories: TCategoriesObject
    type: string
}

export function isLoading(state: { productReducer: IState }) {
    return state.productReducer.isLoading;
}

export function getProducts(state: { productReducer: IState }) {
    return state.productReducer.products.data;
}

export function getProductsCount(state: { productReducer: IState }) {
    return state.productReducer.products.totalCount;
}

export function getProductCategories(state: { productReducer: IState }) {
    return state.productReducer.productCategories.data;
}
export function getProductCategoriesCount(state: { productReducer: IState }) {
    return state.productReducer.productCategories.totalCount;
}

export function getProductNames(state: { productReducer: IState }) {
    return state.productReducer.productNames;
}

export function getProductCategoryNames(state: { productReducer: IState }) {
    return state.productReducer.productCategoryNames;
}
