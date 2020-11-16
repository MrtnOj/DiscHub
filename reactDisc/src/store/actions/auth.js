import axios from '../../axiosApi';

import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
};

export const authSuccess = (token = null, userId, name, expirationDate, message = null) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: token,
        userId: userId,
        userName: name,
        expirationDate: expirationDate,
        signUpMessage: message
    }
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime*1000)
    };
};

export const auth = (email, password, nameEl) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
        };

        let url = '/auth/login';

        if (nameEl) {
            url = '/auth/signup';
            authData.name = nameEl;
        }
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                dispatch(authSuccess(response.data.token, response.data.userId, response.data.name, expirationDate, response.data.message ));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                dispatch(authFail(err.response.data.message));
            });
    }
}

export const authCheckState = (token, userId, name, expirationDate) => {
    return dispatch => {
        if (!token) {
            dispatch(logout());
        } else {
            if (new Date(expirationDate) <= new Date()) {
                dispatch(logout());
            } else {
                dispatch(authSuccess(token, userId, name, expirationDate));
                dispatch(checkAuthTimeout((new Date(expirationDate).getTime() - new Date().getTime()) / 1000 ));
            }   
        }
    }
}
