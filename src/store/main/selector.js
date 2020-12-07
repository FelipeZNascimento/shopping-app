import { objectTypes } from '../../constants/general';

export function isLoading(state) {
    return state.appReducer.loading;
}

export function isDeleting(state) {
    return state.appReducer.deleting;
}

export function isSaving(state) {
    return state.appReducer.saving;
}

export function hasError(state) {
    return state.appReducer.error;
}

export function errorMessage(state) {
    return state.appReducer.errorMessage;
}

export function returnItems(state, objectType) {
    switch (objectType) {
    case objectTypes.brands:
        return state.appReducer.brands;
    case objectTypes.products:
        return state.appReducer.products;
    case objectTypes.places:
        return state.appReducer.places;
    case objectTypes.placesCategories:
        return state.appReducer.placesCategories;
    case objectTypes.productsCategories:
        return state.appReducer.productsCategories;
    default:
        return [];
    }
}

export function isAddMode(state) {
    return state.appReducer.isAddMode;
}

export function isNotificationOpen(state) {
    return state.appReducer.isNotificationOpen;
}
