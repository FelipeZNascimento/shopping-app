import React, { useState } from 'react';
import { useSelector } from 'react-redux';

// Actions
// import { removeFromList } from 'store/main/actions';
// import { fetchItems } from 'services/dataGetters';
// import { setItem } from 'services/dataSetters';
// import deleteItem from 'services/dataDeleters';

// Selectors
import { isLoading } from 'store/main/selector';

// Components
import { Fab } from '@material-ui/core';
import { AddCircle as AddIcon } from '@material-ui/icons';
import { Loading, Table } from 'components/index';
import AddCategoryModal from './components/add_category_modal';
import DeleteCategoryModal from './components/delete_category_modal';

import { ICategory } from 'constants/objectInterfaces';

type TProps = {
    bodyColumns: ICategory[];
    color: string;
    headerColumns: {
        key: string;
        value: string;
        sortable: boolean;
    };
    onAddNewCategory: (categoryName: string) => void;
    onDeleteCategory: (category: ICategory) => void;
    onSortChange: (column: string, direction: string) => void;
}

const CategoriesSection = ({
    bodyColumns,
    color,
    headerColumns,
    onAddNewCategory,
    onDeleteCategory,
    onSortChange
}: TProps) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState<ICategory | null>(null);

    const isCategoriesLoading = useSelector(isLoading);

    const deleteCategory = () => {
        if (toBeDeleted) {
            onDeleteCategory(toBeDeleted);
        }
        setToBeDeleted(null);
    }

    const addNewCategory = (categoryName: string) => {
        onAddNewCategory(categoryName);
        setIsAddModalOpen(false);
    };

    return (
        <>
            <Fab
                classes={{ root: `of-${color}-bg` }}
                className="fab-bottom"
                size="large"
                variant="extended"
                onClick={() => setIsAddModalOpen(true)}
            >
                <AddIcon />&nbsp;
                Nova categoria
            </Fab>
            <Table
                bodyColumns={bodyColumns}
                color={color}
                headerColumns={[headerColumns]}
                onSecondaryAction={setToBeDeleted}
                onSortChange={onSortChange}
            />
            {isCategoriesLoading && <Loading />}
            <AddCategoryModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onConfirm={addNewCategory}
            />
            <DeleteCategoryModal
                category={toBeDeleted}
                onClose={() => setToBeDeleted(null)}
                onConfirm={deleteCategory}
            />
        </>

    )
}

export default CategoriesSection;
