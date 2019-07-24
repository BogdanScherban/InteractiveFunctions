import React from "react";
import Typography from '@material-ui/core/Typography';

import {
    CHART_LINE,
    CHART_PROPORTION,
    CHART_SQUARE_PARABOLA,
    CHART_CUBE_PARABOLA,
    CHART_HYPERBOLA,
    CHART_ROOT,
    CHART_SIN,
    CHART_COS,
    CHART_TAN,
    CHART_LOG,
    CHART_POW
} from "../constants/lineTypes";

export function getDefaultLine(lineType) {
    let defaultLine = [];

    if (lineType === CHART_LINE || lineType === CHART_PROPORTION) {
        for (let i = -10; i <= 10; i++) {
            defaultLine.push({
                "name": i,
                "oy": i
            })
        }
    }

    if (lineType === CHART_SQUARE_PARABOLA) {
        for (let i = -10; i <= 10; i++) {
            defaultLine.push({
                "name": i,
                "oy": Math.pow(i, 2)
            })
        }
    }

    if (lineType === CHART_CUBE_PARABOLA) {
        for (let i = -10; i <= 10; i++) {
            defaultLine.push({
                "name": i,
                "oy": Math.pow(i, 3)
            })
        }
    }

    if (lineType === CHART_HYPERBOLA) {
        for (let i = -10; i <= -1; i++) {
            defaultLine.push({
                "name": i,
                "oyLess": 1 / i,
                "oyMore": null,
            })
        }
        for (let i = 1; i <= 10; i++) {
            defaultLine.push({
                "name": i,
                "oyLess": null,
                "oyMore": 1 / i,
            })
        }
    }

    if (lineType === CHART_ROOT) {
        for (let i = 0; i <= 20; i++) {
            defaultLine.push({
                "name": i,
                "oy": Math.sqrt(i),
            })
        }
    }

    if (lineType === CHART_LOG) {
        for (let i = 1; i <= 20; i++) {
            defaultLine.push({
                "name": i,
                "oy": Math.log(i) / Math.log(2),
            })
        }
    }

    if (lineType === CHART_POW) {
        for (let i = 0; i <= 5; i++) {
            defaultLine.push({
                "name": i,
                "oy": Math.pow(1, i),
            })
        }
    }

    return defaultLine;
}

export function getDefaultLinesArray(lineType) {
    let result = null;
    if (lineType === CHART_LINE || lineType === CHART_PROPORTION) {
        result = { dataKey: "oy", color: '#ffac5a', label: <Typography>y = x</Typography> };
    }
    if (lineType === CHART_SQUARE_PARABOLA) {
        result = { dataKey: "oy", color: '#ffac5a', label: <Typography>y = x<sup>2</sup></Typography> };
    }
    if (lineType === CHART_CUBE_PARABOLA) {
        result = { dataKey: "oy", color: '#ffac5a', label: <Typography>y = x<sup>3</sup></Typography> };
    }
    if (lineType === CHART_HYPERBOLA) {
        return [
            { dataKey: "oyLess", color: '#ffac5a', label: <Typography>y = <sup>1</sup>/<sub>x</sub></Typography> },
            { dataKey: "oyMore", color: '#ffac5a', label: <Typography>y = <sup>1</sup>/<sub>x</sub></Typography> },
        ];
    }
    if (lineType === CHART_ROOT) {
        result = { dataKey: "oy", color: '#ffac5a', label: <Typography>y = корень<sub>x</sub></Typography> };
    }
    if (lineType === CHART_SIN) {
        result = { dataKey: "oy", color: '#ffac5a', label: <Typography>y = sin(x)</Typography> };
    }
    if (lineType === CHART_COS) {
        result = { dataKey: "oy", color: '#ffac5a', label: <Typography>y = cos(x)</Typography> };
    }
    if (lineType === CHART_TAN) {
        return [
            { dataKey: "oy-2", color: '#ffac5a', label: <Typography>y = tg(x)</Typography> },
            { dataKey: "oy-1", color: '#ffac5a', label: <Typography>y = tg(x)</Typography> },
            { dataKey: "oy", color: '#ffac5a', label: <Typography>y = tg(x)</Typography> },
            { dataKey: "oy+1", color: '#ffac5a', label: <Typography>y = tg(x)</Typography> },
            { dataKey: "oy+2", color: '#ffac5a', label: <Typography>y = tg(x)</Typography> },
        ]
    }
    if (lineType === CHART_LOG) {
        result = { dataKey: "oy", color: '#ffac5a', label: <Typography>y = log<sub>2</sub>x</Typography> };
    }
    if (lineType === CHART_POW) {
        result = { dataKey: "oy", color: '#ffac5a', label: <Typography>y = 1<sup>x</sup></Typography> };
    }
    return [result];
}
