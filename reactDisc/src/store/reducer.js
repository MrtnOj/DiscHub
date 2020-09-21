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
    courseName: '',
    token: null,
    userId: null,
    error: null,
    loading: false,
    userName: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.START_ROUND_CLICKED:
            return updateObject(state, { courseName: action.courseName, playerInputs: action.playerInputs });
        case actionTypes.COURSE_SELECTED:
            return updateObject(state, { courseName: action.courseName });
        case actionTypes.AUTH_START:
            return updateObject(state, { error: null, loading: true });
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state, { 
                token: action.token,
                userId: action.userId,
                userName: action.userName,
                error: null,
                loading: false
            });
        case actionTypes.AUTH_FAIL:
            return updateObject(state, {
                error: action.error,
                loading: false
            });
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, { token: null, userId: null, userName: null })
        default:
            return state;
    }
};

export default persistReducer(persistConfig, reducer);