import {
    TBrand,
    TPlace,
    TCategory,
    TProduct
} from 'constants/objectInterfaces';

export const category: TCategory = {
    description: '',
    id: null
};

export const brand: TBrand = {
    description: '',
    id: null
};

export const place: TPlace = {
    id: null,
    description: '',
    category: category
};

export const product: TProduct = {
    description: '',    
    id: null,
    category: category
};
