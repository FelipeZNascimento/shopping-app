import React from 'react';

import MaterialAutocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core/';
import { IAutocompleteItem } from './types';

interface IProps {
    disabled?: boolean;
    freeSolo?: boolean;
    selected?: IAutocompleteItem | null;
    options: IAutocompleteItem[];
    onChange: (item: IAutocompleteItem) => void;
    title?: string;
}

const Autocomplete = ({
    disabled = false,
    freeSolo = false,
    options,
    selected = null,
    title = 'Selecione uma opção',
    onChange
}: IProps) => {
    const handleChange = (evt: any, object: any) => {
        console.log(evt);
        console.log(object);
        onChange(object);
    };

    return (
        <MaterialAutocomplete
            disabled={disabled}
            freeSolo={freeSolo}
            options={options.map((option) => option.description)}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={title}
                    margin="normal"
                    variant="outlined"
                />
            )}
            style={{ flex: 1 }}
            onChange={handleChange}
        />
    );
};

export default Autocomplete;
