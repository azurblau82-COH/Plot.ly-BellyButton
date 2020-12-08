# Plotly-BellyButton

The first part of this challenge is to load the patient names/ids into the drop down menu <br/>
-first read in the data using json
-use d3.select to find the drop down and bind the data
-populate the drop down (append(option))

next, we create a function, that is triggered by a dropdown selection, to populate the graphs
-use d3.select to get the value
-use the value to find the index of the json object
-for the bar graph, use slice and reverse to cut down to max 10 OTUs and reverse order
-for bubble chart, similarly locate the data via the index of the patient name
-assign color to value, and set custom color scale

for patient metadata,
-use d3.select to target a ul
-clear the ul of any list items before (re)populating
-use object.entries to extract key-value pairs

bonus gauge
modify code from examples in documentation, including ticks, color scale, etc.
