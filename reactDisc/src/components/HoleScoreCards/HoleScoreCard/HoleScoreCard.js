import React from 'react';

import classes from './HoleScoreCard.module.css';
import PersonScore from './PersonScoring/PersonScoring';

const HoleScoreCard = (props) => (
    <div className={classes.scoreCard} style={{ display: props.active ? 'block' : 'none' }}>
        <div className={classes.cardTitle}>
            <h3>Hole {props.holeNumber}    --  </h3>
            <h4>   Par {props.par}</h4>
        </div>
        <div className={classes.playerElements}>
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
        </div>    
    </div>
);

export default HoleScoreCard;