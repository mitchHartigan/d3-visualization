console.log('main.js loaded!');

var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = window.innerWidth - margin.left - margin.right - 400 // Use the window's width 
  , height = window.innerHeight - margin.top - margin.bottom - 200; // Use the window's height

const xScale = d3.scaleTime()
                .domain([new Date(1972,0,0), new Date(2016,0,0)])
                .range([0, width]) 

const yScale = d3.scaleLinear()
                .domain([0, 25])
                .range([height, 0])

const colorScale = d3.scaleLinear()
                .range([ '#112437', '#ed980f'])
                .domain([5, 45])

var line = d3.line()
          // d3 expects date formats to have months and days in order to scale correctly,
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

svg.append('text')
    .attr('class', 'agricultureGraphHeader')
    .attr('x', '180')
    .attr('y', '75')
    .attr('id', 'agricultureGraphHeader')
    .classed('hidden', true)
    .text('Agriculture')

svg.append('text')
    .attr('class', 'agricultureGraphSubtext')
    .attr('x', '225')
    .attr('y', '95')
    .attr('id', 'agricultureGraphSubtext')
    .classed('hidden', true)
    .text('raw materials exports')

svg.append('text')
    .attr('class', 'financeGraphHeader')
    .attr('x', '650')
    .attr('y', '75')
    .attr('id', 'financeGraphHeader')
    .classed('hidden', true)
    .text('Finance')

svg.append('text')
    .attr('class', 'financeGraphSubtext')
    .attr('x', '680')
    .attr('y', '93')
    .attr('id', 'financeGraphSubtext')
    .classed('hidden', true)
    .text('services sector exports')

svg.append('rect')
   .attr('width', '60')
   .attr('height', height)
   .attr('x', '0')
   .attr('y', '0')
   .attr('class', 'hoverAreaRect')
   .attr('id', 'hoverArea1972')
   .classed('hidden', true)

svg.append('rect')
   .attr('width', '60')
   .attr('height', height)
   .attr('x', '482')
   .attr('y', '0')
   .attr('class', 'hoverAreaRect')
   .attr('id', 'hoverArea1994')
   .classed('hidden', true)

svg.append('rect')
   .attr('width', '60')
   .attr('height', height)
   .attr('x', width - 60)
   .attr('y', '0')
   .attr('class', 'hoverAreaRect')
   .attr('id', 'hoverArea2016')
   .classed('hidden', true)

