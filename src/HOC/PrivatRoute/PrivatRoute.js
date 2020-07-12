import React from 'react';
import {Redirect, Route} from "react-router";
import store from "../../store/configureStore";

const PrivateRoute = ({component: Component, path, exact, role, ...rest}) => {
    return <Route path={path} exact={exact} {...rest} render={(props) => {
        const user = store.getState().users.user;
        return (!!user && user.role === role) || !role
            ? <Component {...props}/>
            : <Redirect to='/login' />
    }}
    />
}

export default PrivateRoute