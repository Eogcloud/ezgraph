var mongoose = require( 'mongoose' );

function connect(ConnectionString){
    mongoose.connect(ConnectionString)

    var database = mongoose.connection
    database.on('error', console.error.bind(console, 'connection error'))
    database.once('open', function callback(){
        console.log('Mongoose connected @ ' +ConnectionString)
    })
}

module.exports = connect





