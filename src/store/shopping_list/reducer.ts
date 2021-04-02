import * as ACTIONTYPES from '../actionTypes';
import { IShoppingListItem, IProduct } from 'constants/objectInterfaces';
import { TState } from './types';

interface IAction {
    errorMessage: string,
    type: string,
    toBeDeleted: IProduct,
    newProduct: IProduct,
    productId: number,
    products: IShoppingListItem
}

const initialState: TState = {
    error: false,
    errorMessage: '',
    loading: false,
    shoppingList: {
        count: 0,
        totalCount: 0,
        data: []
    }
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
                shoppingList: action.products
            };
        case ACTIONTYPES.ADDING_TO_SHOPPING_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                shoppingList: {
                    ...state.shoppingList,
                    data: [action.newProduct, ...state.shoppingList.data],
                    count: state.shoppingList.count + 1,
                    totalCount: state.shoppingList.totalCount + 1 
                }
            };
        case ACTIONTYPES.DELETING_FROM_SHOPPING_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                shoppingList: {
                    data: state.shoppingList.data.filter((product: IProduct) => product.id !== action.toBeDeleted.id),
                    count: state.shoppingList.count - 1,
                    totalCount: state.shoppingList.totalCount - 1
                }
            };
        case ACTIONTYPES.CLEAR_SHOPPING_LIST:
            return {
                ...initialState
            }
        default:
            return state;
    }
}
