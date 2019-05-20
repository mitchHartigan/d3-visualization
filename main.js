console.log('main.js loaded!');

var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = window.innerWidth - margin.left - margin.right - 400 // Use the window's width 
  , height = window.innerHeight - margin.top - margin.bottom - 200; // Use the window's height

const n = 21;

const xScale = d3.scaleLinear()
                .domain([0, n - 1])
                .range([0, width])

const yScale = d3.scaleLinear()
                .domain([0, 1])
                .range([height, 0])

var dataset = d3.range(n).map(function(d) {
                return { "y": d3.randomUniform(1)() }
                })

var dataset2 = d3.range(n).map(function(d,i) {
                return { "y": d3.randomUniform(1)() }  
                })

var line = d3.line()
              .x(function(d, i) { return xScale(i); }) // set the x values for the line generator
              .y(function(d) { return yScale(d.y); }) // set the y values for the line generator 
              .curve(d3.curveMonotoneX) // apply smoothing to the line

            
const svg = d3.select('body').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.bottom + margin.top)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); // these values, (50), are padding values

svg.append('g')
    .attr('class', 'xAxis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(xScale))

svg.append('g')
    .attr('class', 'yAxis')
    .call(d3.axisLeft(yScale))

svg.append('path')
    .datum(dataset)
    .attr('class', 'line')
    .attr('d', line)

svg.append('path')
    .datum(dataset2)
    .attr('class', 'line2')
    .attr('d', line)

svg.selectAll('.dot')
    .data(dataset)
    .enter()
      .append('circle')
      .attr('class', 'dot')
      .attr('cx', function(d,i) {
        return xScale(i);
      })
      .attr('cy', function(d) { 
        return yScale(d.y);
      })
      .attr('r', 5)


  



