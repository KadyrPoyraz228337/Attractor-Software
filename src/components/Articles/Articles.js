import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {useDispatch, useSelector} from "react-redux";
import {deleteCategoryRequest, getCategoriesRequest} from "../../store/actions/categoriesActions";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import {NavLink, useParams} from "react-router-dom";
import {articleInit, getArticlesRequest, removeArticleRequest} from "../../store/actions/articlesActions";
import ArticleCard from "./ArticleCard/ArticleCard";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Modal from "../UI/Modal/Modal";
import Divider from "@material-ui/core/Divider";
import checkRole from "../../checkRole";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
        marginTop: '100px',
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        height: '100%',
        // marginTop: '64px',
    },
    drawerContainer: {
        padding: '10px 0 0 0',
        textAlign: 'center',
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function ClippedDrawer() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentArticleId, setCurrentArticleId] = useState(null);
    const [isModalOpen, setModalOpen] = React.useState(false);
    const categories = useSelector(state => state.categories.categories)
    const articles = useSelector(state => state.articles.articles)
    const dispatch = useDispatch()
    const {category} = useParams()

    const handleClick = (event, id) => {
        setAnchorEl(event.currentTarget)
        setCurrentArticleId(id)
    };
    const handleModalOpen = () => setModalOpen(true);
    const handleModalClose = () => setModalOpen(false);
    const handleClose = () => setAnchorEl(null);
    const deleteArticle = id => {
        dispatch(removeArticleRequest(id))
        dispatch(getArticlesRequest(category))
        handleClose()
        handleModalClose()
    }
    const deleteCategory = id => {
        dispatch(deleteCategoryRequest(id))
        dispatch(getCategoriesRequest(category))
        dispatch(getArticlesRequest(category))
    }

    useEffect(() => {
        dispatch(articleInit())
        dispatch(getCategoriesRequest(category))
        dispatch(getArticlesRequest(category))
    }, [dispatch, category])

    const title = category ? category : 'All articles'

    const menu = (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem component={NavLink} to={`/edit/${currentArticleId}`}>Edit</MenuItem>
            <MenuItem onClick={handleModalOpen}>Delete</MenuItem>
        </Menu>
    )

    const modal = (
        <Modal
            title='Are you sure to delete this article?'
            handleClose={handleModalClose}
            onAgree={() => deleteArticle(currentArticleId)}
            open={isModalOpen}
        />
    )

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerContainer}>
                    <Typography variant='h4'>
                        Categories
                    </Typography>
                    {checkRole('admin') && <>
                        <Divider/>
                        <Box p={1}>
                            <Button
                                variant='contained'
                                color='primary'
                                component={NavLink}
                                to={'/categories/new'}
                            >Add new category</Button>
                        </Box>
                        <Divider/>
                    </>}
                    <List>
                        <ListItem button component={NavLink} to={'/'}>
                            <ListItemText primary='All'/>
                        </ListItem>
                        {categories && categories.map(category => {
                            const {title, _id} = category
                            return (
                                <Grid container key={_id}>
                                    <Grid item xs>
                                        <ListItem button component={NavLink} to={'/' + title}>
                                            <ListItemText primary={title}/>
                                        </ListItem>
                                    </Grid>
                                    {checkRole('admin') && (
                                        <Grid item xs>
                                            <IconButton edge="end" aria-label="delete" component={NavLink}
                                                        to={'/categories/edit/' + _id}>
                                                <EditIcon/>
                                            </IconButton>

                                            <IconButton edge="end" aria-label="delete"
                                                        onClick={() => deleteCategory(_id)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </Grid>
                                    )}
                                </Grid>
                            )
                        })}
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Grid container justify='center'>
                    <Grid container alignItems='center' justify='space-between'>
                        <Grid item>
                            <Typography variant='h3'>
                                {title}
                            </Typography>
                        </Grid>
                        {checkRole('admin') && <Grid item>
                            <Button variant='contained' color='primary' component={NavLink} to={'/add'}>
                                Add article
                            </Button>
                        </Grid>}
                    </Grid>
                    <Grid container direction='column' spacing={2}>
                        {articles && articles.map(article => {
                            return (
                                <Grid item key={article._id}>
                                    <ArticleCard
                                        key={article._id}
                                        title={article.title}
                                        date={article.date}
                                        description={article.description}
                                        image={article.image}
                                        user={article.user}
                                        menuClick={handleClick}
                                        id={article._id}
                                    />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </main>
            {menu}
            {modal}
        </div>
    );
}
