import React from "react";
import Typography from '@material-ui/core/Typography';

import { CHART_LINE, CHART_SQUARE_PARABOLA, CHART_CUBE_PARABOLA, CHART_HYPERBOLA, CHART_ROOT } from "../constants/lineTypes";

export function getDefaultLine(lineType) {
    let defaultLine = [];

    if (lineType === CHART_LINE) {
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

    return defaultLine;
}

export function getDefaultLinesArray(lineType) {
    let result = null;
    if (lineType === CHART_LINE) {
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
    return [result];
}
