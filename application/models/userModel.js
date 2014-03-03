var mongoose         = require('mongoose')
var validator        = require('mongoose-validate')
var bcrypt           = require('bcrypt')
var schema           = mongoose.Schema
var REQ_PASS_LENGTH  = 8

var userDataModel = new schema({
    email: {
                type: String,
                required: true,
                unique: true,
                validate: [validator.email, 'Not a valid email address!']
            },

    hashedPassword: {
                        type: String,
                        required: true,
                        validate: [checkLength, 'The Password is too short! Passwords must be at least '+REQ_PASS_LENGTH+' characters!']
                    },
    savedGraphs:{}
})

userDataModel.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userDataModel.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword);
};

//length validation helper
function checkLength(inputString){
   return inputString && inputString.length >= REQ_PASS_LENGTH
}

var userModel = mongoose.model('userDataModel', userDataModel);
module.exports = userModel