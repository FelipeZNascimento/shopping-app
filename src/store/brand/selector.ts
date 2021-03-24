// import * as objectInterfaces from '../../constants/objectInterfaces';
import { TBrandsObject } from './types';
import { ICategory, IItemName } from 'constants/objectInterfaces';

interface IState {
    isLoading: boolean,
    categories: ICategory[],
    brandNames: IItemName[],
    brands: TBrandsObject,
    type: string
}

export function getIsLoading(state: { brandReducer: IState }) {
    return state.brandReducer.isLoading;
}

export function getBrands(state: { brandReducer: IState }) {
    return state.brandReducer.brands.data;
}

export function getBrandsCount(state: { brandReducer: IState }) {
    return state.brandReducer.brands.totalCount;
}

export function getBrandNames(state: { brandReducer: IState }) {
    return state.brandReducer.brandNames;
}
