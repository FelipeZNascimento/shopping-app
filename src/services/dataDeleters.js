import {
    apiBaseUrl,
    objectTypeInfo,
} from 'constants/general';

import { http } from './utilities';

const deleteItems = (
    objectId,
    objectType
) => async function () {
    const apiCallTarget = objectTypeInfo[objectType].apiCall;
    let response;

    const requestObject = new Request(
        `${apiBaseUrl}${apiCallTarget}${objectId}`,
        {
            method: "delete",
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

export default deleteItems;