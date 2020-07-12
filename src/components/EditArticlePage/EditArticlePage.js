import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {editArticleRequest, getArticleRequest} from "../../store/actions/articlesActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArticleForm from "../ArticleForm/ArticleForm";
import Container from "@material-ui/core/Container";
import {getCategoriesRequest} from "../../store/actions/categoriesActions";

const EditArticlePage = () => {
    const [article, setArticle] = useState({
        category: '',
        title: '',
        description: '',
        image: null

    })

    const categories = useSelector(state => state.categories.categories)
    const currentArticle = useSelector(state => state.articles.article);
    const {id} = useParams()
    const dispatch = useDispatch()

    const inputChangeHandler = e => setArticle({...article, [e.target.name]: e.target.value})
    const fileChangeHandler = e => setArticle({...article, [e.target.name]: e.target.files[0]})
    const autocompleteChangeHandler = (e, value) => value && setArticle({...article, category: value._id})

    const submitHandler = e => {
        e.preventDefault()

        const data = new FormData();
        Object.keys(article).forEach(element => {
            if (!!article[element] && article[element] !== 'null') {
                data.append(element, article[element])
            }
        })

        dispatch(editArticleRequest(data, id))
    }

    useEffect(() => {
        dispatch(getArticleRequest(id))
        dispatch(getCategoriesRequest())
    }, [dispatch, id])
    useEffect(() => {
        if (currentArticle) {
            setArticle(() => ({
                category: currentArticle.category._id,
                title: currentArticle.title,
                description: currentArticle.description
            }))
        }
    }, [currentArticle])

    return categories && article.category &&  (
        <Container>
            <Grid container direction='column' spacing={1}>
                <Grid item>
                    <Typography variant='h3'>
                        Edit article
                    </Typography>
                </Grid>
                <Grid item>
                    <ArticleForm
                        onChange={inputChangeHandler}
                        onFileChange={fileChangeHandler}
                        onAutocompleteChange={autocompleteChangeHandler}
                        onSubmit={submitHandler}
                        state={article}
                        buttonText='Edit'
                        options={categories}
                        value={categories[categories.findIndex(item => item._id === article.category)]}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default EditArticlePage;