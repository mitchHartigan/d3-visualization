console.log('main.js loaded!');

console.log(dataset);

var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = window.innerWidth - margin.left - margin.right - 400 // Use the window's width 
  , height = window.innerHeight - margin.top - margin.bottom - 200; // Use the window's height

const xScale = d3.scaleTime()
                .domain([new Date(1972,0,0), new Date(2016,0,0)])
                .range([0, width]) 

const yScale = d3.scaleLinear()
                .domain([0, 25])
                .range([height, 0])

var line = d3.line()
          // D3 expects date formats to have months and days in order to scale correctly,
          // and we fake that all the data was recorded on the first day of the year by adding 
          // 0,0 after the year.
          .x(function(d) { return xScale(new Date(d.year, 0, 0)) })
          .y(function(d) { return yScale(d.value) }) // set the y values for the line generator

var area = d3.area()
          .x(function(d) { return xScale(new Date (d.year, 0, 0)) })
          .y0(height)
          .y1(function(d) { return yScale(d.value)})

const svg = d3.select('h2').append('svg')
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
    .attr('class', 'agricultureLine')
    .attr('d', line)

svg.append('path')
    .datum(dataset2)
    .attr('class', 'financeLine')
    .attr('d', line)


svg.append('path')
    .datum(dataset)
    .attr('class', 'agricultureArea')
    .attr('d', area)

svg.append('path')
    .datum(dataset2)
    .attr('class', 'financeArea')
    .attr('d', area)
    

svg.append('rect')
    .attr('class', 'overlay')
    .attr('width', width)
    .attr('height', height)
    .on('mousemove', function(){ 
      console.log('entire graph moused over!');
      var mousePosX = d3.mouse(this)[0];
      // console.log(mousePosX);
    })

// ---------------------------------------------------------
// Renders 1972 Tree Map to the page, displayed by default.
// ---------------------------------------------------------

  var treemapLayout = d3.treemap();

  var root = d3.hierarchy(treemap1972Data);

  root.sum(function(d) {
    return d.value;
  })

  treemapLayout.size([1200, 650])

  treemapLayout(root);

  var nodes = d3.select('#treemap1972 g')
      .selectAll('g')
      .data(root.descendants())
      .enter()
        .append('g')
        .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0 ] + ')'})
  nodes  
      .append('rect')
      .attr('width', function(d) { return d.x1 - d.x0 })
      .attr('height', function(d) {return d.y1 - d.y0 })

  nodes.append('text')
        .attr('dx', 4)
        .attr('dy', 14)
        .attr('class', 'treemapText')
        .text(function(d) {
          return d.data.name;
        })

// ---------------------------------------------------------
// Renders 1994 Tree Map to the page, hidden by default.
// ---------------------------------------------------------

  var treemapLayout = d3.treemap();

  var root = d3.hierarchy(treemap1994Data);

  root.sum(function(d) {
    return d.value;
  })

  treemapLayout.size([1200, 650])

  treemapLayout(root);

  var nodes = d3.select('#treemap1994 g')
      .selectAll('g')
      .data(root.descendants())
      .enter()
        .append('g')
        .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0 ] + ')'})
  nodes  
      .append('rect')
      .attr('width', function(d) { return d.x1 - d.x0 })
      .attr('height', function(d) {return d.y1 - d.y0 })

  nodes.append('text')
        .attr('dx', 4)
        .attr('dy', 14)
        .attr('class', 'treemapText')
        .text(function(d) {
          return d.data.name;
        })


// ---------------------------------------------------------
// Renders 2016 Tree Map to the page, hidden by default.
// ---------------------------------------------------------

  var treemapLayout = d3.treemap();

  var root = d3.hierarchy(treemap2016Data);

  root.sum(function(d) {
    return d.value;
  })

  treemapLayout.size([1200, 650])

  treemapLayout(root);

  var nodes = d3.select('#treemap2016 g')
      .selectAll('g')
      .data(root.descendants())
      .enter()
        .append('g')
        .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0 ] + ')'})
  nodes  
      .append('rect')
      .attr('width', function(d) { return d.x1 - d.x0 })
      .attr('height', function(d) {return d.y1 - d.y0 })

  nodes.append('text')
        .attr('dx', 4)
        .attr('dy', 14)
        .attr('class', 'treemapText')
        .text(function(d) {
          return d.data.name;
        })

// ---------------------------------------------------------
// Handlers responsible for displaying different data on the page,
// depending on the selected year.
// ---------------------------------------------------------

function render1972() {
  document.getElementById('treemap1994Parent').style.display = 'none';
  document.getElementById('treemap2016Parent').style.display = 'none';

  document.getElementById('treemap1972Parent').style.display = 'block';

  document.getElementById('singaporeAgImg').src = 'images/singapore1972.png';
  document.getElementById('malaysiaAgImg').src = 'images/malaysia1972.png';
  document.getElementById('thailandAgImg').src = 'images/thailand1972.png';
  document.getElementById('indonesiaAgImg').src = 'images/indonesia1972.png';

}

function render1994() {
  document.getElementById('treemap2016Parent').style.display = 'none';
  document.getElementById('treemap1972Parent').style.display = 'none';

  document.getElementById('treemap1994Parent').style.display = 'block';

  $('#singaporeAgImg').fadeOut(200, function(){
    document.getElementById('singaporeAgImg').src = 'images/singapore1994.png';
    $('#singaporeAgImg').fadeIn(200)
  })

  $('#malaysiaAgImg').fadeOut(200, function(){
    document.getElementById('malaysiaAgImg').src = 'images/malaysia1994.png';
    $('#malaysiaAgImg').fadeIn(200)
  })

  document.getElementById('thailandAgImg').src = 'images/thailand1994.png';
  document.getElementById('indonesiaAgImg').src = 'images/indonesia1994.png';

}

function render2016() {
  document.getElementById('treemap1972Parent').style.display = 'none';
  document.getElementById('treemap1994Parent').style.display = 'none';

  document.getElementById('treemap2016Parent').style.display = 'block';

  document.getElementById('singaporeAgImg').src = 'images/singapore2016.png';
  document.getElementById('malaysiaAgImg').src = 'images/malaysia2016.png';
  document.getElementById('thailandAgImg').src = 'images/thailand2016.png';
  document.getElementById('indonesiaAgImg').src = 'images/indonesia2016.png';
}


