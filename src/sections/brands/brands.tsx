import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Actions
import { getBrands, removeFromList } from '../../store/main/actions';
import { setItem } from '../../services/dataSetters';
import deleteItem from '../../services/dataDeleters';

// Selectors
import { isLoading, returnItems } from '../../store/main/selector';

// Components
import { Fab } from '@material-ui/core';
import { AddCircle as AddIcon } from '@material-ui/icons';
import { Loading, Table } from '../../components/index';
import AddBrandModal from './components/add_brand_modal';
import DeleteBrandModal from './components/delete_brand_modal';

import { objectTypes } from '../../constants/general';
import { IBrand } from '../../constants/objectInterfaces';

const BrandsSection = () => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState<IBrand | null>(null);

    const dispatch = useDispatch();
    const brands: IBrand[] = useSelector((state) => returnItems(state, objectTypes.brands));
    const isBrandsLoading: boolean = useSelector(isLoading);

    useEffect(() => {
        dispatch(getBrands())
    }, []);

    const headers = [
        {
            key: 'description',
            value: 'Marca',
            sortable: true
        }
    ];

    const deleteBrand = () => {
        if (toBeDeleted) {
            dispatch(deleteItem(toBeDeleted.id, objectTypes.brands));
            dispatch(removeFromList(toBeDeleted, objectTypes.brands));
        }
        setToBeDeleted(null);
    }

    const addNewBrand = (product: IBrand) => {
        dispatch(setItem([product], objectTypes.brands));
        setIsAddModalOpen(false);
    };

    const onSortChange = (column: string, direction: string) => {
        console.log('Sorting by: ' + column + direction);
        dispatch(getBrands(column, direction));        
    };

    return (
        <>
            <Fab
                classes={{root: 'of-pink-bg'}}
                className="fab-bottom"
                size="large"
                variant="extended"
                onClick={() => setIsAddModalOpen(true)}
            >
                <AddIcon />&nbsp;
                Nova marca
            </Fab>
            <Table
                bodyColumns={brands}
                color="pink"
                headerColumns={headers}
                onSecondaryAction={(brand: IBrand) => setToBeDeleted(brand)}
                onSortChange={(column: string, direction: string) => onSortChange(column, direction)}
            />
            {isBrandsLoading && <Loading />}
            <AddBrandModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onConfirm={addNewBrand}
            />
            <DeleteBrandModal
                brand={toBeDeleted}
                onClose={() => setToBeDeleted(null)}
                onConfirm={deleteBrand}
            />
        </>

    )
}

export default BrandsSection;
