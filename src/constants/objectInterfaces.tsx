type TBase = {
    id: number | null;
    description: string;
    created?: string;
}

export type TBrand = TBase;
export type TCategory = TBase;
export type TItemName = TBase;

export type TPlace = TBase & {
    category: TCategory;
}

export type TProduct = TBase & {
    category: TCategory;
}

export type TPurchaseDetail = {
    price: number;
    quantity: number;
    unit: number;
    discount: boolean;
    details: string;

    brand: TBrand | null;
    product: TProduct;
};

export type TPurchaseItem = TPurchaseDetail & {
    id: number;
}

export type TShoppingListItem = {
    id: number;
    product: TProduct;
}

export type TPurchase = {
    numberOfItems: number;
    id: number;
    date: string;
    total: number;
    created: number;
    place: TPlace;
}

export type TProductHistoryItem = {
    price: number;
    details: string;
    discount: boolean;
    unit: number;
    date: string;
    brand: TBrand | null;
    place: TPlace;
}
