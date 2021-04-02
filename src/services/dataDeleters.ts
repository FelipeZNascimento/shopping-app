import {
    apiBaseUrl,
    objectTypeInfo,
} from 'constants/general';

import { http } from './utilities';

type TProps = {
    objectId: number,
    objectType: number
};

const deleteItems = ({
    objectId,
    objectType
}: TProps) => {
    const apiCallTarget = objectTypeInfo[objectType].apiCall;

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

    return http(requestObject)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            throw error;
        })

};

export default deleteItems;