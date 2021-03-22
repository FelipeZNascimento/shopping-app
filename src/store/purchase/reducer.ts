import * as ACTIONTYPES from '../actionTypes';
import * as objectInterfaces from '../../constants/objectInterfaces';
import { dynamicSort } from '../../utils/utils'

interface IAction {
    type: string,
    purchaseList: objectInterfaces.IPurchaseItem[],
    itemId: number,
    response: objectInterfaces.IShoppingListItem
}

const initialState = {
    error: false,
    loading: false,
    purchaseList: []
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
                    ...action.purchaseList
                ].sort(dynamicSort('description'))
            };
        case ACTIONTYPES.REMOVE_ITEM_FROM_PURCHASE:
            return {
                ...state,
                purchaseList: state.purchaseList.filter((item: objectInterfaces.IPurchaseItem) => item.id !== action.itemId)
            };
        case ACTIONTYPES.UPDATE_PURCHASE_ITEM:
            return {
                ...state,
                purchaseList: action.purchaseList.sort(dynamicSort('description'))
            };
        case ACTIONTYPES.CLEAR_PURCHASE:
            return {
                ...initialState
            }
        case ACTIONTYPES.SAVING_PURCHASE_LIST:
            return {
                ...initialState,
                loading: true
            }

        default:
            return state;
    }
}
