import * as actionTypes from './actionTypes';

export const courseBasketsSet = (baskets, userId) => {
    return {
        type: actionTypes.COURSE_BASKETS_SET,
        currentScoring: {
            scoringOwnerId: userId,
            holes: baskets
        }
    }
}
