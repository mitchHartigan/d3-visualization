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

var dataset = [
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
]


var dataset2 = [
  {
    "year": 1972,
    "value": 0.436161776
  },
  {
    "year": 1973,
    "value": 0.534927627
  },
  {
    "year": 1974,
    "value": 0.556173526
  },
  {
    "year": 1975,
    "value": 0.43258832
  },
  {
    "year": 1976,
    "value": 0.609331476
  },
  {
    "year": 1977,
    "value": 0.770712909
  },
  {
    "year": 1978,
    "value": 0.941915228
  },
  {
    "year": 1979,
    "value": 1.154345006
  },
  {
    "year": 1980,
    "value": 1.124914409
  },
  {
    "year": 1981,
    "value": 0.908422951
  },
  {
    "year": 1982,
    "value": 0.83862326
  },
  {
    "year": 1983,
    "value": 0.875152999
  },
  {
    "year": 1984,
    "value": 1.140153572
  },
  {
    "year": 1985,
    "value": 1.038062284
  },
  {
    "year": 1986,
    "value": 1.713562457
  },
  {
    "year": 1987,
    "value": 1.764725469
  },
  {
    "year": 1988,
    "value": 1.317628269
  },
  {
    "year": 1989,
    "value": 0.998751561
  },
  {
    "year": 1990,
    "value": 0.695348151
  },
  {
    "year": 1991,
    "value": 0.832254719
  },
  {
    "year": 1992,
    "value": 1.042329878
  },
  {
    "year": 1993,
    "value": 1.415278991
  },
  {
    "year": 1994,
    "value": 1.43784694
  },
  {
    "year": 1995,
    "value": 15.61790061
  },
  {
    "year": 1996,
    "value": 15.70723511
  },
  {
    "year": 1997,
    "value": 18.180721
  },
  {
    "year": 1998,
    "value": 13.85654266
  },
  {
    "year": 1999,
    "value": 12.18477887
  },
  {
    "year": 2000,
    "value": 9.304152285
  },
  {
    "year": 2001,
    "value": 11.19944575
  },
  {
    "year": 2002,
    "value": 12.13838318
  },
  {
    "year": 2003,
    "value": 14.82750975
  },
  {
    "year": 2004,
    "value": 12.85390955
  },
  {
    "year": 2005,
    "value": 12.96505381
  },
  {
    "year": 2006,
    "value": 14.05793253
  },
  {
    "year": 2007,
    "value": 16.44257688
  },
  {
    "year": 2008,
    "value": 14.67154398
  },
  {
    "year": 2009,
    "value": 16.38607738
  },
  {
    "year": 2010,
    "value": 15.65987695
  },
  {
    "year": 2011,
    "value": 15.91876875
  },
  {
    "year": 2012,
    "value": 15.56876399
  },
  {
    "year": 2013,
    "value": 16.06750506
  },
  {
    "year": 2014,
    "value": 16.70608815
  },
  {
    "year": 2015,
    "value": 17.59193375
  },
  {
    "year": 2016,
    "value": 17.57406754
  }
]

var treemapDataset = 
{
  "name": "exports",
  "children" :  [
    {
      "name" :"Electronics",
      "children" : [
        {
          "name": "Electronics",
          "value": 17
        }
      ]
    },

    {
      "name": "Materials",
      "children": [
        {
          "name": "Oil",
          "value": 16
        },
        {
          "name": "Metal Products",
          "value": 0.87
        },
        {
          "name": "Processed Minerals",
          "value": 0.57
        },
        {
          "name": "Inorganic Salts and Acids",
          "value": 0.45
        },
        {
          "name": "Mining",
          "value": 0.37
        }
      ]
    },

    {
      "name": "Vehicles",
      "children": [
        {
          "name": "Aircraft",
          "value": 0.55
        },
        {
          "name": "Ships",
          "value": 1.1
        }
      ]
    },

    {
      "name": "Fabric",
      "children": [
        {
          "name": "Textile Fabrics",
          "value": 2.3
        },
        {
          "name": "Leather",
          "value": 0.43
        },
        {
          "name": "Garments",
          "value": 6
        }
      ]
    },

    {
      "name": "Food Products",
      "children": [
        {
          "name": "Food Processing",
          "value": 1.7
        },
        {
          "name": "Fish and Seafood",
          "value": 1.7
        },
        {
          "name": "Meat and Eggs",
          "value": 0.28
        }
      ]
    },

    {
      "name": "Agriculture",
      "children": [
        {
          "name": "Tropical Treecrops and Flowers",
          "value": 17
        },
        {
          "name": "Misc. Agriculture",
          "value": 17
        }
      ]
    },

    {
      "name": "Construction",
      "children": [
        {
          "name": "Construction Materials and Equipment",
          "value": 6.8
        },
        {
          "name": "Machinery",
          "value": 5.1
        }
      ]
    },

    {
      "name": "Chemicals",
      "children": [
        {
          "name": "Other Chemicals",
          "value": 2.7
        },
        {
          "name": "Chemicals and Health Related Products",
          "value": 10
        }
      ]
    },

    {
      "name": "Other",
      "children": [
        {
          "name": "Other",
          "value": 2.64
        },
        {
          "name": "Not Classified",
          "value": 2.7
        }
      ]
    }
  ] 
}
    

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
      console.log(mousePosX);
    })

// TREE MAP

var treemapLayout = d3.treemap();

var root = d3.hierarchy(treemapDataset);

root.sum(function(d) {
  return d.value;
})

treemapLayout.size([600, 400])

treemapLayout.tile(d3.treemapSquarify.ratio(1))

treemapLayout(root);

var nodes = d3.select('#treemap g')
    .selectAll('g')
    .data(root.descendants())
    .enter()
      .append('g')
      .attr('transform', function(d) {return 'translate(' + [d.x0, d.y0 ] + ')'})
nodes  
      // .attr('x', function(d) { return d.x0 })
      // .attr('y', function(d) { return d.y0 })
      .append('rect')
      .attr('width', function(d) { return d.x1 - d.x0 })
      .attr('height', function(d) {return d.y1 - d.y0 })


nodes.append('text')
      .attr('dx', 4)
      .attr('dy', 14)
      .text('ree normies')


