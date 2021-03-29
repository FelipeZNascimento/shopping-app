import * as ACTIONTYPES from '../store/actionTypes';
// import { fetchItems } from './dataGetters';

import {
    apiBaseUrl,
    objectTypeInfo,
    objectTypes,
} from 'constants/general';

import { http } from './utilities';

export const setPurchase = (
    purchase,
    date,
    placeId
) => async function () {
    let response;
    console.log(JSON.stringify({
        purchase,
        date,
        placeId,
    }));

    const requestObject = new Request(
        `${apiBaseUrl}purchases`,
        {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'Content-Type',
            },
            body: JSON.stringify({
                purchase,
                date,
                placeId,
            }),
        }
    );

    try {
        response = await http(requestObject);
        return response.parsedBody;
    } catch (response) {
        console.log("Error", response);
    }
};

export const setItem = (
    item,
    objectType
) => async function () {
    const apiCallTarget = objectTypeInfo[objectType].apiCall;
    let response;
    console.log(JSON.stringify({ item }));

    const requestObject = new Request(
        `${apiBaseUrl}${apiCallTarget}`,
        {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'Content-Type',
            },
            body: JSON.stringify({ item })
        }
    );

    try {
        response = await http(requestObject);
        return response.parsedBody;
    } catch (response) {
        console.log("Error", response);
    }
};

export const updateItems = (items, objectType) => async function (dispatch) {
    // const apiCallTarget = objectTypeInfo[objectType].apiCall;
    const dispatchTarget = objectTypeInfo[objectType].dispatch;

    dispatch({ type: ACTIONTYPES[`UPDATING_${dispatchTarget}`] });
};

export const setProductToShoppingList = (itemId) => async function (dispatch) {
    const apiCallTarget = objectTypeInfo[objectTypes.shoppingList].apiCall;
    dispatch({ type: ACTIONTYPES.SAVING_SHOPPING_LIST });

    try {
        await fetch(`${apiBaseUrl}${apiCallTarget}add/${itemId}`, {
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
                    type: ACTIONTYPES.SAVING_SHOPPING_LIST_SUCCESS,
                    response: json,
                });
            }) // Error
            .catch((err) => {
                let errorMessage;
                if (err.sqlMessage) {
                    errorMessage = err.sqlMessage;
                } else {
                    errorMessage = 'Erro desconhecido. Tente novamente mais tarde.';
                }

                dispatch({
                    type: ACTIONTYPES.SAVING_SHOPPING_LIST_ERROR,
                    response: errorMessage,
                });
                dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
            });
    } catch (error) {
        dispatch({
            type: ACTIONTYPES.SAVING_SHOPPING_LIST_ERROR,
            response: error,
        });
        dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
    }
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
