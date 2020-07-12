import React, {useEffect, useState} from 'react';
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {editCategoryRequest, getCategoriesRequest, getOneCategoryRequest} from "../../store/actions/categoriesActions";
import CategoryForm from "../CategoryForm/CategoryForm";

const EditCategoryPage = () => {
    const [category, setCategory] = useState({
        title: '',
        parentCategory: ''
    })

    const categories = useSelector(state => state.categories.categories)
    const currentCategory = useSelector(state => state.categories.category)
    const dispatch = useDispatch()
    const {id} = useParams()

    const inputChangeHandler = e => setCategory({...category, [e.target.name]: e.target.value})
    const autocompleteChangeHandler = (e, value) => value && setCategory({...category, parentCategory: value?._id || ''})

    const submitHandler = e => {
        e.preventDefault()

        dispatch(editCategoryRequest(category, id))
    }

    useEffect(() => {
        dispatch(getOneCategoryRequest(id))
        dispatch(getCategoriesRequest())
    }, [dispatch, id])
    useEffect(() => {
        if (currentCategory) {
            setCategory({
                parentCategory: currentCategory.parentCategory || '',
                title: currentCategory.title
            })
        }
    }, [currentCategory])

    return categories && currentCategory && (
        <Container>
            <Grid container direction='column' spacing={1}>
                <Grid item>
                    <Typography variant='h3'>
                        Edit category
                    </Typography>
                </Grid>
                <Grid item>
                    <CategoryForm
                        onChange={inputChangeHandler}
                        onAutocompleteChange={autocompleteChangeHandler}
                        onSubmit={submitHandler}
                        state={category}
                        buttonText='Edit'
                        options={categories.filter(category => category.title !== currentCategory.title)}
                        value={categories[categories.findIndex(item => item._id === category.parentCategory)]}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditCategoryPage;