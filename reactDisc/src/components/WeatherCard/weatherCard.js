import React from 'react';

import classes from './weatherCard.module.css';

const weatherCard = props => (
    <div className={classes.WeatherCard}>
        <p className={classes.time}>{props.time}</p>
        <div className={classes.CardNumData}>
            <p className={classes.temperature}>{props.temperature} °C</p>
            <p className={classes.wind}>{props.wind} m/s</p>
        </div>
        <p className={classes.characteristics}>{props.characteristics}</p>
    </div>
);

export default weatherCard;

