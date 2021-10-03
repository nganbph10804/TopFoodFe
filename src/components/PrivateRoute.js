import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-native';

function PrivateRoute({ component: Component, ...rest }) {
  const user = useSelector(state => state.auth.token);
  return (
    <Route
      {...rest}
      render={props =>
        user ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}
export default PrivateRoute;
