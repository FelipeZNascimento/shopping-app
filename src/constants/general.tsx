// export const apiBaseUrl = 'http://localhost:8081/shopping/';
export const apiBaseUrl = 'https://omega-cors.herokuapp.com/shopping/';

export const resultsPerPage = 20;
export const objectTypes = Object.freeze({
    brands: 1,
    products: 2,
    places: 3,
    placesCategories: 4,
    productCategories: 5,
    shoppingList: 6,
    productNames: 7,
    productCategoryNames: 8,
    brandNames: 9,
    placeNames: 10,
    placeCategoryNames: 11,
    purchases: 12,
    fullPurchase: 13,
    product: 14
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
    [objectTypes.productCategories]: {
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
    [objectTypes.productNames]: {
        modelId: 'productNames',
        description: 'Nomes de Produtos',
        dispatch: 'PRODUCT_NAMES',
        apiCall: 'product_names/',
    },
    [objectTypes.productCategoryNames]: {
        modelId: 'productCategoryNames',
        description: 'Nomes de Categories Produtos',
        dispatch: 'PRODUCT_CATEGORY_NAMES',
        apiCall: 'product_category_names/',
    },
    [objectTypes.brandNames]: {
        modelId: 'brandNames',
        description: 'Nomes de Marcas',
        dispatch: 'BRAND_NAMES',
        apiCall: 'brand_names/',
    },
    [objectTypes.placeNames]: {
        modelId: 'placeNames',
        description: 'Nomes de Lugares',
        dispatch: 'PLACE_NAMES',
        apiCall: 'place_names/',
    },
    [objectTypes.placeCategoryNames]: {
        modelId: 'placeCategoryNames',
        description: 'Nomes de Categorias Lugares',
        dispatch: 'PLACE_CATEGORY_NAMES',
        apiCall: 'place_category_names/',
    },
    [objectTypes.purchases]: {
        modelId: 'purchases',
        description: 'Histórico de Compras',
        dispatch: 'PURCHASES',
        apiCall: 'purchases/',
    },
    [objectTypes.fullPurchase]: {
        modelId: 'purchase',
        description: 'Compra',
        dispatch: 'PURCHASE',
        apiCall: 'purchase/',
    },
    [objectTypes.product]: {
        modelId: 'product',
        description: 'Produto',
        dispatch: 'PRODUCT',
        apiCall: 'product/',
    }
});
