import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isLoggedIn = localStorage.getItem('AUTH-TOKEN') !== null ? true : false;
    return (
        <Route
            {...rest}
            render={props =>
                isLoggedIn
                    ? <Component {...props} />
                    : <Redirect
                        to={{
                            pathname: '/',
                        }}
                    />}
        />);
};


export default PrivateRoute;