import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Signup from "./Signup/Signup";
import Login from "./Login/Login";
import ResetPassword from "./ResetPassword/ResetPassword";

function PublicRoutes() {
  return (
    <Fragment>
      <Switch>
        <Route
          path='/login/:role'
          render={({ match }) => <Login role={match.params.role} />}
        />
        <Route
          path='/resetpassword/:role'
          render={({ match }) => <ResetPassword role={match.params.role} />}
        />
        <Route
          path='/signup/:role'
          render={({ match }) => <Signup role={match.params.role} />}
        />
        <Route path='/'>
          <Login />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default PublicRoutes;
