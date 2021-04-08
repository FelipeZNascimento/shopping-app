import {
    apiBaseUrl,
    objectTypeInfo,
} from 'constants/general';

import {
    http,
    stringifyQueryParams
} from './utilities';

type TProps = {
    objectId: null | number,
    objectType: number,
    currentPage?: number | null,
    orderBy?: string,
    sort?: string,
    searchField?: string
};

const deleteItems = ({
    objectId,
    objectType,
    currentPage = 0,
    orderBy = 'description',
    sort = 'ASC',
    searchField = '',
}: TProps) => {
    const apiCallTarget = objectTypeInfo[objectType].apiCall;
    let requestUrl = `${apiBaseUrl}${apiCallTarget}`;

    if (objectId !== null) {
        requestUrl += `${objectId}`;
    }

    requestUrl += stringifyQueryParams(currentPage, orderBy, sort, searchField);

    const requestObject = new Request(
        `${requestUrl}`,
        {
            method: "delete",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'Content-Type',
            },
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

export default deleteItems;