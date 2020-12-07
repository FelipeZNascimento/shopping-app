export function isLoading(state) {
    return state.shoppingListReducer.isLoading;
}

export function getShoppingList(state) {
    return state.shoppingListReducer.shoppingList;
}
