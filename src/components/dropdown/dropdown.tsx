import React from 'react';
import styles from './dropdown.module.scss';

type TOptions = {
    id: number;
    name: string;
}
type TProps = {
    options?: TOptions[];
    title?: string
};

const Dropdown = ({
    options = [],
    title = 'Selecione uma opção'
}: TProps) => {
    const renderOptions = () => options.map((option) => (
        <option
            className={styles.dropdownOption}
            key={option.id}
            value={option.name}>
            {option.name}
        </option>
    ));

    return (
        <select
            className={styles.dropdownSelect}
            defaultValue=""
            id={title}
            name={title}
        >
            <option
                className={styles.dropdownOption}
                disabled
                value=""
            >
                {title}
            </option>
            {renderOptions()}
        </select>
    );
};

export default Dropdown;
