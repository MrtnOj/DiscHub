import * as actionTypes from './actionTypes';

export const startRoundClicked = (course, players) => {
    return {
        type: actionTypes.START_ROUND_CLICKED,
        courseName: course,
        playerInputs: players
    }
}

export const courseSelected = (course) => {
    return {
        type: actionTypes.COURSE_SELECTED,
        courseName: course
    }
}

