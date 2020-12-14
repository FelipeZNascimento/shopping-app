import * as objectInterfaces from '../../constants/objectInterfaces';

interface IState {
    isLoading: boolean,
    purchaseList: objectInterfaces.IPurchaseItem[]
}

export function isLoading(state: { purchaseReducer: IState }) {
    return state.purchaseReducer.isLoading;
}

export function getPurchaseList(state: { purchaseReducer: IState }) {
    return state.purchaseReducer.purchaseList;
}

export function getPurchaseListLength(state: { purchaseReducer: IState }) {
    return state.purchaseReducer.purchaseList.length;
}
