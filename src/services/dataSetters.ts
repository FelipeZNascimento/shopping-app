import {
    apiBaseUrl,
    objectTypeInfo
} from 'constants/general';

import {
    TProduct,
    TBrand,
    TPlace,
    TCategory,
    TPurchaseItem
} from 'constants/objectInterfaces';

import {
    http,
    stringifyQueryParams
} from './utilities';

type TPropsPurchase = {
    purchaseItems: TPurchaseItem[];
    date: string;
    place: TPlace;
    total: number;
}

export const setPurchase = ({
    purchaseItems,
    date,
    place,
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
                purchaseItems,
                date,
                place,
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
    itemArray: TProduct[] | TBrand[] | TPlace[] | TCategory[];
    objectType: number;
    currentPage?: number | null;
    orderBy?: string;
    sort?: string;
    searchField?: string;
};

export const setItem = ({
    itemArray,
    objectType,
    currentPage = 0,
    orderBy = 'description',
    sort = 'ASC',
    searchField = '',
}: TPropsItem) => {
    const apiCallTarget = objectTypeInfo[objectType].apiCall;
    let requestUrl = `${apiBaseUrl}${apiCallTarget}`;
    requestUrl += stringifyQueryParams(currentPage, orderBy, sort, searchField);

    const requestObject = new Request(
        requestUrl,
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
