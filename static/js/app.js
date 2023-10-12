const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);})
// Initializes the page with a default plot
function init() {
   // Use D3 to select the dropdown menu
   let dropdownMenu = d3.select("#selDataset");
   d3.json(url).then(function(data) {
    console.log(data);
let names=data.names
names.forEach((sample) => {
    dropdownMenu
        .append("option")
        .text(sample)
        .property("value", sample);
});
buildTable(names[0])
buildChart(names[0])
})
}
init()

function buildTable(sampleID){
    d3.json(url).then(function(data) {
        console.log(data);
    let metaData=data.metadata.filter(sample => sample.id == sampleID)[0];
    console.log(metaData);
    let tableMenu = d3.select("#sample-metadata");
    tableMenu.html("")
    Object.entries(metaData).forEach(entry => {
        const [key, value] = entry;
        console.log(key, value);
        tableMenu
        .append("h5")
        .text(`${key}: ${value}`)

      });
    })




}
function optionChanged(sampleID){
    buildTable(sampleID)
    buildChart(sampleID)
}


// Function to build the bar chart
function buildChart(sampleID){
    d3.json(url).then(function(data) {
        console.log(data);
    let sampleData=data.samples.filter(sample => sample.id == sampleID)[0];
    let topOTUs=sampleData.otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
    var bardata = [{
        x:sampleData.sample_values.slice(0, 10).reverse(),
        y:topOTUs,
        text:sampleData.otu_labels.slice(0, 10).reverse(),
        orientation: 'h',
        
        type: 'bar'
      }];
      
     
      
      var barlayout = {
        title: 'Colored Bar Chart',
        
      };
      
      Plotly.newPlot('bar', bardata, barlayout);
      
      var bubbledata = [{
        x:sampleData.otu_ids,
        y:sampleData.sample_values,
        text:sampleData.otu_labels,
        mode: 'markers',
        marker: {
          color:sampleData.otu_ids,
          
          size:sampleData.sample_values
        }
      }];
      
      
      
      var bubblelayout = {
        title: 'Marker Size and Color',
        showlegend: false,
       
      };
      
      Plotly.newPlot('bubble', bubbledata, bubblelayout);
      
    })
}
    
    
       
    

