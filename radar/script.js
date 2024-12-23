var w = 500,
	h = 500;

var colorscale = d3.scale.category10();

//Legend titles
var LegendOptions = ['평균값','증감율'];

//Data 제주시,서귀포시,애월읍,한림읍,조천읍,구좌읍,성산읍,남원읍,대정읍,한경면,안덕면,표선면
var d = [
		  [
			{axis:"제주시",value:0.59},
			{axis:"서귀포시",value:0.56},
			{axis:"애월읍",value:0.42},
			{axis:"한림읍",value:0.34},
			{axis:"조천읍",value:0.48},
			{axis:"구좌읍",value:0.14},
			{axis:"성산읍",value:0.11},
			{axis:"남원읍",value:0.05},
			{axis:"대정읍",value:0.07},
			{axis:"한경면",value:0.12},
			{axis:"안덕면",value:0.27},
			{axis:"표선면",value:0.03},
		  ],[
			{axis:"Email",value:0.48},
			{axis:"Social Networks",value:0.41},
			{axis:"Internet Banking",value:0.27},
			{axis:"News Sportsites",value:0.28},
			{axis:"Search Engine",value:0.46},
			{axis:"View Shopping sites",value:0.29},
			{axis:"Paying Online",value:0.11},
			{axis:"Buy Online",value:0.14},
			{axis:"Stream Music",value:0.05},
			{axis:"Online Gaming",value:0.19},
			{axis:"Navigation",value:0.14},
			{axis:"App connected to TV program",value:0.06},
			{axis:"Offline Gaming",value:0.24},
			{axis:"Photo Video",value:0.17},
			{axis:"Reading",value:0.15},
			{axis:"Listen Music",value:0.12},
			{axis:"Watch TV",value:0.1},
			{axis:"TV Movies Streaming",value:0.14},
			{axis:"Listen Radio",value:0.06},
			{axis:"Sending Money",value:0.16},
			{axis:"Other",value:0.07},
			{axis:"Use less Once week",value:0.17}
		  ]
		];

//Options for the Radar chart, other than default
var mycfg = {
  w: w,
  h: h,
  maxValue: 0.6,
  levels: 6,
  ExtraWidthX: 300
}

//Call function to draw the Radar chart
//Will expect that data is in %'s
RadarChart.draw("#chart", d, mycfg);

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////

var svg = d3.select('#body')
	.selectAll('svg')
	.append('svg')
	.attr("width", w+300)
	.attr("height", h)

//Create the title for the legend
var text = svg.append("text")
	.attr("class", "title")
	.attr('transform', 'translate(90,0)') 
	.attr("x", w - 70)
	.attr("y", 10)
	.attr("font-size", "12px")
	.attr("fill", "#404040")
	.text("2024년 기준 최근 5년 지역별 평균,증감 데이터");
		
//Initiate Legend	
var legend = svg.append("g")
	.attr("class", "legend")
	.attr("height", 100)
	.attr("width", 200)
	.attr('transform', 'translate(90,20)') 
	;
	//Create colour squares
	legend.selectAll('rect')
	  .data(LegendOptions)
	  .enter()
	  .append("rect")
	  .attr("x", w - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;
	//Create text next to squares
	legend.selectAll('text')
	  .data(LegendOptions)
	  .enter()
	  .append("text")
	  .attr("x", w - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;	