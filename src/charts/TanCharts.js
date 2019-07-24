import React, { Component } from "react";
import get from "lodash/get";
import { LocalForm } from 'react-redux-form';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { getDefaultLinesArray } from "./functions";

import Chart from "../fragments/Chart";
import FormulaBlock from "../fragments/FormulaBlock";
import Toolbar from "../fragments/Toolbar";
import FactorInput from "../fragments/FactorInput";

import { MAIN_COLOR, colorsArray } from "../constants";
import { FORMULA_INPUTS } from "../constants/titles";
import { CHART_TAN } from "../constants/lineTypes";

const styles = {
    root: {
        width: '100%',
    },
};

const oxArray = [
    -0.45 * Math.PI,
    -0.4 * Math.PI,
    -0.35 * Math.PI,
    -0.3 * Math.PI,
    -0.25 * Math.PI,
    -0.2 * Math.PI,
    -0.15 * Math.PI,
    -0.1 * Math.PI,
    -0.05 * Math.PI,
    0,
    0.05 * Math.PI,
    0.1 * Math.PI,
    0.15 * Math.PI,
    0.2 * Math.PI,
    0.25 * Math.PI,
    0.3 * Math.PI,
    0.35 * Math.PI,
    0.4 * Math.PI,
    0.45 * Math.PI,
];

function getDefaultLine() {
    let result = [];
    oxArray.map(item => {
        result.push({
            "name": item - 2 * Math.PI,
            "oy-2": Math.tan(item),
        });
        result.push({
            "name": item - Math.PI,
            "oy-1": Math.tan(item),
        });
        result.push({
            "name": item,
            "oy": Math.tan(item),
        })
    });
    return result;
}

const defaultLine = getDefaultLine();
const defaultLinesArray = getDefaultLinesArray(CHART_TAN);

const FormulaView = () => {
    return (
        <span>y = tg(x)</span>
    )
};

const CurrentFormula = ({ formula }) => {
    return <span>y = tg(x)</span>;
};


class TanChart extends Component  {

    state = {
        FACTOR_K: 1,
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
        for (let i = -10, j = 0; i <= 10; i++) {
            let item = chartData[j];
            item[dataKey] = Number(factor_K) * i;
            newLine.push(item);
            j++;
        }
        let color = get(colorsArray, randomItem, MAIN_COLOR);
        linesArray.push({
            dataKey: dataKey,
            color: color,
            label: this.getAxisLabel(factor_K)
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

    getAxisLabel = (factor_K) => {
        let result = "y = ";
        if (Number(factor_K) !== 0) {
            result += (Number(factor_K) !== 1) ? (factor_K + "x") : "x";
        } else {
            return "y = 0";
        }
        return result;
    };

    cleanChart = () => {
        this.setState({
            FACTOR_K: 1,
            chartData: getDefaultLine(),
            linesArray: getDefaultLinesArray(CHART_TAN),
            disabledLines: [],
        });
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
                        <FormulaBlock formulaView={<FormulaView />} axisLabel={<CurrentFormula formula={this.getAxisLabel(FACTOR_K)} />}  />
                        {/*    <Typography variant="body1">{FORMULA_INPUTS}</Typography>*/}
                        {/*    <LocalForm  model="functionParameters" onSubmit={values => this.submitForm(values)}>*/}
                        {/*        <FactorInput*/}
                        {/*            label="K"*/}
                        {/*            value="factor_K"*/}
                        {/*            model="functionParameters.factor_K"*/}
                        {/*            defaultValue={FACTOR_K}*/}
                        {/*            changeFactor={this.changeFactor}*/}
                        {/*        />*/}
                        {/*        <Toolbar cleanChart={this.cleanChart} />*/}
                        {/*    </LocalForm>*/}
                        {/*</div>*/}
                    </Grid>
                </Grid>
            </div>
        )
    }
};

export default withStyles(styles)(TanChart);
