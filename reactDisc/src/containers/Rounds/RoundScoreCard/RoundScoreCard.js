import React, { Component } from 'react';
import { connect } from 'react-redux';
import MediaQuery from 'react-responsive';

import tableCellColorAssign from '../../../util/tableCellColorAssign';
import classes from './RoundScoreCard.module.css';
import axios from '../../../axios-courses';

class RoundScoreCard extends Component {
    state = {
        playerScores: [],
        players: [],
        pars: [],
        courseName: '',
        date: '',
        parTotal: 0
    }

    componentDidMount () {
        axios.get('/scores/' + this.props.match.params.id, { headers: {
            Authorization: 'Bearer ' + this.props.token
        }
    })
            .then(response => {
                console.log(response.data);
                const playerScores = response.data.scoreCard.playerScores;
                const players = response.data.scoreCard.players;
                const courseName = response.data.scoreCard.courseName;
                const date = response.data.scoreCard.date.split('T');
                const pars = playerScores.map(hole => parseInt(hole.par));
                const parTotal = pars.reduce(( acc, cur ) => acc + cur);
                this.setState({ playerScores: playerScores, players: players, pars: pars, courseName: courseName, date: date[0], parTotal: parTotal });
            })
    }

    convertRoundData = () => {
        // a lot of code to convert the database data into a format so I could create a table with it
        const playerNames = this.state.players.map(player => player.name);
        let playersTableArray = [];
        playerNames.forEach(name => {
            let playerObject = {};
            let playerTotalScore = 0;
            for (let hole of this.state.playerScores) {
                for (let key in hole) {
                    if (key === name) {
                        const playerHoleScore = {[hole.hole]: hole[key]}
                        playerTotalScore = playerTotalScore + hole[key];
                        Object.assign(playerObject, playerHoleScore);
                    }
                }
            }
            const scoreRelativeToPar = playerTotalScore - this.state.parTotal;
            Object.assign(playerObject, { '+-': scoreRelativeToPar });
            Object.assign(playerObject, { name: name });
            playersTableArray.push(playerObject);
        });
        return playersTableArray;
    }

    createTable = () => {
        const scores = this.convertRoundData();
        let table = [];
        let headerCells = [];
        //create headers
        for (let holeNr in scores[0]) {
            headerCells.push(<th>{holeNr}</th>);
        }
        headerCells.pop();
        headerCells.unshift(<th></th>);
        table.push(<tr>{headerCells}</tr>);

        // Pars header
        let parCells = [];
        for (let par of this.state.pars) {
            parCells.push(<td>{par}</td>)
        }
        parCells.unshift(<td>{'Par'}</td>);
        parCells.push(<td>{this.state.parTotal}</td>);
        table.push(<tr>{parCells}</tr>);

        //create table contents
        for (let players of scores) {
            let cells = [];
            for (let key in players) {
                cells.push(<td style={{ backgroundColor: tableCellColorAssign(players[key], this.state.pars[key-1])}}>{players[key]}</td>);
            }
            cells.unshift(cells.pop());
            table.push(<tr>{cells}</tr>)
        }
        return <table className={classes.ScoreTable}>{table}</table>;
    }

    createMobileTable = () => {
        const scores = this.convertRoundData();
        let tableUpper = [];
        let tableLower = [];
        let tableFinalScores = [];
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
        headerCellsLower.pop();
        headerCellsLower.unshift(headerCellsUpper[0]);
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
        tableUpper.push(<tr>{parCellsUpper}</tr>);
        tableLower.push(<tr>{parCellsLower}</tr>);

        //create table contents
        for (let players of scores) {
            let cellsUpper = [];
            let cellsLower = [];
            for (let key in players) {
                if (key <= 9) {
                    cellsUpper.push(<td style={{ backgroundColor: tableCellColorAssign(players[key], this.state.pars[key-1])}}>{players[key]}</td>);
                } else {
                    cellsLower.push(<td style={{ backgroundColor: tableCellColorAssign(players[key], this.state.pars[key-1])}}>{players[key]}</td>);
                }
            }
            cellsUpper.unshift(cellsLower.pop());
            cellsLower.unshift(cellsUpper[0]);
            tableFinalScores.push(<tr><td>{players.name}</td>{cellsLower.pop()}</tr>);
            tableUpper.push(<tr>{cellsUpper}</tr>);
            tableLower.push(<tr>{cellsLower}</tr>)
        }

        let mobileTable = (
            <div className={classes.MobileTable}>
                <table>{tableUpper}</table>
                {Object.keys(this.state.pars).length >= 10 ? <table>{tableLower}</table>: null} 
                <table className={classes.MobileFinalScoreTable}>{tableFinalScores}</table>
            </div>);
        return mobileTable;
    }

    render () {
        return (
            <div className={classes.TableContainer}>
                <div className={classes.ScoreCardHeader}>
                    <h3>{this.state.courseName}</h3>
                    <br/>
                    <p>{this.state.date}</p>
                </div>
                <MediaQuery minWidth={630}>
                    {this.createTable()}
                </MediaQuery>
                <MediaQuery maxWidth={629}>
                    {this.createMobileTable()}
                </MediaQuery>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.token
    }
}

export default connect(mapStateToProps)(RoundScoreCard);