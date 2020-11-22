import React from 'react';

import classes from './HoleCardButtons.module.css'
import HoleCardButton from './HoleCardButton/HoleCardButton';


const holeCardButtons = (props) => (
    <div className={props.holes.length >= 16 ? classes.HoleCardButtons : classes.HoleCardButtonsWeird}>
        {props.holes.map(el => (
            <HoleCardButton key={el.hole} holeNumber={el.hole} clicked={() => props.cardClicked(el.hole)} active={el.visible} />
        ))}
    </div>
);

export default holeCardButtons;