import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchItems } from '../../../services/dataGetters';
import { returnItems } from '../../../store/main/selector';
import { objectTypes } from '../../../constants/general';

import {
    IBrand,
    IPurchaseItem
} from '../../../constants/objectInterfaces';

import TableRow from './table_row';

type IHeaderColumn = {
    key: string;
    value: string;
}

interface IProps {
    bodyColumns: IPurchaseItem[];
    headerColumns: IHeaderColumn[];
    onDelete: (item: IPurchaseItem) => void;
    onUpdate: (item: IPurchaseItem) => void;
}

const Table = ({
    bodyColumns,
    headerColumns,
    onDelete,
    onUpdate
}: IProps) => {
    const dispatch = useDispatch();
    const brands: IBrand[] = useSelector((state) => returnItems(state, objectTypes.brands));

    useEffect(() => {
        if (brands.length === 0) {
            dispatch(fetchItems(objectTypes.brands))
        }
    }, []);

    const getSum = (total: number, item: IPurchaseItem) => {
        if(isNaN(item.total_price)) {
            return total;
        }
        return total + item.total_price;
    };

    const renderHeader = () => {
        const tableHeader = [
            {
                key: 'onSecondaryAction',
                value: ''
            },
            ...headerColumns
        ];
        return tableHeader.map((header) => {
            return (
                <th key={header.key}>
                    <div className="vertical-align-center">
                        <p className="right-padding-s margin-none">{header.value}</p>
                    </div>
                </th>
            );
        });
    };

    const renderBody = () => {
        const totalSum = bodyColumns.reduce(getSum, 0);
        return bodyColumns.map((item, index) => (
            <TableRow
                brands={brands}
                item={item}
                lastRow={bodyColumns.length === index + 1 ? totalSum : null}
                onDelete={onDelete}
                onUpdate={onUpdate}
            />
        ));
    };

    return (
        <table className='table'>
            <thead className='of-cyan-bg'>
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
