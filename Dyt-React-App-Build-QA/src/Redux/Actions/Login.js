import { REQUEST_LOGIN, VERIFY_OTP, CHECK_USERNAME } from '../../Constant/ActionType/ActionType';
import api from '../../Api';

export const LoginPage = (payload) => (dispatch) => {
    return dispatch(
        api.fetch(
            REQUEST_LOGIN,
            api.config.login(),
            api.http.postNoAuth(payload)
        )
    )
}

export const VerifyOtp = (payload) => (dispatch) => {
    return dispatch(
        api.fetch(
            VERIFY_OTP,
            api.config.verifyOtp(),
            api.http.postNoAuth(payload)
        )
    )
}

export const CheckUserName = (payload) => (dispatch) => {
    return dispatch(
        api.fetch(
            CHECK_USERNAME,
            api.config.checkUsername(),
            api.http.postNoAuth(payload)
        )
    )
}