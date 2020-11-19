let createBar1 = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n) => {
    svg.selectAll('rect.bar')
        .data(row_data, d => d.name)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('x', x(0) + 1)
        .attr('width', d => x(d.value) - x(0))
        .attr('y', d => getBar1Y(d, x, y, barPadding, inbetweenPadding))
        .attr('height', getBar1Height(x, y, barPadding, inbetweenPadding))
        .style('fill', '#fdba35');
}

let createBar2 = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n) => {
    svg.selectAll('rect.bar2')
        .data(row_data, d => d.name)
        .enter()
        .append('rect')
        .attr('class', 'bar2')
        .attr('x', x(0) + 1)
        .attr('width', d => x(d.value_1) - x(0))
        .attr('y', d => getBar2Y(d, x, y, barPadding, inbetweenPadding))
        .attr('height', getBar2Height(x, y, barPadding, inbetweenPadding))
        .style('fill', '#74b943');
}

let createLabel = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n) => {
    svg.selectAll('text.label')
        .data(row_data, d => d.name)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => getEstadoLabelX(d, x, y, barPadding, inbetweenPadding))
        .attr('y', d => getEstadoLabelY(d, x, y, barPadding, inbetweenPadding))
        .style('text-anchor', 'end')
        .style('font-size', '16pt')
        .html(d => d.name);
}

let createValueLabel = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n) => {
    svg.selectAll('text.valueLabel')
        .data(row_data, d => d.name)
        .enter()
        .append('text')
        .attr('class', 'valueLabel')
        .attr('x', d => x(d.value) + 23)
        .attr('y', d => getValueLabelY(d, x, y, barPadding, inbetweenPadding))
        .text(d => d3.format('.0f')(d.lastValue));
}

let createValueLabelArea = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n) => {
    svg.selectAll('text.valueLabelArea')
        .data(row_data, d => d.name)
        .enter()
        .append('text')
        .attr('class', 'valueLabelArea')
        .attr('x', d => x(d.value_1) + 9)
        .attr('y', d => getValueLabelAreaY(d, x, y, barPadding, inbetweenPadding))
        .text(d => d3.format('.0f')(d.lastValue));
}

let createGraoMilho = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n) => {
    svg.selectAll('image.graoMilho')
        .data(row_data, d => d.name)
        .enter()
        .append('image')
        .attr('class', 'graoMilho')
        .attr('xlink:href', 'img/grao.png')
        .attr('width', '90')
        .attr('height', '90')
        .attr('x', d => x(d.value) - 53)
        .attr('y', d => getValueLabelY(d, x, y, barPadding, inbetweenPadding) - 48); //
}

let getUrlBandeira = (name) => {
    return "img/ufs/" + name + ".png";
}

let createBandeira = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n) => {
    svg.selectAll('image.bandeira')
        .data(row_data, d => d.name)
        .enter()
        .append('image')
        .attr('class', 'bandeira')
        .attr('xlink:href', d => getUrlBandeira(d.name))
        .attr('width', '60')
        .attr('height', '60')
        .attr('x', d => getEstadoLabelX(d, x, y, barPadding, inbetweenPadding) - 10)
        .attr('y', d => getEstadoLabelY(d, x, y, barPadding, inbetweenPadding) - 30); //
}