import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { DANGER_COLOR, MAIN_COLOR, PAPER_COLOR } from "../constants";
import { BUTTON_REFRESH, BUTTON_REMOVE } from "../constants/titles";

const styles = {
    toolbar: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
    },
    resetButton: {
        display: "block",
        width: 150,
        height: 40,
        paddingTop: "6px !important",
        paddingLeft: "8px !important",
        backgroundColor: DANGER_COLOR,
        color: PAPER_COLOR,
        fontSize: 16,
        fontWeight: 800,
        "& svg": {
            marginRight: 2,
        },
        "& span": {
            textTransform: "capitalize",
        },
        "&:hover": {
            border: `1px solid ${DANGER_COLOR}`,
            backgroundColor: PAPER_COLOR,
            color: DANGER_COLOR,
        }
    },
    updateButton: {
        display: "block",
        width: 150,
        height: 40,
        paddingTop: "6px !important",
        paddingLeft: "8px !important",
        backgroundColor: MAIN_COLOR,
        color: PAPER_COLOR,
        fontSize: 16,
        fontWeight: 800,
        "& svg": {
            marginRight: 2,
        },
        "& span": {
            textTransform: "capitalize",
        },
        "&:hover": {
            border: `1px solid ${MAIN_COLOR}`,
            backgroundColor: PAPER_COLOR,
            color: MAIN_COLOR,
        }
    }
}

const Toolbar = ({ classes, cleanChart }) => {
    return (
        <div className={classes.toolbar}>
            <Button type="button" className={classes.resetButton} onClick={() => cleanChart()}>
                { BUTTON_REMOVE }
            </Button>
            <Button type="submit" className={classes.updateButton}>
                { BUTTON_REFRESH }
            </Button>
        </div>
    )
};

export default withStyles(styles)(Toolbar);