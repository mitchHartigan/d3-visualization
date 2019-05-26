
// Sets up the width and height variables to be called later, using 
// standard d3 practice. Although this webpage is not fully responsive, the
// width and height of the graphs will resize to a certain extent based on the size
// of the viewport.
var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = window.innerWidth - margin.left - margin.right - 400 // Use the window's width 
  , height = window.innerHeight - margin.top - margin.bottom - 200; // Use the window's height

// Sets up the xScale variable to be called to scale time along the xAxis.
// This variable works with the js Date format, and any values passed in will
// need to adhere to this format. The months and day are not relevant to the
// visualization, so they are defaulted to 0,0 (January 1st) for each value.
const xScale = d3.scaleTime()
                .domain([new Date(1972,0,0), new Date(2016,0,0)])
                .range([0, width]) 

// Sets up the yScale for the graph, assuming the largest value is 25%.
const yScale = d3.scaleLinear()
                .domain([0, 25])
                .range([height, 0])

// Sets up the color scale, to be used to render the color of each node in the treemap, 
// based on its value. The colors represent a gradient from orange to dark blue, matching
// the color scheme of the webpage.
const colorScale = d3.scaleLinear()
                .range([ '#112437', '#ed980f'])
                .domain([5, 45])
// Sets up the functions responsible for creating the line data, based on the provided x and y values
// parsed from the data. This is used to later render a path to the graph.
var line = d3.line()
          .x(function(d) { return xScale(new Date(d.year, 0, 0)) })
          .y(function(d) { return yScale(d.value) })

// Sets up the functions responsible for creating the line area data, or the area under the lines
// on the graph.
var area = d3.area()
          .x(function(d) { return xScale(new Date (d.year, 0, 0)) })
          .y0(height)
          .y1(function(d) { return yScale(d.value)})

// Creates the graph svg, based on the width and height conventions detailed above.
const svg = d3.select('h2').append('svg')
  .attr('width', width + margin.left + margin.right)
  .attr('height', height + margin.bottom + margin.top)
  .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

// Creates the x axis.
svg.append('g')
    .attr('class', 'xAxis')
    .attr('transform', 'translate(0,' + height + ')')
    .call(d3.axisBottom(xScale))

// Creates the y axis.
svg.append('g')
    .attr('class', 'yAxis')
    .call(d3.axisLeft(yScale))

 // Creates the 'Percentage%' y axis label for the graph.   
svg.append('text')
    .attr('class','yAxisLabel')
    .attr('transform', 'rotate(-90)')
    .attr('y', '-35')
    .attr('x', '-250')
    .text('Percentage (%)')

// Draws the Agricultural exports line to the graph.
svg.append('path')
    .datum(dataset)
    .attr('class', 'agricultureLine')
    .attr('d', line)

// Draws the Financial services exports line to the graph.
svg.append('path')
    .datum(dataset2)
    .attr('class', 'financeLine')
    .attr('d', line)

// Draws and colors the area under the Agriculture line.
svg.append('path')
    .datum(dataset)
    .attr('class', 'agricultureArea')
    .attr('d', area)

// Draws and colors the area under the Finances line.
svg.append('path')
    .datum(dataset2)
    .attr('class', 'financeArea')
    .attr('d', area)

// Creates the Agriculture title on the graph, hidden by default.
svg.append('text')
    .attr('class', 'agricultureGraphHeader')
    .attr('x', '180')
    .attr('y', '75')
    .attr('id', 'agricultureGraphHeader')
    .classed('hidden', true)
    .text('Agriculture')

// Creates the subtitle for the above title.
svg.append('text')
    .attr('class', 'agricultureGraphSubtext')
    .attr('x', '225')
    .attr('y', '95')
    .attr('id', 'agricultureGraphSubtext')
    .classed('hidden', true)
    .text('raw materials exports')

// Creates the Finance title, hidden by default.
svg.append('text')
    .attr('class', 'financeGraphHeader')
    .attr('x', '650')
    .attr('y', '75')
    .attr('id', 'financeGraphHeader')
    .classed('hidden', true)
    .text('Finance')

