import { TState } from './types';

export function isLoading(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.loading;
}

export function hasError(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.error;
}

export function getPurchaseList(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.purchaseList;
}

export function getPurchaseListLength(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.purchaseList.length;
}
