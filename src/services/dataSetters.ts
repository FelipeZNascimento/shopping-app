import {
    apiBaseUrl,
    objectTypeInfo
} from 'constants/general';

import {
    IProduct,
    IBrand,
    IPlace,
    ICategory,
    IPurchaseItem
} from 'constants/objectInterfaces';

import { http } from './utilities';

type TPropsPurchase = {
    purchase: IPurchaseItem[];
    date: string;
    placeId: number | null;
    total: number;
}

export const setPurchase = ({
    purchase,
    date,
    placeId,
    total
}: TPropsPurchase) => {
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
                total
            }),
        }
    );

    return http(requestObject)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        })
};

type TPropsItem = {
    itemArray: IProduct[] | IBrand[] | IPlace[] | ICategory[];
    objectType: number;
};

export const setItem = ({
    itemArray,
    objectType
}: TPropsItem) => {
    const apiCallTarget = objectTypeInfo[objectType].apiCall;

    const requestObject = new Request(
        `${apiBaseUrl}${apiCallTarget}`,
        {
            method: "post",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'Content-Type',
            },
            body: JSON.stringify({ itemArray })
        }
    );

    return http(requestObject)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        })
};

// export const setProductToShoppingList = (itemId: number) => {
//     const apiCallTarget = objectTypeInfo[objectTypes.shoppingList].apiCall;
//     dispatch({ type: ACTIONTYPES.SAVING_SHOPPING_LIST });

//     try {
//         await fetch(`${apiBaseUrl}${apiCallTarget}add/${itemId}`, {
//             method: 'GET',
//             headers: {},
//         })
//             .then((response) => {
//                 if (response.status === 200) {
//                     return Promise.resolve(response.json());
//                 }

//                 return Promise.resolve(response.json())
//                     .then((responseInJson) => Promise.reject(responseInJson));
//             }) // Success
//             .then((json) => {
//                 dispatch({
//                     type: ACTIONTYPES.SAVING_SHOPPING_LIST_SUCCESS,
//                     response: json,
//                 });
//             }) // Error
//             .catch((err) => {
//                 let errorMessage;
//                 if (err.sqlMessage) {
//                     errorMessage = err.sqlMessage;
//                 } else {
//                     errorMessage = 'Erro desconhecido. Tente novamente mais tarde.';
//                 }

//                 dispatch({
//                     type: ACTIONTYPES.SAVING_SHOPPING_LIST_ERROR,
//                     response: errorMessage,
//                 });
//                 dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
//             });
//     } catch (error) {
//         dispatch({
//             type: ACTIONTYPES.SAVING_SHOPPING_LIST_ERROR,
//             response: error,
//         });
//         dispatch({ type: ACTIONTYPES.TOGGLE_NOTIFICATION });
//     }
// };

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
