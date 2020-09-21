import React, { Component } from 'react';

import axios from '../../axios-courses';
import RoundTile from '../../components/SavedRoundComponents/RoundTitleTiles/RoundTile';
//import classes from './RoundScores.module.css';

class RoundScores extends Component {
    state = {
        scores: []
    }

    componentDidMount () {
        axios.get('/scores')
            .then(response => {
                let scoresArray = [];
                const roundScores = response.data;
                roundScores.forEach(score => {
                    scoresArray.push(score);
                });
                this.setState({ scores: scoresArray })
                console.log(scoresArray);
            });
    }

    roundTileClickedHandler = (id) => {

    }

    render () {
        const scoreTiles = this.state.scores.map(el => {
            return <RoundTile 
                        courseName={el.courseName}
                        date={el.date.split('T')[0]}
                        //onClick={() => roundTileClickedHandler(el._id)} 
                        /> 
        });
        return (
            <div>
                {scoreTiles}
            </div>
        );  
    };
}

export default RoundScores;