let updateBar1 = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n) => {
    // update bars
    let bars = svg.selectAll('.bar').data(row_data, d => d.name);

    bars.enter().append('rect')
        .attr('class', 'bar')
        .attr('x', x(0) + 1)
        .attr('width', d => x(d.value) - x(0))
        //enter from out of screen
        .attr('y', d => y(top_n + 1) + 0)
        .attr('height', getBar1Height(x, y, barPadding, inbetweenPadding))
        .style('fill', d => colors[d.name])
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('y', d => getBar1Y(d, x, y, barPadding, inbetweenPadding));

    bars.transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('width', d => x(d.value) - x(0))
        .attr('y', d => getBar1Y(d, x, y, barPadding, inbetweenPadding));

    bars.exit()
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('width', d => x(d.value) - x(0))
        .attr('y', d => y(top_n + 1) + barPadding / 2)
        .remove();
}

let updateBar2 = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n) => {
    // update bars2
    let bars2 = svg.selectAll('.bar2').data(row_data, d => d.name);

    bars2.enter().append('rect')
        .attr('class', 'bar2')
        .attr('x', x(0) + 1)
        .attr('width', d => x(d.value_1) - x(0))
        //enter from out of screen
        .attr('y', d => y(top_n) + ((y(1) - y(0)) / 2 - barPadding) + barPadding / 2)
        .attr('height', getBar2Height(x, y, barPadding, inbetweenPadding))
        .style('fill', d => colors[d.name])
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('y', d => getBar2Y(d, x, y, barPadding, inbetweenPadding))

    bars2.transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('width', d => x(d.value_1) - x(0))
        .attr('y', d => getBar2Y(d, x, y, barPadding, inbetweenPadding))

    bars2.exit()
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('width', d => x(d.value_1) - x(0))
        .attr('y', d => y(top_n + 1) + barPadding / 2)
        .remove();
}

let updateLabel = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n) => {
    // update labels
    let labels = svg.selectAll('.label').data(row_data, d => d.name);

    labels.enter().append('text')
        .attr('class', 'label')
        .attr('x', d => getEstadoLabelX(d, x, y, barPadding, inbetweenPadding))
        .attr('y', d => y(top_n + 1) + ((y(1) - y(0)) / 2))
        .style('text-anchor', 'end')
        .html(d => d.name)
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('y', d => getEstadoLabelY(d, x, y, barPadding, inbetweenPadding));

    labels.transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => getEstadoLabelX(d, x, y, barPadding, inbetweenPadding))
        .attr('y', d => getEstadoLabelY(d, x, y, barPadding, inbetweenPadding));

    labels.exit()
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => getEstadoLabelX(d, x, y, barPadding, inbetweenPadding))
        .attr('y', d => y(top_n + 1))
        .remove();
}

let updateValueLabel = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n) => {
    // update value labels

    let valueLabels = svg.selectAll('.valueLabel').data(row_data, d => d.name);

    valueLabels
        .enter()
        .append('text')
        .attr('class', 'valueLabel')
        .attr('x', d => x(d.value) + 5)
        .attr('y', d => y(top_n + 1))
        .text(d => d3.format(',.0f')(d.lastValue) + " mil ton")
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('y', d => getValueLabelY(d, x, y, barPadding, inbetweenPadding));

    valueLabels
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value) + 5)
        .attr('y', d => getValueLabelY(d, x, y, barPadding, inbetweenPadding))
        .tween("text", function (d) {
            let i = d3.interpolateNumber(d.lastValue, d.value);
            return function (t) {
                this.textContent = d3.format(',.0f')(i(t)) + " mil ton";
            };
        });

    valueLabels
        .exit()
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value) + 5)
        .attr('y', d => y(top_n + 1)).remove()
}

let updateValueLabelArea = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n) => {
    // update value labels

    let valueLabels = svg.selectAll('.valueLabelArea').data(row_data, d => d.name);

    valueLabels
        .enter()
        .append('text')
        .attr('class', 'valueLabelArea')
        .attr('x', d => x(d.value_1) + 5)
        .attr('y', d => y(top_n + 1))
        .text(d => d3.format(',.0f')(d.lastValue) + " mil ha")
        .style('font-size', '14px')
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('y', d => getValueLabelAreaY(d, x, y, barPadding, inbetweenPadding));

    valueLabels
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value_1) + 5)
        .attr('y', d => getValueLabelAreaY(d, x, y, barPadding, inbetweenPadding))
        .tween("text", function (d) {
            let i = d3.interpolateNumber(d.lastValue, d.value_1);
            return function (t) {
                this.textContent = d3.format(',.0f')(i(t)) + " mil ha";
            };
        });

    valueLabels
        .exit()
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value_1) + 5)
        .attr('y', d => y(top_n + 1)).remove()
}

let updateBandeira = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n) => {
    // update bandeiras
    let bandeiras = svg.selectAll('.bandeira').data(row_data, d => d.name);

    bandeiras.enter().append('image')
        .attr('class', 'bandeira')
        .attr('x', d => x(d.value) - 8)
        .attr('y', d => y(top_n + 1) + ((y(1) - y(0)) / 2))
        .attr('xlink:href', 'http://www.educadores.diaadia.pr.gov.br/modules/galeria/uploads/11/thumb_1409852741bandeiraceara.png')
        .attr('width', '40')
        .attr('height', '40')
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('y', d => getValueLabelY(d, x, y, barPadding, inbetweenPadding));

    bandeiras.transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value) - 8)
        .attr('y', d => getValueLabelY(d, x, y, barPadding, inbetweenPadding));

    bandeiras.exit()
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value) - 8)
        .attr('y', d => y(top_n + 1)).remove();
}