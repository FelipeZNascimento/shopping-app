import * as ACTIONTYPES from '../store/main/actionTypes';
import { fetchItems } from './dataGetters';

import {
    apiBaseUrl,
    objectTypeInfo,
} from '../constants/general';


export const setPurchase = (purchase, date, placeId) => async function (dispatch) {
    dispatch({ type: ACTIONTYPES.SAVING_PURCHASE });
    try {
        const response = await fetch(`${apiBaseUrl}/purchases`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'Content-Type',
            },
            body: JSON.stringify({
                purchase,
                date,
                placeId,
            }),
        });

        const responseJSON = await response.json();

        return dispatch({
            type: ACTIONTYPES.SAVING_PURCHASE_SUCCESS,
            response: responseJSON,
        });
    } catch (error) {
        return dispatch({ type: ACTIONTYPES.SAVING_PURCHASE_ERROR, response: error });
    }
};

export const setItem = (item, objectType) => async function (dispatch) {
    const apiCallTarget = objectTypeInfo[objectType].apiCall;
    const dispatchTarget = objectTypeInfo[objectType].dispatch;

    dispatch({ type: ACTIONTYPES[`SAVING_${dispatchTarget}`] });

    try {
        await fetch(`${apiBaseUrl}${apiCallTarget}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'Content-Type',
            },
            body: JSON.stringify({ item }),
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
                    type: ACTIONTYPES[`SAVING_${dispatchTarget}_SUCCESS`],
                    response: json,
                });

                return dispatch(fetchItems(objectType));
            }) // Error
            .catch((err) => {
                const errorMessage = err.sqlMessage ? err.sqlMessage : 'Tente novamente mais tarde.';
                dispatch({
                    type: ACTIONTYPES[`SAVING_${dispatchTarget}_ERROR`],
                    response: errorMessage,
                });
            });
    } catch (error) {
        dispatch({
            type: ACTIONTYPES[`SAVING_${dispatchTarget}_ERROR`],
            response: error,
        });
        dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
    }
};

export const updateItems = (items, objectType) => async function (dispatch) {
    const apiCallTarget = objectTypeInfo[objectType].apiCall;
    const dispatchTarget = objectTypeInfo[objectType].dispatch;

    dispatch({ type: ACTIONTYPES[`UPDATING_${dispatchTarget}`] });
};
// export const updateItems = (items, objectType) => async function (dispatch) {
//     const apiCallTarget = objectTypeInfo[objectType].apiCall;
//     const dispatchTarget = objectTypeInfo[objectType].dispatch;

//     dispatch({ type: ACTIONTYPES[`UPDATING_${dispatchTarget}`] });

//     try {
//         await fetch(`${apiBaseUrl}${apiCallTarget}`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': 'Content-Type',
//             },
//             body: JSON.stringify({ item }),
//         })
//             .then((response) => {
//                 dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });

//                 if (response.status === 200) {
//                     return Promise.resolve(response);
//                 }

//                 return Promise.resolve(response.json())
//                     .then((responseInJson) => Promise.reject(responseInJson));
//             }) // Success
//             .then((json) => {
//                 dispatch({
//                     type: ACTIONTYPES[`SAVING_${dispatchTarget}_SUCCESS`],
//                     response: json,
//                 });

//                 return dispatch(fetchItems(objectType));
//             }) // Error
//             .catch((err) => {
//                 const errorMessage = err.sqlMessage ? err.sqlMessage : 'Tente novamente mais tarde.';
//                 dispatch({
//                     type: ACTIONTYPES[`SAVING_${dispatchTarget}_ERROR`],
//                     response: errorMessage,
//                 });
//             });
//     } catch (error) {
//         dispatch({
//             type: ACTIONTYPES[`SAVING_${dispatchTarget}_ERROR`],
//             response: error,
//         });
//         dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
//     }
// };
