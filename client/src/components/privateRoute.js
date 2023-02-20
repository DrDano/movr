import React from "react";
import { navigate } from "gatsby";
import { useAuth0 } from '@auth0/auth0-react';

const { isLoading, isAuthenticated, error } = useAuth0();

const PrivateRoute = ({ component: Component, location, ...rest }) => {
  if (!isLoggedIn() && location.pathname !== `/app/login`) {
    navigate("/app/login")
    return null
  }

  return <Component {...rest} />
}

export default PrivateRoute