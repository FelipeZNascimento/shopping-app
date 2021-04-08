import * as ACTIONTYPES from '../actionTypes';
import {
    TPurchase,
    TPurchaseItem,
    TShoppingListItem
} from 'constants/objectInterfaces';
import { TState } from './types';

import { dynamicSort } from 'utils/utils'

interface IAction {
    type: string,
    newlyAddedItems: TPurchaseItem[],
    purchaseHistory: TPurchase[],
    purchaseList: TPurchaseItem[],
    fullPurchase: TPurchaseItem[],
    itemId: number,
    response: TShoppingListItem,
    errorMessage: string
}

const initialState: TState = {
    error: false,
    errorMessage: '',
    loading: false,
    purchaseHistory: [],
    purchaseList: [],
    fullPurchase: []
};

export default function purchaseReducer(
    state = initialState,
    action: IAction
) {
    switch (action.type) {
        case ACTIONTYPES.CONVERT_TO_PURCHASE:
            return {
                ...state,
                purchaseList: [
                    ...state.purchaseList,
                    ...action.newlyAddedItems
                ]
            };
        case ACTIONTYPES.REMOVE_ITEM_FROM_PURCHASE:
            return {
                ...state,
                purchaseList: state.purchaseList.filter((item: TPurchaseItem) => item.id !== action.itemId)
            };
        case ACTIONTYPES.UPDATE_PURCHASE_ITEM:
            return {
                ...state,
                purchaseList: action.purchaseList
            };
        case ACTIONTYPES.CLEAR_PURCHASE:
            return {
                ...initialState
            }
        case ACTIONTYPES.FETCHING_PURCHASE:
        case ACTIONTYPES.FETCHING_PURCHASES:
        case ACTIONTYPES.SAVING_PURCHASE_LIST:
            return {
                ...state,
                loading: true
            }
        case ACTIONTYPES.SAVING_PURCHASE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                purchaseList: []
            }
        case ACTIONTYPES.FETCHING_PURCHASE_ERROR:
        case ACTIONTYPES.FETCHING_PURCHASES_ERROR:
        case ACTIONTYPES.SAVING_PURCHASE_LIST_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.errorMessage,
            }
        case ACTIONTYPES.FETCHING_PURCHASES_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                purchaseHistory: action.response
            }

        case ACTIONTYPES.FETCHING_PURCHASE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: false,
                fullPurchase: action.response
            }

        default:
            return state;
    }
}
