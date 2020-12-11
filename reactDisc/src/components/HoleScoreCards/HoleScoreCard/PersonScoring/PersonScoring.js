import React from 'react';

import classes from './PersonScoring.module.css';

const personScore = (props) => {

    return (
    <section
        className={props.active === props.id ? [classes.personScoring, classes.personScoringActive].join(' ') : classes.personScoring} 
        onClick={() => props.clicked(props.id)}>
        <h2 className={classes.PlayerName}>{props.mong}</h2>
        <p className={props.active === props.id ? [classes.scoreInput, classes.scoreInputActive].join(' '): classes.scoreInput}>
            {props.score}
        </p>
        <p className={classes.TotalScore}>{props.totalScore}</p>
    </section>
    )
};

export default personScore;