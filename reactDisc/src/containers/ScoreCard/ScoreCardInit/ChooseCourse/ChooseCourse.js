import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../../axiosApi';
import classes from './ChooseCourse.module.css';

import Button from '../../../../components/UI/Button/Button';
import { courseBasketsRemove, courseClicked } from '../../../../store/actions/scoreCardInit';
import Auxiliary from '../../../../hoc/Auxiliary';

class ChooseCourse extends Component {
    state = {
        inputValue: '',
        courses: [],
        suggestions: [],
        courseSelected: false
    };

    componentDidMount () {
        axios.get('/courses')
            .then(response => {
                const courses = response.data.map(course => {
                    return course.name;
                });
                this.setState({courses: courses});
            });
    };

    onInputChange = (event) => {
        const newInputValue = event.target.value;
        let suggestions = [];
        if (newInputValue.length > 0) {
            const regex = new RegExp(`^${newInputValue}`, 'i');
            suggestions = this.state.courses.sort().filter(course => regex.test(course));
        };
        this.setState({ suggestions: suggestions, inputValue: newInputValue });
    };

    suggestionSelected = (value) => {
        this.setState({ inputValue: value, suggestions: [], courseSelected: true });
    };

    courseSelectRedirectToInit = () => {
        this.props.courseBasketsRemove();
        if (this.state.courseSelected && this.state.courses.includes(this.state.inputValue)) {
            axios.get('/courses')
            .then(response => {
                const course = response.data.find(course => course.name === this.state.inputValue);
                this.props.courseClicked(course);
            })
            this.props.history.push('/playerselect');
        }
    }

    courseSelectRedirectToWeather = () => {
        if (this.state.courseSelected && this.state.courses.includes(this.state.inputValue)) {
            this.props.history.push('/weather');
        }
        
    }

    renderSuggestions () {
        const suggestions = this.state.suggestions;
        if (suggestions.length === 0) {
            return null
        }
        return (
            <div className={classes.AutoCompleteBox}>
                <ul>
                    {suggestions.map((suggestion, index) => 
                    (<li onClick={() => this.suggestionSelected(suggestion)} key={index}>{suggestion}</li>))}
                </ul>
            </div>
        )
    };

    render () {
        const { inputValue } = this.state;

        let unfinishedRound = null;
        if (this.props.currentScoringHoles.length >= 1 && this.props.currentScoringId === this.props.userId) {
            unfinishedRound = (
                <div className={classes.unfinishedRoundContainer}>
                    <span className={classes.UnfinishedRoundText}>You have an unfinished round </span>
                    <button 
                        className={classes.UnfinishedRoundButton}
                        onClick={() => this.props.history.push('/scoring')}
                    >
                        {this.props.course.name}
                    </button>
                </div>
            )
        }

        return (
            <Auxiliary>
                <div className={classes.CourseChoose}>
                    <h3>Search for a course</h3> 
                    <input value={inputValue} onChange={this.onInputChange} type="text"></input>
                    <div className={classes.SuggestionBoxContainer}>
                        {this.renderSuggestions()}
                    </div>
                    <div className={classes.buttonsContainer}>
                        <Button btnType="Success" 
                            clicked={() => {
                                this.courseSelectRedirectToInit()}
                            }>Start a Round</Button>
                        <Button btnType="Success"
                            clicked={() => {
                                this.courseSelectRedirectToWeather()
                            }}>Check Weather</Button>
                    </div>
                </div>
                {unfinishedRound}
            </Auxiliary>
        );
    }
};
const mapStateToProps = state => {
    return {
        course: state.course,
        currentScoringHoles: state.currentScoring.holes,
        currentScoringId: state.currentScoring.scoringOwnerId,
        userId: state.userId

    }
}

const mapDispatchToProps = dispatch => {
    return {
        courseClicked: (course) => dispatch(courseClicked(course)),
        courseBasketsRemove: () => dispatch(courseBasketsRemove())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCourse);

