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
    places: [],
    placesCategories: [],
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONTYPES.CLEAR_ERRORS:
            return {
                ...state,
                error: false,
                errorMessage: null,
            };

        case ACTIONTYPES.FETCHING_PLACES:
        case ACTIONTYPES.FETCHING_PLACES_CATEGORIES:
            return {
                ...state,
                loading: true,
                error: false,
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

        case ACTIONTYPES.FETCHING_PLACES_ERROR:
        case ACTIONTYPES.FETCHING_PLACES_CATEGORIES_ERROR:
            return {
                ...state,
                loading: false,
                error: true,
                errorMessage: action.response,
            };

        case ACTIONTYPES.SAVING_PLACES:
        case ACTIONTYPES.SAVING_PLACES_CATEGORIES:
            return {
                ...state,
                saving: true,
            };

        case ACTIONTYPES.SAVING_PLACES_SUCCESS:
            return {
                ...state,
                saving: false,
                error: false,
                products: {
                    ...state.products,
                    data: [action.newCategory, ...state.products.data]
                }

            };
        case ACTIONTYPES.SAVING_PLACES_CATEGORIES_SUCCESS:
            return {
                ...state,
                saving: false,
                error: false,
                placesCategories: [action.newCategory, ...state.placesCategories]
            };

        case ACTIONTYPES.SAVING_PLACES_ERROR:
        case ACTIONTYPES.SAVING_PLACES_CATEGORIES_ERROR:
            return {
                ...state,
                error: true,
                errorMessage: action.response,
                saving: false,
            };

        case ACTIONTYPES.DELETING_PLACES:
        case ACTIONTYPES.DELETING_PLACES_CATEGORIES:
            return {
                ...state,
                deleting: true,
            };
        case ACTIONTYPES.DELETING_PLACES_SUCCESS:
        case ACTIONTYPES.DELETING_PLACES_CATEGORIES_SUCCESS:
            return {
                ...state,
                deleting: false,
                error: false,
            };
        case ACTIONTYPES.DELETING_PLACES_ERROR:
        case ACTIONTYPES.DELETING_PLACES_CATEGORIES_ERROR:
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
