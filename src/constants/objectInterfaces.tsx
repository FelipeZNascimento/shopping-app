export interface IBrand {
    created: string;
    description: string;
    id: number;
}

export interface IPlace {
    category_description: string;
    category_id: number | undefined;
    created: string;
    description: string;
    id: number | undefined;
}

export interface IProduct {
    category_description: string;
    category_id: number | null;
    created: string;
    description: string;
    id: number | null;
    product_id: number | null;
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
    id: number | undefined;
    description: string;
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
}