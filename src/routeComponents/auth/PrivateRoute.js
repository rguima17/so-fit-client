import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from "../../contexts/authContext";

function PrivateRoute({ component: Component, ...rest }) {
  // const authContext = useContext(AuthContext);
  const { loggedInUser } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (loggedInUser.user._id) {
          console.log("aqui 1");
          return <Component {...routeProps} {...rest} />;
        } else {
          console.log("aqui 2");
          return (
            <Redirect
              to={{
                pathname: "/auth/login",
                state: { from: routeProps.location },
              }}
            />
          );
        }
      }}
    />
  );
}

export default PrivateRoute;
