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

let getEstadoLabelY = (d, x, y, barPadding, inbetweenPadding) => {
    return (y(d.rank) + ((y(1) - y(0)) / 2) - 2);
} 

let getEstadoLabelX = (d, x, y, barPadding, inbetweenPadding) => {
    return 44;
} 

let getValueLabelY = (d, x, y, barPadding, inbetweenPadding) => {
    return (y(d.rank) + ((y(1) - y(0)) / 2) + 1) - (getBar1Height(x, y, barPadding, inbetweenPadding) / 2);
}

let getValueLabelAreaY = (d, x, y, barPadding, inbetweenPadding) => {
    return (y(d.rank) + ((y(1) - y(0)) / 2) + 1) + (getBar1Height(x, y, barPadding, inbetweenPadding) / 2) - 4;
}
