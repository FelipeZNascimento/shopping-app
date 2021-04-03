import { TState } from './types';

export function selectIsLoading(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.loading;
}

export function hasError(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.error;
}

export function selectPurchaseHistory(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.purchaseHistory;
}

export function selectFullPurchase(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.fullPurchase;
}

export function getPurchaseList(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.purchaseList;
}

export function getPurchaseListLength(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.purchaseList.length;
}
