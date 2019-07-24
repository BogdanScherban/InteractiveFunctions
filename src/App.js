import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import LineChart from "./charts/LineChart";
import LineProportionChart from "./charts/LineProportionChart";
import ParabolaChart from "./charts/ParabolaChart";
import HyperbolaChart from "./charts/HyperbolaChart";
import CubeParabolaChart from "./charts/CubeParabolaChart";
import RootChart from "./charts/RootChart";
import CosChart from "./charts/CosCharts";
import SinChart from "./charts/SinChart";
import TanChart from "./charts/TanCharts";
import LogChart from "./charts/LogChart";
import PowChart from "./charts/PowChart";

import FunctionSelector from "./fragments/FunctionSelector";

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
    },
    radioSubGroup: {
        display: 'inline-block',
        float: 'left',
        width: '33%',
    }
});

const functionTypes = [
    { value: lineTypes.CHART_LINE,            label: lineTypes.CHART_LINE_LABEL,            chart: LineChart },
    { value: lineTypes.CHART_PROPORTION,      label: lineTypes.CHART_PROPORTION_LABEL,      chart: LineProportionChart },
    { value: lineTypes.CHART_SQUARE_PARABOLA, label: lineTypes.CHART_SQUARE_PARABOLA_LABEL, chart: ParabolaChart },
    { value: lineTypes.CHART_CUBE_PARABOLA,   label: lineTypes.CHART_CUBE_PARABOLA_LABEL,   chart: CubeParabolaChart },
    { value: lineTypes.CHART_HYPERBOLA,       label: lineTypes.CHART_HYPERBOLA_LABEL,       chart: HyperbolaChart },
    { value: lineTypes.CHART_ROOT,            label: lineTypes.CHART_ROOT_LABEL,            chart: RootChart },
    { value: lineTypes.CHART_SIN,             label: lineTypes.CHART_SIN_LABEL,             chart: SinChart },
    { value: lineTypes.CHART_COS,             label: lineTypes.CHART_COS_LABEL,             chart: CosChart },
    { value: lineTypes.CHART_TAN,             label: lineTypes.CHART_TAN_LABEL,             chart: TanChart },
    { value: lineTypes.CHART_COTAN,           label: lineTypes.CHART_COTAN_LABEL,           chart: null },
    { value: lineTypes.CHART_LOG,             label: lineTypes.CHART_LOG_LABEL,             chart: LogChart },
    { value: lineTypes.CHART_POW,             label: lineTypes.CHART_POW_LABEL,             chart: PowChart },
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
                        <FunctionSelector
                          functionTypes={functionTypes}
                          functionType={functionType}
                          handleChecking={this.handleChecking}
                        />
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
