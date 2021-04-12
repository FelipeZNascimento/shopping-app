import React from 'react';

import Spinner from 'img/loader.gif';
import styles from './loading.module.scss';

type TProps = {
    text?: string;
};

const Loading = ({
    text = 'Loading...'
}: TProps) => {
    return (
        <div className={styles.loading}>
            <img className={styles.spinner} src={Spinner} alt="loading spinner" />
            <h2 className={styles.text}>{text}</h2>
        </div>
    );
};

export default Loading;
