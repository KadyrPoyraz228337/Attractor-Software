import React, {useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {addCategoryRequest, getCategoriesRequest} from "../../store/actions/categoriesActions";
import CategoryForm from "../CategoryForm/CategoryForm";

const AddCategoryPage = () => {
    const [category, setCategory] = useState({
        title: '',
        parentCategory: ''
    })

    const categories = useSelector(state => state.categories.categories)
    const error = useSelector(state => state.categories.error)
    const dispatch = useDispatch();

    const inputChangeHandler = e => setCategory({...category, [e.target.name]: e.target.value})
    const autocompleteChangeHandler = (e, value) => setCategory({...category, parentCategory: value?._id || ''})

    const submitHandler = e => {
        e.preventDefault()

        dispatch(addCategoryRequest(category))
    }

    useEffect(() => {
        dispatch(getCategoriesRequest())
    }, [dispatch]);

    return categories && (
        <Container>
            <Grid container direction='column' spacing={1}>
                <Grid item>
                    <Typography variant='h3'>
                        Add new category
                    </Typography>
                </Grid>
                <Grid item>
                    <CategoryForm
                        onChange={inputChangeHandler}
                        onAutocompleteChange={autocompleteChangeHandler}
                        onSubmit={submitHandler}
                        state={category}
                        buttonText='Add'
                        options={categories}
                        error={error}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddCategoryPage;