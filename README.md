# CSE-564-Proj1
###Description:  
Get some CSV-based data from [here](https://docs.google.com/document/d/1w7KhqotVi5eoKE3I_AZHbsxdr-NmcWsLTIiZrpxWx4w/pub) or [here](https://vincentarelbundock.github.io/Rdatasets/datasets.html) or elsewhere    

Your `D3-based` visual interface should be able to:
* bin variables into a fixed range of your choice
* create a bar chart of each such variable
* respond to mouse clicks to cycle through the different variables
* only on mouse over display the value of the bar on top of the bar
* on mouse over make the bar wider and higher to focus on it
* on mouse click transform the bar chart into a pie chart (and back)
* on mouse click create a force-directed layout using a chosen distance

###Usage:  

project url: [http://allv28.all.cs.stonybrook.edu/xinhhuang/index.html]

The default chart is the bar chart. The program bins the data into 10 bars. User can select different variable through the dropdown menu on left. When user makes a mouse over on the bars, that bar will display its value and become wider and higher. Also, user can choose to transform the barchart into piechart or forcechart. The pie chart also contains lengendaries to help user to recognize diffrent areas. The mouse over also works. The forcechart will create a forece-directed layout according to the diffrences of variables.  
Extra: user can move the slider to right or left to make the bin size increase or decrease.  
ALso, there is a configuration variable on the top of 'myapp.js' file: 
   
    $scope.vars = ["height", "weight","avg","HR"];  
    $scope.config = {
        width: "100%",
        height: 800,
        padding: 0.5, //barchart
        margin: {top: 70, right: 40, bottom: 30, left: 40},
        tipHeight: 40,
        legendSpacing: 5, //piechart
        legendRectSize: 20, //piechart
        randomSize: 15,//force chart
        linkDistanceOffset:30, //forceChart
        nodeSize:7//forcechart
    }

  Where user can define the variable that will be used to create charts by "vars".   
  User also can define some basic properties of the chart.  
  In addition, use can change the data csv file by change the "date" property in the following html element (user need to change "vars" variable in scope accordingly):  
  <div  bar-chart class="cChart" binsize="binSize" data="AirPassengers.csv" var="selectedVar" config="config" type="chart"></div>
