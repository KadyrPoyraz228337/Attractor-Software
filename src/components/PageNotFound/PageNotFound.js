import React from 'react';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import {useLocation} from "react-router";

const PageNotFound = () => {

    const {pathname} = useLocation()

    return (
        <Container>
            <Grid container direction='column' spacing={1}>
                <Grid item>
                    <Typography variant='h3'>
                        404 not found
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant='h6'>
                        Page "{pathname}" not found
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PageNotFound;