import * as ACTIONTYPES from '../store/actionTypes';
import {
    apiBaseUrl,
    objectTypes,
    objectTypeInfo,
} from '../constants/general';

export const fetchItems = (objectType) => async function (dispatch) {
    const apiCallTarget = objectTypeInfo[objectType].apiCall;
    const dispatchTarget = objectTypeInfo[objectType].dispatch;

    dispatch({ type: ACTIONTYPES[`FETCHING_${dispatchTarget}`] });

    try {
        await fetch(`${apiBaseUrl}${apiCallTarget}`, {
            method: 'GET',
            headers: {},
        })
            .then((response) => {
                if (response.status === 200) {
                    return Promise.resolve(response.json());
                }

                return Promise.resolve(response.json())
                    .then((responseInJson) => Promise.reject(responseInJson));
            }) // Success
            .then((json) => {
                dispatch({
                    type: ACTIONTYPES[`FETCHING_${dispatchTarget}_SUCCESS`],
                    response: json,
                });
            }) // Error
            .catch((err) => {
                let errorMessage;
                if (err.errno === 1451) {
                    errorMessage = 'O elemento que está tentando excluir possui relação com uma entrada existente (compra, produto, categoria, etc) existente.';
                } else if (err.sqlMessage) {
                    errorMessage = err.sqlMessage;
                } else {
                    errorMessage = 'Erro desconhecido. Tente novamente mais tarde.';
                }

                dispatch({
                    type: ACTIONTYPES[`FETCHING_${dispatchTarget}_ERROR`],
                    response: errorMessage,
                });
                dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
            });
    } catch (error) {
        dispatch({
            type: ACTIONTYPES[`FETCHING_${dispatchTarget}_ERROR`],
            response: error,
        });
        dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
    }
};

export const fetchCategories = ((objectType) => {
    switch (objectType) {
    case objectTypes.products:
        return fetchItems(objectTypes.productsCategories);
    case objectTypes.places:
        return fetchItems(objectTypes.placesCategories);
    default:
        return null;
    }
});
