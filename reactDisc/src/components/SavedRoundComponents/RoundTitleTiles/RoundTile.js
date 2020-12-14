import React from 'react';

import classes from './RoundTile.module.css';

const roundTile = props => (
    <section className={classes.RoundTile} onClick={() => props.clicked(props.id)}>
        <h2>{props.courseName}</h2>
        <p>{props.date}</p>
    </section>
)

export default roundTile;