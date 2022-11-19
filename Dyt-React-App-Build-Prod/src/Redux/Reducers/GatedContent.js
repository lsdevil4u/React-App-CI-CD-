import { GATED_CONTENT_LIST, CREATEGATEDCONTENT, GATED_CONTENT_DETAILS } from '../../Constant/ActionType/ActionType';
import { PENDING, SUCCESS, ERROR } from "../../Constant/Status";

export const gatedContentInitialState = {
    isLoadingPending: false,
    isLoadingSuccess: false,
    isLoadingError: false,
    message: '',
    data: {}
};

export const gatedContentList = (state = gatedContentInitialState, action) => {
    const { type, response, error } = action;

    switch (type) {
        case `${GATED_CONTENT_LIST}_${PENDING}`: {
            return {
                ...state,
                isLoadingPending: true,
            }
        }
        case `${GATED_CONTENT_LIST}_${SUCCESS}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: true,
                message: response.message,
                data: response.data.results,
            }
        }
        case `${GATED_CONTENT_LIST}_${ERROR}`: {
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
                ...gatedContentInitialState
            }
        }
    }
};

export const CreateGatedContent = (state = gatedContentInitialState, action) => {
    const { type, response, error } = action;

    switch (type) {
        case `${CREATEGATEDCONTENT}_${PENDING}`: {
            return {
                ...state,
                isLoadingPending: true,
            }
        }
        case `${CREATEGATEDCONTENT}_${SUCCESS}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: true,
                message: response.message,
                data: response.data.results,
            }
        }
        case `${CREATEGATEDCONTENT}_${ERROR}`: {
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
                ...gatedContentInitialState
            }
        }
    }
};

export const gatedContentDetails = (state = gatedContentInitialState, action) => {
    const { type, response, error } = action;

    switch (type) {
        case `${GATED_CONTENT_DETAILS}_${PENDING}`: {
            return {
                ...state,
                isLoadingPending: true,
            }
        }
        case `${GATED_CONTENT_DETAILS}_${SUCCESS}`: {
            return {
                ...state,
                isLoadingPending: false,
                isLoadingSuccess: true,
                message: response.message,
                data: response.data.results,
            }
        }

        case `${GATED_CONTENT_DETAILS}_${ERROR}`: {
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
                ...gatedContentInitialState
            }
        }
    }
};