export interface IBrand {
    created: string;
    description: string;
    id: number | null;
}

export interface IPlace {
    category_description: string;
    category_id: number | null;
    created: string;
    description: string;
    id: number | null;
}

export interface IProduct {
    category_description: string;
    category_id: number | null;
    created: string;
    description: string;
    id: number | null;
    product_id: number | null;
}

export interface IProductsObject {
    totalCount: number,
    data: IProduct[]
}

export interface IItemName {
    description: string,
    id: number
}

export interface IShoppingListItem {
    category_description: string;
    category_id: number | null;
    created: string;
    description: string;
    id: number | null;
    product_id: number | null;
}

export interface ICategory {
    id: number | null;
    description: string;
}

export interface ICategoriesObject {
    totalCount: number,
    data: ICategory[]
}

export interface IPurchase {
    id: number;
    date: string;
    total: number;
    description: string;
    items: number;
}

export interface IPurchaseItem {
    id: number;
    brand_description: string;
    brand_id: number | null;

    category_description: string;
    category_id: number | null;
    created: string;
    description: string;
    product_id: number | null;

    quantity: number;
    unit: number;
    price: number;
    total_price: number;
    promotion?: boolean;
    details?: string;
}

export interface ISortingState {
    orderBy: string;
    sort: string
}
