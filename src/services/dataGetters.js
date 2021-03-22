import * as ACTIONTYPES from '../store/actionTypes';
import {
    apiBaseUrl,
    objectTypes,
    objectTypeInfo,
} from 'constants/general';

import { http } from './utilities';

export const fetchItems = (
    objectType,
    orderBy = 'description',
    sort = 'ASC'
) => async function () {
    const apiCallTarget = objectTypeInfo[objectType].apiCall;
    let response;

    const requestObject = new Request(
        `${apiBaseUrl}${apiCallTarget}?orderBy=${orderBy}&sort=${sort}`,
        {
            method: "get"
        }
    );

    try {
        response = await http(requestObject);
        return response.parsedBody;
    } catch (response) {
        console.log("Error", response);
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

