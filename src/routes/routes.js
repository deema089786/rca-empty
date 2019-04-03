import React           from "react";
import {Route, Switch} from "react-router-dom";
import {global}        from 'config';
import RouteAuthRole   from './RouteAuthRole';


import MainPage     from 'containers/MainPage';
import SignInPage   from 'containers/SignInPage';
import SignUpPage   from 'containers/SignUpPage';
import NotFoundPage from 'containers/NotFoundPage';

export default (
  <Switch>
    <RouteAuthRole
      exact path="/"
      component={MainPage}
      roles={[global.ROLE.ADMIN]}
      redirectPath={'/sign-in'}
    />
    <Route
      exact path="/sign-in"
      component={SignInPage}
    />
    <Route
      exact path="/sign-up"
      component={SignUpPage}
    />
    <Route
      component={NotFoundPage}
    />
    <Route component={NotFoundPage}/>
  </Switch>
)

