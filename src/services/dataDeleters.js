import * as ACTIONTYPES from '../store/actionTypes';

import {
    apiBaseUrl,
    objectTypeInfo,
} from '../constants/general';

// export default async function item(item, objectType) {
const deleteItem = (objectId, objectType) => async function (dispatch) {
    const apiCallTarget = objectTypeInfo[objectType].apiCall;
    const dispatchTarget = objectTypeInfo[objectType].dispatch;

    dispatch({ type: ACTIONTYPES[`DELETING_${dispatchTarget}`] });

    try {
        await fetch(`${apiBaseUrl}${apiCallTarget}${objectId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'Content-Type',
            }
        })
            .then((response) => {
                dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });

                if (response.status === 200) {
                    return Promise.resolve(response);
                }

                return Promise.resolve(response.json())
                    .then((responseInJson) => Promise.reject(responseInJson));
            }) // Success
            .then((json) => {
                dispatch({
                    type: ACTIONTYPES[`DELETING_${dispatchTarget}_SUCCESS`],
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
                    type: ACTIONTYPES[`DELETING_${dispatchTarget}_ERROR`],
                    response: errorMessage,
                });
            });
    } catch (error) {
        dispatch({
            type: ACTIONTYPES[`DELETING_${dispatchTarget}_ERROR`],
            response: error,
        });
        dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
    }
};

export default deleteItem;
