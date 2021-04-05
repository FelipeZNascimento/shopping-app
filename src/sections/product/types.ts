export type TProductInfo = {
    price: number;
    discount: boolean;
    unit: number;
    brandId: number;
    placeId: number;
    productCategoryId: number;
    description: string;
    categoryDescription: string;
    date: string;
    brandDescription: string;
}

export type TProductGraphic = {
    brand: string;
    date: string;
    discount: boolean;
    place: string;
    price: number;
}
