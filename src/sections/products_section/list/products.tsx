import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

// Actions
import {
    deleteProduct,
    fetchProducts,
    fetchProductNames,
    fetchProductCategoryNames,
    saveProduct
} from 'store/product/actions';
import { addToShoppingList } from 'store/shopping_list/actions';
import { convertToPurchase } from 'store/purchase/actions';
// import { setProductToShoppingList } from 'services/dataSetters';

// Selectors
import {
    getProductNames,
    getProductCategoryNames,
    getProducts,
    getProductsCount,
    isLoading
} from 'store/product/selector';
import { shoppingList as listShopping } from 'store/shopping_list/selector';
import { getPurchaseListLength } from 'store/purchase/selector';

// Components
import { Fab } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { AddCircle as AddIcon, AddShoppingCart } from '@material-ui/icons';
import { Loading, SearchInput, Table } from 'components/index';
import AddProductModal from 'sections/products_section/list/components/add_product_modal';
import DeleteProductModal from 'sections/products_section/list/components/delete_product_modal';

import { routes } from 'constants/routes';
import { resultsPerPage } from 'constants/general';
import { IProduct, IItemName, ISortingState } from 'constants/objectInterfaces';
import { IAutocompleteItem } from 'components/autocomplete/types';
import { invertSort } from 'utils/utils';

const defaultSortState = {
    orderBy: 'description',
    sort: 'ASC'
};

const ProductsList = () => {
    const [checkedProducts, setCheckedProducts] = useState<IProduct[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSortState, setCurrentSortState] = useState<ISortingState>(defaultSortState);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [searchField, setSearchField] = useState<string>('');
    const [toBeDeleted, setToBeDeleted] = useState<IProduct | null>(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const productNames: IItemName[] = useSelector(getProductNames);
    const productCategoryNames: IItemName[] = useSelector(getProductCategoryNames);
    const mergedNames = [...productNames, ...productCategoryNames]
        .sort((a, b) => a.description.localeCompare(b.description));

    const products: IProduct[] = useSelector(getProducts);
    const totalCount = useSelector(getProductsCount);
    const shoppingList: IProduct[] = useSelector(listShopping);
    const isProductsLoading: boolean = useSelector(isLoading);
    const purchaseListLength: number = useSelector(getPurchaseListLength);

    useEffect(() => {
        dispatch(fetchProducts(currentPage - 1));
        if (productNames.length === 0) {
            dispatch(fetchProductNames());
        }

        if (productCategoryNames.length === 0) {
            dispatch(fetchProductCategoryNames());
        }
    }, []);

    const headers = [
        {
            key: 'category_description',
            value: 'Categoria',
            sortable: true
        },
        {
            key: 'description',
            value: 'Produto',
            sortable: true
        }
    ];

    const onDeleteProduct = () => {
        if (toBeDeleted) {
            dispatch(deleteProduct(toBeDeleted));
        }

        setToBeDeleted(null);
    }

    const onAddNewProduct = (product: IProduct) => {
        dispatch(saveProduct(product));
        setIsAddProductOpen(false);
    };

    const onAddToShoppingList = (product: IProduct) => {
        if (shoppingList.find((item) => item.id === product.id) === undefined) {
            dispatch(addToShoppingList(product));
        }
    };

    const onSortChange = (orderBy: string, sort: string) => {
        const newSort: string = orderBy === currentSortState.orderBy ? invertSort(currentSortState.sort) : sort;

        setCurrentSortState({ orderBy, sort: newSort });
        dispatch(fetchProducts(currentPage - 1, { orderBy, sort: newSort }, searchField));
    };

    const onCheckboxClick = (productList: IProduct[]) => {
        setCheckedProducts(productList);
    };

    const onConvertClick = () => {
        dispatch(convertToPurchase(checkedProducts, purchaseListLength));
        history.push(routes.PURCHASE_FORM);
    };

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
        dispatch(fetchProducts(newPage - 1, currentSortState, searchField));
    };

    const onSearch = (item: IAutocompleteItem | string | null) => {
        let newSearchInput = '';
        if (item !== null) {
            newSearchInput = typeof (item) === 'string' ? item : item.description;
        }

        setSearchField(newSearchInput);
        if (newSearchInput.length >= 2 || newSearchInput.length === 0) {
            dispatch(fetchProducts(0, currentSortState, newSearchInput));
        }
    };

    const renderFab = () => {
        if (checkedProducts.length > 0) {
            return (
                <Fab
                    classes={{ root: 'of-cyan-bg' }}
                    className="fab-bottom"
                    size="large"
                    variant="extended"
                    onClick={onConvertClick}
                >
                    <AddShoppingCart />&nbsp;
                    Converter em compra
                </Fab>
            )
        }

        return (
            <Fab
                classes={{ root: 'of-green-bg' }}
                className="fab-bottom"
                size="large"
                variant="extended"
                onClick={() => setIsAddProductOpen(true)}
            >
                <AddIcon />&nbsp;
                Novo produto
            </Fab>
        );
    }

    return (
        <>
            {renderFab()}
            <SearchInput
                options={mergedNames}
                onSearch={onSearch}
            />
            <div className="bottom-padding-l">
                <Pagination
                    color="primary"
                    count={Math.ceil(totalCount / resultsPerPage)}
                    page={currentPage}
                    size="large"
                    shape="rounded"
                    variant="outlined"
                    onChange={(event, newPage) => onPageChange(newPage)}
                />
            </div>
            {!isProductsLoading && <Table
                bodyColumns={products}
                checkedProducts={checkedProducts}
                color="green"
                headerColumns={headers}
                sortState={currentSortState}
                onCheckboxAction={onCheckboxClick}
                onMainAction={onAddToShoppingList}
                onSecondaryAction={setToBeDeleted}
                onSortChange={onSortChange}
            />}
            {isProductsLoading && <Loading />}
            <AddProductModal
                isOpen={isAddProductOpen}
                onClose={() => setIsAddProductOpen(false)}
                onConfirm={onAddNewProduct}
            />
            <DeleteProductModal
                product={toBeDeleted}
                onClose={() => setToBeDeleted(null)}
                onConfirm={onDeleteProduct}
            />
            <div className="top-padding-l">
                <Pagination
                    color="primary"
                    count={Math.ceil(totalCount / resultsPerPage)}
                    page={currentPage}
                    size="large"
                    shape="rounded"
                    variant="outlined"
                    onChange={(event, newPage) => onPageChange(newPage)}
                />
            </div>

        </>

    )
}

export default ProductsList;
