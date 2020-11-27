let updateBarProducaoTotal = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n, data, time) => {
    // update bars
    let bars = svg.selectAll('.barProducaoTotal').data([getTotal(data, time)]);

    bars.transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('width', d => getBarProducaoTotalWidth(d));
}

let updateValueLabelProducaoTotal = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n, data, time) => {
    // update value labels

    let valueLabels = svg.selectAll('.valueLabelProducaoTotal').data([getTotal(data, time)]);

    valueLabels
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => getBarProducaoTotalX(d) + getBarProducaoTotalWidth(d) + 10)
        .attr('y', d => getBarProducaoTotalY(d) + 23)
        .tween("text", function (d) {
            // let i = d3.interpolateNumber(d.lastTotal, d.total);
            let i = d3.interpolateNumber(d.total, d.total);
            return function (t) {
                this.textContent = d3.format(',.0f')(i(t)).replace(",", ".");
            };
        });
}

let updateBarAreaTotal = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n, data, time) => {
    // update bars
    let bars = svg.selectAll('.barAreaTotal').data([getAreaTotal(data, time)]);

    bars.transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('width', d => getBarProducaoTotalWidth(d));
}

let updateValueLabelAreaTotal = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n, data, time) => {
    // update value labels

    let valueLabels = svg.selectAll('.valueLabelAreaTotal').data([getAreaTotal(data, time)]);

    valueLabels
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => getBarProducaoTotalX(d) + getBarProducaoTotalWidth(d) + 10)
        .attr('y', d => getBarProducaoTotalY(d) + 72)
        .tween("text", function (d) {
            // let i = d3.interpolateNumber(d.lastTotal, d.total);
            let i = d3.interpolateNumber(d.total, d.total);
            return function (t) {
                this.textContent = d3.format(',.0f')(i(t)).replace(",", ".");
            };
        });
}