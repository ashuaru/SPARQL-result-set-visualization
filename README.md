# SPARQL-result-set-visualization
VizResu is a web-based service for the visualization of linked data retrieved by a public SPARQL endpoint.
A specific scholarly knowledge graph is considered as a use case for analyzing metadata of renowned scientific events in eight computer science sub-domains.
It is a semi-automatic approach that generates various charts from SPARQL queries over data represented as RDF graphs,
A decision tree classifier is used to automatically detect the type of the produced charts based of the type of the results returned by the SPARQL endpoint.
VizResu is designed to support semantic data analysis by visualizing the results of predefined query templates using an asynchronous web application.


# Prerequisites and instructions for installation
Following this instruction:
1. Download and install Node JS from this link https://nodejs.org/en/.
2. Download and install Python from this link https://www.python.org/downloads/.
3. Install scikit-learn via command prompt:
   `pip install -U scikit-learn`
4. Install pandas via command prompt:
  `pip install pandas`
5. Open the command prompt from the project folder and install the node dependencies using command
  `npm i`.
6. Start server using command `node app.js` in command prompt. In browser, hit http://localhost:4800 to view the app. 
# Sample visualization chart
![Lollipop chart](/client/images/lollipop.PNG)

 This bubble chart describes the visualized result of top ten countries hosted most of the events in computer science research communities.
 # Workflow of VizResu
 ![Workflow](/client/images/UI.PNG)
 
  1) Selecting one of the query predefined queries. 
  2) Entering appropriate query parameters.
  3) Displaying corresponding SPARQL query with the ability of further modification.
  4) Selecting either manual (different chart type options are provided) or automatic charts type detection.
  5) Visualizing the SPARQL query results.
  6) Interactive charts produced.
  
# Running VizResu

In browser, hit http://localhost:4800 to view the app.
A video description is available at[https://drive.google.com/open?id=1oj2k9pJtnmmtIEPoOpLOPNEPsf95NCtT]



