import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './WeatherCards.module.css';
import axios from 'axios';

import readWeatherData from '../../util/readWeatherData';
import WeatherCard from '../../components/WeatherCard/weatherCard';
import Auxiliary from '../../hoc/Auxiliary';

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
            const weatherDataArrays = readWeatherData(response.data.list);
            const dayOne = weatherDataArrays[0];
            const dayTwo = weatherDataArrays[1];
            this.setState({ dayOne: dayOne, dayTwo: dayTwo });
        })
    }

    dateButtonClickHandler = (day) => {
        this.setState({ pickedDay: day});
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
            <Auxiliary>
                <div className={classes.WeatherCardWrapper}>
                    <h3>{this.props.course.name}</h3>
                    <div className={classes.ButtonsContainer}>
                        <button className={classes.Button} onClick={() => this.dateButtonClickHandler('today')}>
                            {this.state.dayOne[0].formatedDate} {this.state.dayOne[0].weekDay}
                        </button>
                        <button className={classes.Button} onClick={() => this.dateButtonClickHandler('tomorrow')}>
                            {this.state.dayTwo[0].formatedDate} {this.state.dayTwo[0].weekDay}
                        </button>
                    </div>
                    <div className={classes.WeatherCards}>
                        <WeatherCards />
                    </div>
                </div>
            </Auxiliary>
        )
    }
}

const mapStateToProps = state => {
    return {
        course: state.course
    }
}

export default connect(mapStateToProps)(WeatherCards);