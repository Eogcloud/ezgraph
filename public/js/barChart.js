$( document ).ready(function(){

        //canvas context and user data
        var canvas = document.getElementById('canvas').getContext("2d")
        var barValues = barVal
        var labelValues = barLab
        var axisLabels  = axisLab

        //canvas vars
        var graphAreaX = canvasWidth-padding
        var graphAreaY = canvasHeight-padding
        var padding = 30
        var margin = 5
        var canvasWidth = canvas.canvas.clientWidth
        var canvasHeight = canvas.canvas.clientHeight

        //bar vars
        var maxValue = getLargestBarValue();
        var numBars = barValues.length
        var maxBarHeight = graphAreaY - 25
        var barWidth = graphAreaX / numBars - margin * 2
        var barHeight
        var barRatio

        //global loop var
        var i

        //user options object
        var userOptions = {
            barColor:  'red'
        };

        draw()

        function draw(){
            debugPrintInput()
            drawAxes()
            drawBars()
        }

        function drawBars(){
            for (i = 0; i<barValues.length; i++){
                setBarRatio()
                enableBarBackgroundShading()
                drawBarBackground()
                disableBarBackgroundShading()
                drawCurrentBar()
            }
        }

        function drawCurrentBar(){
                canvas.fillStyle = userOptions.barColor
                // Fill rectangle with gradient
                canvas.fillRect(    margin + i * canvasWidth / numBars + padding,
                                    graphAreaY - barHeight + padding,
                                    barWidth - padding * 2,
                                    barHeight - padding * 2)
        }

        function getLargestBarValue(){
            var largest = 0
            for (i = 0; i < barValues.length; i++){
                if (barValues[i] > largest){
                    largest = barValues[i]
                }
            }
            return largest
        }

        function setBarRatio(){
            barRatio = barValues[i]/maxValue
            barHeight = barRatio * maxBarHeight
        }

        function enableBarBackgroundShading(){
            canvas.shadowOffsetX = 2
            canvas.shadowOffsetY = 2
            canvas.shadowBlur = 2
            canvas.shadowColor = "#999"
        }

        function disableBarBackgroundShading(){
            canvas.shadowOffsetX    = 0
            canvas.shadowOffsetY    = 0
            canvas.shadowBlur       = 0
        }

        function drawBarBackground(){
            canvas.fillStyle = "#333"
            canvas.fillRect(    margin + i * canvasWidth / numBars,
                                graphAreaY - barHeight,
                                barWidth,
                                barHeight)
        }

        function drawBackground(color){
            canvas.fillStyle = color
            canvas.fillRect(0,0,canvasWidth,canvasHeight)
        }

        function drawAxes(){
            canvas.beginPath()
            canvas.moveTo(padding, padding)
            canvas.lineTo(padding, canvasHeight-padding)
            canvas.lineTo(canvasWidth-padding, canvasHeight-padding)
            canvas.lineWidth = "3"
            canvas.strokeStyle = "black"
            canvas.stroke()
        }

        function debugPrintInput(){
            console.debug(barValues)
            console.debug(labelValues)
            console.debug(axisLabels)
        }
})
