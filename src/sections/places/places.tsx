import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { removeFromList } from '../../store/main/actions';
import { fetchItems } from '../../services/dataGetters';
import { setItem } from '../../services/dataSetters';
import deleteItem from '../../services/dataDeleters';

// Selectors
import { isLoading, returnItems } from '../../store/main/selector';

// Components
import { Fab } from '@material-ui/core';
import { AddCircle as AddIcon } from '@material-ui/icons';
import { Loading, Table } from '../../components/index';
import AddPlaceModal from './components/add_place_modal';
import DeletePlaceModal from './components/delete_place_modal';

import { objectTypes } from '../../constants/general';
import { IPlace } from '../../constants/objectInterfaces';

const PlacesSection = () => {
    const [isAddPlaceOpen, setIsAddPlaceOpen] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState<IPlace | null>(null);

    const dispatch = useDispatch();
    const places: IPlace[] = useSelector((state) => returnItems(state, objectTypes.places));
    const isPlacesLoading: boolean = useSelector(isLoading);

    useEffect(() => {
        dispatch(fetchItems(objectTypes.places));
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

    const deletePlace = () => {
        if (toBeDeleted) {
            dispatch(deleteItem(toBeDeleted.id, objectTypes.places));
            dispatch(removeFromList(toBeDeleted, objectTypes.places));
        }
        setToBeDeleted(null);
    }

    const addNewPlace = (product: IPlace) => {
        dispatch(setItem([product], objectTypes.places));
        setIsAddPlaceOpen(false);
    };

    const onSortChange = (column: string, direction: string) => {
        console.log('Sorting by: ' + column + direction);
        dispatch(fetchItems(objectTypes.places, column, direction));        
    };

    return (
        <>
            <Fab
                classes={{root: 'of-yellow-bg'}}
                className="fab-bottom"
                size="large"
                variant="extended"
                onClick={() => setIsAddPlaceOpen(true)}
            >
                <AddIcon />&nbsp;
                Novo lugar
            </Fab>
            <Table
                bodyColumns={places}
                color="yellow"
                headerColumns={headers}
                onSecondaryAction={(product: IPlace) => setToBeDeleted(product)}
                onSortChange={(column: string, direction: string) => onSortChange(column, direction)}
            />
            {isPlacesLoading && <Loading />}
            <AddPlaceModal
                isOpen={isAddPlaceOpen}
                onClose={() => setIsAddPlaceOpen(false)}
                onConfirm={addNewPlace}
            />
            <DeletePlaceModal
                place={toBeDeleted}
                onClose={() => setToBeDeleted(null)}
                onConfirm={deletePlace}
            />
        </>
    )
}

export default PlacesSection;
