import React, { useState } from 'react';

import { IconButton } from '@material-ui/core';

import {
    AddShoppingCart,
    ArrowDropDown as ArrowDropDownIcon,
    ArrowDropUp as ArrowDropUpIcon,
    Delete as DeleteIcon,
} from '@material-ui/icons';

type IHeaderColumn = {
    key: string;
    value: string;
}

interface IProps {
    bodyColumns?: any[];
    color?: string;
    headerColumns: IHeaderColumn[];
    onMainAction?: null | ((item: any) => void);
    onSecondaryAction?: null | ((item: any) => void);
    onSortChange: (column: string, direction: string) => void;
}

const Table = ({
    bodyColumns = [],
    color = 'green',
    headerColumns,
    onMainAction = null,
    onSecondaryAction = null,
    onSortChange
}: IProps) => {
    const state = {
        column: 'description',
        direction: 'ASC'
    };

    const [sortState, setSortState] = useState(state);

    const renderSortIcon = (key: string) => {
        if (key !== sortState.column) {
            return <ArrowDropDownIcon classes={{ root: 'invisible' }} />;
        }
        
        if (sortState.direction === 'ASC') {
            return <ArrowDropDownIcon classes={{ root: 'of-black' }} />;
        }

        return <ArrowDropUpIcon classes={{ root: 'of-black' }} />;
    };

    const setSortingState = (key: string) => {
        let newDirection = 'ASC';
        if (key === sortState.column) {
            newDirection = sortState.direction === 'ASC' ? 'DESC' : 'ASC';
        }
        setSortState({ column: key, direction: newDirection });
        onSortChange(key, newDirection);
    };

    const renderHeader = () => {
        return headerColumns.map((header) => {
            return (
                <th key={header.key}>
                    <div className="vertical-align-center">
                        <p className="right-padding-s margin-none clickable" onClick={() => setSortingState(header.key)}>{header.value}</p>
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
                    <tr key={item.id}>
                        {onMainAction !== null
                            && <td><IconButton
                                aria-label="add"
                                onClick={() => onMainAction(item)}
                            >
                                <AddShoppingCart classes={{ root: 'of-green' }} />
                            </IconButton></td>
                        }
                        {item.category_id && <td className="of-white">{item.category_description}</td>}

                        <td>
                            {item.description}
                        </td>
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
                    <th>&nbsp;</th>
                </tr>
            </thead>
            <tbody>
                {renderBody()}
            </tbody>
        </table>
    );
};

export default Table;
