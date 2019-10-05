# SPARQL-result-set-visualization
VizResu is a web-based service for the visualization of linked data retrieved by a public SPARQL endpoint.
A specific scholarly knowledge graph is considered as a use case for analyzing metadata of renowned scientific events in eight computer science sub-domains.
It is a semi-automatic approach that generates various charts from SPARQL queries over data represented as RDF graphs,
A decision tree classifier is used to automatically detect the type of the produced charts based of the type of the results returned by the SPARQL endpoint.
VizResu is designed to support semantic data analysis by visualizing the results of predefined query templates using an asynchronous web application.


# Prerequisites and instructions for installation
Following this instruction:
1. Download and install node js package from this link https://nodejs.org/en/.
2. Download and install python from this link https://www.python.org/downloads/.
3. Install scikit-learn via command prompt:
   `pip install -U scikit-learn`
4. Install pandas via command prompt:
  `pip install pandas`
5. Open the command prompt from the project folder and initialize the node functionalities using command
  `npm i`.
6. To enable the local host server via command prompt `node app.js`. In browser, hit http://localhost:4800 to view the app. 
# Sample visualization chart
![Bubble chart](/client/images/bubble.PNG)

 This bubble chart describes the visualized result of top ten countries hosted most of the events in computer science research communities.
# Running VizResu

In browser, hit http://localhost:4800 to view the app.
Start server using node app.js

A video demonstration is available at [https://youtu.be/us7Tz955Lrs]
