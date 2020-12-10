import React from 'react';

import classes from './HoleCardButton.module.css';

const holeCardButton = (props) => (
    <button className={!props.active ? classes.HoleCardButton : [classes.HoleCardButton, classes.ActiveButton].join(' ')} onClick={props.clicked}>
        {props.holeNumber}
    </button>
);

export default holeCardButton;