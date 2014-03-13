var Converter               =   require("csvtojson").core.Converter
var currentdate             =   new Date()
exports.verifyFileTypeCSV   =   verifyFileTypeCSV
exports.saveFileDataCSV     =   saveFileDataCSV

function verifyFileTypeCSV(fileType){
    if(fileType!='application/csv'){
        return false
    }
    else{
        return true
    }
}

function saveFileDataCSV(file, username, password, model){
    model.findOne({ email :  username },
        function(err, user) {
            if (err){
                console.log('err')
            }
            if (!user){
                console.log('no user found!')
            }
            else{
                var csvConverter = new Converter()
                csvConverter.on("end_parsed",function(jsonObj){
                    jsonObj.date = currentdate.getDate()
                    user.uploadedFiles = jsonObj
                    user.save()
                })
                csvConverter.from(file)
            }
    })
}