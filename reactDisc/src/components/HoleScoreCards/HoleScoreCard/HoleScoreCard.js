import React from 'react';

import classes from './HoleScoreCard.module.css';
import PersonScore from './PersonScoring/PersonScoring';

const HoleScoreCard = (props) => (
    <article className={classes.scoreCard} style={{ display: props.active ? 'block' : 'none' }}>
        <h2>Hole {props.holeNumber} - <span> par {props.par}</span></h2>
        <div className={classes.Divider}></div>
        <p className={classes.playerElements}>
            {props.players.map(player => (
                <PersonScore mong={player.name}
                score={props.scores[player.name]}
                totalScore={props.totalScores[player.name]}
                numberPressed={props.numberPressed}
                active={props.activePlayer}
                id={player.id}
                clicked={props.activePlayerHandler}
                key={player.id}
                holeNr={props.holeNumber} />
            ))}
        </p>    
    </article>
);

export default HoleScoreCard;