import React, { useState } from 'react';

// Components
import { Fab, IconButton } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { AddCircle as AddIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { GenericTable, SearchInput } from 'components/index';
import AddCategoryModal from './components/add_category_modal';
import DeleteCategoryModal from './components/delete_category_modal';

// Types
import { TCategory } from 'constants/objectInterfaces';
import { IAutocompleteItem } from 'components/autocomplete/types';
import { TSortingState } from 'components/generic_table/types';
import { resultsPerPage } from 'constants/general';

import styles from './categories.module.scss';

type TProps = {
    color: string;
    data: TCategory[];
    isLoading?: boolean;
    searchOptions: TCategory[];
    sortState: TSortingState;
    totalCount: number;
    onAddNewCategory: (categoryName: string) => void;
    onDeleteCategory: (category: TCategory) => void;
    onPageChange: (page: number) => void;
    onSearch: (item: IAutocompleteItem | string | null) => void;
    onSortChange: (currentPage: number, column: string, direction: string) => void;
};

const defaultSortState = {
    orderBy: 'description',
    sort: 'ASC'
};

const CategoriesSection = ({
    color,
    data,
    isLoading = false,
    searchOptions,
    sortState = defaultSortState,
    totalCount,
    onAddNewCategory,
    onDeleteCategory,
    onPageChange,
    onSearch,
    onSortChange
}: TProps) => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [toBeDeleted, setToBeDeleted] = useState<TCategory | null>(null);

    const headerColumns = [
        {
            key: 'id',
            renderFunction: () => 'Id',
            sortable: true,
            showOnMobile: false
        },
        {
            key: 'description',
            renderFunction: () => 'Categoria',
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

    const renderDeleteIcon = (item: TCategory) => (
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
            renderFunction: (item: TCategory) => <td className="align-left">{item.id}</td>,
            showOnMobile: false
        },
        {
            key: 'description',
            renderFunction: (item: TCategory) => <td className="align-left">{item.description}</td>,
            showOnMobile: true
        },
        {
            key: 'delete',
            renderFunction: (item: TCategory) => <td className="align-right">{renderDeleteIcon(item)}</td>,
            showOnMobile: true
        }
    ];

    const deleteCategory = () => {
        if (toBeDeleted) {
            onDeleteCategory(toBeDeleted);
        }
        setToBeDeleted(null);
    };

    const addNewCategory = (categoryName: string) => {
        onAddNewCategory(categoryName);
        setIsAddModalOpen(false);
    };

    const onPagination = (event: any, newPage: number) => {
        setCurrentPage(newPage);
        onPageChange(newPage);
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
            <div className={styles.container}>
                <SearchInput
                    options={searchOptions}
                    onSearch={onSearch}
                />
                <div className={styles.pagination}>
                    <Pagination
                        color="primary"
                        count={Math.ceil(totalCount / resultsPerPage)}
                        page={currentPage}
                        size="large"
                        shape="rounded"
                        onChange={onPagination}
                    />
                </div>
                <GenericTable
                    bodyColumns={isLoading ? [] : bodyColumns}
                    color={color}
                    data={data}
                    headerColumns={headerColumns}
                    isLoading={isLoading}
                    sortState={sortState}
                    onSortChange={(column: string, direction: string) => onSortChange(currentPage, column, direction)}
                />
                <div className={styles.pagination}>
                    <Pagination
                        color="primary"
                        count={Math.ceil(totalCount / resultsPerPage)}
                        page={currentPage}
                        size="large"
                        shape="rounded"
                        onChange={onPagination}
                    />
                </div>
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
            </div>
        </>
    );
};

export default CategoriesSection;
