import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { MESSAGE_ATTENTION } from "../constants/messages";

const styles = {

}

const AlertBlock = ({ }) => {
    return (
        <div>
            <Typography>{ MESSAGE_ATTENTION }</Typography>
            <Typography></Typography>
        </div>
    )
};

export default withStyles(styles)(AlertBlock);
