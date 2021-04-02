export function isLoading(state) {
    return state.appReducer.loading;
}

export function selectHasError(state) {
    return state.appReducer.error;
}

export function selectErrorMessage(state) {
    return state.appReducer.errorMessage;
}

export function isNotificationOpen(state) {
    return state.appReducer.isNotificationOpen;
}
