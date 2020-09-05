import * as ACTIONTYPES from './actionTypes';

export function clearErrors() {
    return (dispatch) => {
        dispatch({
            type: ACTIONTYPES.CLEAR_ERRORS,
        });
    };
}

export function toggleNotification(status = true) {
    return (dispatch) => {
        dispatch({
            type: ACTIONTYPES.TOGGLE_NOTIFICATION,
            status,
        });
    };
}

export function toggleEditMode(status = true) {
    return (dispatch) => {
        dispatch({
            type: ACTIONTYPES.TOGGLE_EDIT_MODE,
            status,
        });
    };
}

export function toggleAddMode(status = true) {
    return (dispatch) => {
        dispatch({
            type: ACTIONTYPES.TOGGLE_ADD_MODE,
            status,
        });
    };
}

export function toggleSaveMode(status = true) {
    return (dispatch) => {
        dispatch({
            type: ACTIONTYPES.TOGGLE_SAVE_MODE,
            status,
        });
    };
}
