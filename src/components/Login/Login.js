import React, {useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import FormElement from "../UI/FormElement/FormElement";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {loginUserInit, loginUserRequest} from "../../store/actions/usersActions";
import Alert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    link: {
        color: '#4451B7'
    }
}));

const Login = () => {
    const classes = useStyles();

    const initialUser= {
        username: '',
        password: ''
    }

    const [user, setUser] = useState(initialUser)
    const error = useSelector(state => state.users.loginError)
    const dispatch = useDispatch()

    const inputChangeHandler = e => setUser({...user, [e.target.name]: e.target.value})
    const submitHandler = e => {
        e.preventDefault()

        dispatch(loginUserRequest(user))
    }

    useEffect(() => {
        dispatch(loginUserInit())
    }, [dispatch])

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login
                </Typography>
                <form className={classes.form} noValidate onSubmit={submitHandler}>
                    <FormElement
                        margin="normal"
                        variant='outlined'
                        required
                        fullWidth
                        label="Username"
                        onChange={inputChangeHandler}
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <FormElement
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        onChange={inputChangeHandler}
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                    />
                    {error && (
                        <Alert severity="error">
                            {console.log(error)}
                            {error}
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Login
                    </Button>
                    <Grid container>
                        <Grid item>
                            <NavLink to='/register' className={classes.link}>
                                {"Don't have an account? Register"}
                            </NavLink>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default Login;