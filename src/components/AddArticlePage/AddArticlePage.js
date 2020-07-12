import React, {useEffect, useState} from 'react';
import ArticleForm from "../ArticleForm/ArticleForm";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {getAllCategoriesRequest} from "../../store/actions/categoriesActions";
import {addArticleRequest, articleInit} from "../../store/actions/articlesActions";

const AddArticlePage = () => {

    const [article, setArticle] = useState({
        category: '',
        title: '',
        description: '',
        image: null

    })

    const categories = useSelector(state => state.categories.categories)

    const dispatch = useDispatch();

    const inputChangeHandler = e => setArticle({...article, [e.target.name]: e.target.value})
    const fileChangeHandler = e => setArticle({...article, [e.target.name]: e.target.files[0]})
    const autocompleteChangeHandler = (e, value) => value && setArticle({...article, category: value._id})

    const submitHandler = e => {
        e.preventDefault()

        const data = new FormData();
        Object.keys(article).forEach(element => {
            data.append(element, article[element])
        })

        dispatch(addArticleRequest(data))
    }

    useEffect(() => {
        dispatch(articleInit())
        dispatch(getAllCategoriesRequest())
    },[dispatch]);

    return categories && (
        <Container>
            <Grid container direction='column' spacing={1}>
                <Grid item>
                    <Typography variant='h3'>
                        Add article
                    </Typography>
                </Grid>
                <Grid item>
                    <ArticleForm
                        onChange={inputChangeHandler}
                        onFileChange={fileChangeHandler}
                        onAutocompleteChange={autocompleteChangeHandler}
                        onSubmit={submitHandler}
                        optionLabel='title'
                        state={article}
                        options={categories}
                        buttonText='Add'
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default AddArticlePage;