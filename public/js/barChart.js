$( document ).ready(function(){

		var barValues = barVal
		var labelValues = barLab
		var axisLabels  = axisLab
		var canvas = $("#canvas").getContext("2d")
		var Width = canvas.canvas.clientWidth
		var Height = canvas.canvas.clientHeight
		var padding = 30

		function debugPrintInput(){
			console.debug(barValues)
			console.debug(labelValues)
			console.debug(axisLaels)
		}

		function drawBackground(color){
			canvas.fillStyle = color
			canvas.fillRect(0,0,Width,Height)
		}

		function drawAxes(){
			canvas.beginPath()
			canvas.moveTo(padding, padding)
			canvas.lineTo(padding, Height-padding)
			canvas.lineTo(Width-padding, Height-padding)
			canvas.lineWidth = "3"
			canvas.strokeStyle="black"
			canvas.stroke()
		}

		function draw(){
			debugPrintInput()
			drawAxes()
		}

		draw()
})