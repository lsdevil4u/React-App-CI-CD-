import {routeConfig} from '../../Routes/RoutConfig';

const isAuthAdmin = (path) => {
  let isAuth = false;
  routeConfig.map((route) => {
    if (route.path === path) {
      isAuth = route.isAuth;
    }
    return isAuth;
  })
  return isAuth;
}

export default isAuthAdmin;