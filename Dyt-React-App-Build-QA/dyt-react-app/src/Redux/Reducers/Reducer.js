import { combineReducers } from 'redux';
import { requestsReducer } from 'redux-requests';
import { Login, VerifyOtp, CheckUserName } from './Login';
import { ProfileUpdate, AppAuthLogin } from './Profile';
import { WorkShopList, EnrolledWorkshops, WorkShopDetail, CreateHostAccount, CreateWorkshop, PurchaseWebinar, verifyWorkShopPayment, workShopAttendeeList } from './WorkShop';
import { gatedContentList, gatedContentDetails, CreateGatedContent } from './GatedContent';

export default combineReducers({
    request: requestsReducer,
    Login,
    VerifyOtp,
    CheckUserName,
    ProfileUpdate,
    WorkShopList,
    CreateWorkshop,
    workShopAttendeeList,
    PurchaseWebinar,
    EnrolledWorkshops,
    verifyWorkShopPayment,
    WorkShopDetail,
    gatedContentList,
    gatedContentDetails,
    CreateGatedContent,
    CreateHostAccount,
    AppAuthLogin,

});