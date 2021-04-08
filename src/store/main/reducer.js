import * as ACTIONTYPES from '../actionTypes';

const initialState = {
    error: false,
    errorMessage: '',
    loading: false,
    isNotificationOpen: false
};

export default function appReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONTYPES.TOGGLE_NOTIFICATION:
            return {
                ...state,
                isNotificationOpen: action.status !== false,
                errorMessage: action.errorMessage || '',
                error: action.errorMessage || false
            };
        default:
            return state;
    }
}
