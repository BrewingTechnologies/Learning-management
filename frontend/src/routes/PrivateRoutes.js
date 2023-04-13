import React, { Fragment } from "react";
import { Redirect, useRouteMatch } from "react-router-dom";
import { getAllowedRoutes, isLoggedIn } from "../utils";
import PrivateRoutesConfig from "../config/PrivateRoutesConfig";
import MapAllowedRoutes from "./MapAllowedRoutes";

function PrivateRoutes() {
  const match = useRouteMatch("/app");
  let allowedRoutes = [];

  if (isLoggedIn()) allowedRoutes = getAllowedRoutes(PrivateRoutesConfig);
  else return <Redirect to='/' />;
  return (
    <Fragment>
      <MapAllowedRoutes
        routes={allowedRoutes}
        basePath={match.path}
        isAddNotFound
      />
    </Fragment>
  );
}

export default PrivateRoutes;
