// from data.js
var tableData = data;

// create references to the soon to be created classes/ids in the index file
var tableBody = d3.select("tbody");
var button = d3.select("#filter-btn");
var date = d3.select("#datetime");
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"];




// grab the data from the data file, attach html tags so that the index file can construct a table using them
// add the tags in a loop like construction using the arrow function to iterate across both row and column (in that order)
var addData = (input) => {
    input.forEach(sighting => {
        var row = tableBody.append("tr");
        columns.forEach(column => row.append("td").text(sighting[column])
        )
    });
}

addData(tableData);


// create event listener for the button
// setting up the button to filter for the date input
// the button is pushed, and the matching datetime is extracted from the table
// and saved to a response variable to be tested for validity 
button.on("click", () => {

    d3.event.preventDefault();
    
    var userDate = date.property("value").trim();

    var newDate = tableData.filter(tableData => tableData.datetime === userDate);
    
    tableBody.html("");

    var response = {
        newDate
    }

    //if the input date exists (the corresponding value will be longer than zero) the new data is added to the function call that rebuilds the table
    if(response.newDate.length !== 0) {
        addData(newDate);
    }
    else { //otherwise build a table with one cell: an error message informing the user that the date they selected does not have data
        tableBody.append("tr").append("td").text("No reported sightings at this date! Enter another date!");
    }
})