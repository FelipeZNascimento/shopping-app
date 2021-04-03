import {
    apiBaseUrl,
    objectTypeInfo,
} from 'constants/general';

import { http } from './utilities';

type TProps = {
    objectType: number,
    currentPage?: number,
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
    let hasQueryParams = false;

    if (id !== null) {
        requestUrl += `${id}/`;
    }

    if (currentPage !== 0) {
        const parameter = `page=${currentPage}`;
        const queryParam = hasQueryParams ? `&${parameter}` : `?${parameter}`;

        requestUrl += queryParam;
        hasQueryParams = true;
    }

    if (orderBy !== 'description') {
        const parameter = `orderBy=${orderBy}`;
        const queryParam = hasQueryParams ? `&${parameter}` : `?${parameter}`;

        requestUrl += queryParam;
        hasQueryParams = true;
    }

    if (sort !== 'ASC') {
        const parameter = `sort=${sort}`;
        const queryParam = hasQueryParams ? `&${parameter}` : `?${parameter}`;

        requestUrl += queryParam;
        hasQueryParams = true;
    }

    if (searchField !== '') {
        const parameter = `searchField=${searchField}`;
        const queryParam = hasQueryParams ? `&${parameter}` : `?${parameter}`;

        requestUrl += queryParam;
        hasQueryParams = true;
    }

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
