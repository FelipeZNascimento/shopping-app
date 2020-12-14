import * as ACTIONTYPES from '../actionTypes';
import * as objectInterfaces from '../../constants/objectInterfaces';

interface IAction {
    type: string,
    product: objectInterfaces.IProduct,
    productId: number,
    response: objectInterfaces.IShoppingListItem
}

const initialState = {
    error: false,
    loading: false,
    shoppingList: []
};

export default function shoppingListReducer(
    state = initialState,
    action: IAction
) {
    switch (action.type) {
        case ACTIONTYPES.FETCHING_SHOPPING_LIST:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case ACTIONTYPES.FETCHING_SHOPPING_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
            };
        case ACTIONTYPES.FETCHING_SHOPPING_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                shoppingList: action.response
            };
        case ACTIONTYPES.ADD_TO_SHOPPING_LIST:
            return {
                ...state,
                shoppingList: [
                    ...state.shoppingList,
                    action.product
                ],
            };
        case ACTIONTYPES.REMOVE_FROM_SHOPPING_LIST:
            return {
                ...state,
                shoppingList: state.shoppingList.filter((item: objectInterfaces.IShoppingListItem) => item.id !== action.productId)
            };
        case ACTIONTYPES.CLEAR_SHOPPING_LIST:
            return {
                ...initialState
            }

        default:
            return state;
    }
}
