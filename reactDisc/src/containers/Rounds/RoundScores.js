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
        this.props.history.push({ pathname: '/' + id });
    }

    render () {
        const scoreTiles = this.state.scores.map(el => {
            return <RoundTile 
                        key={el._id}
                        id={el._id}
                        courseName={el.courseName}
                        date={el.date.split('T')[0]}
                        clicked={this.roundTileClickedHandler}
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