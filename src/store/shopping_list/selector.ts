import * as objectInterfaces from '../../constants/objectInterfaces';

interface IState {
    isLoading: boolean,
    shoppingList: objectInterfaces.IProduct[]
}

export function isLoading(state: { shoppingListReducer: IState }) {
    return state.shoppingListReducer.isLoading;
}

export function shoppingList(state: { shoppingListReducer: IState }) {
    return state.shoppingListReducer.shoppingList;
}
