const url = "./samples.json";

// populate the dropdown menu with names
var data = d3.json(url).then(function(data){
    console.log(data);

    var names = data.names;
    console.log(names);

    var select = d3.select("#selDataset");

    var selection = select.selectAll("option") // creates virtual selection
        .data(names) // binds data
        .enter()
        .append("option") // appends li element for each item in array (since there are currently none)
        .text(function(d) {
            return d;
        })
        .attr('value', function(d){
            return d
        })  
}); 

//trigger data selection when drop down selection is changed
d3.selectAll('#selDataset').on('change', updatePlotly);

function updatePlotly(){
    var dropdownmenu = d3.select('#selDataset');
    var dataset = dropdownmenu.property('value');
    console.log(dataset);

    d3.json(url).then(function(importeddata){
        var data = importeddata;
        console.log(data);
        
        var names = data.names;
        //find index that belongs to this name
        function checkIndex(x) {
            return x === dataset;
          }
        var dataindex = parseInt(names.findIndex(checkIndex))
        var sample_values = (data.samples[dataindex].sample_values).slice(0,10).reverse();
        var otu_labels = (data.samples[dataindex].otu_labels).slice(0,10).reverse();
        var otu_ids = (data.samples[dataindex].otu_ids).slice(0,10).reverse();
        
        

        console.log(dataindex);
        console.log(names);    
        console.log(sample_values);
        console.log(otu_labels);
        console.log(otu_ids);
    
        //now for the plotting Bar Chart

        var trace1 = {
            y: otu_ids,
            x: sample_values,
            text: otu_labels,
            type: 'bar',
            orientation: 'h',
            
        }

        var chartData1 = [trace1];

        var layout = {
            yaxis: {type: 'category',
                    tickprefix: 'OTU '}            
        }
    Plotly.newPlot('bar', chartData1, layout);

    //Bubble Chart
    sample_values_2 = (data.samples[dataindex].sample_values);
    otu_labels_2 = (data.samples[dataindex].otu_labels);
    otu_ids_2 = (data.samples[dataindex].otu_ids);
    
    var trace2 = {
        x: otu_ids_2,   
        y: sample_values_2,
        mode: 'markers',
        marker: {
            size: sample_values_2,
            color: otu_ids_2,
            colorscale: [[0, '#f5cba7'], [0.25, '#abebc6'], [0.5,  '#aed6f1'], [0.75,  '#d2b4de'], [1,  '#ec7063']],
            cmin: 0,
            cmax: 4000,
            sizeref: Math.max(...sample_values_2)/2000,
            sizemode: 'area'
        },
        text: otu_labels_2
    }

    var chartData2 = [trace2];

    var layout2 = {
        xaxis: {title: {text: "OTU ID"}},
        yaxis: {range: [0, ]}
    }
    Plotly.newPlot('bubble', chartData2, layout2)

    var patient_data = data.metadata[dataindex];
    
    var list = d3.select('ul')
    //clear the list:
    list.html("");
    //populate list
    for (const [key, value] of Object.entries(patient_data)) {
        list.append('li').text(`${key}: ${value}`)
      }
    
    //bonus
    var washes = patient_data.wfreq;
    var chartData3 = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: washes,
          title: { text: "Washes" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 9],
                tickmode: 'array',
                tickvals: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
                ticks: "inside"
            },
            bar: {color: "#cb4335"},
            steps: [
              { range: [0, 1], color: "#eafaf1" },
              { range: [1, 2], color: "#d5f5e3" },
              { range: [2, 3], color: "#abebc6" },
              { range: [3, 4], color: "#82e0aa" },
              { range: [4, 5], color: "#58d68d" },
              { range: [5, 6], color: "#2ecc71" },
              { range: [6, 7], color: "#28b463" },
              { range: [7, 8], color: "#239b56" },
              { range: [8, 9], color: "#186a3b" },
            ]
            }
          }
      ];
      
      var layout3 = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', chartData3, layout3);

})

}




