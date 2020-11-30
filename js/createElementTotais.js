let createBarProducaoTotal = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n, data, time) => {
    svg.selectAll('rect.barProducaoTotal')
        .data([getTotal(data, time)])
        .enter()
        .append('rect')
        .attr('class', 'barProducaoTotal')
        .attr('x', d => getBarProducaoTotalX(d))
        .attr('width', d => getBarProducaoTotalWidth(d))
        .attr('y', d => getBarProducaoTotalY(d))
        .attr('height', getBar1Height(x, y, barPadding, inbetweenPadding))
        .style('fill', '#fdba35');
}

let createValueLabelProducaoTotal = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n, data, time) => {
    svg.selectAll('text.valueLabelProducaoTotal')
        .data([getTotal(data, time)])
        .enter()
        .append('text')
        .attr('class', 'valueLabelProducaoTotal')
        .attr('x', d => getBarProducaoTotalX(d) + getBarProducaoTotalWidth(d) + 10)
        .attr('y', d => getBarProducaoTotalY(d) + 24)
        .text(d => d3.format(',.0f')(d.total).replace(",", "."));
}

let createBarAreaTotal = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n, data, time) => {
    svg.selectAll('rect.barAreaTotal')
        .data([getAreaTotal(data, time)])
        .enter()
        .append('rect')
        .attr('class', 'barAreaTotal')
        .attr('x', d => getBarProducaoTotalX(d))
        .attr('width', d => getBarProducaoTotalWidth(d))
        .attr('y', d => getBarProducaoTotalY(d) + 59)
        .attr('height', getBar2Height(x, y, barPadding, inbetweenPadding))
        .style('fill', '#74b943');
}

let createValueLabelAreaTotal = (svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n, data, time) => {
    svg.selectAll('text.valueLabelAreaTotal')
        .data([getAreaTotal(data, time)])
        .enter()
        .append('text')
        .attr('class', 'valueLabelAreaTotal')
        .attr('x', d => getBarProducaoTotalX(d) + getBarProducaoTotalWidth(d) + 10)
        .attr('y', d => getBarProducaoTotalY(d) + 73)
        .text(d => d3.format(',.0f')(d.total).replace(",", "."));
}