import {
    apiBaseUrl,
    objectTypeInfo,
} from 'constants/general';

import { http } from './utilities';

const fetchItems = (
    objectType,
    currentPage = 0,
    orderBy = 'description',
    sort = 'ASC',
    searchField = ''
) => async function () {
    const apiCallTarget = objectTypeInfo[objectType].apiCall;
    let response;

    const requestObject = new Request(
        `${apiBaseUrl}${apiCallTarget}?page=${currentPage}&orderBy=${orderBy}&sort=${sort}&searchField=${searchField}`,
        {
            method: "get",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'Content-Type',
            },
        }
    );

    try {
        response = await http(requestObject);
        return response.parsedBody;
    } catch (response) {
        console.log("Error", response);
    }
};

export default fetchItems;
