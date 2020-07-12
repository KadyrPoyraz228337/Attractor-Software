import React from 'react';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import makeStyles from "@material-ui/core/styles/makeStyles";
import red from "@material-ui/core/colors/red";
import {apiURL} from "../../../config";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: '100%',
    },
    media: {
        height: '600px',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

const ArticleCard = (
    {title, description, image, date, user, menuClick, id}
) => {
    const classes = useStyles();

    const currentUser = useSelector(state => state.users.user)

    const menu = (currentUser._id === user._id || currentUser.role === 'admin') && (
        <IconButton aria-label="settings" onClick={e => menuClick(e, id)}>
            <MoreVertIcon />
        </IconButton>
    )

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label={user.username} className={classes.avatar}/>
                }
                action={
                    menu
                }
                title={title}
                subheader={date}
            />
            {image && image !== 'null' && <CardMedia
                className={classes.media}
                image={apiURL+'/uploads/'+image}
                title={title}
            />}
            {description && <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {description}
                </Typography>
            </CardContent>}
        </Card>
    );
};

export default ArticleCard;