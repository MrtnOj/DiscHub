import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';
import PlayerBlock from '../../../components/ScoreCardInitComponents/PlayerBlock/PlayerBlock';
import Auxiliary from '../../../hoc/Auxiliary';
import { startRoundClicked } from '../../../store/actions/scoreCardInit';



import classes from './ScoreCardInit.module.css';

class ScoreCardInit extends Component {
    state = {
        courseName: '',
        playerInputValue: '',
        playerCount: 1,
        players: [],
        submitted: false,
        addingPlayer: false
    };

    componentDidMount = () => {
        if (this.props.userId) {
            const playersArray = [{ name: this.props.userName, id: this.props.userId }];
            this.setState({ players: playersArray });
        }
    };

    addPlayerBtnClicked = () => {
        this.setState({ addingPlayer: true });
    };

    onPlayerSubmit = () => {
        let newPlayersArray = this.state.players;
        newPlayersArray.push({ name: this.state.playerInputValue, id: `${this.state.playerInputValue + Math.floor(Math.random()*1000)}`})

        this.setState({ players: newPlayersArray, addingPlayer: false, playerInputValue: '' })
    }

    cancelAddPlayer = () => {
        this.setState({ addingPlayer: false });
    }

    removePlayerHandler = (id) => {
        const newPlayers = this.state.players.filter(player => {
           return player.id !== id;
        });
        this.setState({ players: newPlayers })
    };

    onPlayerInputChange = (event) => {
        let inputV = event.target.value;
        this.setState({ playerInputValue: inputV })
    }

    courseInputChangeHandler = (courseInputValue) => {
        this.setState( { courseName: courseInputValue } );
    };

    onSubmitRedirect = () => {
        this.props.history.push('/scoring');
    }

    render () {
        const playersOnInitCard = this.state.players.map(player => {
            return (
                <PlayerBlock key={player.id} playerName={player.name} removePlayer={() => this.removePlayerHandler(player.id)} />
            )
        });
        return (
            <Auxiliary>
                <Modal show={this.state.addingPlayer}>
                    <input value={this.state.playerInputValue} onChange={this.onPlayerInputChange}></input>
                    <Button btnType="Success" clicked={this.onPlayerSubmit}>ADD</Button>
                    <Button btnType="Danger" clicked={this.cancelAddPlayer}>CANCEL</Button>
                </Modal>
                <div className={classes.InitBox}>
                    <h2>{this.props.course}</h2>
                    {playersOnInitCard}
                    <Button clicked={this.addPlayerBtnClicked}
                        btnType="Success">
                        +Add
                    </Button>
                    <Button clicked={() => {
                        this.props.startRoundClicked(this.props.course, this.state.players);
                        this.onSubmitRedirect()}}
                        btnType="Success">
                        START
                    </Button>
                </div>
            </Auxiliary>
        );
    }
};

const mapStateToProps = state => {
    return {
        course: state.courseName,
        players: state.playerInputs,
        userName: state.userName,
        userId: state.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        startRoundClicked: (courseName, playerInputs) => dispatch(startRoundClicked(courseName, playerInputs))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCardInit);