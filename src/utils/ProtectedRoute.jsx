import React from 'react';
import {Route, Redirect } from 'react-router-dom';
import auth from './../services/authservice';

const ProtectedRoute = ({
  component: Component,
  layout: Layout,
  render,
  ...rest
}) => {

 // Layout = (Layout === undefined) ? props => (<>{props.children}</>) : Layout;

  return (
    <Route
      {...rest}
      render={props => {
        if(!auth.getProfile()) return <Redirect to="/loginregister" />;
        return Component ?  <Component {...props} /> : render(props);
      }}
    />
  );
}

export default ProtectedRoute;