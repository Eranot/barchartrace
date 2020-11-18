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
        .style('fill', d => colors[d.name]);
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
        .style('fill', d => colors[d.name]);
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
        .html(d => d.name);
}

let createValueLabel = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n) => {
    svg.selectAll('text.valueLabel')
        .data(row_data, d => d.name)
        .enter()
        .append('text')
        .attr('class', 'valueLabel')
        .attr('x', d => x(d.value) + 5)
        .attr('y', d => getValueLabelY(d, x, y, barPadding, inbetweenPadding))
        .text(d => d3.format(',.0f')(d.lastValue) + " mil ton");
}

let createValueLabelArea = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n) => {
    svg.selectAll('text.valueLabelArea')
        .data(row_data, d => d.name)
        .enter()
        .append('text')
        .attr('class', 'valueLabelArea')
        .attr('x', d => x(d.value_1) + 5)
        .attr('y', d => getValueLabelAreaY(d, x, y, barPadding, inbetweenPadding))
        .style('font-size', '14px')
        .text(d => d3.format(',.0f')(d.lastValue) + " mil ha");
}

let createBandeira = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n) => {
    svg.selectAll('image.bandeira')
        .data(row_data, d => d.name)
        .enter()
        .append('image')
        .attr('class', 'bandeira')
        .attr('xlink:href', 'http://www.educadores.diaadia.pr.gov.br/modules/galeria/uploads/11/thumb_1409852741bandeiraceara.png')
        .attr('width', '40')
        .attr('height', '40')
        .attr('x', d => x(d.value) - 8)
        .attr('y', d => getValueLabelY(d, x, y, barPadding, inbetweenPadding)); //
}