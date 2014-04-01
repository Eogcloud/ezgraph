$(document).ready(function() {
    var counter = 0
    var newRow = document.createElement('tr')
    var typeDiv = document.createElement('td')
    var dateDiv = document.createElement('td')
    var button = document.createElement('td')
    newRow.id = "row" + counter

    button.innerHTML = "<button class='btn btn-primary btn-md' type='button' onClick =''> Retrieve</button>"


    for (var key in pastGraphs) {
        counter++
        if (pastGraphs.hasOwnProperty(key)) {

            dateDiv.innerHTML = key
            typeDiv.innerHTML = getType(pastGraphs[key].origin)
            $("#graphList").append(newRow)
            $("#" + newRow.id).append(typeDiv)
            $("#" + newRow.id).append(dateDiv)
            $("#" + newRow.id).append(button)

        }
    }

    function getType(type) {
        if (type.toLowerCase() === "/piechartentry") {
            return "Pie Chart"
        } else
            return "Unknown"
    }


})