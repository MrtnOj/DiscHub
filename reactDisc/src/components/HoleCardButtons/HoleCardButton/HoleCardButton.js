import React from 'react';

import classes from './HoleCardButton.module.css';

const holeCardButton = (props) => (
    <div className={!props.active ? classes.HoleCardButton : [classes.HoleCardButton, classes.ActiveButton].join(' ')} onClick={props.clicked}>
        <p>{props.holeNumber}</p>
    </div>
);

export default holeCardButton;