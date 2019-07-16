export function getDefaultLine() {
    let defaultLine = [];
    for (let i = 0; i < 10; i++) {
        defaultLine.push({
            "name": i,
            "oy": i
        })
    }
    return defaultLine;
}

export function getDefaultLinesArray() {
    return [
        { dataKey: "oy", color: '#ffac5a', label: "y = x" }];
}

export function getAxisLabel(factor_K, factor_B) {
    let result = "y = ";

    if (Number(factor_K) !== 0) {
        result += factor_K + "x";
    } else {
        return "y = " + factor_B;
    }

    if (Number(factor_B) !== 0) {
        result += (factor_B > 0) ? (" + " + factor_B) : (" - " + Math.abs(factor_B));
    }

    return result;
}