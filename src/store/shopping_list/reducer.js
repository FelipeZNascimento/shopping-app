import * as ACTIONTYPES from '../actionTypes';

const initialState = {
    shoppingList: []
};

export default function shoppingListReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case ACTIONTYPES.ADD_TO_LIST:
            return {
                ...state,
                shoppingList: [
                    ...state.shoppingList,
                    action.product
                ],
            };
        case ACTIONTYPES.REMOVE_FROM_LIST:
            return {
                ...state,
                shoppingList: state.shoppingList.filter((item) => item.id !== action.productId)
            };

        default:
            return state;
    }
}
