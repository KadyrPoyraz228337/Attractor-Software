import React from 'react';
import Grid from "@material-ui/core/Grid";
import FormElement from "../UI/FormElement/FormElement";
import Button from "@material-ui/core/Button";

const CategoryForm = (
    {onSubmit, onChange, state, buttonText, options, onAutocompleteChange, value, error}
) => {
    const autocompleteProps = {
        type: 'autocomplete',
        label: 'Parent category',
        options,
        onChange: onAutocompleteChange,
        name: 'category',
        variant: 'outlined',
        optionLabel: 'title',
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
                        error={error}
                        helperText='a category with the same name already exists'
                    />
                </Grid>
                <Grid item>
                    <FormElement {...autocompleteProps}/>
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

export default CategoryForm;