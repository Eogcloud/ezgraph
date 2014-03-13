$( document ).ready(function(){

        //canvas context and user data
        var canvas = document.getElementById('canvas').getContext("2d")
        var pieValues = pieVal
        var pieLabels = pieLab
        var pieTitles  = titleLab
        var canvasWidth = canvas.canvas.clientWidth
        var canvasHeight = canvas.canvas.clientHeight
        var defaultColors = ["red", "green", "blue", "yellow", "pink", "brown", "white", "black", "grey"]
        var valuesInDegrees = valuesToDegrees(pieValues)

        //user options object
        var userOptions = {
            colors: [],
            titleColor:[],
         }

        draw()

        function draw(){
            debugPrintInput()

            for (var i = 0; i < valuesInDegrees.length; i++) {
                drawSegment(i)
                drawSegmentLabel(i)
            }
            drawTitle()
        }

        function debugPrintInput(){
            console.debug(pieValues)
            console.debug(pieLabels)
            console.debug(pieTitles)
        }

        function valuesToDegrees(data){
            var sumTotal = 0
            for(var key in data){
                sumTotal+=parseInt(data[key])
            }
            console.log(sumTotal)
            var valuesInDegrees = new Array()
            for(var i=0; i<data.length; i++){
                valuesInDegrees[i]=360*(data[i]/sumTotal)
            }
            console.log(valuesInDegrees)
            return valuesInDegrees
        }


        function drawSegment(i) {
            canvas.save()
            var originX = Math.floor(canvasWidth / 2)
            var originY = Math.floor(canvasHeight / 2)+50
            var radius = Math.floor(canvasHeight / 2.5)

            var startAngle = convertToRadians(sumTo(valuesInDegrees, i))
            var arcSize = convertToRadians(valuesInDegrees[i])
            var finishAngle = startAngle + arcSize

            enableBackgroundShading()
            canvas.beginPath()
            canvas.moveTo(originX, originY)
            canvas.arc(     originX,
                            originY,
                            radius,
                            startAngle,
                            finishAngle,
                            false)
            canvas.closePath()

            if (userOptions.colors[i] == typeof "string"){
                canvas.fillStyle = userOptions.colors[i]
            }
            else{
                canvas.fillStyle = defaultColors[i]
            }

            canvas.fill()
            canvas.restore()
        }

        function drawSegmentLabel(i) {
            canvas.save()
            var x = Math.floor(canvasWidth / 2)
            var y = Math.floor(canvasHeight / 2)+50
            var dx = Math.floor(canvasWidth * 0.25) - 10
            var dy = Math.floor(canvasHeight * 0.05)
            var fontSize = Math.floor(canvasHeight / 25)
            var angle = convertToRadians(sumTo(valuesInDegrees, i))
            canvas.textAlign = "right"
            canvas.translate(x, y)
            canvas.rotate(angle)
            canvas.font = fontSize + "pt Consolas"
            canvas.fillText(pieLabels[i], dx, dy)
            canvas.restore()
        }

        function convertToRadians(degrees){
            return (degrees * Math.PI)/180
        }

        function sumTo(collection, limit){
            var sum = 0
            for (var i = 0; i < limit; i++) {
              sum += collection[i]
            }
            return sum
        }

        function enableBackgroundShading(){
            canvas.shadowOffsetX = 4
            canvas.shadowOffsetY = 4
            canvas.shadowBlur = 4
            canvas.shadowColor = "#999"
        }

        function disableBackgroundShading(){
            canvas.shadowOffsetX    = 0
            canvas.shadowOffsetY    = 0
            canvas.shadowBlur       = 0
        }

        function drawTitle(){
            canvas.save()
            var x = 40
            var y = 70
            var fontSize = Math.floor(canvasHeight / 10)
            canvas.font = fontSize + "pt Consolas"
            canvas.fillText(pieTitles[0], x, y)
            canvas.restore()
        }
})