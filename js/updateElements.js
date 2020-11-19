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
        .style('fill', '#fdba35')
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
        .style('fill', '#74b943')
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
        .style('font-size', '16pt')
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
        .attr('x', d => x(d.value) + 23)
        .attr('y', d => y(top_n + 1))
        .text(d => d3.format('.0f')(d.lastValue))
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('y', d => getValueLabelY(d, x, y, barPadding, inbetweenPadding));

    valueLabels
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value) + 23)
        .attr('y', d => getValueLabelY(d, x, y, barPadding, inbetweenPadding))
        .tween("text", function (d) {
            let i = d3.interpolateNumber(d.lastValue, d.value);
            return function (t) {
                this.textContent = d3.format('.0f')(i(t));
            };
        });

    valueLabels
        .exit()
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value) + 23)
        .attr('y', d => y(top_n + 1)).remove()
}

let updateValueLabelArea = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n) => {
    // update value labels

    let valueLabels = svg.selectAll('.valueLabelArea').data(row_data, d => d.name);

    valueLabels
        .enter()
        .append('text')
        .attr('class', 'valueLabelArea')
        .attr('x', d => x(d.value_1) + 9)
        .attr('y', d => y(top_n + 1))
        .text(d => d3.format('.0f')(d.lastValue))
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('y', d => getValueLabelAreaY(d, x, y, barPadding, inbetweenPadding));

    valueLabels
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value_1) + 9)
        .attr('y', d => getValueLabelAreaY(d, x, y, barPadding, inbetweenPadding))
        .tween("text", function (d) {
            let i = d3.interpolateNumber(d.lastValue, d.value_1);
            return function (t) {
                this.textContent = d3.format('.0f')(i(t));
            };
        });

    valueLabels
        .exit()
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value_1) + 9)
        .attr('y', d => y(top_n + 1)).remove()
}

let updateGraoMilho = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n) => {
    // update bandeiras
    let graos = svg.selectAll('.graoMilho').data(row_data, d => d.name);

    graos.enter().append('image')
        .attr('class', 'graoMilho')
        .attr('x', d => x(d.value) - 53)
        .attr('y', d => y(top_n + 1) + ((y(1) - y(0)) / 2) - 35)
        .attr('xlink:href', 'img/grao.png')
        .attr('width', '90')
        .attr('height', '90')
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('y', d => getValueLabelY(d, x, y, barPadding, inbetweenPadding) - 48);

    graos.transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value) - 53)
        .attr('y', d => getValueLabelY(d, x, y, barPadding, inbetweenPadding) - 48); //

    graos.exit()
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => x(d.value) - 53)
        .attr('y', d => y(top_n + 1)).remove();
}

let updateBandeira = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n) => {
    // update bandeiras
    let bandeiras = svg.selectAll('.bandeira').data(row_data, d => d.name);

    bandeiras.enter().append('image')
        .attr('class', 'bandeira')
        .attr('x', d => getEstadoLabelX(d, x, y, barPadding, inbetweenPadding) - 10)
        .attr('y', d => y(top_n + 1) + ((y(1) - y(0)) / 2) - 35)
        .attr('xlink:href', d => getUrlBandeira(d.name))
        .attr('width', '60')
        .attr('height', '60')
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('y', d => getEstadoLabelY(d, x, y, barPadding, inbetweenPadding));

    bandeiras.transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => getEstadoLabelX(d, x, y, barPadding, inbetweenPadding) - 10)
        .attr('y', d => getEstadoLabelY(d, x, y, barPadding, inbetweenPadding) - 35);

    bandeiras.exit()
        .transition()
        .duration(tickDuration)
        .ease(d3.easeLinear)
        .attr('x', d => getEstadoLabelX(d, x, y, barPadding, inbetweenPadding) - 10)
        .attr('y', d => y(top_n + 1)).remove();
}