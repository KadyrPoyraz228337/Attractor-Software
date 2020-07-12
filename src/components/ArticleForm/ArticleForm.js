import React from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../UI/FormElement/FormElement";
import Button from "@material-ui/core/Button";

const ArticleForm = (
    {onSubmit, onChange, onAutocompleteChange, onFileChange, state, buttonText, options, value}
) => {
    let autocompleteProps = {
        type: 'autocomplete', label: 'Category',
        options, onChange: onAutocompleteChange, name: 'category',
        variant: 'outlined', optionLabel: 'title'
    }
    if (value) autocompleteProps.value = value

    return (
        <form onSubmit={onSubmit}>
            <Grid container direction='column' spacing={2}>
                <Grid item>
                    <FormElement
                        label='Title'
                        variant='outlined'
                        name='title'
                        required
                        onChange={onChange}
                        autoFocus
                        value={state.title}
                    />
                </Grid>
                <Grid item>
                    <FormElement
                        multiline
                        label='Description'
                        variant='outlined'
                        name='description'
                        onChange={onChange}
                        value={state.description}
                    />
                </Grid>
                <Grid item>
                    <FormElement{...autocompleteProps}/>
                </Grid>
                <Grid item xs={3}>
                    <FormElement
                        type='image'
                        label='Image'
                        name='image'
                        onChange={onFileChange}
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button variant='contained' color='primary' type='submit'>
                        {buttonText}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default ArticleForm;