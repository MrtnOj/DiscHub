import * as actionTypes from './actions/actionTypes';
import { updateObject } from './utility';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
}

const initialState = {
    playerInputs: [],
    baskets: [{}],
    course: {},
    token: null,
    userId: null,
    error: null,
    loading: false,
    userName: null,
    signUpMessage: null,
    expirationDate: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_ROUND_CLICKED:
            return updateObject(state, {playerInputs: action.playerInputs });
        case actionTypes.COURSE_CLICKED:
            return updateObject(state, { course: action.course });
        case actionTypes.COURSE_BASKETS_REMOVE:
            return updateObject(state, { baskets:  [{}] })
        case actionTypes.COURSE_BASKETS_SET:
            return updateObject(state, { baskets: action.baskets });
        case actionTypes.AUTH_START:
            return updateObject(state, { error: null, loading: true, signUpMessage: null });
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, { 
                token: action.token,
                userId: action.userId,
                userName: action.userName,
                expirationDate: action.expirationDate,
                signUpMessage: action.signUpMessage,
                error: null,
                loading: false
            });
        case actionTypes.AUTH_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false
            });
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, { token: null, userId: null, userName: null, signUpMessage: null })
        default:
            return state;
    }
};

export default persistReducer(persistConfig, reducer);