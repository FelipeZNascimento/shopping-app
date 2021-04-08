import {
    apiBaseUrl,
    objectTypeInfo,
} from 'constants/general';

import {
    http,
    stringifyQueryParams
} from './utilities';

type TProps = {
    objectType: number,
    currentPage?: number | null,
    orderBy?: string,
    sort?: string,
    searchField?: string,
    id?: number | null
};

const fetchItems = ({
    objectType,
    currentPage = 0,
    orderBy = 'description',
    sort = 'ASC',
    searchField = '',
    id = null
}: TProps) => {
    const apiCallTarget = objectTypeInfo[objectType].apiCall;
    let requestUrl = `${apiBaseUrl}${apiCallTarget}`;

    if (id !== null) {
        requestUrl += `${id}/`;
    }

    requestUrl += stringifyQueryParams(currentPage, orderBy, sort, searchField);

    const requestObject = new Request(
        `${requestUrl}`,
        {
            method: "get",
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
            throw new Error(error);
        })
};

export default fetchItems;
