import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../util/axiosApi';
import classes from './ChooseCourse.module.css';

import Button from '../../components/UI/Button/Button';
import { courseBasketsRemove, courseClicked } from '../../store/actions/scoreCardInit';
import { weatherCourseSet } from '../../store/actions/weather';

class ChooseCourse extends Component {
    state = {
        inputValue: '',
        courses: [],
        suggestions: [],
        courseSelected: false
    }

    componentDidMount () {
        axios.get('/courses')
            .then(response => {
                const courses = response.data.map(course => {
                    return course.name;
                });
                this.setState({courses: courses});
            });
    }

    onInputChange = (event) => {
        const newInputValue = event.target.value;
        let suggestions = [];
        if (newInputValue.length > 0) {
            const regex = new RegExp(`^${newInputValue}`, 'i');
            suggestions = this.state.courses.sort().filter(course => regex.test(course));
        }
        this.setState({ suggestions: suggestions, inputValue: newInputValue });
    }

    suggestionSelected = (value) => {
        this.setState({ inputValue: value, suggestions: [], courseSelected: true });
    }

    courseSelectRedirectToInit = () => {
        this.props.courseBasketsRemove();
        if (this.state.courseSelected && this.state.courses.includes(this.state.inputValue)) {
            axios.get('/courses')
            .then(response => {
                return response.data.find(course => course.name === this.state.inputValue);
            })
            .then(course => {
                this.props.courseClicked(course);
            })
            this.props.history.push('/playerselect');
        }
    }

    courseSelectRedirectToWeather = () => {
        if (this.state.courseSelected && this.state.courses.includes(this.state.inputValue)) {
            axios.get('/courses')
            .then(response => {
                return response.data.find(course => course.name === this.state.inputValue);
            })
            .then(course => {
                this.props.weatherCourseSet(course)
            })
            this.props.history.push('/weather')
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
    }

    render () {
        const { inputValue } = this.state;

        let unfinishedRound = null;
        if (this.props.currentScoringHoles.length > 1 && this.props.currentScoringId === this.props.userId) {
            unfinishedRound = (
                <aside className={classes.UnfinishedRoundContainer}>
                    <h2 className={classes.UnfinishedRoundText}>You have an unfinished round </h2>
                    <button 
                        className={classes.UnfinishedRoundButton}
                        onClick={() => this.props.history.push('/scoring')}
                    >
                        {this.props.course.name}
                    </button>
                </aside>
            )
        }

        return (
            <React.Fragment>
                <article className={classes.CourseChoose}>
                    <h1>Search for a course</h1> 
                    <label htmlFor="course-search">Search for a course</label>
                    <input autocomplete="off" value={inputValue} onChange={this.onInputChange} id="course-search" name="course search" type="search"></input>
                    <div className={classes.SuggestionBoxContainer}>
                        {this.renderSuggestions()}
                    </div>
                    <section className={classes.ButtonsContainer}>
                        <Button 
                            btnType="Success"
                            type="submit"
                            name="start round" 
                            clicked={() => {
                                this.courseSelectRedirectToInit()
                            }}>
                            Start a Round
                        </Button>
                        <Button 
                            btnType="Success"
                            type="button"
                            name="check weather"
                            clicked={() => {
                                this.courseSelectRedirectToWeather()
                            }}>
                            Check Weather
                        </Button>
                    </section>
                </article>
                {unfinishedRound}
            </React.Fragment>
        );
    }
}

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
        weatherCourseSet: (course) => dispatch(weatherCourseSet(course)),
        courseBasketsRemove: () => dispatch(courseBasketsRemove())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCourse);

