import React, { Component } from 'react';

import classes from './RoundScoreCard.module.css';
import axios from '../../../axios-courses';

class RoundScoreCard extends Component {
    state = {
        playerScores: [],
        players: [],
        pars: [],
        courseName: '',
        date: ''
    }

    componentDidMount () {
        axios.get('/scores/' + this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                const playerScores = response.data.scoreCard.playerScores;
                const players = response.data.scoreCard.players;
                const courseName = response.data.scoreCard.courseName;
                const date = response.data.scoreCard.date.split('T');
                const pars = playerScores.map(hole => hole.par);
                this.setState({ playerScores: playerScores, players: players, pars: pars, courseName: courseName, date: date[0] });
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
                    }
                }
            }
            playersTableArray.push(playerObject);
        });
        return playersTableArray;
    }

    tableCellColorAssign = (playerScore, parScore) => {
        let color;
        switch (playerScore - parScore) {
            case 1:
                color = '#ebc7c5';
                break;
            case 2:
                color = '#d18d8a';
                break;
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                color = '#b8a6de'
                break;
            case -1:
                color = 'lightgreen';
                break;
            case -2:
                color = 'lightblue';
                break;
            default:
                color = 'white';
        }
        let tableScoreCell = <td style={{ backgroundColor: color }}>{playerScore}</td>;
        return tableScoreCell
    }

    createTable = () => {
        const scores = this.convertRoundData();
        console.log(scores);
        let table = [];
        let headerCells = [];
        //create headers
        for (let holeNr in scores[0]) {
            headerCells.push(<th>{holeNr}</th>);
        }
        headerCells.pop();
        headerCells.unshift(<th></th>);
        headerCells.push(<th>{'+-'}</th>)
        table.push(<tr>{headerCells}</tr>);

        // Pars header
        let parCells = [];
        for (let par of this.state.pars) {
            parCells.push(<td>{par}</td>)
        }
        parCells.unshift(<td>{'Par'}</td>);
        parCells.push(<td>0</td>);
        table.push(<tr>{parCells}</tr>);

        //create table contents
        for (let players of scores) {
            let cells = [];
            let totalScore = 0;
            for (let key in players) {
                cells.push(this.tableCellColorAssign(players[key], this.state.pars[key-1]));
                if (!isNaN(players[key])) {
                    totalScore = totalScore + players[key] - this.state.pars[key-1];
                }
            }
            cells.unshift(cells.pop());
            cells.push(<td>{totalScore}</td>);
            table.push(<tr>{cells}</tr>)
        }
        return <table>{table}</table>;
    }

    createMobileTable = () => {
        const scores = this.convertRoundData();
        let tableUpper = [];
        let tableLower = [];
        let headerCellsUpper = [];
        let headerCellsLower = [];
        //create headers
        for (let holeNr in scores[0]) {
            if (holeNr <= 9) {
                headerCellsUpper.push(<th>{holeNr}</th>)
            } else {
                headerCellsLower.push(<th>{holeNr}</th>)
            }
        }
        headerCellsUpper.unshift(<th></th>);
        headerCellsLower.pop();
        headerCellsLower.unshift(headerCellsUpper[0]);
        headerCellsLower.push(<th>{'+-'}</th>)
        tableUpper.push(<tr>{headerCellsUpper}</tr>);
        tableLower.push(<tr>{headerCellsLower}</tr>);

        // Pars header
        let parCellsUpper = [];
        let parCellsLower = [];
        for (let i = 0; i < this.state.pars.length; i++) {
            if (i < headerCellsUpper.length -1) {
                parCellsUpper.push(<td>{this.state.pars[i]}</td>)
            } else {
                parCellsLower.push(<td>{this.state.pars[i]}</td>)
            }
        }
        parCellsUpper.unshift(<td>{'Par'}</td>);
        parCellsLower.unshift(<td>{'Par'}</td>);
        parCellsLower.push(<td>0</td>);
        tableUpper.push(<tr>{parCellsUpper}</tr>);
        tableLower.push(<tr>{parCellsLower}</tr>);

        //create table contents
        for (let players of scores) {
            let cellsUpper = [];
            let cellsLower = [];
            let totalScore = 0;
            for (let key in players) {
                if (key <= 9) {
                    cellsUpper.push(this.tableCellColorAssign(players[key], this.state.pars[key-1]));
                } else {
                    cellsLower.push(this.tableCellColorAssign(players[key], this.state.pars[key-1]));
                }
                if (!isNaN(players[key])) {
                    totalScore = totalScore + players[key] - this.state.pars[key-1];
                }

            }
            cellsUpper.unshift(cellsLower.pop());
            cellsLower.unshift(cellsUpper[0]);
            cellsLower.push(<td>{totalScore}</td>);
            tableUpper.push(<tr>{cellsUpper}</tr>);
            tableLower.push(<tr>{cellsLower}</tr>)
        }
        let mobileTable = (<div className={classes.MobileTableContainer}>
                <table className={classes.MobileTableUpperHalf}>{tableUpper}</table>
                <table className={classes.MobileTableLowerHalf}>{tableLower}</table>
            </div>);
        return mobileTable;
    }

    render () {
        return (
            <div className={classes.TableContainer}>
                <div className={classes.ScoreCardHeader}>
                    <h3>{this.state.courseName}</h3>
                    <h4>{this.state.date}</h4>
                </div>
                {this.createMobileTable()}
            </div>
        );
    }
}

export default RoundScoreCard;