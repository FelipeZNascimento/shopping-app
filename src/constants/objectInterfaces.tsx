export interface IBrand {
    created: string;
    description: string;
    id: number;
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
}

export interface IShoppingListItem {
    category_description: string;
    category_id: number | null;
    created: string;
    description: string;
    product_id: number | null;
    id: number | null;
}

export interface ICategory {
    id: number;
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
    unity: number;
    price: number;
    total_price: number;
}