import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../../img/loader.gif';

export class Loading extends Component {
    render() {
        const { fullscreen, text } = this.props;

        return (
            <div className={fullscreen ? 'loading--fullscreen' : 'loading'}>
                <img className="loading--spinner" src={Spinner} alt="loading spinner" />
                <h2 className="of-lightgrey small-caps">{text}</h2>
            </div>
        );
    }
}

Loading.propTypes = {
    fullscreen: PropTypes.bool,
    text: PropTypes.string,
};

Loading.defaultProps = {
    fullscreen: false,
    text: "Loading...",
};

export default Loading;
