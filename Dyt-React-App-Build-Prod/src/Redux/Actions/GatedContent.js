import { GATED_CONTENT_LIST, CREATEGATEDCONTENT, GATED_CONTENT_DETAILS, GATED_CONTENT_SECURED_DETAILS, GATED_CONTENT_ORDER_CREATE, GATED_CONTENT_ORDER_VERIFY, GATED_CONTENT_ATTENDEES, DELETE_GATED_CONTENT } from '../../Constant/ActionType/ActionType';
import api from '../../Api';
import { GATED_CONTENT_LIST_INITIAL_OFFSET, GATED_CONTENT_LIST_PER_PAGE } from '../../Constant/APIConfig';

export const getGatedContentList = (limit, offset) => (dispatch) => {
    limit = limit || GATED_CONTENT_LIST_PER_PAGE
    offset = offset || GATED_CONTENT_LIST_INITIAL_OFFSET
    return dispatch(
        api.fetch(
            GATED_CONTENT_LIST,
            api.config.gatedContentList(limit, offset),
            api.http.get()
        )
    )
}

export const createGatedContent = (payload) => (dispatch) => {
    return dispatch(
        api.fetch(
            CREATEGATEDCONTENT,
            api.config.gatedContentCreate(),
            api.http.post(payload)
        )
    )
}
export const getGatedDetails = (gated_content_id) => (dispatch) => {
    return dispatch(
        api.fetch(
            GATED_CONTENT_DETAILS,
            api.config.gatedContentDetail(gated_content_id),
            api.http.get()
        )
    )
}

export const getSecuredGatedContent = (gated_content_id) => (dispatch) => {
    return dispatch(
        api.fetch(
            GATED_CONTENT_SECURED_DETAILS,
            api.config.gatedSecuredGatedContent(gated_content_id),
            api.http.get()
        )
    )
}

export const gatedContentCreateOrder = (payload, gated_content_id) => (dispatch) => {
    return dispatch(
        api.fetch(
            GATED_CONTENT_ORDER_CREATE,
            api.config.gatedContentCreateOrder(gated_content_id),
            api.http.post(payload)
        )
    )
}

export const gatedContentVerifyPayment = (payload) => (dispatch) => {
    return dispatch(
        api.fetch(
            GATED_CONTENT_ORDER_VERIFY,
            api.config.gatedContentVerifyPayment(),
            api.http.post(payload)
        )
    )
}

export const gatedContentAttendees = (gated_content_id, limit, offset) => (dispatch) => {
    limit = limit || GATED_CONTENT_LIST_PER_PAGE
    offset = offset || GATED_CONTENT_LIST_INITIAL_OFFSET
    return dispatch(
        api.fetch(
            GATED_CONTENT_ATTENDEES,
            api.config.gatedContentAttendees(gated_content_id, limit, offset),
            api.http.get()
        )
    )
}

export const deleteGatedContent = (gated_content_id) => (dispatch) => {
    return dispatch(
        api.fetch(
            DELETE_GATED_CONTENT,
            api.config.gatedContentDelete(gated_content_id),
            api.http.delete()
        )
    )
}


