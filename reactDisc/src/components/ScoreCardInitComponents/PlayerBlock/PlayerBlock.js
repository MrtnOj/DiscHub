import React from 'react';

import classes from './PlayerBlock.module.css';
import Button from '../../UI/Button/Button';

const playerBlock = props => {
    return (
        <div className={classes.PlayerBlock}>
            <h4>{props.playerName}</h4>
            <Button btnType="Danger" clicked={props.removePlayer}>x</Button>
        </div>
    );    
}

export default playerBlock;