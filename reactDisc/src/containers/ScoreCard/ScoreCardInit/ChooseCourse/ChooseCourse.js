import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../../axios-courses';
import classes from './ChooseCourse.module.css';

import Button from '../../../../components/UI/Button/Button';
import { courseSelected, courseClicked } from '../../../../store/actions/scoreCardInit';

class ChooseCourse extends Component {
    state = {
        inputValue: '',
        courses: [],
        suggestions: []
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
        axios.get('/courses')
        .then(response => {
            const course = response.data.find(course => course.name === value);
            this.props.courseClicked(course);
        })
        this.setState({ inputValue: value, suggestions: [] });
    };

    courseSelectRedirectToScoring = () => {
        this.props.history.push('/playerselect');
    }

    courseSelectRedirectToWeather = () => {
        this.props.history.push('/weather');
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
        return (
            <div className={classes.CourseChoose}>
                <h3>Search for a course</h3> 
                <input value={inputValue} onChange={this.onInputChange} type="text"></input>
                <div className={classes.SuggestionBoxContainer}>
                    {this.renderSuggestions()}
                </div>
                <div className={classes.buttonsContainer}>
                    <Button btnType="Success" 
                        clicked={() => {
                            this.props.courseSelected(inputValue);
                            this.courseSelectRedirectToScoring()}
                        }>Start a Round</Button>
                    <Button btnType="Success"
                        clicked={() => {
                            this.props.courseSelected(inputValue);
                            this.courseSelectRedirectToWeather()
                        }}>Check Weather</Button>
                </div>
            </div>
        );
    }
};
const mapStateToProps = state => {
    return {
        courseName: state.courseName,
        course: state.course
    }
}

const mapDispatchToProps = dispatch => {
    return {
        courseSelected: (courseName) => dispatch(courseSelected(courseName)),
        courseClicked: (course) => dispatch(courseClicked(course))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseCourse);

