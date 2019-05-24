console.log('main.js loaded!');

var margin = {top: 50, right: 50, bottom: 50, left: 50}
  , width = window.innerWidth - margin.left - margin.right - 400 // Use the window's width 
  , height = window.innerHeight - margin.top - margin.bottom - 200; // Use the window's height


const xScale = d3.scaleTime()
                .domain([new Date(1962,0,0), new Date(2018,0,0)])
                .range([0, width]) 


const yScale = d3.scaleLinear()
                .domain([0, 40])
                .range([height, 0])

var dataset = [
    {"year": "1962", "value": "34.3764241"},
    {"year": "1963", "value": "30.64904115"},
    {"year": "1964", "value": "27.16101642"},
    {"year": "1965", "value": "26.16126358"},
    {"year": "1966", "value": "26.46588406"},
    {"year": "1967", "value": "25.28000368"},
    {"year": "1968", "value": "26.17931872"},
    {"year": "1969", "value": "33.44893095"},
    {"year": "1970", "value": "28.33735139"},
    {"year": "1971", "value": "20.98675858"},
    {"year": "1972", "value": "17.51631242"},
    {"year": "1973", "value": "23.10887431"},
    {"year": "1974", "value": "17.07783997"},
    {"year": "1975", "value": "12.48471656"},
    {"year": "1976", "value": "15.238667"},
    {"year": "1977", "value": "14.10591289"},
    {"year": "1978", "value": "13.73836379"},
    {"year": "1979", "value": "13.18206582"},
    {"year": "1980", "value": "10.27993161"},
    {"year": "1981", "value": "7.374270702"},
    {"year": "1982", "value": "5.582108785"},
    {"year": "1983", "value": "6.183330754"},
    {"year": "1984", "value": "5.699547497"},
    {"year": "1985", "value": "4.425608489"},
    {"year": "1986", "value": "4.345478061"},
    {"year": "1987", "value": "4.358879436"},
    {"year": "1988", "value": "4.465175103"},
    {"year": "1989", "value": "3.651240518"},
    {"year": "1990", "value": "2.558771073"},
    {"year": "1991", "value": "2.02399843"},
    {"year": "1992", "value": "1.779235602"},
    {"year": "1993", "value": "1.350218592"},
    {"year": "1994", "value": "1.125411061"},
    {"year": "1995", "value": "1.082677605"},
    {"year": "1996", "value": "0.842661464"},
    {"year": "1997", "value": "0.685997884"},
    {"year": "1998", "value": "0.687222714"},
    {"year": "1999", "value": "0.563958108"},
    {"year": "2000", "value": "0.459300851"},
    {"year": "2001", "value": "0.433972079"},
    {"year": "2002", "value": "0.404116124"},
    {"year": "2003", "value": "0.351871122"},
    {"year": "2004", "value": "0.346835"},
    {"year": "2005", "value": "0.324119173"},
    {"year": "2006", "value": "0.318213488"},
    {"year": "2007", "value": "0.285273542"},
    {"year": "2008", "value": "0.284420497"},
    {"year": "2009", "value": "0.230458916"},
    {"year": "2010", "value": "0.288912111"},
    {"year": "2011", "value": "0.316070678"},
    {"year": "2012", "value": "0.254432401"},
    {"year": "2013", "value": "0.297910135"},
    {"year": "2014", "value": "0.323922867"},
    {"year": "2015", "value": "0.438846487"},
    {"year": "2016", "value": "0.558206467"},
    {"year": "2017", "value": "0.58414277"}
]

var line = d3.line()
              // D3 expects date formats to have months and days in order to scale correctly,
              // and we fake that all the data was recorded on the first day of the year by adding 
              // 0,0 after the year.
              .x(function(d) { return xScale(new Date(d.year, 0, 0)) })
              .y(function(d) { return yScale(d.value) }) // set the y values for the line generator 
              .curve(d3.curveMonotoneX) // apply smoothing to the line

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
    .attr('class', 'line')
    .attr('d', line)

// svg.append('path')
//     .datum(dataset2)
//     .attr('class', 'line2')
//     .attr('d', line)


console.log(dataset);

  



