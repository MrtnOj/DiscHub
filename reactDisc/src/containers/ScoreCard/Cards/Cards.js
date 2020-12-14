import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../util/axiosApi';
import HoleCardButtons from '../../../components/HoleCardButtons/HoleCardButtons';
import HoleScoreCard from '../../../components/HoleScoreCards/HoleScoreCard/HoleScoreCard';
import NumericKeyboard from '../../../components/UI/NumericKeyboard/NumericKeyboard';
import classes from './Cards.module.css';
import Button from '../../../components/UI/Button/Button';
import { courseBasketsSet } from '../../../store/actions/scoring';
import { courseBasketsRemove } from '../../../store/actions/scoreCardInit';
import Auxiliary from '../../../hoc/Auxiliary';

class Card extends Component {
    state = {
        activePlayer: '',
        scoreCardValid: false,
        validityErrorDisplay: false,
        inValidCardMessage: '',
        totalScores: {}
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
                this.scoreCardValidityChecker();
                if (this.props.currentScoringHoles.length <= 1) {
                    this.props.courseBasketsSet(holes, this.props.userId)
                }
            })
    }

    totalScoreCalc = () => {
        let totalScores = {};
        for (const player of this.props.players) {
            let playerTotalScore = 0;
            this.props.currentScoringHoles.forEach(hole => {
                if (player.name in hole) {
                    playerTotalScore = playerTotalScore + hole[player.name] - hole.par;
                }
            });
            Object.assign(totalScores, {[player.name]: playerTotalScore})
        }
        this.setState({ totalScores: totalScores })
    }

    cardButtonHandler = (holeNr) => {
        const newVisible = this.props.currentScoringHoles.map(el => {
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
                }
                return updatedElement;
            }
        })
        this.setState({ activePlayer: this.props.players[0].id });
        this.props.courseBasketsSet(newVisible, this.props.userId)
    }

    activePlayerHandler = (id) => {
        this.setState({ activePlayer: id})
    }

    keyboardNrButtonHandler = (btnValue) => {
        const scoringPlayer = this.props.players.find(player => player.id === this.state.activePlayer);
        let nextPlayer = this.props.players[this.props.players.indexOf(scoringPlayer)+1];
        if (this.props.players.length-1 === this.props.players.indexOf(scoringPlayer)) {
            nextPlayer = scoringPlayer;
        }
        const newBaskets = this.props.currentScoringHoles.map(basket => {
            if (basket.visible) {
                basket[scoringPlayer.name] = btnValue
            }
            return basket;
        });
        this.setState({ activePlayer: nextPlayer.id });
        this.props.courseBasketsSet(newBaskets, this.props.userId);
        this.scoreCardValidityChecker();
        this.totalScoreCalc()
    }

    keyBoardArrowHandler = (arrowDirection) => {
        //arrowDirection = true for next card and false for previous card
        const activeCardIndex = this.props.currentScoringHoles.indexOf(this.props.currentScoringHoles.find(el => el.visible));
        const newActive = this.props.currentScoringHoles.map((el, index) => {
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
            } else if ((!arrowDirection && activeCardIndex === 0) || (arrowDirection && activeCardIndex === this.props.currentScoringHoles.length -1)) {
                return el;
            } else {
                const updatedElement = {
                    ...el,
                    visible: false
                }
                return updatedElement;
            }
        })
        this.setState({ activePlayer: this.props.players[0].id });
        this.props.courseBasketsSet(newActive, this.props.userId);
    }

    scoreCardValidityChecker = () => {
        this.setState({ scoreCardValid: true})
        const playerNames = this.props.players.map(player => {
            return player.name;
        })
        this.props.currentScoringHoles.forEach(basket => {
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
        if (this.state.scoreCardValid) {
            const scoresObject = this.props.currentScoringHoles;
            scoresObject.forEach(el => delete el.visible);
            const scores = {
                courseName: this.props.course.name,
                players: this.props.players,
                playerScores: scoresObject,
                date: new Date(),
                userId: this.props.userId
            }
            axios.post('/scores', scores, { headers: {
                Authorization: 'Bearer ' + this.props.token
            }
        })
                .then(response => {
                    this.props.history.push({ pathname: '/round/' + response.data.result._id })
                })
            this.props.courseBasketsRemove()
        } else {
            this.setState({ validityErrorDisplay: true })
        }
    }
        

    render () {
        const scoringCards = this.props.currentScoringHoles.map(el => (
            <HoleScoreCard key={el.hole}
            numberPressed={this.changeInputOnNrPress}
            activePlayerHandler={this.activePlayerHandler}
            activePlayer={this.state.activePlayer}
            holeNumber={el.hole}
            scores={el}
            par={el.par}
            active={el.visible}
            players={this.props.players}
            totalScores={this.state.totalScores} />));

        return (
            <Auxiliary>
                <h1 className={classes.CourseName}>{this.props.course.name}</h1>
                <HoleCardButtons cardClicked={this.cardButtonHandler} holes={this.props.currentScoringHoles} />
                {scoringCards}
                {!this.props.token ? <p className={classes.LoginWarning}>You need to log in to save your rounds.</p> : null }
                {/* {this.state.validityErrorDisplay ? <p>{this.state.inValidCardMessage}</p> : null } */}
                <Button 
                    position="CenteredButton"
                    disabled={!this.state.scoreCardValid} 
                    btnType="Success" 
                    clicked={() => this.submitScoreHandler()}
                >
                    Submit scores!
                </Button>
                {/* div below is to make the page scrollable when scorecard extends below the numeric keyboard */}
                <div style={{ height: '35vh'}}></div>
                <NumericKeyboard numberPressed={this.keyboardNrButtonHandler} arrowPressed={this.keyBoardArrowHandler} />
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        course: state.course,
        players: state.playerInputs,
        userId: state.userId,
        currentScoringHoles: state.currentScoring.holes,
        currentScoringId: state.currentScoring.scoringOwnerId,
        token: state.token
    };
}

const mapDispatchToProps = dispatch => {
    return {
        courseBasketsSet: (baskets, id) => dispatch(courseBasketsSet(baskets, id)),
        courseBasketsRemove: () => dispatch(courseBasketsRemove())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);