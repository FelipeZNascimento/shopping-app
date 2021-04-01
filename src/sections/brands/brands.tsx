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
    getBrands,
    getBrandsCount,
    getBrandNames,
    getIsLoading
} from 'store/brand/selector';

// Components
import { Fab } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { AddCircle as AddIcon } from '@material-ui/icons';
import { Loading, SearchInput, Table } from 'components/index';
import AddBrandModal from './components/add_brand_modal';
import DeleteBrandModal from './components/delete_brand_modal';

// Types, Constants, Misc
import { resultsPerPage } from 'constants/general';
import { IAutocompleteItem } from 'components/autocomplete/types';
import {
    IBrand,
    IItemName,
    ISortingState
} from 'constants/objectInterfaces';
import { invertSort } from 'utils/utils';

const defaultSortState = {
    orderBy: 'description',
    sort: 'ASC'
};

const BrandsSection = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSortState, setCurrentSortState] = useState<ISortingState>(defaultSortState);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchField, setSearchField] = useState<string>('');
    const [toBeDeleted, setToBeDeleted] = useState<IBrand | null>(null);

    const dispatch = useDispatch();
    const brands: IBrand[] = useSelector(getBrands);
    const brandNames: IItemName[] = useSelector(getBrandNames);
    const totalCount: number = useSelector(getBrandsCount);
    const isLoading: boolean = useSelector(getIsLoading);

    useEffect(() => {
        dispatch(fetchBrands(currentPage - 1));
        if (brandNames.length === 0) {
            dispatch(fetchBrandNames());
        }
    }, []);

    const headers = [
        {
            key: 'description',
            value: 'Marca',
            sortable: true
        }
    ];

    const onDeleteBrand = () => {
        if (toBeDeleted) {
            dispatch(deleteBrand(toBeDeleted));
        }
        setToBeDeleted(null);
    }

    const onAddNewBrand = (newBrand: IBrand) => {
        dispatch(saveBrand(newBrand));
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
            <SearchInput
                options={brandNames}
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
            <Table
                bodyColumns={isLoading ? [] : brands}
                color="pink"
                headerColumns={headers}
                isLoading={isLoading}
                onSecondaryAction={(brand: IBrand) => setToBeDeleted(brand)}
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

export default BrandsSection;
