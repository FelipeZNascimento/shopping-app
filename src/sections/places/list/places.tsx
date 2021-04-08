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
    selectIsLoading,
    selectPlaces,
    selectPlaceNames,
    selectPlaceCategoryNames,
    selectPlacesCount
} from 'store/place/selector';

// Components
import { Fab, IconButton } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { AddCircle as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { GenericTable, Loading, SearchInput } from 'components/index';
import AddPlaceModal from './components/add_place_modal';
import DeletePlaceModal from './components/delete_place_modal';

import {
    TItemName,
    TPlace
} from 'constants/objectInterfaces';
import { IAutocompleteItem } from 'components/autocomplete/types';
import { TSortingState } from 'components/generic_table/types';
import { invertSort } from 'utils/utils';
import { resultsPerPage } from 'constants/general';
import styles from './places.module.scss';

const defaultSortState = {
    orderBy: 'description',
    sort: 'ASC'
};

const PlacesList = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [currentSortState, setCurrentSortState] = useState<TSortingState>(defaultSortState);
    const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
    const [searchField, setSearchField] = useState<string>('');
    const [toBeDeleted, setToBeDeleted] = useState<TPlace | null>(null);

    const dispatch = useDispatch();
    const placeNames: TItemName[] = useSelector(selectPlaceNames);
    const placeCategoryNames: TItemName[] = useSelector(selectPlaceCategoryNames);
    const mergedNames = [...placeNames, ...placeCategoryNames]
        .sort((a, b) => a.description.localeCompare(b.description));

    const places: TPlace[] = useSelector(selectPlaces);
    const totalCount = useSelector(selectPlacesCount);

    const isLoading: boolean = useSelector(selectIsLoading);

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
            key: 'id',
            renderFunction: () => 'id',
            sortable: true,
            showOnMobile: false
        },
        {
            key: 'category',
            renderFunction: () => 'Categoria',
            sortable: true,
            showOnMobile: true
        },
        {
            key: 'description',
            renderFunction: () => 'Lugar',
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

    const renderDeleteIcon = (item: TPlace) => (
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
            renderFunction: (item: TPlace) => <td className="align-left">{item.id}</td>,
            showOnMobile: false
        },
        {
            key: 'category',
            renderFunction: (item: TPlace) => <td className="align-left">{item.category.description}</td>,
            showOnMobile: true
        },
        {
            key: 'description',
            renderFunction: (item: TPlace) => <td className="align-left">{item.description}</td>,
            showOnMobile: true
        },
        {
            key: 'delete',
            renderFunction: (item: TPlace) => <td className="align-right">{renderDeleteIcon(item)}</td>,
            showOnMobile: true
        }
    ];
    const onDeletePlace = () => {
        if (toBeDeleted) {
            dispatch(deletePlace(
                toBeDeleted,
                currentPage - 1,
                currentSortState,
                searchField
            ));
        }
        setToBeDeleted(null);
    }

    const onAddNewPlace = (place: TPlace) => {
        dispatch(savePlace(
            place,
            currentPage - 1,
            currentSortState,
            searchField
        ));
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
                    bodyColumns={isLoading ? [] : bodyColumns}
                    color="yellow"
                    data={places}
                    headerColumns={headers}
                    isLoading={isLoading}
                    sortState={currentSortState}
                    onSortChange={(column: string, direction: string) => onSortChange(column, direction)}
                />
                {isLoading && <Loading />}
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
            </div>
        </>
    )
}

export default PlacesList;
