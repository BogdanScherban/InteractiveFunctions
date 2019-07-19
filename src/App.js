import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FormGroup from '@material-ui/core/FormGroup';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';

import LineChart from "./charts/LineChart";
import ParabolaChart from "./charts/ParabolaChart";
import HyperbolaChart from "./charts/HyperbolaChart";
import CubeParabolaChart from "./charts/CubeParabolaChart";
import RootChart from "./charts/RootChart";

import { MAIN_COLOR } from "./constants";
import { MAIN_TITLE, SECOND_TITLE } from "./constants/titles";
import * as lineTypes from "./constants/lineTypes";


const styles = theme => ({
    expansionPanel: {
        margin: '0px !important',
    },
    panelTitleBlock: {
        backgroundColor: MAIN_COLOR,
    },
    panelTitle: {
        fontSize: 16,
        fontWeight: 800,
        color: "#fff",
    },
    expandIcon: {
        color: "#fff",
    }
});

const functionTypes = [
    { value: lineTypes.CHART_LINE,            label: lineTypes.CHART_LINE_LABEL,            chart: LineChart },
    { value: lineTypes.CHART_SQUARE_PARABOLA, label: lineTypes.CHART_SQUARE_PARABOLA_LABEL, chart: ParabolaChart },
    { value: lineTypes.CHART_CUBE_PARABOLA,   label: lineTypes.CHART_CUBE_PARABOLA_LABEL,   chart: CubeParabolaChart },
    { value: lineTypes.CHART_HYPERBOLA,       label: lineTypes.CHART_HYPERBOLA_LABEL,       chart: HyperbolaChart },
    { value: lineTypes.CHART_ROOT,            label: lineTypes.CHART_ROOT_LABEL,            chart: RootChart }
];

class App extends Component {

    state = {
        isHeadingPanelOpen: true,
        isContentPanelOpen: true,
        functionType: lineTypes.CHART_LINE
    };

    toggleHeadingPanel = () => {
        this.setState({
            isHeadingPanelOpen: !this.state.isHeadingPanelOpen,
        });
    };

    toggleContentPanel = () => {
       this.setState({
          isContentPanelOpen: !this.state.isContentPanelOpen,
        });
    };

    handleChecking = e => {
        this.setState({
            functionType: e.target.value,
        })
    };

    getCurrentFunctionName = name => {
        let result = '';
        functionTypes.map(item => {
            if (item.value === name) {
                result = item.label;
            }
        });
        return result;
    };

    getCurrentChartBlock = name => {
        let result = LineChart;
        for (let i = 0, n = functionTypes.length; i < n; i++) {
            let item = functionTypes[i];
            if (name === item.value) {
                result = item.chart;
                break;
            }
        }
        return result;
    };

    render() {
        const { classes } = this.props;
        const { isHeadingPanelOpen, isContentPanelOpen, functionType } = this.state;
        const currentFunctionName = this.getCurrentFunctionName(functionType);
        const ChartBlock = this.getCurrentChartBlock(functionType);
        return (
            <div className="root">

                <ExpansionPanel className={classes.expansionPanel} expanded={isHeadingPanelOpen} onChange={() => this.toggleHeadingPanel()}>
                    <ExpansionPanelSummary className={classes.panelTitleBlock} expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}>
                        <Typography className={classes.panelTitle}>{MAIN_TITLE}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <FormGroup>
                            <RadioGroup name="functionType"  value={functionType} onChange={e => this.handleChecking(e)} row>
                                {functionTypes.map((item, key) => {
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
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <ExpansionPanel className={classes.expansionPanel} expanded={isContentPanelOpen} onChange={() => this.toggleContentPanel()}>
                    <ExpansionPanelSummary className={classes.panelTitleBlock} expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}>
                        <Typography className={classes.panelTitle}>{SECOND_TITLE} {currentFunctionName}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <ChartBlock />
                    </ExpansionPanelDetails>
                </ExpansionPanel>

            </div>
        );
    }
}

export default withStyles(styles)(App);
