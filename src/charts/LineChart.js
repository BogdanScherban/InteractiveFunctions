import React, { Component } from "react";
import { LocalForm } from 'react-redux-form';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { getDefaultLine, getDefaultLinesArray, getAxisLabel } from "./functions";

import Chart from "../fragments/Chart";
import FormulaBlock from "../fragments/FormulaBlock";
import Toolbar from "../fragments/Toolbar";
import FactorInput from "../fragments/FactorInput";

const styles = {
    root: {
        width: '100%',
    },
};

const colorsArray = [
    '#ffac5a', '#2dcd0d', '#ca0100',
    '#8784d8', '#ff78a6', "#1929cd",
    '#ab43af', '#80ca9d', '#44afa0',
];



const defaultLine = getDefaultLine();
const defaultLinesArray = getDefaultLinesArray();

class LineChartBlock extends Component  {

    state = {
        FACTOR_K: 1,
        FACTOR_B: 0,
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
        const { factor_K, factor_B } = data;
        let newLine = [];
        let dataKey = "oy-" + factor_K + '-' + factor_B;
        let randomItem = Math.floor(Math.random() * (9 - 1) + 1);
        for (let i = 0; i < 10; i++) {
            let item = chartData[i];
            item[dataKey] = Number(factor_K) * i + Number(factor_B);
            newLine.push(item);
        }
        let color = colorsArray[randomItem];
        linesArray.push({
            dataKey: dataKey,
            color: color,
            label: getAxisLabel(factor_K, factor_B)
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
            FACTOR_K: 1,
            FACTOR_B: 0,
            chartData: getDefaultLine(),
            linesArray: getDefaultLinesArray(),
            disabledLines: [],
        });
    };

    render() {
        const { classes } = this.props;
        const { FACTOR_K, FACTOR_B, chartData, linesArray, disabledLines } = this.state;
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Chart chartData={chartData} linesArray={linesArray} disabledLines={disabledLines} toggleLine={this.toggleLine} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <FormulaBlock formulaView="y = kx + b" axisLabel={getAxisLabel(FACTOR_K, FACTOR_B)} />
                        <div>
                            <Typography variant="body1">Введите значения коэффициентов:</Typography>
                            <LocalForm  model="functionParameters" onSubmit={values => this.submitForm(values)}>
                                <FactorInput
                                    label="K"
                                    value="factor_K"
                                    model="functionParameters.factor_K"
                                    defaultValue={FACTOR_K}
                                    changeFactor={this.changeFactor}
                                />
                                <FactorInput
                                    label="B"
                                    value="factor_B"
                                    model="functionParameters.factor_B"
                                    defaultValue={FACTOR_B}
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

export default withStyles(styles)(LineChartBlock);
