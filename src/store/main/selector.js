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

export function returnCategories(state, objectType) {
    switch (objectType) {
    case objectTypes.products:
        return state.appReducer.productsCategories;
    case objectTypes.places:
        return state.appReducer.placesCategories;
    default:
        return [];
    }
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

export function returnProducts(state) {
    return state.appReducer.products;
}

export function returnProductCategories(state) {
    return state.appReducer.productsCategories;
}

export function brands(state) {
    return state.appReducer.brands;
}

export function places(state) {
    return state.appReducer.places;
}

export function placesCategories(state) {
    return state.appReducer.placesCategories;
}

export function products(state) {
    return state.appReducer.products;
}

export function productsCategories(state) {
    return state.appReducer.productsCategories;
}

export function isAddMode(state) {
    return state.appReducer.isAddMode;
}

export function isEditMode(state) {
    return state.appReducer.isEditMode;
}

export function isSaveMode(state) {
    return state.appReducer.isSaveMode;
}

export function isNotificationOpen(state) {
    return state.appReducer.isNotificationOpen;
}
