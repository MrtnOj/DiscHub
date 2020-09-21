import React from 'react';

import classes from './RoundTile.module.css';

const roundTile = props => (
    <div className={classes.RoundTile}>
        <h3>{props.courseName}</h3>
        <span>{props.date}</span>
    </div>
);

export default roundTile;