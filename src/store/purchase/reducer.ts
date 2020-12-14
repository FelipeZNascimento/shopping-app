import * as ACTIONTYPES from '../actionTypes';
import * as objectInterfaces from '../../constants/objectInterfaces';

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
                ]
            };
        case ACTIONTYPES.REMOVE_ITEM_FROM_PURCHASE:
            return {
                ...state,
                purchaseList: state.purchaseList.filter((item: objectInterfaces.IPurchaseItem) => item.id !== action.itemId)
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

        default:
            return state;
    }
}
