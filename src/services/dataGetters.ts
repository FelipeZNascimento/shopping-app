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

let controller: (AbortController & { requestUrl?: string }) | null = null;

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

    if (controller && requestUrl === controller.requestUrl) {
        controller.abort();
    }

    controller = new AbortController();
    controller.requestUrl = requestUrl;
    const signal = controller.signal;

    if (id !== null) {
        requestUrl += `${id}/`;
    }

    requestUrl += stringifyQueryParams(currentPage, orderBy, sort, searchField);

    const requestObject = new Request(
        `${requestUrl}`,
        {
            method: "get",
            signal,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'Content-Type',
            },
        }
    );

    return http(requestObject)
        .then((response) => {
            controller = null;
            return response;
        })
        .catch((error) => {
            throw new Error(error);
        })
};

export default fetchItems;