// Creates the subtext for the above title.
svg.append('text')
    .attr('class', 'financeGraphSubtext')
    .attr('x', '680')
    .attr('y', '93')
    .attr('id', 'financeGraphSubtext')
    .classed('hidden', true)
    .text('services sector exports')

// Creates a rectangle to highlight the 1972 region of the graph.
svg.append('rect')
   .attr('width', '60')
   .attr('height', height)
   .attr('x', '0')
   .attr('y', '0')
   .attr('class', 'hoverAreaRect')
   .attr('id', 'hoverArea1972')
   .classed('hidden', true)

// Creates the 1994 hover highlight region.
svg.append('rect')
   .attr('width', '60')
   .attr('height', height)
   .attr('x', '482')
   .attr('y', '0')
   .attr('class', 'hoverAreaRect')
   .attr('id', 'hoverArea1994')
   .classed('hidden', true)

   
// Creates the 2016 hover highlight region.
svg.append('rect')
   .attr('width', '60')
   .attr('height', height)
   .attr('x', width - 60)
   .attr('y', '0')
   .attr('class', 'hoverAreaRect')
   .attr('id', 'hoverArea2016')
   .classed('hidden', true)

// ---------------------------------------------------------
// Overlays a rect over the entirety of the line graph, then listens for
// a 'mouseover' event to detect when the user is mousing over the graph.
// The 'Agriculture' and 'Finance' titles appear when the user mouses over
// the left or right side of the screen respectively, using jQuery to handle
// the smooth fading in of those elements. Each state first resets the overall
// state of the page, then dynamically updates the page to match the new state. 
// ---------------------------------------------------------

svg.append('rect')
    .attr('class', 'overlay')
    .attr('width', width)
    .attr('height', height)
    .on('mousemove', function() { 
      var mousePosX = d3.mouse(this)[0];
       
       // Logic responsible for rendering the 'Agriculture' and 'Finance' titles
       // in to the graph, which will be continuously displayed.

       if (mousePosX <= (width/2) ) { // Detects which half of the graph the user is mousing over.
        $('#agricultureGraphHeader').fadeIn(400)
        $('#agricultureGraphSubtext').fadeIn(400)
        } else {
        $('#financeGraphHeader').fadeIn(400)
        $('#financeGraphSubtext').fadeIn(400)
       }

        // -------------------------------------------------------------------
        // Detects when the user mouses over the right 1/3rd of the graph, then
        // changes state.
        //--------------------------------------------------------------------
        
       if (mousePosX <= (width/3)) { 

         // Fades out other highlighted areas, if active.
         $('#hoverArea1994').fadeOut(400)
         $('#hoverArea2016').fadeOut(400)

         // Fades in respective highlighted area, and changes the year text.
         $('#hoverArea1972').fadeIn(400)
         document.getElementById('graphDescriptionYear').innerHTML = '1972';

         // Displays the correct information for the year selected in the graph
         // description box. 
         document.getElementById('totalGDPAmt').innerHTML = '$2.7B USD';
         document.getElementById('agriculturePercentage').innerHTML = '17.5%';
         document.getElementById('topExportVal').innerHTML = 'Tropical Fruit';
         document.getElementById('financePercentage').innerHTML = '0.4%';
         
         // Clears any other descriptions currently rendered to the page, and renders
         // the description paragraph for the selected year.
         document.getElementById('graphDescriptionText1972').style.display = 'block';
         document.getElementById('graphDescriptionText1994').style.display = 'none';
         document.getElementById('graphDescriptionText2016').style.display = 'none';

        // -------------------------------------------------------------------
        // Detects when the user mouses over the middle 1/3rd of the graph, then
        // changes state.
        //--------------------------------------------------------------------
  
       } else if (mousePosX <= ((width/3)*2)) { 
        $('#hoverArea1994').fadeIn(400)
        $('#hoverArea2016').fadeOut(400)
        $('#hoverArea1972').fadeOut(400)
        
        document.getElementById('graphDescriptionYear').innerHTML = '1994';
        document.getElementById('totalGDPAmt').innerHTML = '$73.7B USD';
        document.getElementById('agriculturePercentage').innerHTML = '1.1%';
        document.getElementById('topExportVal').innerHTML = 'Electronics';
        document.getElementById('financePercentage').innerHTML = '1.4%';

        document.getElementById('graphDescriptionText1972').style.display = 'none';
        document.getElementById('graphDescriptionText1994').style.display = 'block';
        document.getElementById('graphDescriptionText2016').style.display = 'none';

        // -------------------------------------------------------------------
        // Detects when the user mouses over the right 1/3rd of the graph, then
        // changes state.
        //--------------------------------------------------------------------
        
       } else if (mousePosX >= ((width/3)*2)){ 
        $('#hoverArea1994').fadeOut(400)
        $('#hoverArea1972').fadeOut(400)
        $('#hoverArea2016').fadeIn(400)

        document.getElementById('graphDescriptionYear').innerHTML = '2016';
        document.getElementById('totalGDPAmt').innerHTML = '$309.7B USD';
        document.getElementById('agriculturePercentage').innerHTML = '0.5%';
        document.getElementById('topExportVal').innerHTML = 'Electronics';
        document.getElementById('financePercentage').innerHTML = '17.5%';

        document.getElementById('graphDescriptionText1972').style.display = 'none';
        document.getElementById('graphDescriptionText1994').style.display = 'none';
        document.getElementById('graphDescriptionText2016').style.display = 'block';

       }
    })

