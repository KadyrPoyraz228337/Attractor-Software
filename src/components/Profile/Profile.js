import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {deleteUserRequest, editUserRequest, getUserRequest} from "../../store/actions/usersActions";
import {useParams} from "react-router";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormElement from "../UI/FormElement/FormElement";
import Button from "@material-ui/core/Button";
import Modal from "../UI/Modal/Modal";

const Profile = () => {

    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const currentUser = useSelector(state => state.users.editUser);
    const error = useSelector(state => state.users.error);
    const [isModalOpen, setModalOpen] = React.useState(false);
    const dispatch = useDispatch()
    const {id} = useParams()

    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const inputChangeHandler = e => setUser({...user, [e.target.name]: e.target.value})
    const submitHandler = e => {
        e.preventDefault()
        dispatch(editUserRequest(user, id))
    }
    const deleteUser = () => {
        dispatch(deleteUserRequest(id))
    }

    useEffect(() => {
        dispatch(getUserRequest(id))
    }, [dispatch, id])
    useEffect(() => {
        if (currentUser) {
            setUser(() => ({username: currentUser.username}))
        }
    }, [currentUser])

    const modal = (
        <Modal
            title='Are you sure to delete yourself?'
            handleClose={handleModalClose}
            onAgree={deleteUser}
            open={isModalOpen}
        />
    )

    return (
        <Container>
            <Grid container direction='column' spacing='2'>
                <Grid item>
                    <Typography variant='h3'>
                        Edit profile
                    </Typography>
                </Grid>
                <form onSubmit={submitHandler}>
                    <Grid container direction='column' spacing={2}>
                        <Grid item>
                            <FormElement
                                name='username'
                                onChange={inputChangeHandler}
                                value={user.username}
                                variant='outlined'
                                label='username'
                                error={error}
                                helperText='User with this username already exist!'
                            />
                        </Grid>
                        <Grid item>
                            <FormElement
                                name='password'
                                onChange={inputChangeHandler}
                                value={user.password}
                                variant='outlined'
                                label='password'
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button type='submit' variant='contained' color='primary'>
                                Edit
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button type='button' variant='contained' color='secondary' onClick={handleModalOpen}>
                                Delete
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            {modal}
        </Container>
    );
};

export default Profile;