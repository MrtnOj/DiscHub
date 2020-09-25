import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './WeatherCards.module.css';
import axios from 'axios';
import readWeatherData from '../../util/readWeatherData';
import WeatherCard from '../../components/WeatherCard/weatherCard';
import Auxiliary from '../../hoc/Auxiliary';

class WeatherCards extends Component {
    state = {
        dayOne: [],
        dayTwo: []
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
            this.setState({ dayOne: weatherDataArrays[0], dayTwo: weatherDataArrays[1] })
            //console.log(weatherDataArrays[0]);
            console.log(this.state.dayOne)
        })
        .catch(err => {
            console.log(err);
        })
        
    }

    render () {


        return (
            <Auxiliary>
                <div className={classes.WeatherCardWrapper}>
                    <h3 className={classes.DayTitle}>{this.state.dayOne.formatedDate} {this.state.dayOne.weekDay}</h3>
                    {this.state.dayOne.map(card => {
                        return <WeatherCard 
                                time={card.time}
                                temperature={card.tempInC}
                                wind={card.wind}
                                characteristics={card.characteristics} />
                    })}
                </div>
                <div className={classes.WeatherCardWrapper}>
                    {this.state.dayTwo.map(card => {
                        return <WeatherCard 
                                time={card.time}
                                temperature={card.tempInC}
                                wind={card.wind}
                                characteristics={card.characteristics} />
                    })}
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