import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { DANGER_COLOR, MAIN_COLOR } from "../constants";

const styles = {
    formulaBlock: {
        paddingTop: 15,
    },
    formulaContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    formula: {
        display: 'block',
        minWidth: 160,
        margin: 20,
        padding: 10,
        textAlign: 'center',
        border: `1px solid ${DANGER_COLOR}`,
        color: MAIN_COLOR,
    },
};

const FormulaBlock = ({ classes, formulaView, axisLabel }) => {
    return (
        <div className={classes.formulaBlock}>
            <div>
                <Typography variant="body1">Общий вид формулы:</Typography>
                <div className={classes.formulaContainer}>
                    <Typography className={classes.formula} variant="h4">{formulaView}</Typography>
                </div>
            </div>
            <div>
                <Typography variant="body1">Текущая формула:</Typography>
                <div className={classes.formulaContainer}>
                    <Typography className={classes.formula} variant="h4">{axisLabel}</Typography>
                </div>
            </div>
        </div>
    )
};

export default withStyles(styles)(FormulaBlock);