// ---------------------------------------------------------
// Renders 1972 Tree Map to the page, displayed on the page
// by default. The treemap creates a hierarchy from a provided
// JSON object, which is then used to determine the size and location
// of the trees nodes, or leaves, based on the size of the specified
// value.
// ---------------------------------------------------------

  // Calls the default d3 treemap function, to be passed in the cleaned data.
  var treemapLayout = d3.treemap();
  
  // Creates a JSON hierarchy from the supplied dataset.
  var root = d3.hierarchy(treemap1972Data);

  // Find the sum of each child in the hierarchy, to be used
  // later to calculate its size.
  root.sum(function(d) {
    return d.value;
  })

  // Sets up the size of the tree map SVG.
  treemapLayout.size([1200, 650])

  // Inputs the cleaned JSON hierarchy data.
  treemapLayout(root);

  // Creates the nodes, or leaves, variable of the 
  // tree map, and enters the children of the hierarchical JSON
  // data.
  var nodes = d3.select('#treemap1972 g')
      .selectAll('g')
      .data(root.descendants())
      .enter()
        .append('g')
        .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0 ] + ')'})

  // Creates the actual nodes, in this case rectangles, to be rendered inside the tree map
  // and sets their width and height dependant on the values held in the data. Sets a color of
  // the rectangle using the colorScale variable defined above, matching the color
  // scheme of the page.
  nodes  
      .append('rect')
      .attr('width', function(d) { return d.x1 - d.x0 })
      .attr('height', function(d) {return d.y1 - d.y0 })
      .style('fill', function(d) {
        return colorScale(d.value);
      })

  // Writes the title of each node in the top left of the rectangle.
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
// depending on the selected year. jQuery is used to handle the 
// smooth fading in and out of elements on the page.
// ---------------------------------------------------------

// Renders the 1972 state, on radio button click.
function render1972() {
  // Resets the other tree maps, if they are currently displayed.
  document.getElementById('treemap1994Parent').style.display = 'none';
  document.getElementById('treemap2016Parent').style.display = 'none';

  // Displays the selected years tree map on the page.
  document.getElementById('treemap1972Parent').style.display = 'block';

  // jQuery functions responsible for fading out current images loaded on the page, 
  // then changing to the selected years image after the animation has played using
  // a callback. The image is then faded in to the page, and this action is repeated
  // for all four country images displayed on the page.

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

// Renders the 1994 state, on radio button click.
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

// Renders the 2016 state, on radio button click.
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