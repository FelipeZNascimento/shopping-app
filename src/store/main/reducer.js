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
