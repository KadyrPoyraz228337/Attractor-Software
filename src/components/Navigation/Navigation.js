import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MyToolBar from "../UI/MyToolBar/MyToolBar";
import {NavLink, useLocation} from "react-router-dom";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
    title: {
        padding: '0 10px',
        textDecoration: 'none',
        color: '#fff'
    },
    toolBar: {
        display: 'flex'
    }
}));

const Navigation = () => {
    const classes = useStyles();

    const {pathname} = useLocation()

    const logoText = 'News'
    const logo = pathname !== '/' ?
        (<Typography variant="h6" className={classes.title} component={NavLink} to='/'>{logoText}</Typography>) :
        (<Typography variant="h6" className={classes.title}>{logoText}</Typography>)

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolBar}>
                    {logo}
                    <MyToolBar/>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default Navigation;