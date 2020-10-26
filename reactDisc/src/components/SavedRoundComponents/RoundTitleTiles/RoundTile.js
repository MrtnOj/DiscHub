import React from 'react';

import classes from './RoundTile.module.css';

const roundTile = props => {

    

    return (
        <div className={classes.RoundTile} onClick={() => props.clicked(props.id)}>
            <h3>{props.courseName}</h3>
            <span>{props.date}</span>
        </div>
    )
}

export default roundTile;