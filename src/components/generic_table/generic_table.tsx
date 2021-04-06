import React from 'react';
import { isMobile } from "react-device-detect";

import {
    ArrowDropDown as ArrowDropDownIcon,
    ArrowDropUp as ArrowDropUpIcon,
} from '@material-ui/icons';

import {
    ISortingState
} from 'constants/objectInterfaces';

import { TBodyColumn, THeaderColumn } from './types';
import styles from './generic_table.module.scss';

const defaultSortingState = {
    orderBy: 'description',
    sort: 'ASC'
};

type TProps = {
    bodyColumns: TBodyColumn[];
    color?: string;
    data?: any[];
    headerColumns: THeaderColumn[];
    isLoading?: boolean;
    sortState?: ISortingState;
    lastRow?: null | (() => void);
    onSortChange?: null | ((column: string, direction: string) => void);
}

const GenericTable = ({
    bodyColumns,
    color = 'green',
    data = [],
    headerColumns,
    isLoading = false,
    sortState = defaultSortingState,
    lastRow = null,
    onSortChange = null
}: TProps) => {
    const setSortingState = (key: string) => {
        let newDirection = 'ASC';
        if (key === sortState.orderBy) {
            newDirection = sortState.sort === 'ASC' ? 'DESC' : 'ASC';
        }
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

        const renderHeaderValue = (header: THeaderColumn) => {
            if (header.sortable) {
                return (
                    <p
                        className={styles.sortable}
                        onClick={() => setSortingState(header.key)}
                    >
                        {header.renderFunction()}
                    </p>
                )
            }

            return (<p className="padding-none margin-none">{header.renderFunction()}</p>);
        };

        return tableHeader.map((header) => {
            if (isMobile && !header.showOnMobile) {
                return null;
            }

            return (
                <th key={header.key}>
                    <div className={styles.column}>
                        {renderHeaderValue(header)}
                        {renderSortIcon(header.key)}
                    </div>
                </th>
            );
        });
    };

    const renderRow = (item: any) => {
        return bodyColumns.map((column) => {
            if (isMobile && !column.showOnMobile) {
                return null;
            }

            return column.renderFunction(item);
        });
    };

    return (
        <table className={styles.table}>
            <thead className={styles[`${color}-bg`]}>
                <tr>
                    {renderHeader()}
                </tr>
            </thead>
            <tbody>
                {data.length === 0 && !isLoading &&
                    <tr><td className={styles.notFound} colSpan={20}><p>Nenhum resultado encontrado.</p></td></tr>
                }
                {data.map((item) => <tr>{renderRow(item)}</tr>)}
                {lastRow !== null && !isLoading && lastRow()}
            </tbody>
        </table>
    );
};

export default GenericTable;