import React from 'react';

import { Search as SearchIcon } from '@material-ui/icons';
import { Autocomplete } from 'components/index';

import { IAutocompleteItem } from 'components/autocomplete/types';
import styles from './search_input.module.scss';

interface IProps {
    options: IAutocompleteItem[];
    onSearch: (item: IAutocompleteItem) => void;
}

const SearchInput = ({
    options,
    onSearch
}: IProps) => {
    return (
        <>
            {/* {mergedNames.length > 0 && <div className={styles.searchContainer}> */}
            <div className={styles.searchContainer}>
                <div className={'padding-m'}>
                    <SearchIcon />
                </div>
                <Autocomplete
                    freeSolo
                    options={options.length > 0 ? options : []}
                    title={'Buscar...'}
                    onChange={onSearch}
                />
            </div>
            {/* </div>} */}
        </>
    )
};

export default SearchInput;