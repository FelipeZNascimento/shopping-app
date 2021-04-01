import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import {
    deletePlace,
    fetchPlaces,
    fetchPlaceNames,
    fetchPlaceCategoryNames,
    savePlace
} from 'store/place/actions';

// Selectors
import {
    getIsLoading,
    getPlaces,
    getPlaceNames,
    getPlaceCategoryNames,
    getPlacesCount
} from 'store/place/selector';

// Components
import { Fab } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { AddCircle as AddIcon } from '@material-ui/icons';
import { Loading, SearchInput, Table } from 'components/index';
import AddPlaceModal from './components/add_place_modal';
import DeletePlaceModal from './components/delete_place_modal';

import { 
    IItemName,
    IPlace,
    ISortingState
} from 'constants/objectInterfaces';
import { IAutocompleteItem } from 'components/autocomplete/types';
import { invertSort } from 'utils/utils';
import { resultsPerPage } from 'constants/general';

const defaultSortState = {
    orderBy: 'description',
    sort: 'ASC'
};

const PlacesList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSortState, setCurrentSortState] = useState<ISortingState>(defaultSortState);
    const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
    const [searchField, setSearchField] = useState<string>('');
    const [toBeDeleted, setToBeDeleted] = useState<IPlace | null>(null);

    const dispatch = useDispatch();
    const placeNames: IItemName[] = useSelector(getPlaceNames);
    const placeCategoryNames: IItemName[] = useSelector(getPlaceCategoryNames);
    const mergedNames = [...placeNames, ...placeCategoryNames]
        .sort((a, b) => a.description.localeCompare(b.description));

    const places: IPlace[] = useSelector(getPlaces);
    const totalCount = useSelector(getPlacesCount);

    const isPlacesLoading: boolean = useSelector(getIsLoading);

    useEffect(() => {
        dispatch(fetchPlaces(currentPage - 1));
        if (placeNames.length === 0) {
            dispatch(fetchPlaceNames());
        }

        if (placeCategoryNames.length === 0) {
            dispatch(fetchPlaceCategoryNames());
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
            value: 'Lugar',
            sortable: true
        }
    ];

    const onDeletePlace = () => {
        if (toBeDeleted) {
            dispatch(deletePlace(toBeDeleted));
        }
        setToBeDeleted(null);
    }

    const onAddNewPlace = (place: IPlace) => {
        dispatch(savePlace(place));
        setIsAddPlaceOpen(false);
    };

    const onSortChange = (orderBy: string, sort: string) => {
        const newSort: string = orderBy === currentSortState.orderBy ? invertSort(currentSortState.sort) : sort;

        setCurrentSortState({ orderBy, sort: newSort });
        dispatch(fetchPlaces(currentPage - 1, { orderBy, sort: newSort }, searchField));
    };

    const onPageChange = (newPage: number) => {
        setCurrentPage(newPage);
        dispatch(fetchPlaces(newPage - 1, currentSortState, searchField));
    };

    const onSearch = (item: IAutocompleteItem | string | null) => {
        let newSearchInput = '';
        if (item !== null) {
            newSearchInput = typeof (item) === 'string' ? item : item.description;
        }

        setSearchField(newSearchInput);
        if (newSearchInput.length >= 2 || newSearchInput.length === 0) {
            dispatch(fetchPlaces(0, currentSortState, newSearchInput));
        }
    };

    return (
        <>
            <Fab
                classes={{ root: 'of-yellow-bg' }}
                className="fab-bottom"
                size="large"
                variant="extended"
                onClick={() => setIsAddPlaceOpen(true)}
            >
                <AddIcon />&nbsp;
                Novo lugar
            </Fab>
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
            <Table
                bodyColumns={places}
                color="yellow"
                headerColumns={headers}
                isLoading={isPlacesLoading}
                sortState={currentSortState}
                onSecondaryAction={(product: IPlace) => setToBeDeleted(product)}
                onSortChange={(column: string, direction: string) => onSortChange(column, direction)}
            />
            {isPlacesLoading && <Loading />}
            <AddPlaceModal
                isOpen={isAddPlaceOpen}
                onClose={() => setIsAddPlaceOpen(false)}
                onConfirm={onAddNewPlace}
            />
            <DeletePlaceModal
                place={toBeDeleted}
                onClose={() => setToBeDeleted(null)}
                onConfirm={onDeletePlace}
            />
        </>
    )
}

export default PlacesList;
