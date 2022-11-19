import { WORKSHOP_LIST, ENROLLED_WORKSHOPS, CREATED_WORKSHOPS, CREATEHOSTACCOUNT, CREATEWORKSHOP, WORKSHOP_DETAIL, PURCHASEWEBINAR, VERIFY_PAYMENT, WORKSHOP_HOST_STATUS } from '../../Constant/ActionType/ActionType';
import api from '../../Api';
import { WORKSHOP_LIST_PER_PAGE, WORKSHOP_LIST_INITIAL_OFFSET, WORKSHOP_ATTENDEE_LIST_PER_PAGE } from '../../Constant/APIConfig';

export const getWorkShopList = (limit, offset) => (dispatch) => {
    limit = limit || WORKSHOP_LIST_PER_PAGE
    offset = offset || WORKSHOP_LIST_INITIAL_OFFSET
    return dispatch(
        api.fetch(
            WORKSHOP_LIST,
            api.config.workshopList(limit, offset),
            localStorage.getItem('current_user_id') ? api.http.get() : api.http.getNoAuth()
        )
    )
}

export const getEnrolledWorkshops = (limit, offset) => (dispatch) => {
    limit = limit || WORKSHOP_LIST_PER_PAGE
    offset = offset || WORKSHOP_LIST_INITIAL_OFFSET
    return dispatch(
        api.fetch(
            ENROLLED_WORKSHOPS,
            api.config.enrolledWorkshopList(limit, offset),
            api.http.get()
        )
    )
}

export const getMyWorkshops = (limit, offset) => (dispatch) => {
    limit = limit || WORKSHOP_LIST_PER_PAGE
    offset = offset || WORKSHOP_LIST_INITIAL_OFFSET
    return dispatch(
        api.fetch(
            CREATED_WORKSHOPS,
            api.config.createdWorkshopList(limit, offset),
            api.http.get()
        )
    )
}

export const getWorkshopDetail = (id) => (dispatch) => {
    return dispatch(
        api.fetch(
            WORKSHOP_DETAIL,
            api.config.workshopDetail(id),
            localStorage.getItem('current_user_id') ? api.http.get() : api.http.getNoAuth()
        )
    )
}

export const createHostAccount = (payload) => (dispatch) => {
    return dispatch(
        api.fetch(
            CREATEHOSTACCOUNT,
            api.config.createHostAccount(),
            api.http.post(payload)
        )
    )

}

export const CreateWebinar = (payload) => (dispatch) => {
    return dispatch(
        api.fetch(
            CREATEWORKSHOP,
            api.config.createWorkshop(),
            api.http.post(payload)
        )
    )

}

export const PurchaseWebinar = (payload, workshop_id) => (dispatch) => {
    return dispatch(
        api.fetch(
            PURCHASEWEBINAR,
            api.config.workshopPurchase(workshop_id),
            api.http.post(payload)
        )
    )

}

export const verifyWorkShopPayment = (payload, workshop_id) => (dispatch) => {
    return dispatch(
        api.fetch(
            VERIFY_PAYMENT,
            api.config.workshopVerifyTransaction(),
            api.http.post(payload)
        )
    )

}

export const getWorkShopAttendeeList = (webinar_id, limit, offset) => (dispatch) => {
    limit = limit || WORKSHOP_LIST_PER_PAGE
    offset = offset || WORKSHOP_LIST_INITIAL_OFFSET
    return dispatch(
        api.fetch(
            WORKSHOP_ATTENDEE_LIST_PER_PAGE,
            api.config.workshopAteendeeList(webinar_id, limit, offset),
            api.http.get()
        )
    )
}

export const getWorkshopHostStatus = () => (dispatch) => {
    return dispatch(
        api.fetch(
            WORKSHOP_HOST_STATUS,
            api.config.checkHostStatus(),
            api.http.get()
        )
    )
}

