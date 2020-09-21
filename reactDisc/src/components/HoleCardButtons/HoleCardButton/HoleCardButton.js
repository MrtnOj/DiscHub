import React from 'react';
import cx from 'classnames';

import classes from './HoleCardButton.module.css';

const holeCardButton = (props) => (
    <div className={!props.active ? classes.holeCardButton : cx(classes.holeCardButton, classes.activeButton)} onClick={props.clicked}>
        <p>{props.holeNumber}</p>
    </div>
);

export default holeCardButton;