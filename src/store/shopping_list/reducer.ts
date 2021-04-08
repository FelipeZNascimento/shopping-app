import * as ACTIONTYPES from '../actionTypes';
import { TShoppingListItem } from 'constants/objectInterfaces';
import { TState } from './types';

interface IAction {
    errorMessage: string,
    type: string,
    toBeDeleted: TShoppingListItem,
    newProduct: TShoppingListItem,
    productId: number,
    products: TShoppingListItem,
    response: TShoppingListItem[]
}

const initialState: TState = {
    error: false,
    errorMessage: '',
    loading: false,
    shoppingList: []
};

export default function shoppingListReducer(
    state = initialState,
    action: IAction
) {
    switch (action.type) {
        case ACTIONTYPES.FETCHING_SHOPPING_LIST:
        case ACTIONTYPES.ADDING_TO_SHOPPING_LIST:
        case ACTIONTYPES.DELETING_SHOPPING_LIST:
        case ACTIONTYPES.DELETING_FROM_SHOPPING_LIST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case ACTIONTYPES.FETCHING_SHOPPING_LIST_ERROR:
        case ACTIONTYPES.ADDING_TO_SHOPPING_LIST_ERROR:
        case ACTIONTYPES.DELETING_SHOPPING_LIST_ERROR:
        case ACTIONTYPES.DELETING_FROM_SHOPPING_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.errorMessage
            };
        case ACTIONTYPES.ADDING_TO_SHOPPING_LIST_SUCCESS:
        case ACTIONTYPES.DELETING_SHOPPING_LIST_SUCCESS:
        case ACTIONTYPES.DELETING_FROM_SHOPPING_LIST_SUCCESS:
        case ACTIONTYPES.FETCHING_SHOPPING_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                shoppingList: action.response
            };

        default:
            return state;
    }
}
