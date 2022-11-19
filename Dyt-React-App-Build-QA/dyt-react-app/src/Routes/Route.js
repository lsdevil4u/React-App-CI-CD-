import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import history from '../Redux/Utils/History';
import { routeConfig } from './RoutConfig';
// import isAuthAdmin from '../Redux/Utils/AuthGuard';
class StudioRoutes extends Component {
  state = {
    // user: JSON.parse(localStorage.getItem("userData")),
    token: localStorage.getItem("user_token")
  }

  // componentWillMount() {
  //   this.setState({
  //     token: localStorage.getItem("user_token")
  //   })
  // }

  componentDidMount() {
    // let user = JSON.parse(localStorage.getItem("userData"))
    // if(window.location.pathname === "/") {
    //     history.push('/home')
    // }

    this.setState({
      user: JSON.parse(localStorage.getItem("userData"))
    })
  }

  render() {

    return (
      <Router history={history}>
        <Routes>
          {
            ((self) => {
              let routeArray = [];
              routeConfig.map((route, i) => (
                routeArray.push(
                  <Route key={i} exact path={route.path} element={route.component} />
                )
              ))
              return routeArray;
            })(this)
          }
          {/* <Route path='*' exact={true} component={PageNotFound} /> */}
        </Routes>
      </Router>
    )
  }
}


// const RouteWithLayout = ({ layout, component, ...rest }) => {
//   return (
//     <Route exact {...rest} render={(props) => (
//       React.createElement(layout, props, React.createElement(component, props))
//     )} />

//   );
// }

export default StudioRoutes;