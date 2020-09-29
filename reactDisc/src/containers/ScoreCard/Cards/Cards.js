import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../../hoc/Auxiliary';
import axios from '../../../axios-courses';
import HoleCardButtons from '../../../components/HoleCardButtons/HoleCardButtons';
import HoleScoreCard from '../../../components/HoleScoreCards/HoleScoreCard/HoleScoreCard';
import NumericKeyboard from '../../../components/UI/NumericKeyboard/NumericKeyboard';
import classes from './Cards.module.css';
import Button from '../../../components/UI/Button/Button';

class Card extends Component {
    state = {
        courseName: '',
        baskets: [],
        players: [],
        activePlayer: '',
    };

    componentDidMount () {
        if (this.state.courseName === '') {
            axios.get('/courses')
                .then(response => {
                    const courseData = response.data.find(course => course.name === this.props.course);
                    let holes = [];
                    courseData.Pars.forEach((el, index) => {
                        if (index ===0) {
                            holes.push({
                                hole: index + 1,
                                par: el,
                                visible: true
                            })
                            } else {
                            holes.push({
                                hole: index + 1,
                                par: el,
                                visible: false
                            });
                        }
                    });
                    this.setState({ baskets: holes, courseName: this.props.course, players: this.props.players, activePlayer: this.props.players[0].id });
                });
        }
    };

    cardButtonHandler = (holeNr) => {
        const newVisible = this.state.baskets.map(el => {
            if (el.hole === holeNr) {
                const updatedElement = {
                    ...el,
                    visible: true
                };
                return updatedElement;
            } else {
                const updatedElement = {
                    ...el,
                    visible: false
                };
                return updatedElement;
            }
        });
        this.setState({baskets: newVisible, activePlayer: this.state.players[0].id });
    };

    activePlayerHandler = (id) => {
        this.setState({ activePlayer: id});
    }

    keyboardNrButtonHandler = (btnValue) => {
        const scoringPlayer = this.state.players.find(player => player.id === this.state.activePlayer);
        let nextPlayer = this.state.players[this.state.players.indexOf(scoringPlayer)+1];
        if (this.state.players.length-1 === this.state.players.indexOf(scoringPlayer)) {
            nextPlayer = scoringPlayer;
        }
        const newBaskets = this.state.baskets.map(basket => {
            if (basket.visible) {
                basket[scoringPlayer.name] = btnValue
            }
            return basket;
        });
        this.setState({ baskets: newBaskets, activePlayer: nextPlayer.id });
    }

    keyBoardArrowHandler = (arrowDirection) => {
        //arrowDirection = true for next card and false for previous card
        const activeCardIndex = this.state.baskets.indexOf(this.state.baskets.find(el => el.visible));
        const newActive = this.state.baskets.map((el, index) => {
            if (arrowDirection && index === activeCardIndex+1) {
                const updatedElement = {
                    ...el,
                    visible: true
                };
                return updatedElement;
            } else if (!arrowDirection && index === activeCardIndex-1) {
                const updatedElement = {
                    ...el,
                    visible: true
                }
                return updatedElement;
            } else if ((!arrowDirection && activeCardIndex === 0) || (arrowDirection && activeCardIndex === this.state.baskets.length -1)) {
                return el;
            } else {
                const updatedElement = {
                    ...el,
                    visible: false
                }
                return updatedElement;
            }
        });
        this.setState({ baskets: newActive, activePlayer: this.props.players[0].id });
    }

    submitScoreHandler = () => {
        const scoresObject = this.state.baskets;
        scoresObject.forEach(el => delete el.visible);
        const scores = {
            courseName: this.props.course,
            players: this.props.players,
            playerScores: scoresObject,
            date: new Date(),
            userId: this.props.userId
        };
        axios.post('/scores', scores)
            .then(response => {
                console.log(response);
            });
    };

    render () {

        const scoringCards = this.state.baskets.map(el => (
            <HoleScoreCard key={el.hole}
            numberPressed={this.changeInputOnNrPress}
            activePlayerHandler={this.activePlayerHandler}
            activePlayer={this.state.activePlayer}
            holeNumber={el.hole}
            scores={el}
            par={el.par}
            active={el.visible}
            players={this.props.players} />));

        return (
            <Auxiliary>
                <HoleCardButtons cardClicked={this.cardButtonHandler} holes={this.state.baskets} />
                <div className={classes.Cards}>
                    {scoringCards}
                    <Button btnType="Success" clicked={() => this.submitScoreHandler()}>Submit scores!</Button>
                </div>
                <NumericKeyboard numberPressed={this.keyboardNrButtonHandler} arrowPressed={this.keyBoardArrowHandler} />
            </Auxiliary>
        );
    }
};

const mapStateToProps = state => {
    return {
        course: state.courseName,
        players: state.playerInputs,
        userId: state.userId
    };
}

export default connect(mapStateToProps)(Card);