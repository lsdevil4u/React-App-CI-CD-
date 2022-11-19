// Auth API's
const authApis = {
    login: () => `${process.env.REACT_APP_API_BASE_URL}/api/v2/users/otp-generate/`,
    verifyOtp: () => `${process.env.REACT_APP_API_BASE_URL}/api/v2/users/otp-verify/`,
    checkUsername: () => `${process.env.REACT_APP_API_BASE_URL}/api/v1/users/username_slug/available`,
}

// User Profile API's 
const userProfileApis = {
    profileUpdate: () => `${process.env.REACT_APP_API_BASE_URL}/api/v1/users/profiles/`,
    profileDetail: (id) => `${process.env.REACT_APP_API_BASE_URL}/api/v1/users/profiles/${id}/`,
}

// Workshop API's

const workshopApis = {
    workshopList: (limit, offset) => `${process.env.REACT_APP_API_BASE_URL}/api/v2/consultation/webinars/?limit=${limit}&offset=${offset}`,
    workshopDetail: (id) => `${process.env.REACT_APP_API_BASE_URL}/api/v2/consultation/webinar/${id}/`,
    workshopPurchase: (webinar_id) => `${process.env.REACT_APP_API_BASE_URL}/api/v2/consultation/webinar/${webinar_id}/purchase`,
    workshopVerifyTransaction: () => `${process.env.REACT_APP_API_BASE_URL}/api/v2/consultation/webinar/verify_transaction`,
    enrolledWorkshopList: (limit, offset) => `${process.env.REACT_APP_API_BASE_URL}/api/v2/consultation/webinars/enrolled?limit=${limit}&offset=${offset}`,
    createWorkshop: () => `${process.env.REACT_APP_API_BASE_URL}/api/v2/consultation/webinar`,
    createdWorkshopList: (limit, offset, list_type) => `${process.env.REACT_APP_API_BASE_URL}/api/v2/consultation/webinars/created?list_type=${list_type}&limit=${limit}&offset=${offset}`,
    createHostAccount: () => `${process.env.REACT_APP_API_BASE_URL}/api/v2/consultation/webinar/host`,
    checkHostStatus: () => `${process.env.REACT_APP_API_BASE_URL}/api/v2/consultation/webinar/check_if_host`,
    workshopAteendeeList: (webinar_id, limit, offset) => `${process.env.REACT_APP_API_BASE_URL}/api/v2/consultation/webinar/${webinar_id}/atttendiees`,

    
}

const gatedContent = {
    gatedContentCreate: () => `${process.env.REACT_APP_API_BASE_URL}/api/v1/gated_content/`,
    gatedContentList: (limit, offset) => `${process.env.REACT_APP_API_BASE_URL}/api/v1/gated_content/list?limit=${limit}&offset=${offset}`,
    gatedContentDetail: (content_id) => `${process.env.REACT_APP_API_BASE_URL}/api/v1/gated_content/${content_id}/`,
    gatedSecuredGatedContent: (content_id) => `${process.env.REACT_APP_API_BASE_URL}/api/v1/gated_content/${content_id}/hidden`,
    gatedContentCreateOrder: (content_id) => `${process.env.REACT_APP_API_BASE_URL}/api/v1/gated_content/${content_id}/purchase`,
    gatedContentVerifyPayment: () => `${process.env.REACT_APP_API_BASE_URL}/api/v1/gated_content/verify_payment`,
    gatedContentUpdate: (content_id) => `${process.env.REACT_APP_API_BASE_URL}/api/v1/gated_content/${content_id}`,
    gatedContentMediaUpload: (content_id) => `${process.env.REACT_APP_API_BASE_URL}/api/v1/gated_content/${content_id}/media`,
    gatedContentMediaRetrive: (content_id, media_id) => `${process.env.REACT_APP_API_BASE_URL}/api/v1/gated_content/${content_id}/media/${media_id}`,
    gatedContentMediaDelete: (content_id, media_id) => `${process.env.REACT_APP_API_BASE_URL}/api/v1/gated_content/${content_id}/media/${media_id}`,
    gatedContentDelete: (content_id) => `${process.env.REACT_APP_API_BASE_URL}/api/v1/gated_content/${content_id}/`,
    gatedContentAttendees: (gated_content_id, limit, offset) => `${process.env.REACT_APP_API_BASE_URL}/api/v1/gated_content/${gated_content_id}/atttendiees`,
}

const path = {
    ...authApis,
    ...userProfileApis,
    ...workshopApis,
    ...gatedContent,
}

export default path;