console.log('main.js loaded!');

const width = 1000;
const height = 600;
const margin = 60;
const svg = d3.select('svg');

const yScale = d3.scaleLinear()
                .range([height, 0])
                .domain([0, 100])

const xScale = d3.scaleLinear()
                .range([0, width])
                .domain([0, height])

const chart = svg.append('g')

chart.append('g')
      .call(d3.axisLeft(yScale))
      .call(d3.axisBottom(xScale))
      .attr('transform', 'translate(${margin}, ${margin}')
      .attr('color', 'white')


