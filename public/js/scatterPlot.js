//canvas context and user data
var canvas = document.getElementById('canvas').getContext("2d")
var canvasWidth = canvas.canvas.clientWidth
var canvasHeight = canvas.canvas.clientHeight
var xValues = scatterXValues
var yValues = scatterYValues
var axisLabels = axisLabels
var chartTitle = scatterTitle
var padding = 30
var numPoints = xValues.length
var largestVals = getlargestValues()


var userOptions = {
    pointColor: ['black', 'green', 'blue', 'yellow', 'orange'],
    showAxes: true,
    showAxisLabels: true,
    showShadows: true,
    showTitle: true,
    pointRadius: 4,
    axisLabelColor: 'black',
    axisLabelFont: 'Arial',
    titleLabelColor: 'black',
    titleLabelFont: 'Arial'
};

draw()

function getlargestValues() {
    var largest = {
        xValue: null,
        yValue: null
    }

    largest.xValue = xValues[0]
    largest.yValue = yValues[0]

    for (var i = 0; i < numPoints; i++) {
        if (parseInt(xValues[i]) > parseInt(largest.xValue)) {
            largest.xValue = xValues[i]
        }
    }

    for (var i = 0; i < numPoints; i++) {
        if (parseInt(yValues[i]) > parseInt(largest.yValue)) {
            largest.yValue = yValues[i]
        }
    }

    return largest
}

function draw() {
    canvas.clearRect(0, 0, canvasHeight, canvasWidth)
    drawAxes()
    drawAxisLabels()
    printTitle()
    for (var i = 0; i < numPoints; i++) {
        var currentX = getRelativePoint(xValues[i], largestVals.xValue)
        var currentY = getRelativePoint(yValues[i], largestVals.yValue)
        drawPoint(currentX, currentY, i)
    }
}

function getRelativePoint(point, largest) {
    var pointRatio = point / largest
    var pointRelative = pointRatio * 580
    if (pointRelative < 30) {
        pointRelative += 30
    }
    if (pointRelative > 610) {
        pointRelative -= 30
    }
    return pointRelative
}

function printTitle() {
    canvas.fillStyle = userOptions.titleLabelColor
    canvas.font = '22pt ' + userOptions.titleLabelFont

    canvas.fillText(
        chartTitle,
        canvasWidth / 3,
        25,
        canvasWidth / 2
    )
}

function drawAxes() {
    canvas.beginPath()
    canvas.moveTo(padding, padding)
    canvas.lineTo(padding, canvasHeight - padding)
    canvas.lineTo(canvasWidth - padding, canvasHeight - padding)
    canvas.lineWidth = "3"
    canvas.strokeStyle = "black"
    canvas.stroke()
}

function drawAxisLabels() {
    canvas.fillStyle = userOptions.axisLabelColor
    canvas.font = "10pt " + userOptions.axisLabelFont
    canvas.save()
    //x-axis label
    canvas.fillText(
        axisLabels[0],
        padding,
        canvasHeight - 1,
        canvasWidth - padding
    )
    canvas.translate(30, 30);
    canvas.rotate(Math.PI / 2);
    canvas.textAlign = "center";
    //y-axis label
    canvas.fillText(axisLabels[1], 20, 20, canvasWidth - padding)
    canvas.restore()
}

function drawPoint(x, y, i) {
    canvas.beginPath()
    canvas.arc(x, y, userOptions.pointRadius, 0, 2 * Math.PI, false)
    canvas.lineWidth = 2
    canvas.strokeStyle = userOptions.pointColor[i]
    canvas.stroke()
}

function enableShadows() {
    canvas.shadowOffsetX = 2
    canvas.shadowOffsetY = 2
    canvas.shadowBlur = 2
    canvas.shadowColor = "#999"
}

function disableShadows() {
    canvas.shadowOffsetX = 0
    canvas.shadowOffsetY = 0
    canvas.shadowBlur = 0
}

function setCanvasImage() {
    var dataURL = document.getElementById('canvas').toDataURL()
    document.getElementById('canvasImg').src = dataURL
}

function saveImage() {
    window.win = open(document.getElementById('canvasImg').src)
}

function reRender() {
    var userColors = new Array()
    for (var i = 0; i < numPoints; i++) {
        userColors[i] = '#' + $('#pointColor' + i).val()
    }
    userOptions.pointColors = userColors

    //title label font & colors
    userOptions.titleLabelColor = '#' + $('#titleLabelColor').val()
    userOptions.titleLabelFont = $('#titleLabelFont').val()

    //axis labels font & colors
    userOptions.axisLabelColor = '#' + $("#axisLabelColor").val()
    userOptions.axisLabelFont = $("#axisLabelFont").val()

    //get checkboxes
    if ($('#hideTitle').is(':checked')) {
        userOptions.showTitle = false
    } else {
        userOptions.showTitle = true
    }
    if ($('#hideShadows').is(':checked')) {
        userOptions.showShadows = false
    } else {
        userOptions.showShadows = true
    }
    if ($('#hideAxisLabels').is(':checked')) {
        userOptions.showAxisLabels = false
    } else {
        userOptions.showAxisLabels = true
    }

    if ($('#hideAxes').is(':checked')) {
        userOptions.showAxes = false
    } else {
        userOptions.showAxes = true
    }

    draw()
}