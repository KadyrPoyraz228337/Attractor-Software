import React from 'react';
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";

const MyAnonymousToolBar = () => {
    return (
        <>
            <Button
                color="inherit"
                component={NavLink}
                to='/register'
            >Register</Button>
            <Button
                color="inherit"
                variant='outlined'
                component={NavLink}
                to='/login'
            >Login</Button>
        </>
    );
};

export default MyAnonymousToolBar;