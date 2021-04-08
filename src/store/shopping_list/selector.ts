import { TState } from './types';

export function selectIsLoading(state: { shoppingListReducer: TState }) {
    return state.shoppingListReducer.loading;
}

export function selectShoppingList(state: { shoppingListReducer: TState }) {
    return state.shoppingListReducer.shoppingList;
}
