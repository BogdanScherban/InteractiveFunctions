export function getDefaultLine(lineType) {
    let defaultLine = [];

    if (lineType === 'line') {
        for (let i = -10; i <= 10; i++) {
            defaultLine.push({
                "name": i,
                "oy": i
            })
        }
    }

    if (lineType === 'parabola') {
        for (let i = -10; i <= 10; i++) {
            defaultLine.push({
                "name": i,
                "oy": Math.pow(i, 2)
            })
        }
    }

    return defaultLine;
}

export function getDefaultLinesArray(lineType) {
    let result = null;
    if (lineType === 'line') {
        result = { dataKey: "oy", color: '#ffac5a', label: "y = x" };
    }
    if (lineType === 'parabola') {
        result = { dataKey: "oy", color: '#ffac5a', label: "y = x^2" };
    }
    return [result];
}
