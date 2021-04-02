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
    searchField?: string
};

const fetchItems = ({
    objectType,
    currentPage = 0,
    orderBy = 'description',
    sort = 'ASC',
    searchField = ''
}: TProps) => {
    const apiCallTarget = objectTypeInfo[objectType].apiCall;

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

    return http(requestObject)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw new Error(error);
        })
};

export default fetchItems;
