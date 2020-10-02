import React from 'react';

import classes from './PlayerBlock.module.css';

const playerBlock = props => {
    return (
        <div className={classes.PlayerBlock}>
            <h4>{props.playerName}</h4>
            <button className={classes.Button} onClick={props.removePlayer}>x</button>
        </div>
    );    
}

export default playerBlock;