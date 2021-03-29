import * as objectInterfaces from '../../constants/objectInterfaces';

interface IState {
    error: boolean,
    errorMessage: string,
    loading: boolean,
    purchaseList: objectInterfaces.IPurchaseItem[]
}

export function isLoading(state: { purchaseReducer: IState }) {
    return state.purchaseReducer.loading;
}

export function hasError(state: { purchaseReducer: IState }) {
    return state.purchaseReducer.error;
}

export function getPurchaseList(state: { purchaseReducer: IState }) {
    return state.purchaseReducer.purchaseList;
}

export function getPurchaseListLength(state: { purchaseReducer: IState }) {
    return state.purchaseReducer.purchaseList.length;
}