svg.append('rect')
    .attr('class', 'overlay')
    .attr('width', width)
    .attr('height', height)
    .on('mousemove', function() { 
      var mousePosX = d3.mouse(this)[0];

       if (mousePosX <= (width/2) ) { // 518 is the middle pixel of the graph
        $('#agricultureGraphHeader').fadeIn(400)
        $('#agricultureGraphSubtext').fadeIn(400)
      } else {
        $('#financeGraphHeader').fadeIn(400)
        $('#financeGraphSubtext').fadeIn(400)
       }

       if (mousePosX <= (width/3)) {
         $('#hoverArea1994').fadeOut(400)
         $('#hoverArea2016').fadeOut(400)

         $('#hoverArea1972').fadeIn(400)
         document.getElementById('graphDescriptionYear').innerHTML = '1972';
         document.getElementById('totalGDPAmt').innerHTML = '$2.7B USD';
         document.getElementById('agriculturePercentage').innerHTML = '17.5%';
         

         document.getElementById('graphDescriptionText1972').style.display = 'block';
         document.getElementById('graphDescriptionText1994').style.display = 'none';
         document.getElementById('graphDescriptionText2016').style.display = 'none';


       } else if (mousePosX <= ((width/3)*2)) {
        $('#hoverArea1994').fadeIn(400)
        $('#hoverArea2016').fadeOut(400)
        $('#hoverArea1972').fadeOut(400)
        
        document.getElementById('graphDescriptionYear').innerHTML = '1994';
        document.getElementById('totalGDPAmt').innerHTML = '$73.7B USD';
        document.getElementById('agriculturePercentage').innerHTML = '1.1%';

        document.getElementById('graphDescriptionText1972').style.display = 'none';
        document.getElementById('graphDescriptionText1994').style.display = 'block';
        document.getElementById('graphDescriptionText2016').style.display = 'none';

       } else if (mousePosX >= ((width/3)*2)){ 
        $('#hoverArea1994').fadeOut(400)
        $('#hoverArea1972').fadeOut(400)
        $('#hoverArea2016').fadeIn(400)

        document.getElementById('graphDescriptionYear').innerHTML = '2016';
        document.getElementById('totalGDPAmt').innerHTML = '$309.7B USD';
        document.getElementById('agriculturePercentage').innerHTML = '0.5%';

        document.getElementById('graphDescriptionText1972').style.display = 'none';
        document.getElementById('graphDescriptionText1994').style.display = 'none';
        document.getElementById('graphDescriptionText2016').style.display = 'block';
       }
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
      .style('fill', function(d) {
        return colorScale(d.value);
      })

  nodes.append('text')
        .attr('dx', 4)
        .attr('dy', 14)
        .attr('class', 'treemapText')
        .text(function(d) {
          return d.data.name;
        })
        .style('fill', 'white')

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
      .style('fill', function(d) {
        return colorScale(d.value);
      })

  nodes.append('text')
        .attr('dx', 4)
        .attr('dy', 14)
        .attr('class', 'treemapText')
        .text(function(d) {
          return d.data.name;
        })
        .style('fill', 'white')

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
      .style('fill', function(d) {
        return colorScale(d.value);
      })

  nodes.append('text')
        .attr('dx', 4)
        .attr('dy', 14)
        .attr('class', 'treemapText')
        .text(function(d) {
          return d.data.name;
        })
        .style('fill', 'white')

// ---------------------------------------------------------
// Handlers responsible for displaying different data on the page,
// depending on the selected year.
// ---------------------------------------------------------

function render1972() {
  document.getElementById('treemap1994Parent').style.display = 'none';
  document.getElementById('treemap2016Parent').style.display = 'none';

  document.getElementById('treemap1972Parent').style.display = 'block';

  $('#singaporeAgImg').fadeOut(200, function(){
    document.getElementById('singaporeAgImg').src = 'images/singapore1972.png';
    $('#singaporeAgImg').fadeIn(400)
  })

  $('#malaysiaAgImg').fadeOut(200, function(){
    document.getElementById('malaysiaAgImg').src = 'images/malaysia1972.png';
    $('#malaysiaAgImg').fadeIn(400)
  })

  $('#thailandAgImg').fadeOut(200, function(){
    document.getElementById('thailandAgImg').src = 'images/thailand1972.png';
    $('#thailandAgImg').fadeIn(400)
  })

  $('#indonesiaAgImg').fadeOut(200, function(){
    document.getElementById('indonesiaAgImg').src = 'images/indonesia1972.png';
    $('#indonesiaAgImg').fadeIn(400)
  })

}

function render1994() {
  document.getElementById('treemap2016Parent').style.display = 'none';
  document.getElementById('treemap1972Parent').style.display = 'none';

  document.getElementById('treemap1994Parent').style.display = 'block';

  $('#singaporeAgImg').fadeOut(200, function(){
    document.getElementById('singaporeAgImg').src = 'images/singapore1994.png';
    $('#singaporeAgImg').fadeIn(400)
  })

  $('#malaysiaAgImg').fadeOut(200, function(){
    document.getElementById('malaysiaAgImg').src = 'images/malaysia1994.png';
    $('#malaysiaAgImg').fadeIn(400)
  })

  $('#thailandAgImg').fadeOut(200, function(){
    document.getElementById('thailandAgImg').src = 'images/thailand1994.png';
    $('#thailandAgImg').fadeIn(400)
  })

  $('#indonesiaAgImg').fadeOut(200, function(){
    document.getElementById('indonesiaAgImg').src = 'images/indonesia1994.png';
    $('#indonesiaAgImg').fadeIn(400)
  })

}

function render2016() {
  document.getElementById('treemap1972Parent').style.display = 'none';
  document.getElementById('treemap1994Parent').style.display = 'none';

  document.getElementById('treemap2016Parent').style.display = 'block';

  $('#singaporeAgImg').fadeOut(200, function(){
    document.getElementById('singaporeAgImg').src = 'images/singapore2016.png';
    $('#singaporeAgImg').fadeIn(400)
  })

  $('#malaysiaAgImg').fadeOut(200, function(){
    document.getElementById('malaysiaAgImg').src = 'images/malaysia2016.png';
    $('#malaysiaAgImg').fadeIn(400)
  })

  $('#thailandAgImg').fadeOut(200, function(){
    document.getElementById('thailandAgImg').src = 'images/thailand2016.png';
    $('#thailandAgImg').fadeIn(400)
  })

  $('#indonesiaAgImg').fadeOut(200, function(){
    document.getElementById('indonesiaAgImg').src = 'images/indonesia2016.png';
    $('#indonesiaAgImg').fadeIn(400)
  })
}