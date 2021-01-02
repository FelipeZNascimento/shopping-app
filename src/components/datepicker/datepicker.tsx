import React, { useState } from 'react';

import moment, { Moment } from 'moment';
import 'moment/locale/pt-br';
import MomentUtils from '@date-io/moment';
import {
    DatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

interface IProps {
    onChange: (date: string) => void;
}

const Datepicker = ({
    onChange
}: IProps) => {
    const [selectedDate, setSelectedDate] = useState<string | null | Moment>(moment());
    moment.locale('pt-BR');

    const handleDateChange = (date: string | null | Moment) => {
        setSelectedDate(date);

        return onChange(moment(date).format());
    };

    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <DatePicker
                disableFuture
                showTodayButton
                format="DD/MM/YYYY"
                label="Quando?"
                value={selectedDate}
                onChange={handleDateChange}
                animateYearScrolling
            />
        </MuiPickersUtilsProvider>
    );
}

export default Datepicker;