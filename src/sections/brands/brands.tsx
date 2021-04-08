import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import {
    fetchBrandNames,
    fetchBrands,
    saveBrand,
    deleteBrand
} from 'store/brand/actions';

// Selectors
import {
    selectBrands,
    selectBrandsCount,
    selectBrandNames,
    selectIsLoading
} from 'store/brand/selector';

// Components
import { Fab, IconButton } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { AddCircle as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { GenericTable, Loading, SearchInput } from 'components/index';
import AddBrandModal from './components/add_brand_modal';
import DeleteBrandModal from './components/delete_brand_modal';

// Types, Constants, Misc
import { resultsPerPage } from 'constants/general';
import { IAutocompleteItem } from 'components/autocomplete/types';
import { TSortingState } from 'components/generic_table/types';
import {
    TBrand,
    TItemName
} from 'constants/objectInterfaces';
import { invertSort } from 'utils/utils';
import styles from './brands.module.scss';

const defaultSortState = {
    orderBy: 'description',
    sort: 'ASC'
};

const BrandsSection = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSortState, setCurrentSortState] = useState<TSortingState>(defaultSortState);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchField, setSearchField] = useState<string>('');
    const [toBeDeleted, setToBeDeleted] = useState<TBrand | null>(null);

    const dispatch = useDispatch();
    const brands: TBrand[] = useSelector(selectBrands);
    const brandNames: TItemName[] = useSelector(selectBrandNames);
    const totalCount: number = useSelector(selectBrandsCount);
    const isLoading: boolean = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchBrands(currentPage - 1));
        if (brandNames.length === 0) {
            dispatch(fetchBrandNames());
        }
    }, []);

    const headers = [
        {
            key: 'id',
            renderFunction: () => 'Id',
            sortable: true,
            showOnMobile: false
        },
        {
            key: 'description',
            renderFunction: () => 'Marca',
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

    const renderDeleteIcon = (item: TBrand) => (
        <IconButton
            aria-label="delete"
            classes={{ root: styles.icon }}
            onClick={() => setToBeDeleted(item)}
        >
            <DeleteIcon classes={{ root: styles.icon }} />
        </IconButton>
    );

    const bodyColumns = [
        {
            key: 'id',
            renderFunction: (item: TBrand) => <td className="align-left">{item.id}</td>,
            showOnMobile: false
        },
        {
            key: 'place',
            renderFunction: (item: TBrand) => <td className="align-left">{item.description}</td>,
            showOnMobile: true
        },
        {
            key: 'brand',
            renderFunction: (item: TBrand) => <td className="align-right">{renderDeleteIcon(item)}</td>,
            showOnMobile: true
        }
    ];

    const onDeleteBrand = () => {
        if (toBeDeleted) {
            dispatch(deleteBrand(
                toBeDeleted,
                currentPage - 1,
                currentSortState,
                searchField
            ));
        }
        setToBeDeleted(null);
    }

    const onAddNewBrand = (newBrand: TBrand) => {
        dispatch(saveBrand(
            newBrand,
            currentPage - 1,
            currentSortState,
            searchField
        ));
        setIsAddModalOpen(false);
    };

    const onSearch = (item: IAutocompleteItem | string | null) => {
        let newSearchInput = '';
        if (item !== null) {
            newSearchInput = typeof (item) === 'string' ? item : item.description;
        }

        setSearchField(newSearchInput);
        if (newSearchInput.length >= 2 || newSearchInput.length === 0) {
            dispatch(fetchBrands(0, currentSortState, newSearchInput));
        }
    };

    const onSortChange = (orderBy: string, sort: string) => {
        const newSort: string = orderBy === currentSortState.orderBy ? invertSort(currentSortState.sort) : sort;

        setCurrentSortState({ orderBy, sort: newSort });
        dispatch(fetchBrands(currentPage - 1, { orderBy, sort: newSort }, searchField));
    };

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
        dispatch(fetchBrands(newPage - 1, currentSortState, searchField));
    };

    return (
        <>
            <Fab
                classes={{ root: 'of-pink-bg' }}
                className="fab-bottom"
                size="large"
                variant="extended"
                onClick={() => setIsAddModalOpen(true)}
            >
                <AddIcon />&nbsp;
                Nova marca
            </Fab>

            <div className={styles.container}>
                <SearchInput
                    options={brandNames}
                    onSearch={onSearch}
                />
                <div className={styles.pagination}>
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
                <GenericTable
                    bodyColumns={isLoading ? [] : bodyColumns}
                    color="pink"
                    data={brands}
                    headerColumns={headers}
                    isLoading={isLoading}
                    sortState={currentSortState}
                    onSortChange={(column: string, direction: string) => onSortChange(column, direction)}
                />
                {isLoading && <Loading />}
                <AddBrandModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                    onConfirm={onAddNewBrand}
                />
                <DeleteBrandModal
                    brand={toBeDeleted}
                    onClose={() => setToBeDeleted(null)}
                    onConfirm={onDeleteBrand}
                />
                <div className={styles.pagination}>
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
            </div>
        </>
    );
}

export default BrandsSection;
