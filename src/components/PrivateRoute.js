import React from "react";
import { Route, Redirect } from 'react-router-dom';

/**
 * @description Renders PrivateRoute component
 * @param {Object} param
 * @returns {JSX}
 */
const PrivateRoute = ({ component, ...rest }) => {
  const isAuthed = localStorage.getItem('loggedUser');

  return (
    <Route {...rest} exact
      render = {(props) => (
        isAuthed ? (
          <div>
            {React.createElement(component, props)}
          </div>
        ) :
        (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      )}
    />
  )
}

export default PrivateRoute;
