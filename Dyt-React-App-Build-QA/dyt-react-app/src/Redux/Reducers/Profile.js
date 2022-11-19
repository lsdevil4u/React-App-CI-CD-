import { PROFILE_UPDATE, PROFILE_DETAIL } from '../../Constant/ActionType/ActionType';
import { PENDING, SUCCESS, ERROR } from "../../Constant/Status";

export const initialState = {
    isLoginPending: false,
    isLoginSuccess: false,
    isLoginError: false,
    loginOtp: null,
};


export const ProfileUpdate = (state = initialState, action) => {
    const { type, response, error } = action;


    switch (type) {
        case `${PROFILE_UPDATE}_${PENDING}`: {
            return {
                ...state,
                isLoginPending: true,
            }
        }
        case `${PROFILE_UPDATE}_${SUCCESS}`: {
            return {
                ...state,
                isLoginPending: false,
                isLoginSuccess: true,
                loginOtp: response,
            }
        }
        case `${PROFILE_UPDATE}_${ERROR}`: {
            return {
                ...state,
                isLoginPending: false,
                isLoginSuccess: false,
                isLoginError: true,
                error: error,
            }
        }
        default: {
            return {
                ...initialState
            }
        }
    }
};

export const AppAuthLogin = (state = initialState, action) => {
    const { type, response, error } = action;


    switch (type) {
        case `${PROFILE_DETAIL}_${PENDING}`: {
            return {
                ...state,
                isLoginPending: true,
            }
        }
        case `${PROFILE_DETAIL}_${SUCCESS}`: {
            return {
                ...state,
                isLoginPending: false,
                isLoginSuccess: true,
                loginOtp: response,
            }
        }
        case `${PROFILE_DETAIL}_${ERROR}`: {
            return {
                ...state,
                isLoginPending: false,
                isLoginSuccess: false,
                isLoginError: true,
                error: error,
            }
        }
        default: {
            return {
                ...initialState
            }
        }
    }
};