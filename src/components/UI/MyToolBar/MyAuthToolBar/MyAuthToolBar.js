import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import Menu from "@material-ui/core/Menu";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import {logoutUserRequest} from "../../../../store/actions/usersActions";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const MyAuthToolBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch();
    const user = useSelector(state => state.users.user);

    const logout = async () => {
        await dispatch(logoutUserRequest());
    };
    return (
        <div>
            <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                id='user'
            >
                <AccountCircleIcon/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
            >
                <ListItem disabled>Hello {user.username}!</ListItem>
                <Divider/>
                <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
        </div>
    );
};

export default MyAuthToolBar;