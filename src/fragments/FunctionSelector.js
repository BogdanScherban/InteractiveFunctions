import React from "react";

import { withStyles } from '@material-ui/core/styles';
import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

const styles = {
    radioSubGroup: {
        display: 'inline-block',
        float: 'left',
        width: '33%',
    }
};

const FormSubGroup = ({ classes, min, max, functionTypes, functionType, handleChecking }) => {
    return (
        <FormGroup className={classes.radioSubGroup}>
            <RadioGroup name="functionType" value={functionType} onChange={e => handleChecking(e)}>
                {functionTypes.slice(min, max).map((item, key) => {
                    return (
                        <FormControlLabel
                            key={key}
                            value={item.value}
                            control={<Radio />}
                            label={item.label}
                        />
                    );
                })}
            </RadioGroup>
        </FormGroup>
    )
};

const FunctionSelector = props => {
    return (
        <React.Fragment>
            <FormSubGroup min={0} max={4} {...props} />
            <FormSubGroup min={4} max={8} {...props} />
            <FormSubGroup min={8} max={12} {...props} />
        </React.Fragment>
    );
};

export default withStyles(styles)(FunctionSelector);