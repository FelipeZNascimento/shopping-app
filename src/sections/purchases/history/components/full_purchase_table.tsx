import React from 'react';
import styles from './full_purchase_table.module.scss';

import {
    ArrowDropDown as ArrowDropDownIcon,
    ArrowDropUp as ArrowDropUpIcon,
} from '@material-ui/icons';

import {
    ISortingState
} from 'constants/objectInterfaces';

import {
    productUnits
} from 'constants/products';

const defaultSortingState = {
    orderBy: 'description',
    sort: 'ASC'
};

type IHeaderColumn = {
    key: string;
    value: string;
    sortable: boolean;
}

type TProps = {
    bodyColumns?: any[];
    color?: string;
    headerColumns: IHeaderColumn[];
    isLoading?: boolean;
    sortState?: ISortingState;
    onSortChange?: null | ((column: string, direction: string) => void);
}

const FullPurchaseTable = ({
    bodyColumns = [],
    color = 'green',
    headerColumns,
    isLoading = false,
    sortState = defaultSortingState,
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

    const renderItemDetails = (details: string) => {
        if (details === '') {
            return;
        }

        return <span>({details})</span>;
    };

    const renderBody = () => {
        if (bodyColumns.length === 0 && !isLoading) {
            return (
                <tr>
                    <td className={styles.notFound} colSpan={20}><p>Nenhum resultado encontrado</p></td>
                </tr>
            );
        }
        return bodyColumns
            .map((item) => {
                const itemUnit = productUnits.find((unit) => unit.id === item.unit);
                return (
                    <tr key={item.id}>
                        <td className='align-left'>{item.quantity}</td>
                        <td>{item.category_description}</td>
                        <td>{item.description} {renderItemDetails(item.details)}</td>
                        <td>{item.brand_description || ''}</td>
                        <td>€ {item.price} / {itemUnit?.description}</td>
                    </tr>
                );
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
                {renderBody()}
            </tbody>
        </table>
    );
};

export default FullPurchaseTable;