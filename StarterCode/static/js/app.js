
let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
d3.json(url).then(function(data){
my_dict = {};
for (let i = 0; i < data["samples"].length; i++)
  {
    temp_value = data["samples"][i];
    temp_list = [];
    for (let j = 0; j <10; j++)
      {
        temp_list.push(
        	[temp_value["otu_ids"][j], temp_value["sample_values"][j], temp_value["otu_labels"][j]]
        )
      }
    my_dict[temp_value["id"]] = temp_list;
  }

bubble_dict = {};
for (let i = 0; i < data["samples"].length; i++)
  {
    temp_value = data["samples"][i];
    temp_list = [];
    for (let j = 0; j <temp_value["otu_ids"].length; j++)
      {
        temp_list.push(
          [temp_value["otu_ids"][j], temp_value["sample_values"][j], temp_value["otu_labels"][j]]
        )
      }
    bubble_dict[temp_value["id"]] = temp_list;
  }
meta={}
for (let i = 0; i < data["metadata"].length; i++)
  {
    temp_value = data["metadata"][i];
    temp_list = [];
    for (const [key, values] of Object.entries(temp_value)){
        temp_list.push(key+" : "+values)}
        meta[temp_value["id"]]=temp_list} 






margin = {top: 20, right: 30, bottom : 40, left :90}
width = 500 - margin.left - margin.right
height = 500 - margin.top - margin.bottom

part = d3.select("#bar")
         .append("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
         .append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top +")");

x_scale = d3.scaleLinear()
            .domain([0, 300])
            .range([0, 400])
part.append("g")
		.attr("transform", "translate(0,"+height+")")
		.call(d3.axisBottom(x_scale).tickValues([0,50,100,150,200]).tickSizeInner(-height))
        .style("text-anchor", "end")
        
y_scale = d3.scaleBand()
            .range([0, height])
            .domain(my_dict[940].map(i => `OTU ${i[0]}`))
            .padding(.1)
part.append("g")
    .call(d3.axisLeft(y_scale))
part.selectAll("myBar")
    .data(my_dict[940])
    .enter()
    .append("rect")
    .attr("x", x_scale(0))
    .attr("y", function(d, i) {return y_scale(`OTU ${d[0]}`)})
    .attr("width", function(d, i) {return x_scale(d[1])})
    .attr("height", y_scale.bandwidth())
    .attr("fill", "steelblue")

//Create bubble chart
margin = {top: 20, right: 30, bottom : 40, left :90}
width = 1000 - margin.left - margin.right
height = 400 - margin.top - margin.bottom

part = d3.select("#bubble")
         .append("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
         .append("g")
         .attr("transform", "translate(" + margin.left + "," + margin.top +")");

x_scale = d3.scaleLinear()
            .domain([0, 3500])
            .range([0, width])
part.append("g")
    .attr("transform", "translate(0,"+height+")")
    .call(d3.axisBottom(x_scale))
        .style("text-anchor", "end")

y_scale = d3.scaleLinear()
            .range([height,0])
            .domain([0,250])
            
part.append("g")
    .call(d3.axisLeft(y_scale).tickValues([0,50,100,150,200]))
size=d3.scaleLinear()
        .domain([0, 250])
        .range([2, 70])
color=d3.scaleLinear()
        .domain([0, 3500])
        //.range(["blue", "brown"])
        .range(d3.schemeSet2)
part.append("g")
    .selectAll("dot")
    .data(bubble_dict[940])
    .enter()
    .append("circle")
    .attr("cx", function(d,i) {return x_scale(d[0])})
    .attr("cy", function(d, i) {return y_scale(d[1])})
    .attr("r", function(d, i) {return size(d[1])})
    .style("fill", function(d, i) {return color(d[0])})
    .style("opacity","0.5")
    .attr("stroke","grey")

table=d3.select("#meta")
        .append("div")
        .attr("id","outer")
        .style("width","300px")
        .style("height","500px")
        .style("border","1px solid steelblue")
        .style("border-radius","10px")
        .style("background", "linear-gradient(0deg,white 80%, steelblue 80%)")
table.append("div")
     .append("h1")
     .text("Demographic Info")
     .style("color","white")
     .style("padding-left","20px")
     .style("padding-top","5px")
table.append("div")
      .attr("id","content")
       .style("padding-left","20px")
       .style("padding-top","60px")
d3.select("#content")
  .selectAll("h3")
  .data(meta[940])
  .join("h3")
  .text(d=>d)
  .style("padding-left","20px")
  .style("padding-top","5px")


//console.log(bubble_dict [940])
console.log(meta[940])


})