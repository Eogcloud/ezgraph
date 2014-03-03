var counter = 1;
var limit = 20;
function addInput(divName){
     if (counter === limit){
          alert("You have reached the limit of adding " + counter + " inputs");
     }
     else{
          counter++;
          var newRow = document.createElement('div');
          var valueDiv = document.createElement('div');
          var labelDiv = document.createElement('div');
          var titleLabel = document.createElement('h5');

          valueDiv.className = "col-xs-3";
          labelDiv.className = "col-xs-3";
          titleLabel.className = "col-xs-1";
          newRow.className = "row";
          newRow.id = "row"+counter;

          titleLabel.innerHTML = "<span style='font-size: 1em' class='glyphicon glyphicon-signal'></span>&nbsp;&nbsp;Bar "+counter;
          valueDiv.innerHTML = "<input type='number' name='myInput[]' class='form-control' placeholder='Enter Bar Value'></input>";
          labelDiv.innerHTML = "<input type='text' name='mylabel[]' class='form-control' placeholder='Enter Bar Label'></input>";

          $("#"+divName).append(newRow);
          $("#"+newRow.id).append(titleLabel);
          $("#"+newRow.id).append(valueDiv);
          $("#"+newRow.id).append(labelDiv);

     }
}

function removeInput(){
     if (counter <= 1){
          alert("Sorry, you can't have a chart with no bars!");
     }
     else{
          $("#row"+counter).remove();
          counter--;
     }
}

