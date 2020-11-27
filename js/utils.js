let getBar1Height = (x, y, barPadding, inbetweenPadding) => {
    return ((y(1) - y(0)) / 2 - barPadding) * 1.25 - inbetweenPadding;
}

let getBar2Height = (x, y, barPadding, inbetweenPadding) => {
    return ((y(1) - y(0)) / 2 - barPadding) * 0.75 - inbetweenPadding;
}

let getBar1Y = (d, x, y, barPadding, inbetweenPadding) => {
    return y(d.rank) + barPadding / 2;
}

let getBar2Y = (d, x, y, barPadding, inbetweenPadding) => {
    return y(d.rank) + getBar1Height(x, y, barPadding, inbetweenPadding) + inbetweenPadding + barPadding / 2;
}

let getBarsX = (x) => {
    return x(0) + 1;
}

let getEstadoLabelY = (d, x, y, barPadding, inbetweenPadding) => {
    return (y(d.rank) + ((y(1) - y(0)) / 2) - 2);
} 

let getEstadoLabelX = (d, x, y, barPadding, inbetweenPadding) => {
    return 44;
} 

let getValueLabelY = (d, x, y, barPadding, inbetweenPadding) => {
    return (y(d.rank) + ((y(1) - y(0)) / 2) + 3) - (getBar1Height(x, y, barPadding, inbetweenPadding) / 2);
}

let getValueLabelAreaY = (d, x, y, barPadding, inbetweenPadding) => {
    return (y(d.rank) + ((y(1) - y(0)) / 2) + 1) + (getBar1Height(x, y, barPadding, inbetweenPadding) / 2) - 3;
}

let getBarProducaoTotalX = (d) => {
    return 615;
}

let getBarProducaoTotalY = (d) => {
    return 678;
}

let getBarProducaoTotalWidth = (d) => {
    return 140 * d.total / 105167;
}

// TOTAL

let getTotalByYear = (data, year) => {
    let sum = 0;
    let index = year - 1976;

    for (let sigla in data[index]) {
        if(sigla.includes('_1') || sigla.includes('_2') || sigla.includes('Date')) {
            continue;
        }

        sum += data[index][sigla];
    }

    return sum;
}

let getTotal = (data, time) => {
    let total = getTotalByYear(data, time.getFullYear());
    let lastTotal = time.getFullYear() > 1976 ? getTotalByYear(data, time.getFullYear()-1) : total;

    return {
        total: total,
        lastTotal: lastTotal
    };
}

let getAreaTotalByYear = (data, year) => {
    let sum = 0;
    let index = year - 1976;

    for (let sigla in data[index]) {
        if(!sigla.includes('_1')) {
            continue;
        }

        sum += data[index][sigla];
    }

    return sum;
}

let getAreaTotal = (data, time) => {

    let total = getAreaTotalByYear(data, time.getFullYear());
    let lastTotal = time.getFullYear() > 1976 ? getAreaTotalByYear(data, time.getFullYear()-1) : total;

    return {
        total: total,
        lastTotal: lastTotal
    };
}