import { WORKSHOP_LIST, ENROLLED_WORKSHOPS, CREATEHOSTACCOUNT, CREATEWORKSHOP, WORKSHOP_DETAIL, PURCHASEWEBINAR, WORKSHOP_ATTENDEE_LIST } from '../../Constant/ActionType/ActionType';
import { PENDING, SUCCESS, ERROR } from "../../Constant/Status";

export const workshopInitialState = {
    isLoadingPending: false,
    isLoadingSuccess: false,
    isLoadingError: false,
    message: '',
    data: {}
};

export const workshopdetailInitialState = {
    isLoadingPending: false,
    isLoadingSuccess: false,
    isLoadingError: false,
    message: '',
    data: {}
};


export const WorkShopList = (state = workshopInitialState, action) => {
    const { type, response, error } = action;

    switch (type) {
        case `${WORKSHOP_LIST}_${PENDING}`: {
            return {
                ...state,
                isLoadingPending: true,
            }
        }
        case `${WORKSHOP_LIST}_${SUCCESS}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: true,
                message: response.message,
                data: response.data.results,
            }
        }
        case `${WORKSHOP_LIST}_${ERROR}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: false,
                isLoadingError: true,
                error: error,
            }
        }
        default: {
            return {
                ...workshopInitialState
            }
        }
    }
};


export const EnrolledWorkshops = (state = workshopInitialState, action) => {
    const { type, response, error } = action;

    switch (type) {
        case `${ENROLLED_WORKSHOPS}_${PENDING}`: {
            return {
                ...state,
                isLoadingPending: true,
            }
        }
        case `${ENROLLED_WORKSHOPS}_${SUCCESS}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: true,
                message: response.message,
                data: response.data,
            }
        }
        case `${ENROLLED_WORKSHOPS}_${ERROR}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: false,
                isLoadingError: true,
                error: error,
            }
        }
        default: {
            return {
                ...workshopInitialState
            }
        }
    }
};


export const CreateHostAccount = (state = workshopInitialState, action) => {
    const { type, response, error } = action;

    switch (type) {
        case `${CREATEHOSTACCOUNT}_${PENDING}`: {
            return {
                ...state,
                isLoadingPending: true,
            }
        }
        case `${CREATEHOSTACCOUNT}_${SUCCESS}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: true,
                message: response.message,
                data: response.data,
            }
        }
        case `${CREATEHOSTACCOUNT}_${ERROR}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: false,
                isLoadingError: true,
                error: error,
            }
        }
        default: {
            return {
                ...workshopInitialState
            }
        }
    }
};

export const CreateWorkshop = (state = workshopInitialState, action) => {
    const { type, response, error } = action;

    switch (type) {
        case `${CREATEWORKSHOP}_${PENDING}`: {
            return {
                ...state,
                isLoadingPending: true,
            }
        }
        case `${CREATEWORKSHOP}_${SUCCESS}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: true,
                message: response.message,
                data: response.data,
            }
        }
        case `${CREATEWORKSHOP}_${ERROR}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: false,
                isLoadingError: true,
                error: error,
            }
        }
        default: {
            return {
                ...workshopInitialState
            }
        }
    }
};



export const WorkShopDetail = (state = workshopInitialState, action) => {
    const { type, response, error } = action;

    switch (type) {
        case `${WORKSHOP_DETAIL}_${PENDING}`: {
            return {
                ...state,
                isLoadingPending: true,
            }
        }
        case `${WORKSHOP_DETAIL}_${SUCCESS}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: true,
                message: response.message,
                data: response.data,
            }
        }
        case `${WORKSHOP_DETAIL}_${ERROR}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: false,
                isLoadingError: true,
                error: error,
            }
        }
        default: {
            return {
                ...workshopInitialState
            }
        }
    }
};

export const PurchaseWebinar = (state = workshopInitialState, action) => {
    const { type, response, error } = action;

    switch (type) {
        case `${PURCHASEWEBINAR}_${PENDING}`: {
            return {
                ...state,
                isLoadingPending: true,
            }
        }
        case `${PURCHASEWEBINAR}_${SUCCESS}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: true,
                message: response.message,
                data: response.data,
            }
        }
        case `${PURCHASEWEBINAR}_${ERROR}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: false,
                isLoadingError: true,
                error: error,
            }
        }
        default: {
            return {
                ...workshopInitialState
            }
        }
    }
};


export const verifyWorkShopPayment = (state = workshopInitialState, action) => {
    const { type, response, error } = action;

    switch (type) {
        case `${PURCHASEWEBINAR}_${PENDING}`: {
            return {
                ...state,
                isLoadingPending: true,
            }
        }
        case `${PURCHASEWEBINAR}_${SUCCESS}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: true,
                message: response.message,
                data: response.data,
            }
        }
        case `${PURCHASEWEBINAR}_${ERROR}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: false,
                isLoadingError: true,
                error: error,
            }
        }
        default: {
            return {
                ...workshopInitialState
            }
        }
    }
};

export const workShopAttendeeList = (state = workshopInitialState, action) => {
    const { type, response, error } = action;

    switch (type) {
        case `${WORKSHOP_ATTENDEE_LIST}_${PENDING}`: {
            return {
                ...state,
                isLoadingPending: true,
            }
        }
        case `${WORKSHOP_ATTENDEE_LIST}_${SUCCESS}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: true,
                message: response.message,
                data: response.data,
            }
        }
        case `${WORKSHOP_ATTENDEE_LIST}_${ERROR}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: false,
                isLoadingError: true,
                error: error,
            }
        }
        default: {
            return {
                ...workshopInitialState
            }
        }
    }
};