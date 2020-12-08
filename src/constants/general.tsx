// export const apiBaseUrl = 'http://localhost:8081/shopping/';
export const apiBaseUrl = 'https://omega-cors.herokuapp.com/shopping/';

export const objectTypes = Object.freeze({
    brands: 1,
    products: 2,
    places: 3,
    placesCategories: 4,
    productsCategories: 5,
    shoppingList: 6,
});

export const objectTypeInfo = Object.freeze({
    [objectTypes.brands]: {
        modelId: 'brand',
        description: 'Marcas',
        dispatch: 'BRANDS',
        apiCall: 'brands/',
    },
    [objectTypes.products]: {
        modelId: 'product',
        description: 'Produtos',
        dispatch: 'PRODUCTS',
        apiCall: 'products/',
    },
    [objectTypes.places]: {
        modelId: 'place',
        description: 'Lugares',
        dispatch: 'PLACES',
        apiCall: 'places/',
    },
    [objectTypes.placesCategories]: {
        modelId: 'placeCategory',
        description: 'Categorias (Lugares)',
        dispatch: 'PLACES_CATEGORIES',
        apiCall: 'places_categories/',
    },
    [objectTypes.productsCategories]: {
        modelId: 'productCategory',
        description: 'Categorias (Produtos)',
        dispatch: 'PRODUCTS_CATEGORIES',
        apiCall: 'products_categories/',
    },
    [objectTypes.shoppingList]: {
        modelId: 'shoppingList',
        description: 'Lista de Compras',
        dispatch: 'SHOPPING_LIST',
        apiCall: 'shopping_list/',
    },
});
