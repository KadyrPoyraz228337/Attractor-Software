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
import {useDispatch, useSelector} from "react-redux";
import {registerUserInit, registerUserRequest} from "../../store/actions/usersActions";

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
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Register = () => {
    const classes = useStyles();

    const userInit = {
        username: '',
        password: '',
    }

    const [user, setUser] = useState(userInit)
    const error = useSelector(state => state.users.regError)
    const dispatch = useDispatch()

    const inputChangeHandler = e => setUser({...user, [e.target.name]: e.target.value})
    const submitHandler = e => {
        e.preventDefault()
        dispatch(registerUserRequest(user))
    }

    useEffect(() => {
        dispatch(registerUserInit())
    }, [dispatch])

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Register
                </Typography>
                <form className={classes.form} noValidate onSubmit={submitHandler}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormElement
                                error={error}
                                helperText='User width this username already exist'
                                autoComplete="username"
                                name="username"
                                onChange={inputChangeHandler}
                                variant="outlined"
                                required
                                label="Username"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormElement
                                variant="outlined"
                                onChange={inputChangeHandler}
                                autoComplete={'current-password'}
                                required
                                label="Password"
                                name="password"
                                type="password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Register
                    </Button>
                </form>
            </div>
        </Container>
    );
}

export default Register;