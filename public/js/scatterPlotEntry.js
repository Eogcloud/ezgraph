var counter = 1;
var limit = 20;

function addInput(divName) {
    if (counter === limit) {
        alert("You have reached the limit of adding " + counter + " inputs");
    } else {
        counter++;
        var newRow = document.createElement('div');
        var valueDiv = document.createElement('div');
        var labelDiv = document.createElement('div');
        var titleLabel = document.createElement('h5');

        valueDiv.className = "col-xs-3";
        labelDiv.className = "col-xs-3";
        titleLabel.className = "col-xs-1 well well-sm";
        newRow.className = "row";
        newRow.id = "row" + counter;

        titleLabel.innerHTML = "<span style='font-size: 1em' class='glyphicon glyphicon-signal'></span>&nbsp;&nbsp;Point " + counter;
        valueDiv.innerHTML = "<input style='margin-top: 5%' type='number' name='scatterXValues[]' class='form-control' placeholder='Enter X Value'></input>";
        labelDiv.innerHTML = "<input style='margin-top: 5%' type='number' name='scatterYValues[]' class='form-control' placeholder='Enter Y Value'></input>";

        $("#" + divName).append(newRow);
        $("#" + newRow.id).append(titleLabel);
        $("#" + newRow.id).append(valueDiv);
        $("#" + newRow.id).append(labelDiv);

    }
}

function removeInput() {
    if (counter <= 1) {
        alert("Sorry, you can't have a plot with no points!");
    } else {
        $("#row" + counter).remove();
        counter--;
    }
}