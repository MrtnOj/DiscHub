import React from 'react';

import classes from './HoleCardButton.module.css';

const holeCardButton = (props) => (
    <div className={!props.active ? classes.holeCardButton : [classes.holeCardButton, classes.activeButton].join(' ')} onClick={props.clicked}>
        <p>{props.holeNumber}</p>
    </div>
);

export default holeCardButton;