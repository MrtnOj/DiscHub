import React, { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../../hoc/Auxiliary';
import axios from '../../../axios-courses';
import HoleCardButtons from '../../../components/HoleCardButtons/HoleCardButtons';
import HoleScoreCard from '../../../components/HoleScoreCards/HoleScoreCard/HoleScoreCard';
import NumericKeyboard from '../../../components/UI/NumericKeyboard/NumericKeyboard';
import classes from './Cards.module.css';
import Button from '../../../components/UI/Button/Button';
import { courseBasketsSet } from '../../../store/actions/scoring';

class Card extends Component {
    state = {
        activePlayer: '',
        scoreCardValid: false,
        inValidCardMessage: ''
    };

    componentDidMount () {
        axios.get('/courses')
            .then(response => {
                const courseData = response.data.find(course => course.name === this.props.course.name);
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
                this.setState({ activePlayer: this.props.players[0].id });
                this.props.courseBasketsSet(holes);
                // if (this.props.baskets.length <= 1) {
                //     this.props.courseBasketsSet(holes)
                // }
            });
    };

    cardButtonHandler = (holeNr) => {
        const newVisible = this.props.baskets.map(el => {
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
        this.setState({ activePlayer: this.props.players[0].id });
        this.props.courseBasketsSet(newVisible);
    };

    activePlayerHandler = (id) => {
        this.setState({ activePlayer: id});
    }

    keyboardNrButtonHandler = (btnValue) => {
        const scoringPlayer = this.props.players.find(player => player.id === this.state.activePlayer);
        let nextPlayer = this.props.players[this.props.players.indexOf(scoringPlayer)+1];
        if (this.props.players.length-1 === this.props.players.indexOf(scoringPlayer)) {
            nextPlayer = scoringPlayer;
        }
        const newBaskets = this.props.baskets.map(basket => {
            if (basket.visible) {
                basket[scoringPlayer.name] = btnValue
            }
            return basket;
        });
        this.setState({ activePlayer: nextPlayer.id });
        this.props.courseBasketsSet(newBaskets);
        this.scoreCardValidityChecker();
    }

    keyBoardArrowHandler = (arrowDirection) => {
        //arrowDirection = true for next card and false for previous card
        const activeCardIndex = this.props.baskets.indexOf(this.props.baskets.find(el => el.visible));
        const newActive = this.props.baskets.map((el, index) => {
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
            } else if ((!arrowDirection && activeCardIndex === 0) || (arrowDirection && activeCardIndex === this.props.baskets.length -1)) {
                return el;
            } else {
                const updatedElement = {
                    ...el,
                    visible: false
                }
                return updatedElement;
            }
        });
        this.setState({ activePlayer: this.props.players[0].id });
        this.props.courseBasketsSet(newActive);
    }

    scoreCardValidityChecker = () => {
        this.setState({ scoreCardValid: true})
        const playerNames = this.props.players.map(player => {
            return player.name;
        });
        this.props.baskets.forEach(basket => {
            let scoreInputsFilled = true;
            let validScores = true;
            for (const name of playerNames) {
                const isValid = Object.keys(basket).includes(name);
                scoreInputsFilled = !isValid ? false : scoreInputsFilled;
                for (const key in basket) {
                    if (key === name && basket[key] === 0) {
                        validScores = false;
                    }
                }
            }
            if (!scoreInputsFilled) {
                this.setState({ inValidCardMessage: `Missing score input on hole ${basket.hole} `, scoreCardValid: false});
                return
            }
            if (!validScores) {
                this.setState({ inValidCardMessage: `Invalid score 0 on hole ${basket.hole} `, scoreCardValid: false });
                return
            }
        })   
    }

    submitScoreHandler = () => {
        if (this.scoreCardValid) {
            const scoresObject = this.props.baskets;
            scoresObject.forEach(el => delete el.visible);
            const scores = {
                courseName: this.props.course.name,
                players: this.props.players,
                playerScores: scoresObject,
                date: new Date(),
                userId: this.props.userId
            };
            axios.post('/scores', scores)
                .then(response => {
                    console.log(response);
                });
        } else {
            console.log(this.state.inValidCardMessage)
        }
    }
        

    render () {
        const scoringCards = this.props.baskets.map(el => (
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
                <HoleCardButtons cardClicked={this.cardButtonHandler} holes={this.props.baskets} />
                <div className={classes.Cards}>
                    {scoringCards}
                    <Button disabled={!this.state.scoreCardValid} btnType="Success" clicked={() => this.submitScoreHandler()}>Submit scores!</Button>
                </div>
                <NumericKeyboard numberPressed={this.keyboardNrButtonHandler} arrowPressed={this.keyBoardArrowHandler} />
            </Auxiliary>
        );
    }
};

const mapStateToProps = state => {
    return {
        course: state.course,
        players: state.playerInputs,
        userId: state.userId,
        baskets: state.baskets
    };
}

const mapDispatchToProps = dispatch => {
    return {
        courseBasketsSet: (baskets) => dispatch(courseBasketsSet(baskets))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);