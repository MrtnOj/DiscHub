import * as actionTypes from './actionTypes';

export const courseBasketsSet = (baskets) => {
    return {
        type: actionTypes.COURSE_BASKETS_SET,
        baskets: baskets
    }
}