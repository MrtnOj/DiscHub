import React from 'react';

import classes from './PersonScoring.module.css';

const personScore = (props) => {

    return (
    <div 
        className={props.active === props.id ? [classes.personScoring, classes.personScoringActive].join(' ') : classes.personScoring} 
        onClick={() => props.clicked(props.id)}>
        <h4>{props.mong}</h4>
        <div className={props.active === props.id ? [classes.scoreInput, classes.scoreInputActive].join(' '): classes.scoreInput}>
            {props.score}
        </div>
    </div>
    )
};

export default personScore;