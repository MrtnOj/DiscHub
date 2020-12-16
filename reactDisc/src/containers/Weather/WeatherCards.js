import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './WeatherCards.module.css';
import axios from 'axios';

import readWeatherData from '../../util/readWeatherData';
import WeatherCard from '../../components/WeatherCard/weatherCard';

class WeatherCards extends Component {
    state = {
        dayOne: [{}],
        dayTwo: [{}],
        pickedDay: 'today'
    }

    

    componentDidMount () {
        axios.get('https://api.openweathermap.org/data/2.5/forecast', {
            params: {
                lat: this.props.course.x,
                lon: this.props.course.y,
                appid: '5617cdf958981a7f13abc0caecede4b2'
            }
        })
        .then(response => {
            return readWeatherData(response.data.list)
        })
        .then(dataArrays => {
            const dayOne = dataArrays[0];
            const dayTwo = dataArrays[1];
            this.setState({ dayOne: dayOne, dayTwo: dayTwo })
        })
    }

    dateButtonClickHandler = (day) => {
        this.setState({ pickedDay: day})
    }

    render () {
        
        let day = this.state.dayOne;
        if (this.state.pickedDay !== 'today') {
            day = this.state.dayTwo
        }

        const WeatherCards = () => 
            day.map(card => {
                return <WeatherCard 
                        time={card.time}
                        temperature={card.tempInC}
                        wind={card.wind}
                        characteristics={card.characteristics} />
            })

        return (
            <React.Fragment>
                <article className={classes.WeatherCardWrapper}>
                    <h1>{this.props.course.name}</h1>
                    <div className={classes.ButtonsContainer}>
                        <label htmlFor="weather-today">Weather info for today</label>
                        <button 
                            className={this.state.pickedDay === 'today' ? [classes.Button, classes.ButtonActive].join(' ') : classes.Button} 
                            onClick={() => this.dateButtonClickHandler('today')}
                            type="button"
                            name="weather-today">
                            {this.state.dayOne[0].formatedDate} {this.state.dayOne[0].weekDay}
                        </button>
                        <label htmlFor="weather-tomorrow">Weather info for tomorrow</label>
                        <button 
                            className={this.state.pickedDay === 'tomorrow' ? [classes.Button, classes.ButtonActive].join(' ') : classes.Button} 
                            onClick={() => this.dateButtonClickHandler('tomorrow')}
                            type="button"
                            name="weather-tomorrow">
                            {this.state.dayTwo[0].formatedDate} {this.state.dayTwo[0].weekDay}
                        </button>
                    </div>
                    <div className={classes.WeatherCards}>
                        <WeatherCards />
                    </div>
                </article>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        course: state.courseForWeather
    }
}

export default connect(mapStateToProps)(WeatherCards);