import * as actionTypes from './actionTypes';

export const startRoundClicked = (players) => {
    return {
        type: actionTypes.START_ROUND_CLICKED,
        playerInputs: players
    }
}

export const courseClicked = (course) => {
    return {
        type: actionTypes.COURSE_CLICKED,
        course: course,
    }
}

export const courseBasketsRemove = () => {
    return {
        type: actionTypes.COURSE_BASKETS_REMOVE,
        currentScoring: {
            scoringOwnerId: '',
            holes: [{}]
        }
    }
}
