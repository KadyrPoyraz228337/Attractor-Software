import React from 'react';
import MyAnonymousToolBar from "./MyAnonymousToolBar/MyAnonymousToolBar";
import {useSelector} from "react-redux";
import MyAuthToolBar from "./MyAuthToolBar/MyAuthToolBar";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles({
    toolBar: {
        marginLeft: 'auto'
    }
})

const MyToolBar = () => {
    const classes = useStyles()
    const user = useSelector(state => state.users.user);
    return (
        <div className={classes.toolBar}>
            {!!user ?
                <MyAuthToolBar/> :
                <MyAnonymousToolBar/>
            }
        </div>
    );
};

export default MyToolBar;