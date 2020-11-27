import * as actionTypes from './actionTypes';

export const weatherCourseSet = (course) => {
    return {
        type: actionTypes.WEATHER_COURSE_SET,
        courseForWeather: course,
    }
}