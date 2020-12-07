import * as ACTIONTYPES from '../actionTypes';

const initialState = {
    deleting: false,
    error: false,
    errorMessage: '',
    isAddMode: false,
    isEditMode: false,
    isSaveMode: false,
    loading: false,
    saving: false,
    isNotificationOpen: false,
    brands: [],
    places: [],
    placesCategories: [],
    products: [],
    productsCategories: []
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONTYPES.CLEAR_ERRORS:
            return {
                ...state,
                error: false,
                errorMessage: null,
            };

        case ACTIONTYPES.FETCHING_BRANDS:
        case ACTIONTYPES.FETCHING_PLACES:
        case ACTIONTYPES.FETCHING_PLACES_CATEGORIES:
        case ACTIONTYPES.FETCHING_PRODUCTS:
        case ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES:
            return {
                ...state,
                items: [],
                loading: true,
                error: false,
            };

        case ACTIONTYPES.FETCHING_BRANDS_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                brands: action.response,
            };
        case ACTIONTYPES.FETCHING_PLACES_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                places: action.response,
            };
        case ACTIONTYPES.FETCHING_PLACES_CATEGORIES_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                placesCategories: action.response,
            };
        case ACTIONTYPES.FETCHING_PRODUCTS_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                products: action.response,
            };
        case ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES_SUCCESS:
            return {
                ...state,
                error: false,
                loading: false,
                productsCategories: action.response,
            };
        case ACTIONTYPES.REMOVING_BRAND_FROM_LIST:
            return {
                ...state,
                error: false,
                loading: false,
                brands: state.brands.filter((item) => item.id !== action.itemId)
            };
        case ACTIONTYPES.REMOVING_PLACE_FROM_LIST:
            return {
                ...state,
                error: false,
                loading: false,
                places: state.places.filter((item) => item.id !== action.itemId)
            };
        case ACTIONTYPES.REMOVING_PLACE_CATEGORY_FROM_LIST:
            return {
                ...state,
                error: false,
                loading: false,
                placesCategories: state.placesCategories.filter((item) => item.id !== action.itemId)
            };
        case ACTIONTYPES.REMOVING_PRODUCT_FROM_LIST:
            return {
                ...state,
                error: false,
                loading: false,
                products: state.products.filter((item) => item.id !== action.itemId)
            };
        case ACTIONTYPES.REMOVING_PRODUCT_CATEGORY_FROM_LIST:
            return {
                ...state,
                error: false,
                loading: false,
                productsCategories: state.productsCategories.filter((item) => item.id !== action.itemId)
            };

        case ACTIONTYPES.FETCHING_BRANDS_ERROR:
        case ACTIONTYPES.FETCHING_PLACES_ERROR:
        case ACTIONTYPES.FETCHING_PLACES_CATEGORIES_ERROR:
        case ACTIONTYPES.FETCHING_PRODUCTS_ERROR:
        case ACTIONTYPES.FETCHING_PRODUCTS_CATEGORIES_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.response,
            };

        case ACTIONTYPES.SAVING_BRANDS:
        case ACTIONTYPES.SAVING_PLACES:
        case ACTIONTYPES.SAVING_PLACES_CATEGORIES:
        case ACTIONTYPES.SAVING_PRODUCTS:
        case ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES:
        case ACTIONTYPES.SAVING_PURCHASE:

            return {
                ...state,
                saving: true,
            };

        case ACTIONTYPES.SAVING_BRANDS_SUCCESS:
        case ACTIONTYPES.SAVING_PLACES_SUCCESS:
        case ACTIONTYPES.SAVING_PLACES_CATEGORIES_SUCCESS:
        case ACTIONTYPES.SAVING_PRODUCTS_SUCCESS:
        case ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_SUCCESS:
        case ACTIONTYPES.SAVING_PURCHASE_SUCCESS:
            return {
                ...state,
                saving: false,
                error: false,
            };

        case ACTIONTYPES.SAVING_BRANDS_ERROR:
        case ACTIONTYPES.SAVING_PLACES_ERROR:
        case ACTIONTYPES.SAVING_PLACES_CATEGORIES_ERROR:
        case ACTIONTYPES.SAVING_PRODUCTS_ERROR:
        case ACTIONTYPES.SAVING_PRODUCTS_CATEGORIES_ERROR:
        case ACTIONTYPES.SAVING_PURCHASE_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.response,
                saving: false,
            };

        case ACTIONTYPES.DELETING_BRANDS:
        case ACTIONTYPES.DELETING_PLACES:
        case ACTIONTYPES.DELETING_PLACES_CATEGORIES:
        case ACTIONTYPES.DELETING_PRODUCTS:
        case ACTIONTYPES.DELETING_PRODUCTS_CATEGORIES:
            return {
                ...state,
                deleting: true,
            };
        case ACTIONTYPES.DELETING_BRANDS_SUCCESS:
        case ACTIONTYPES.DELETING_PLACES_SUCCESS:
        case ACTIONTYPES.DELETING_PLACES_CATEGORIES_SUCCESS:
        case ACTIONTYPES.DELETING_PRODUCTS_SUCCESS:
        case ACTIONTYPES.DELETING_PRODUCTS_CATEGORIES_SUCCESS:
            return {
                ...state,
                deleting: false,
                error: false,
            };
        case ACTIONTYPES.DELETING_BRANDS_ERROR:
        case ACTIONTYPES.DELETING_PLACES_ERROR:
        case ACTIONTYPES.DELETING_PLACES_CATEGORIES_ERROR:
        case ACTIONTYPES.DELETING_PRODUCTS_ERROR:
        case ACTIONTYPES.DELETING_PRODUCTS_CATEGORIES_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.response,
                deleting: false,
            };
        case ACTIONTYPES.TOGGLE_ADD_MODE:
            return {
                ...state,
                isAddMode: action.status,
            };
        case ACTIONTYPES.TOGGLE_EDIT_MODE:
            return {
                ...state,
                isEditMode: action.status,
            };
        case ACTIONTYPES.TOGGLE_SAVE_MODE:
            return {
                ...state,
                isSaveMode: !state.isSaveMode,
            };
        case ACTIONTYPES.TOGGLE_NOTIFICATION:
            return {
                ...state,
                isNotificationOpen: action.status !== false,
            };
        default:
            return state;
    }
}
