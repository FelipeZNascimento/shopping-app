import React, { Component } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';
import 'moment/locale/pt-br';
import MomentUtils from '@date-io/moment';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from '@material-ui/pickers';

export class Datepicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDate: moment(),
        };

        this.handleDateChange = this.handleDateChange.bind(this);
    }

    componentDidMount() {
        moment.locale('pt-BR');
    }

    handleDateChange = function (date) {
        this.setState({
            selectedDate: date,
        });

        return this.props.onChange(moment(date).format());
    };

    render() {
        return (
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <KeyboardDatePicker
                    disableFuture
                    variant="inline"
                    format="DD/MM/YYYY"
                    id="date-picker-inline"
                    value={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </MuiPickersUtilsProvider>

        );
    }
}

Datepicker.propTypes = {
    onChange: PropTypes.func.isRequired,
};

export default Datepicker;
