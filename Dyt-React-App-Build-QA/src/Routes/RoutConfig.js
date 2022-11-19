import ApiTests from '../Components/ApiTests';
import { Login } from '../Components/Auth/Login';
import SignUp from './../Components/Auth/SignUp/SignUp';
import Home from './../Components/Home/Home';
// import WorkshopCard from './../Components/Shared/WorkshopCard/WorkshopCard';
import { EnrolledWorkshops } from '../Components/Workshop/EnrolledWorkshops';
import { MyWorkshops } from '../Components/Workshop/MyWorkshops';
import { WorkshopList } from '../Components/Workshop/WorkshopList';
import { HostRegistration } from '../Components/Workshop/HostRegistration';
import { CreateWorkshop } from '../Components/Workshop/CreateWorkshop';
import { PageNotFound } from '../Components/Shared/Screens/PageNotFound';
import { CheckoutPageForm } from '../Components/Workshop/CheckoutPageForm';
import { GatedContentList } from '../Components/GatedContent/GatedContentList';
import { GatedContentPurchase } from './../Components/GatedContent/GatedContentPurchase';
import CreateGatedContent from './../Components/GatedContent/CreateGatedContent/CreateGatedContent';
import { GatedContentDetails } from './../Components/GatedContent/GatedContentDetails';
import { ManageWorkshops } from './../Components/Workshop/ManageWorkshops';
import WorkShopDetails from './../Components/Workshop/WorkShopDetails/WorkShopDetails';
import AppLogin from './../Components/Auth/AppLogin/AppLogin';
import { PurchasedGatedContents } from '../Components/GatedContent/PurchasedGatedContents';


export const routeConfig = [
    {
        path: '/',
        component: <Home />,
        layout: null,
        isAuth: false,
    },
    {
        path: '/api_test',
        component: <ApiTests />,
        layout: null,
        isAuth: false,
    },
    {
        path: '/login',
        component: <Login />,
        layout: null,
        isAuth: false,
    },

    {
        path: '/onboarding',
        component: <SignUp />,
        layout: null,
        isAuth: false,
    },

    {
        path: '/host-registration',
        component: <HostRegistration />,
        layout: null,
        isAuth: false,
    },

    {
        path: '/my-learnings',
        component: <EnrolledWorkshops />,
        layout: null,
        isAuth: false,
    },
    {
        path: '/Workshop-list',
        component: <EnrolledWorkshops />,
        layout: null,
        isAuth: false,
    },
    {
        path: '/my-workshops',
        component: <MyWorkshops />,
        layout: null,
        isAuth: false,
    },
    {
        path: '/workshops',
        component: <WorkshopList />,
        layout: null,
        isAuth: false,
    },
    {
        path: '/gated-contents',
        component: <GatedContentList />,
        layout: null,
        isAuth: false,
    },

    {
        path: '/my-gated-contents',
        component: <PurchasedGatedContents />,
        layout: null,
        isAuth: false,

    },

    {
        path: '/workshop/checkout/:workshop_id',
        component: <CheckoutPageForm />,
        layout: null,
        isAuth: false,
    },
    {
        path: '/create-workshop',
        component: <CreateWorkshop />,
        layout: null,
        isAuth: false,
    },
    {
        path: '/workshop/:workshop_id',
        component: <WorkShopDetails />,
        layout: null,
        isAuth: false,
    },
    {
        path: '/gated-content/:gated_content_id',
        component: <GatedContentDetails />,
        layout: null,
        isAuth: false,
    },
    {
        path: '/content/:gated_content_id',
        component: <GatedContentPurchase />,
        layout: null,
        isAuth: false,
    },
    {
        path: '/gated-content-create',
        component: <CreateGatedContent />,
        layout: null,
        isAuth: false,
    },
    {

        path: '/manage-workshop',
        component: <ManageWorkshops />,
        layout: null,
        isAuth: false,
    },
    {

        path: '/app-auth/:user_id',
        component: <AppLogin />,
        layout: null,
        isAuth: false,
    },
    {
        path: '*',
        component: <PageNotFound />,
        layout: null,
        isAuth: false,
    },
]