import { REQUEST_LOGIN, VERIFY_OTP, CHECK_USERNAME } from '../../Constant/ActionType/ActionType';
import { PENDING, SUCCESS, ERROR } from "../../Constant/Status";

export const initialState = {
    isLoginPending: false,
    isLoginSuccess: false,
    isLoginError: false,
    response: null,
};


export const Login = (state = initialState, action) =>{
    const {type, response, error} = action;

    switch(type) {
        case `${REQUEST_LOGIN}_${PENDING}`:{
            return{
                ...state,
                isLoginPending: true,
            }
        }
        case `${REQUEST_LOGIN}_${SUCCESS}`:{
            return{
                ...state,
                isLoginPending: false,
                isLoginSuccess:true,
                response: response,
            }
        }
        case `${REQUEST_LOGIN}_${ERROR}`:{
            return{
                ...state,
                isLoginPending: false,
                isLoginSuccess:false,
                isLoginError:true,
                error: error,
            }
        }
        default: {
            return{
                ...initialState
            }
        }
    }
};


export const VerifyOtp = (state = initialState, action) =>{
    const {type, response, error} = action;

    switch(type) {
        case `${VERIFY_OTP}_${PENDING}`:{
            return{
                ...state,
                isLoginPending: true,
            }
        }
        case `${VERIFY_OTP}_${SUCCESS}`:{
            return{
                ...state,
                isLoginPending: false,
                isLoginSuccess:true,
                response: response,
            }
        }
        case `${VERIFY_OTP}_${ERROR}`:{
            return{
                ...state,
                isLoginPending: false,
                isLoginSuccess:false,
                isLoginError:true,
                error: error,
            }
        }
        default: {
            return{
                ...initialState
            }
        }
    }
};

export const CheckUserName = (state = initialState, action) =>{
    const {type, response, error} = action;

    switch(type) {
        case `${CHECK_USERNAME}_${PENDING}`:{
            return{
                ...state,
                isLoginPending: true,
            }
        }
        case `${CHECK_USERNAME}_${SUCCESS}`:{
            return{
                ...state,
                isLoginPending: false,
                isLoginSuccess:true,
                response: response,
            }
        }
        case `${CHECK_USERNAME}_${ERROR}`:{
            return{
                ...state,
                isLoginPending: false,
                isLoginSuccess:false,
                isLoginError:true,
                error: error,
            }
        }
        default: {
            return{
                ...initialState
            }
        }
    }
};

