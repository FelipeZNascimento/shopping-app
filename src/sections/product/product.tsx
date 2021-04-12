import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import moment from 'moment';
import 'moment/locale/pt-br';
import {
    CartesianGrid,
    LineChart,
    Tooltip,
    Line,
    ResponsiveContainer,
    XAxis,
    YAxis
} from 'recharts';

// Actions
import { fetchProductHistory } from 'store/product/actions';

// Selectors
import {
    selectProductHistory,
    selectIsLoading,
    selectProductInfo
} from 'store/product/selector';

// Components
import { GenericTable, InfoCard, Loading } from 'components/index';
import {
    Button
} from '@material-ui/core';
// Constants, types and tnterfaces
import {
    TProductHistoryItem,
    TProduct
} from 'constants/objectInterfaces';
import { TSortingState } from 'components/generic_table/types';
import { TProductGraphic } from './types';
import { getUnitObject } from 'constants/products';

// Utilities and Style
import { invertSort } from 'utils/utils';
import styles from './product.module.scss';

const defaultSortState = {
    orderBy: 'price',
    sort: 'ASC'
};

const SingleProduct = () => {
    const [currentSortState, setCurrentSortState] = useState<TSortingState>(defaultSortState);
    const [tableData, setTableData] = useState<TProductHistoryItem[]>([]);
    const [graphicData, setGraphicData] = useState<TProductGraphic[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
    const [productUnits, setProductUnits] = useState<number[]>([]);
    const [selectedProductUnit, setSelectedProductUnit] = useState<number>(0);

    const dispatch = useDispatch();
    const { productId } = useParams<{ productId: string }>();
    const productHistory: TProductHistoryItem[] = useSelector(selectProductHistory);
    const productInfo = useSelector(selectProductInfo);

    const isLoading = useSelector(selectIsLoading);

    useEffect(() => {
        dispatch(fetchProductHistory(parseInt(productId)));
    }, []);

    useEffect(() => {
        if (productInfo && !isLoading) {
            setSelectedProduct(productInfo);
        }
    }, [productInfo]);

    useEffect(() => {
        if (productHistory && !isLoading) {
            const dataTable: TProductHistoryItem[] = [];
            const dataGraphic: TProductGraphic[] = [];
            const allUnits: number[] = [];

            productHistory.forEach((item) => {
                if (!allUnits.find((unit) => unit === item.unit)) {
                    allUnits.push(item.unit);
                }

                if (allUnits.length > 0 && item.unit === allUnits[0]) {
                    dataGraphic.push({
                        brand: item.brand?.description,
                        date: moment(item.date).format('DD/MM/YYYY'),
                        discount: item.discount,
                        details: item.details,
                        price: item.price,
                        unit: item.unit,
                        place: item.place.description
                    })

                    dataTable.push(item);
                }
            });

            setProductUnits(allUnits);
            setSelectedProductUnit(allUnits[0]);
            setGraphicData(dataGraphic);
            setTableData(dataTable);
        }
    }, [productHistory]);

    useEffect(() => {
        const dataTable: TProductHistoryItem[] = [];
        const dataGraphic: TProductGraphic[] = [];

        productHistory.forEach((item) => {
            if (item.unit === selectedProductUnit) {
                dataGraphic.push({
                    brand: item.brand?.description,
                    date: moment(item.date).format('DD/MM/YYYY'),
                    discount: item.discount,
                    details: item.details,
                    price: item.price,
                    unit: item.unit,
                    place: item.place.description
                })

                dataTable.push(item);
            }
        });

        setGraphicData(dataGraphic);
        setTableData(dataTable);
    }, [selectedProductUnit]);

    if (isLoading) {
        return <Loading />;
    }

    const headers = [
        {
            key: 'place',
            renderFunction: () => 'Lugar',
            sortable: true,
            showOnMobile: true
        },
        {
            key: 'brand',
            renderFunction: () => 'Marca',
            sortable: false,
            showOnMobile: false
        },
        {
            key: 'details',
            renderFunction: () => 'Detalhes',
            sortable: false,
            showOnMobile: false
        },
        {
            key: 'price',
            renderFunction: () => 'Preço',
            sortable: true,
            showOnMobile: true
        },
        {
            key: 'date',
            renderFunction: () => 'Data',
            sortable: true,
            showOnMobile: true
        }
    ];

    const bodyColumns = [
        {
            key: 'place',
            renderFunction: (item: TProductHistoryItem) => <td className="align-left">{item.place.description}</td>,
            showOnMobile: true
        },
        {
            key: 'brand',
            renderFunction: (item: TProductHistoryItem) => <td>{item.brand ? item.brand.description : '-'}</td>,
            showOnMobile: false
        },
        {
            key: 'details',
            renderFunction: (item: TProductHistoryItem) => <td>{item.details ? item.details : '-'}</td>,
            showOnMobile: false
        },
        {
            key: 'price',
            renderFunction: (item: TProductHistoryItem) => (
                <td className={item.discount ? 'of-green' : ''}>
                    € {item.price} / {getUnitObject(item.unit).description}
                </td>
            ),
            showOnMobile: true
        },
        {
            key: 'date',
            renderFunction: (item: TProductHistoryItem) => <td>{moment(item.date).format('DD/MM/YYYY')}</td>,
            showOnMobile: true
        }
    ];

    const onSortChange = (orderBy: string, sort: string) => {
        const newSort: string = orderBy === currentSortState.orderBy ? invertSort(currentSortState.sort) : sort;

        setCurrentSortState({ orderBy, sort: newSort });
        dispatch(fetchProductHistory(parseInt(productId), { orderBy, sort: newSort }));
    };

    const renderTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const dataInfo: TProductGraphic = payload[0].payload;
            return (
                <div className={styles.tooltip}>
                    <p className={styles.place}>{dataInfo.place}</p>
                    <p className={styles.date}>{dataInfo.date}</p>
                    <p className={styles.brand}>{dataInfo.brand}</p>
                    {dataInfo.details && <p>{dataInfo.details}</p>}
                    <p className={dataInfo.discount ? styles.discount : styles.price}>€ {dataInfo.price}</p>
                </div>
            );
        }

        return null;
    };

    const renderLineChart = () => (
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={graphicData}
                margin={{
                    top: 0,
                    right: 10,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <Line type="monotone" dataKey="price" stroke="green" />
                <Tooltip content={renderTooltip} />
                <XAxis dataKey="date" />
                <YAxis />
            </LineChart>
        </ResponsiveContainer>
    );

    const renderUnits = () => {
        if (productUnits.length <= 1) {
            return null;
        }

        return (
            <div className={styles.unitsContainer}>
                {productUnits.map((unit) => (
                    <Button
                        color="primary"
                        classes={{ root: styles.button }}
                        variant={selectedProductUnit === unit ? 'outlined' : 'text'}
                        onClick={() => setSelectedProductUnit(unit)}
                    >
                        {getUnitObject(unit).description}
                    </Button>
                ))}
            </div>
        );
    };

    return (
        <div className={styles.container}>
            {selectedProduct && <InfoCard
                responsiveWidth
                color={'green'}
                title={`[${selectedProduct.id}] ${selectedProduct.description}`}
                subtitle={selectedProduct.category.description}
            />}
            {renderUnits()}
            <GenericTable
                bodyColumns={isLoading ? [] : bodyColumns}
                color="green"
                data={tableData}
                headerColumns={headers}
                isLoading={isLoading}
                sortState={currentSortState}
                onSortChange={onSortChange}
            />
            {graphicData.length > 0
                && <div className={styles.graphicContainer}>
                    {renderLineChart()}
                </div>
            }
        </div>
    );
};

export default SingleProduct;