import { TState } from './types';

export function selectIsLoading(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.loading;
}

export function selectHasError(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.error;
}

export function selectPurchasePlace(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.place;
}

export function selectPurchaseDate(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.date;
}

export function selectPurchaseHistory(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.purchaseHistory;
}

export function selectFullPurchase(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.fullPurchase;
}

export function selectPurchaseList(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.purchaseList;
}

export function selectPurchaseListLength(state: { purchaseReducer: TState }) {
    return state.purchaseReducer.purchaseList.length;
}
