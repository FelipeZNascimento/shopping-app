import React, { useState } from 'react';

import {
    Checkbox,
    IconButton
} from '@material-ui/core';

import {
    PlaylistAdd,
    ArrowDropDown as ArrowDropDownIcon,
    ArrowDropUp as ArrowDropUpIcon,
    Delete as DeleteIcon,
} from '@material-ui/icons';

import {
    IProduct,
    ISortingState
} from 'constants/objectInterfaces';

type IHeaderColumn = {
    key: string;
    value: string;
    sortable: boolean;
}

interface IProps {
    bodyColumns?: any[];
    checkedProducts?: IProduct[];
    color?: string;
    headerColumns: IHeaderColumn[];
    sortState?: ISortingState;
    onCheckboxAction?: null | ((item: any) => void);
    onMainAction?: null | ((item: any) => void);
    onSecondaryAction?: null | ((item: any) => void);
    onSortChange?: null | ((column: string, direction: string) => void);
}

const defaultSortingState = {
    orderBy: 'description',
    sort: 'ASC'
};

const Table = ({
    bodyColumns = [],
    color = 'green',
    headerColumns,
    sortState = defaultSortingState,
    checkedProducts = [],
    onCheckboxAction = null,
    onMainAction = null,
    onSecondaryAction = null,
    onSortChange = null
}: IProps) => {
    // const [checkedProducts, setCheckedProducts] = useState<IProduct[]>([]);

    const checkboxClick = (item: any) => {
        if (onCheckboxAction === null) {
            return;
        }

        let updatedCheckedProducts;
        const index = checkedProducts.findIndex((product: IProduct) => product.id === item.id);
        if (index === -1) {
            updatedCheckedProducts = [
                ...checkedProducts,
                item
            ];
            // setCheckedProducts(updatedCheckedProducts);
        } else {
            const filteredProducts = checkedProducts.filter((product: IProduct) => item.id !== product.id);
            updatedCheckedProducts = [...filteredProducts];
            // setCheckedProducts(updatedCheckedProducts);
        }

        onCheckboxAction(updatedCheckedProducts);
    };

    const isChecked = (item: any) => (checkedProducts.findIndex((product: IProduct) => product.id === item.id) !== -1);

    const setSortingState = (key: string) => {
        let newDirection = 'ASC';
        if (key === sortState.orderBy) {
            newDirection = sortState.sort === 'ASC' ? 'DESC' : 'ASC';
        }
        // setSortState({ column: key, direction: newDirection });
        if (onSortChange !== null) {
            onSortChange(key, newDirection);
        }
    };

    const renderSortIcon = (key: string) => {
        if (onSortChange === null) {
            return;
        }

        if (key !== sortState.orderBy) {
            return <ArrowDropDownIcon classes={{ root: 'invisible' }} />;
        }

        if (sortState.sort === 'ASC') {
            return <ArrowDropDownIcon classes={{ root: 'of-black' }} />;
        }

        return <ArrowDropUpIcon classes={{ root: 'of-black' }} />;
    };

    const renderHeader = () => {
        const tableHeader = [...headerColumns];

        if (onCheckboxAction !== null) {
            tableHeader.unshift({
                key: 'onCheckboxAction',
                value: '',
                sortable: false
            });
        }
        if (onMainAction !== null) {
            tableHeader.unshift({
                key: 'onMainAction',
                value: '',
                sortable: false
            });
        }
        if (onSecondaryAction !== null) {
            tableHeader.push({
                key: 'onSecondaryAction',
                value: '',
                sortable: false
            });
        }

        const renderHeaderValue = (header: IHeaderColumn) => {
            if (header.sortable) {
                return (
                    <p
                        className="right-padding-s margin-none clickable"
                        onClick={() => setSortingState(header.key)}
                    >
                        {header.value}
                    </p>
                )
            }

            return (<p className="right-padding-s margin-none">{header.value}</p>);
        };

        return tableHeader.map((header) => {
            return (
                <th key={header.key}>
                    <div className="vertical-align-center">
                        {renderHeaderValue(header)}
                        {renderSortIcon(header.key)}
                    </div>
                </th>
            );
        });
    };

    const renderBody = () => {
        // .sort((a, b) => a.description.localeCompare(b.description))
        return bodyColumns
            .map((item) => {
                return (
                    <tr key={item.id} className={isChecked(item) ? 'checked' : ''}>
                        {onCheckboxAction !== null
                            && <td>
                                <Checkbox
                                    checked={isChecked(item)}
                                    size="small"
                                    inputProps={{ 'aria-label': 'checkbox with small size' }}
                                    onClick={() => checkboxClick(item)}
                                />
                            </td>
                        }
                        {onMainAction !== null
                            && <td><IconButton
                                aria-label="add"
                                onClick={() => onMainAction(item)}
                            >
                                <PlaylistAdd classes={{ root: 'of-green' }} />
                            </IconButton></td>
                        }
                        {item.category_id && <td className="of-white">{item.category_description}</td>}
                        <td>{item.description}</td>

                        {onSecondaryAction !== null
                            && <td className="align-right">
                                <IconButton
                                    aria-label="delete"
                                    onClick={() => onSecondaryAction(item)}
                                >
                                    <DeleteIcon classes={{ root: 'of-red' }} />
                                </IconButton>
                            </td>
                        }
                    </tr>
                );
            });
    };

    return (
        <table className="table">
            <thead className={`of-${color}-bg`}>
                <tr>
                    {renderHeader()}
                </tr>
            </thead>
            <tbody>
                {renderBody()}
            </tbody>
        </table>
    );
};

export default Table;
