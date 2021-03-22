import React from 'react';

import MaterialAutocomplete from '@material-ui/lab/Autocomplete';
import { TextField } from '@material-ui/core/';

interface IItem {
    description: string
    firstLetter?: string,
    id: number | undefined
}

interface IProps {
    disabled?: boolean;
    id?: string;
    selected?: IItem | null;
    options: IItem[];
    onChange: (item: IItem) => void;
    title?: string;
}

const Autocomplete = ({
    disabled = false,
    id = 'autocomplete-input',
    options,
    selected = null,
    title = 'Selecione uma opção',
    onChange
}: IProps) => {
    const sortAlphabetically = (options: IItem[]) => {
        return options.map((option) => {
            const firstLetter = option.description[0].toUpperCase();
            return {
                firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
                ...option,
            };
        });
    };

    const handleChange = (evt: any, object: any) => {
        onChange(object);
    };

    const hasManyOptions = options.length > 10;
    const autocompleteOptions = hasManyOptions ? sortAlphabetically(options) : options;

    return (
        <MaterialAutocomplete
            disableClearable
            disabled={disabled}
            getOptionLabel={(option) => option.description}
            id="combo-box-demo"
            inputValue={selected ? selected.description : undefined}
            renderInput={(params) => <TextField {...params} label={title} variant="outlined" />}
            style={{ flex: 1 }}
            options={autocompleteOptions}
            value={selected || undefined}
            onChange={handleChange}
        />
    );
};

export default Autocomplete;
