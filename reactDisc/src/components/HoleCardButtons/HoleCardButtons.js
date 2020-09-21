import React from 'react';

import classes from './HoleCardButtons.module.css'
import HoleCardButton from './HoleCardButton/HoleCardButton';


const holeCardButtons = (props) => (
    <div className={classes.holeCardButtons}>
        {props.holes.map(el => (
            <HoleCardButton key={el.hole} holeNumber={el.hole} clicked={() => props.cardClicked(el.hole)} active={el.visible} />
        ))}
    </div>
);

export default holeCardButtons;