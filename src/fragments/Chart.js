import React from "react";
import { ResponsiveContainer, LineChart, XAxis, YAxis, CartesianGrid, Line, Legend, Tooltip, ReferenceLine } from "recharts";

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const DOT_RADIUS = 8;
const STROKE_WIDTH = 4;

const styles = {
    chart: {
        '& .recharts-text.recharts-cartesian-axis-tick-value': {
            fontFamily: '"HK Grotesk SemiBold", Arial, sans-serif',
            fontSize: 16,
        },
    },
    line: {},
    transparentLine: {
        opacity: 0.3
    }
};

const Chart = ({ classes, chartData, linesArray, disabledLines, toggleLine }) => {
    return (
        <ResponsiveContainer width={'98%'} height={600}>
            <LineChart data={chartData} margin={{ top: 25, left: 0 }}>
                <XAxis
                    dataKey="name"
                    tick={{ fontFamily: '"HK Grotesk Regular", Arial, sans-serif', fontSize: 14 }}
                    domain={['dataMin', 'dataMax']}
                />
                <YAxis
                    tick={{ fontFamily: '"HK Grotesk Regular", Arial, sans-serif', fontSize: 14 }}
                    domain={['dataMin', 'dataMax']}
                />
                <ReferenceLine x={0} stroke="#000" />
                <ReferenceLine y={0} stroke="#000" />
                <CartesianGrid stroke="#e5e5e5" strokeDasharray="5 5"/>
                <Tooltip
                    formatter={(value, name) => null}
                    separator={null}
                    labelFormatter={function(value) {
                        return (
                            <Typography>Точка: {value}</Typography>
                        );
                    }}
                />
                <Legend
                    payload={linesArray.map(item => ({
                        dataKey: item.dataKey,
                        color: item.color,
                        value: <Typography>{item.label}</Typography>,
                    }))}
                    onClick={e => toggleLine(e)}
                />
                {
                    linesArray.map((item, key) => {
                        return (
                            <Line
                                key={key}
                                className={(disabledLines.indexOf(item.dataKey) === -1) ? classes.line : classes.transparentLine }
                                type="monotone"
                                name={item.label}
                                stroke={item.color}
                                dataKey={item.dataKey}
                                activeDot={{ r: DOT_RADIUS }}
                                strokeWidth={STROKE_WIDTH}
                            />
                        )
                    })
                }
            </LineChart>
        </ResponsiveContainer>
    );
};

export default withStyles(styles)(Chart);
