import React, { Component } from "react";

import get from "lodash/get";
import { LocalForm } from 'react-redux-form';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { getDefaultLine, getDefaultLinesArray } from "./functions";

import Chart from "../fragments/Chart";
import FormulaBlock from "../fragments/FormulaBlock";
import Toolbar from "../fragments/Toolbar";
import FactorInput from "../fragments/FactorInput";

import { MAIN_COLOR, colorsArray } from "../constants";
import { FORMULA_INPUTS } from "../constants/titles";
import { CHART_POW } from "../constants/lineTypes";

const styles = {
    root: {
        width: '100%',
    },
};

const defaultLine = getDefaultLine(CHART_POW);
const defaultLinesArray = getDefaultLinesArray(CHART_POW);

const FormulaView = () => {
    return (
        <span>y = a<sup>x</sup></span>
    )
};

const CurrentFormula = ({ formula }) => {
    let formulaArray = formula.split('|');
    let result = formula;
    if (formulaArray.length === 2) {
        result = <span>{formulaArray[0]}<sup>x</sup></span>
    }
    return result;
};

class PowChart extends Component  {

    state = {
        FACTOR_K: 2,
        chartData: defaultLine,
        linesArray: defaultLinesArray,
        disabledLines: [],
    };

    changeFactor = (e, factor) => {
        let factorName = factor.toUpperCase();
        this.setState({
            [factorName]: e.target.value,
        });
    };

    submitForm = data => {
        const { chartData, linesArray } = this.state;
        const { factor_K } = data;
        let newLine = [];
        let dataKey = "oy-" + factor_K;
        let randomItem = Math.floor(Math.random() * (9 - 1) + 1);
        for (let i = 0, j = 0; i <= 5; i++) {
            let item = chartData[j];
            item[dataKey] = Math.pow(factor_K, i);
            newLine.push(item);
            j++;
        }
        let color = get(colorsArray, randomItem, MAIN_COLOR);
        linesArray.push({
            dataKey: dataKey,
            color: color,
            label: <CurrentFormula formula={this.getAxisLabel(factor_K)} />
        });
        this.setState({
            chartData: newLine,
            linesArray: linesArray
        })
    };

    toggleLine = e => {
        const { disabledLines } = this.state;
        const dataKey = e.dataKey;
        let newDisabledLinesArray = [];
        if (disabledLines.indexOf(dataKey) !== -1) {
            newDisabledLinesArray = disabledLines.filter(item => item !== dataKey);
        } else {
            newDisabledLinesArray = disabledLines.concat(dataKey);
        }
        this.setState({
            disabledLines: newDisabledLinesArray
        })
    };

    cleanChart = () => {
        this.setState({
            FACTOR_K: 2,
            chartData: getDefaultLine(CHART_POW),
            linesArray: getDefaultLinesArray(CHART_POW),
            disabledLines: [],
        });
    };

    getAxisLabel = (factor_K) => {
        let result = "y = ";
        if (Number(factor_K) !== 0) {
            result += factor_K + "|x";
        } else {
            return "y = 0";
        }
        return result;
    };

    render() {
        const { classes } = this.props;
        const { FACTOR_K, chartData, linesArray, disabledLines } = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Chart chartData={chartData} linesArray={linesArray} disabledLines={disabledLines} toggleLine={this.toggleLine} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormulaBlock formulaView={<FormulaView />} axisLabel={<CurrentFormula formula={this.getAxisLabel(FACTOR_K)} />} />
                        <div>
                            <Typography variant="body1">{FORMULA_INPUTS}</Typography>
                            <LocalForm  model="functionParameters" onSubmit={values => this.submitForm(values)}>
                                <FactorInput
                                    label="K"
                                    value="factor_K"
                                    model="functionParameters.factor_K"
                                    defaultValue={FACTOR_K}
                                    changeFactor={this.changeFactor}
                                />
                                <Toolbar cleanChart={this.cleanChart} />
                            </LocalForm>
                        </div>
                    </Grid>
                </Grid>
            </div>
        )
    }
};
export default withStyles(styles)(PowChart);
