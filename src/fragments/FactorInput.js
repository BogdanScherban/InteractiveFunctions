import React from "react";
import { Control } from 'react-redux-form';

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';

import { FORMULA_FACTOR } from "../constants/titles";

const styles = {

    formGroupSmall: {
        display: "inline-block",
        width: "50%",
        paddingTop: 15,
        paddingLeft: 10,
        paddingRight: 10,
        boxSizing: "border-box",
    },
    formLabel: {
        width: 200,
        marginBottom: 5,
    },
    formInput: {
        width: '100%',
        height: 25,
        paddingLeft: 10,
    },
};

const FactorInput = ({ classes, label, model, defaultValue, changeFactor, value }) => {
    return (
        <FormGroup className={classes.formGroupSmall}>
            <FormLabel className={classes.formLabel}>{FORMULA_FACTOR} <strong>{label}</strong>:</FormLabel>
            <Control.text
                className={classes.formInput}
                model={model}
                type="number"
                defaultValue={defaultValue}
                onBlur={e => changeFactor(e, value)}
            />
        </FormGroup>
    )
};

export default withStyles(styles)(FactorInput);
