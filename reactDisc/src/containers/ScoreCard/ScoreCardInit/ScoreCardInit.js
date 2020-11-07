import React, { Component } from 'react';
import { connect } from 'react-redux';

import Button from '../../../components/UI/Button/Button';
import Modal from '../../../components/UI/Modal/Modal';
import Input from '../../../components/UI/Input/Input';
import PlayerBlock from '../../../components/ScoreCardInitComponents/PlayerBlock/PlayerBlock';
import Auxiliary from '../../../hoc/Auxiliary';
import formValidityCheck from '../../../util/formValidityCheck';
import { startRoundClicked } from '../../../store/actions/scoreCardInit';



import classes from './ScoreCardInit.module.css';

class ScoreCardInit extends Component {
    state = {
        courseName: '',
        nameInputControls: {
            elementType: 'input',
            elementConfig: {
                type: 'name',
                placeholder: 'Name'
            },
            value: '',
            validation: {
                required: true,
                minLength: 2,
                maxLength: 12
            },
            valid: false,
            touched: false
        },
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
        if (this.state.nameInputControls.valid) {
            let newPlayersArray = this.state.players;
            newPlayersArray.push({ name: this.state.nameInputControls.value, id: `${this.state.nameInputControls.value + Math.floor(Math.random()*1000)}`})
            const newInputControls = {
                ...this.state.nameInputControls,
                value: ''
            }
            this.setState({ players: newPlayersArray, addingPlayer: false, nameInputControls: newInputControls })
        }
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
        const newInputControls = {
            ...this.state.nameInputControls,
            value: event.target.value,
            valid: formValidityCheck(event.target.value, this.state.nameInputControls.validation),
            touched: true
        }
        this.setState({ nameInputControls: newInputControls })
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
                    <Input 
                        elementConfig={this.state.nameInputControls.elementConfig}
                        value={this.state.nameInputControls.value}
                        invalid={!this.state.nameInputControls.valid}
                        shouldValidate={this.state.nameInputControls.validation.required}
                        touched={this.state.nameInputControls.touched}
                        changed={(event) => this.onPlayerInputChange(event)} 
                    />
                    <Button btnType="Success" clicked={this.onPlayerSubmit}>ADD</Button>
                    <Button btnType="Danger" clicked={this.cancelAddPlayer}>CANCEL</Button>
                </Modal>
                <div className={classes.InitBox}>
                    <h2>{this.props.course.name}</h2>
                    {playersOnInitCard}
                    <Button clicked={this.addPlayerBtnClicked}
                        btnType="Success">
                        +Add
                    </Button>
                    <Button clicked={() => {
                        this.props.startRoundClicked(this.state.players);
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
        course: state.course,
        players: state.playerInputs,
        userName: state.userName,
        userId: state.userId,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        startRoundClicked: (courseName, playerInputs) => dispatch(startRoundClicked(courseName, playerInputs))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScoreCardInit);