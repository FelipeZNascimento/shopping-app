import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from "react-router-dom";

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

// Selectors
import {
    selectProductNames,
    selectProductCategoryNames,
    selectProducts,
    selectProductsCount,
    selectIsLoading
} from 'store/product/selector';
import { selectShoppingList } from 'store/shopping_list/selector';
import { selectPurchaseList } from 'store/purchase/selector';

// Components
import { Checkbox, Fab, IconButton } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import {
    AddCircle as AddIcon,
    AddShoppingCart,
    Delete as DeleteIcon,
    PlaylistAdd
} from '@material-ui/icons';
import { GenericTable, SearchInput } from 'components/index';
import AddProductModal from 'sections/products/list/components/add_product_modal';
import DeleteProductModal from 'sections/products/list/components/delete_product_modal';

import { routes } from 'constants/routes';
import { resultsPerPage } from 'constants/general';
import {
    TItemName,
    TProduct,
    TPurchaseItem,
    TShoppingListItem
} from 'constants/objectInterfaces';
import { TSortingState } from 'components/generic_table/types';
import { IAutocompleteItem } from 'components/autocomplete/types';
import { invertSort } from 'utils/utils';
import styles from './products.module.scss';

const defaultSortState = {
    orderBy: 'description',
    sort: 'ASC'
};

const ProductsList = () => {
    const [checkedProducts, setCheckedProducts] = useState<TProduct[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSortState, setCurrentSortState] = useState<TSortingState>(defaultSortState);
    const [isAddProductOpen, setIsAddProductOpen] = useState(false);
    const [searchField, setSearchField] = useState<string>('');
    const [toBeDeleted, setToBeDeleted] = useState<TProduct | null>(null);

    const dispatch = useDispatch();
    const history = useHistory();

    const productNames: TItemName[] = useSelector(selectProductNames);
    const productCategoryNames: TItemName[] = useSelector(selectProductCategoryNames);
    const mergedNames = [...productNames, ...productCategoryNames]
        .sort((a, b) => a.description.localeCompare(b.description));

    const products: TProduct[] = useSelector(selectProducts);
    const totalCount = useSelector(selectProductsCount);
    const shoppingList: TShoppingListItem[] = useSelector(selectShoppingList);
    const isProductsLoading: boolean = useSelector(selectIsLoading);
    const purchaseList: TPurchaseItem[] = useSelector(selectPurchaseList);

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
            key: 'actions',
            renderFunction: () => '',
            sortable: false,
            showOnMobile: true
        },
        {
            key: 'id',
            renderFunction: () => 'Id',
            sortable: true,
            showOnMobile: false
        },
        {
            key: 'category',
            renderFunction: () => 'Categoria',
            sortable: true,
            showOnMobile: false
        },
        {
            key: 'description',
            renderFunction: () => 'Produto',
            sortable: true,
            showOnMobile: true
        },
        {
            key: 'delete',
            renderFunction: () => '',
            sortable: false,
            showOnMobile: true
        }
    ];

    const renderDeleteIcon = (item: TProduct) => (
        <IconButton
            aria-label="delete"
            classes={{ root: styles.icon }}
            onClick={() => setToBeDeleted(item)}
        >
            <DeleteIcon classes={{ root: styles.icon }} />
        </IconButton>
    );

    const onCheckboxClick = (item: TProduct) => {
        let updatedCheckedProducts;
        const index = checkedProducts.findIndex((product: TProduct) => product.id === item.id);
        if (index === -1) {
            updatedCheckedProducts = [
                ...checkedProducts,
                item
            ];
        } else {
            const filteredProducts = checkedProducts.filter((product: TProduct) => item.id !== product.id);
            updatedCheckedProducts = [...filteredProducts];
        }

        setCheckedProducts(updatedCheckedProducts);
    };

    const isChecked = (item: TProduct) => (checkedProducts.findIndex((product: TProduct) => product.id === item.id) !== -1);
    const renderCheckbox = (item: TProduct) => (
        <Checkbox
            checked={isChecked(item)}
            size="small"
            inputProps={{ 'aria-label': 'checkbox with small size' }}
            onClick={() => onCheckboxClick(item)}
        />
    );

    const renderAddToShoppingList = (item: TProduct) => (
        <IconButton
            aria-label="add"
            onClick={() => onAddToShoppingList(item)}
        >
            <PlaylistAdd classes={{ root: 'of-green' }} />
        </IconButton>
    );

    const bodyColumns = [
        {
            key: 'actions',
            renderFunction: (item: TProduct) => <td>{renderCheckbox(item)} {renderAddToShoppingList(item)}</td>,
            showOnMobile: true
        },
        {
            key: 'id',
            renderFunction: (item: TProduct) => <td className="align-left">{item.id}</td>,
            showOnMobile: false
        },
        {
            key: 'category',
            renderFunction: (item: TProduct) => <td className="align-left">{item.category.description}</td>,
            showOnMobile: false
        },
        {
            key: 'description',
            renderFunction: (item: TProduct) => (
                <td className="align-left">
                    <Link to={routes.PRODUCT + `/${item.id}`}>{item.description}</Link>
                </td>
            ),
            showOnMobile: true
        },
        {
            key: 'delete',
            renderFunction: (item: TProduct) => <td className="align-right">{renderDeleteIcon(item)}</td>,
            showOnMobile: true
        }
    ];

    const onDeleteProduct = () => {
        if (toBeDeleted) {
            dispatch(deleteProduct(
                toBeDeleted,
                currentPage - 1,
                currentSortState,
                searchField
            ));
        }

        setToBeDeleted(null);
    }

    const onAddNewProduct = (product: TProduct) => {
        dispatch(saveProduct(
            product,
            currentPage - 1,
            currentSortState,
            searchField
        ));
        setIsAddProductOpen(false);
    };

    const onAddToShoppingList = (product: TProduct) => {
        if (shoppingList.find((item) => item.id === product.id) === undefined) {
            dispatch(addToShoppingList(product));
        }
    };

    const onSortChange = (orderBy: string, sort: string) => {
        const newSort: string = orderBy === currentSortState.orderBy ? invertSort(currentSortState.sort) : sort;

        setCurrentSortState({ orderBy, sort: newSort });
        dispatch(fetchProducts(currentPage - 1, { orderBy, sort: newSort }, searchField));
    };

    const onConvertClick = () => {
        dispatch(convertToPurchase(checkedProducts, purchaseList));
        history.push(routes.NEW_PURCHASE);
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
            <div className={styles.container}>
                <SearchInput
                    options={mergedNames}
                    onSearch={onSearch}
                />
                <div className={styles.pagination}>
                    <Pagination
                        color="primary"
                        count={Math.ceil(totalCount / resultsPerPage)}
                        page={currentPage}
                        size="large"
                        shape="rounded"
                        onChange={(event, newPage) => onPageChange(newPage)}
                    />
                </div>
                <GenericTable
                    bodyColumns={isProductsLoading ? [] : bodyColumns}
                    color="green"
                    data={products}
                    headerColumns={headers}
                    isLoading={isProductsLoading}
                    sortState={currentSortState}
                    onSortChange={(column: string, direction: string) => onSortChange(column, direction)}
                />
                <AddProductModal
                    value={searchField}
                    isOpen={isAddProductOpen}
                    onClose={() => setIsAddProductOpen(false)}
                    onConfirm={onAddNewProduct}
                />
                <DeleteProductModal
                    product={toBeDeleted}
                    onClose={() => setToBeDeleted(null)}
                    onConfirm={onDeleteProduct}
                />
                <div className={styles.pagination}>
                    <Pagination
                        color="primary"
                        count={Math.ceil(totalCount / resultsPerPage)}
                        page={currentPage}
                        size="large"
                        shape="rounded"
                        onChange={(event, newPage) => onPageChange(newPage)}
                    />
                </div>
            </div>
        </>

    )
}

export default ProductsList;
