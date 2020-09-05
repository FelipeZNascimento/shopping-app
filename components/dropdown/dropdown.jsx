import React from 'react';
import PropTypes from 'prop-types';


class Dropdown extends React.Component {
    renderOptions() {
        const { options } = this.props;

        return options.map((option) => (
            <option className="dropdown--option" key={option.id} value={option.name}>{option.name}</option>
        ));
    }

    render() {
        const { title } = this.props;

        return (
            <select
                className="dropdown--select"
                defaultValue=""
                id={title}
                name={title}
            >
                <option
                    className="dropdown--option"
                    disabled
                    value=""
                >
                    {title}
                </option>
                {this.renderOptions()}
            </select>
        );
    }
}

Dropdown.propTypes = {
    options: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    })),
    title: PropTypes.string,
};

Dropdown.defaultProps = {
    options: [],
    title: 'Selecione uma opção',
};

export default Dropdown;
