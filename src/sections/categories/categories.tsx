import React, { useState } from 'react';

// Components
import { Fab } from '@material-ui/core';
import { AddCircle as AddIcon } from '@material-ui/icons';
import { Loading, Table } from 'components/index';
import AddCategoryModal from './components/add_category_modal';
import DeleteCategoryModal from './components/delete_category_modal';

import { ICategory, ISortingState } from 'constants/objectInterfaces';

type TProps = {
    bodyColumns: ICategory[];
    color: string;
    headerColumns: {
        key: string;
        value: string;
        sortable: boolean;
    };
    isLoading?: boolean;
    sortState: ISortingState;
    onAddNewCategory: (categoryName: string) => void;
    onDeleteCategory: (category: ICategory) => void;
    onSortChange: (column: string, direction: string) => void;
};

const defaultSortState = {
    orderBy: 'description',
    sort: 'ASC'
};

const CategoriesSection = ({
    bodyColumns,
    color,
    headerColumns,
    isLoading = false,
    sortState = defaultSortState,
    onAddNewCategory,
    onDeleteCategory,
    onSortChange
}: TProps) => {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState<ICategory | null>(null);

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
                bodyColumns={isLoading ? [] : bodyColumns}
                color={color}
                headerColumns={[headerColumns]}
                isLoading={isLoading}
                sortState={sortState}
                onSecondaryAction={setToBeDeleted}
                onSortChange={onSortChange}
            />
            {isLoading && <Loading />}
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
