var minXAxis = 37000;

function createBarChartRace(data, top_n, tickDuration) {
    var data = data;
    let chartDiv = document.getElementById("chartDiv");
    chartDiv.textContent = '';
    let width = chartDiv.clientWidth;
    let height = chartDiv.clientHeight;

    let svg = d3.select(chartDiv).append("svg")
        .attr("width", width)
        .attr("height", height);

    const margin = {
        top: 140,
        right: 80,
        bottom: 140,
        left: 110
    };

    const marginTimeAxis = 30;

    let barPadding = (height - (margin.bottom + margin.top)) / (top_n * 10);
    let inbetweenPadding = (height - (margin.bottom + margin.top)) / (top_n * 10) / 2;

    function getRowData(data, column_names, row_index) {
        const row = data[row_index];
        let new_data = column_names.map((name) => {
            if(name.includes('_1') || name.includes('_2')) {
                return null;
            }
            return {name: name, value: row[name], value_1: row[name + "_1"], value_2: row[name + "_2"]}
        });

        new_data = new_data.filter((x) => x != null);

        new_data = new_data.sort((a, b) => b.value - a.value).slice(0, top_n);
        new_data.forEach((d, i) => {
            d.rank = i;
            d.lastValue = (row_index > 0) ? data[row_index - 1][d.name] : d.value;
        });
        return [row[d3.keys(row)[0]], new_data]
    }

    const time_index = d3.keys(data[0])[0];
    const column_names = d3.keys(data[0]).slice(1,);

    // define a random color for each column
    const colors = {};
    const color_scale = d3.scaleOrdinal(d3.schemeSet3);

    column_names.forEach((name, i) => {
        colors[name] = color_scale(i)
    });

    // Parse data
    data.forEach((d) => {
        // first column : YYYY-MM-DD
        const parseTime = d3.timeParse("%Y-%m-%d");
        d[time_index] = parseTime(d[time_index]);
        // convert other columns to numbers
        column_names.forEach((k) => d[k] = Number(d[k]))

    });

    // draw the first frame

    [time, row_data] = getRowData(data, column_names, 0);

    start_date = d3.min(data, d => d[time_index]);
    end_date = d3.max(data, d => d[time_index]);

    let t = d3.scaleTime()
        .domain([start_date, end_date])
        .range([margin.left + marginTimeAxis, width - margin.right]);

    let timeAxis = d3.axisBottom()
        .ticks(5)
        .scale(t);

    let x = d3.scaleLinear()
        .domain([0, minXAxis])//d3.max(row_data, d => d.value)])
        .range([margin.left, width - margin.right]);
    
    let y = d3.scaleLinear()
        .domain([top_n, 0])
        .range([height - margin.bottom, margin.top]);

    let xAxis = d3.axisTop()
        .scale(x)
        .ticks(5)
        .tickSize(-(height - margin.top - margin.bottom))
        .tickFormat(d => d3.format(',')(d));

    // svg.append('g')
    //     .attr('class', 'axis xAxis')
    //     .attr('transform', `translate(0, ${margin.top})`)
    //     .call(xAxis)
    //     .selectAll('.tick line')
    //     .classed('origin', d => d === 0);

    createBar1(svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n);
    createBar2(svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n);
    // createLabel(svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n);
    createValueLabel(svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n);
    createValueLabelArea(svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n);
    createBandeira(svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n);
    createGraoMilho(svg, row_data, x, y, barPadding, inbetweenPadding, colors, top_n);

    const zeroPad = (num, places) => String(num).padStart(places, '0')
    let nextYear = parseInt(d3.timeFormat("%Y")(time)) + 1;
    let lastDigits = zeroPad(nextYear, 4);

    let timeText = svg.append('text')
        .attr('class', 'timeText')
        .attr('x', width - 140)
        .attr('y', height - 350)
        .style('text-anchor', 'end')
        .html(d3.timeFormat("%Y/")(time) + lastDigits);

    // draw the updated graph with transitions
    function drawGraph() {
        // update xAxis with new domain
        x.domain([0, minXAxis])//d3.max(row_data, d => d.value)]);
        svg.select('.xAxis')
            .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .call(xAxis);

        updateBar1(svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n);
        updateBar2(svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n);
        // updateLabel(svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n);
        updateValueLabel(svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n);
        updateValueLabelArea(svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n);
        updateBandeira(svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n);
        updateGraoMilho(svg, row_data, x, y, barPadding, inbetweenPadding, colors, tickDuration, top_n);

        // update time label and progress bar
        d3.select('.progressBar')
            .transition()
            .duration(tickDuration)
            .ease(d3.easeLinear)
            .attr('width', t(time) - marginTimeAxis)
        // .on('end', () => {
        //     d3.select('.timeText').html(d3.timeFormat("%B %d, %Y")(time))
        // timeText.html(d3.timeFormat("%B %d, %Y")(time))
        // })

        let nextYear = parseInt(d3.timeFormat("%Y")(time)) + 1;
        let lastDigits = zeroPad(nextYear, 4);

        timeText.html(d3.timeFormat("%Y/")(time) + lastDigits)

    }

    // loop
    let i = 1;
    let interval = d3.interval((e) => {
        [time, row_data] = getRowData(data, column_names, i);
        drawGraph();
        // increment loop
        i += 1
        if (i == data.length) interval.stop()


    }, tickDuration)
    return interval


}
