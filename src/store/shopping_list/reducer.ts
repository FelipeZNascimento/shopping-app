import * as ACTIONTYPES from '../actionTypes';
import * as objectInterfaces from '../../constants/objectInterfaces';

interface IAction {
    errorMessage: string,
    type: string,
    toBeDeleted: objectInterfaces.IProduct,
    newProduct: objectInterfaces.IProduct,
    productId: number,
    response: objectInterfaces.IShoppingListItem
}

const initialState = {
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
        case ACTIONTYPES.DELETING_FROM_SHOPPING_LIST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case ACTIONTYPES.FETCHING_SHOPPING_LIST_ERROR:
        case ACTIONTYPES.ADDING_TO_SHOPPING_LIST_ERROR:
        case ACTIONTYPES.DELETING_FROM_SHOPPING_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.errorMessage
            };
        case ACTIONTYPES.FETCHING_SHOPPING_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                shoppingList: action.response
            };
        case ACTIONTYPES.ADDING_TO_SHOPPING_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                shoppingList: [action.newProduct, ...state.shoppingList]
            };
        case ACTIONTYPES.DELETING_FROM_SHOPPING_LIST_SUCCESS:
            return {
                ...state,
                shoppingList: state.shoppingList.filter((item: objectInterfaces.IShoppingListItem) => item.id !== action.toBeDeleted.id)
            };
        case ACTIONTYPES.CLEAR_SHOPPING_LIST:
            return {
                ...initialState
            }
        default:
            return state;
    }
}
