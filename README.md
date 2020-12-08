# Plotly-BellyButton

The first part of this challenge is to load the patient names/ids into the drop down menu <br/>
-first read in the data using json <br/>
-use d3.select to find the drop down and bind the data <br/>
-populate the drop down (append(option)) <br/><br/>

next, we create a function, that is triggered by a dropdown selection, to populate the graphs <br/>
-use d3.select to get the value <br/>
-use the value to find the index of the json object <br/>
-for the bar graph, use slice and reverse to cut down to max 10 OTUs and reverse order <br/>
-for bubble chart, similarly locate the data via the index of the patient name <br/>
-assign color to value, and set custom color scale <br/><br/>

for patient metadata <br/>
-use d3.select to target a ul <br/>
-clear the ul of any list items before (re)populating <br/>
-use object.entries to extract key-value pairs <br/><br/>

bonus gauge <br/>
modify code from examples in documentation, including ticks, color scale, etc.
