$( document ).ready(function(){

        //canvas context and user data
        var canvas = document.getElementById('canvas').getContext("2d")
        var pieValues = pieVal
        var pieLabels = pieLab
        var pieTitles  = titleLab

        //user options object
        var userOptions = { };

        draw()

        function draw(){
            debugPrintInput()
        }

        function debugPrintInput(){
            console.debug(pieValues)
            console.debug(pieLabels)
            console.debug(pieTitles)
        }
})