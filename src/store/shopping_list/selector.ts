import { TProductsObject } from 'store/product/types';

interface IState {
    isLoading: boolean,
    shoppingList: TProductsObject
}

export function isLoading(state: { shoppingListReducer: IState }) {
    return state.shoppingListReducer.isLoading;
}

export function shoppingList(state: { shoppingListReducer: IState }) {
    return state.shoppingListReducer.shoppingList.data;
}
