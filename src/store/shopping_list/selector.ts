import { TState } from './types';

export function getIsLoading(state: { shoppingListReducer: TState }) {
    return state.shoppingListReducer.loading;
}

export function shoppingList(state: { shoppingListReducer: TState }) {
    return state.shoppingListReducer.shoppingList.data;
}
