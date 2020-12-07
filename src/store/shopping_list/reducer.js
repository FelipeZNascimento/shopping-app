import * as ACTIONTYPES from '../actionTypes';

const initialState = {
    error: false,
    loading: false,
    shoppingList: []
};

export default function shoppingListReducer(
    state = initialState,
    action
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
        case ACTIONTYPES.ADD_TO_LIST:
            return {
                ...state,
                shoppingList: [
                    ...state.shoppingList,
                    action.product
                ],
            };
        case ACTIONTYPES.REMOVING_FROM_LIST:
            return {
                ...state,
                shoppingList: state.shoppingList.filter((item) => item.id !== action.productId)
            };
        case ACTIONTYPES.CLEAR_SHOPPING_LIST:
            return {
                ...initialState
            }

        default:
            return state;
    }
}
