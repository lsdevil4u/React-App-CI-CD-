
import { PROFILE_UPDATE, PROFILE_DETAIL } from '../../Constant/ActionType/ActionType';
import api from '../../Api';

export const ProfileUpdate = (payload) => (dispatch) => {
    return dispatch(
        api.fetch(
            PROFILE_UPDATE,
            api.config.profileUpdate(),
            api.http.postNoAuth(payload)
        )
    )
}

export const AppAuthLogin = (user_id) => (dispatch) => {
    return dispatch(
        api.fetch(
            PROFILE_DETAIL,
            api.config.profileDetail(user_id),
            api.http.get()
        )
    )
}