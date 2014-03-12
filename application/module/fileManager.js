exports.verifyFileTypeCSV   =   verifyFileTypeCSV

function verifyFileTypeCSV(fileType){
    if(fileType!='application/csv'){
        return true
    }
    else{
        return false
    }
}

function saveFile(file, username, password, model){
    model.findOne({ email :  username }, function(err, user) {
        if (err){
            return done(err)
        }
        if (!user){
            return done(null, false)
        }
        if (!user.validPassword(password)){
            return done(null, false)
        }
        else{
            model.save(file)
        }
    })
}