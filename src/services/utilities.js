/** assumes array elements are primitive types
* check whether 2 arrays are equal sets.
* @param  {} a1 is an array
* @param  {} a2 is an array
*/
export function areArraysEqualSets(a1, a2) {
    const superSet = {};
    for (const i of a1) {
        const e = i + typeof i;
        superSet[e] = 1;
    }

    for (const i of a2) {
        const e = i + typeof i;
        if (!superSet[e]) {
            return false;
        }
        superSet[e] = 2;
    }

    for (let e in superSet) {
        if (superSet[e] === 1) {
            return false;
        }
    }

    return true;
}

export function objectsAreEqual(x, y) {
    for (var propertyName in x) {
        if (x[propertyName] !== y[propertyName]) {
            return false;
        }
    }

    return true;
}

export function arrayOfObjectsAreEqual(x, y) {
    const areEqual = [];
    y.forEach((elementY) => {
        const found = x.find((elementX) => elementY.id === elementX.id);
        if (found === undefined || !objectsAreEqual(elementY, found)) {
            areEqual.push(elementY);
        }
    });

    return areEqual;
}

export function stringifyQueryParams(currentPage, orderBy, sort, searchField) {
    let hasQueryParams = false;
    let queryParams = '';
    if (currentPage !== 0) {
        const parameter = `page=${currentPage}`;
        const queryParam = hasQueryParams ? `&${parameter}` : `?${parameter}`;

        queryParams += queryParam;
        hasQueryParams = true;
    }

    if (orderBy !== 'description') {
        const parameter = `orderBy=${orderBy}`;
        const queryParam = hasQueryParams ? `&${parameter}` : `?${parameter}`;

        queryParams += queryParam;
        hasQueryParams = true;
    }

    if (sort !== 'ASC') {
        const parameter = `sort=${sort}`;
        const queryParam = hasQueryParams ? `&${parameter}` : `?${parameter}`;

        queryParams += queryParam;
        hasQueryParams = true;
    }

    if (searchField !== '') {
        const parameter = `searchField=${searchField}`;
        const queryParam = hasQueryParams ? `&${parameter}` : `?${parameter}`;

        queryParams += queryParam;
        hasQueryParams = true;
    }

    return queryParams;
}

export function http(request) {
    return fetch(request)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                let error;
                if (response.status === 409) {
                    error = new Error('Conflito: esse item está sendo usado em outro lugar e não pode ser alterado.');
                }
                error.status = response.status;
                throw error;
            }
        })
        .then((data) => {
            return data;
        })
        .catch(function (error) {
            throw error;
        });
}