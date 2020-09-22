import React, { Component } from 'react';

import classes from './RoundScoreCard.module.css';
import axios from '../../../axios-courses';

class RoundScoreCard extends Component {
    state = {
        playerScores: [],
        players: []
    }

    componentDidMount () {
        axios.get('/scores/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                const playerScores = response.data.scoreCard.playerScores;
                const players = response.data.scoreCard.players;
                this.setState({ playerScores: playerScores, players: players });
            })
    }

    convertRoundData = () => {
        // a lot of code to convert the database data into a format so I could create a table with it
        const playerNames = this.state.players.map(player => player.name);
        let playersTableArray = [];
        playerNames.forEach(name => {
            let playerObject = {name: name};
            for (let hole of this.state.playerScores) {
                for (let key in hole) {
                    if (key === name) {
                        const playerHoleScore = {[hole.hole]: hole[key]}
                        Object.assign(playerObject, playerHoleScore);
                    };
                }
            }
            playersTableArray.push(playerObject);
        });
        return playersTableArray;
    }

    createTable = () => {
        const scores = this.convertRoundData();
        let table = [];
        for (let players of scores) {
            let cells = [];
            for (let key in players) {
                cells.push(<td>{players[key]}</td>)
            }
            table.push(<tr>{cells}</tr>)
        }
        return table;
    }

    render () {
        this.createTable();
        return (
            <table>
                {this.createTable()}
            </table>
        );
    }
}

export default RoundScoreCard;