var model = App.model('userModel')

exports.savePostData = savePostData
exports.getGraphs = getGraphs

    function savePostData(postData, username) {
        model.findOne({
                email: username
            },
            function(err, user) {
                if (err) {
                    console.log('err')
                }
                if (!user) {
                    console.log('no user found!')
                } else {
                    user.savedGraphs = {}
                    user.savedGraphs[postData.date] = postData
                    user.save()
                }
            }
        )
    }

    function getGraphs(username, callback) {
        model.findOne({
                email: username
            },
            function(err, user) {
                if (err) {
                    console.log('err')
                }
                if (!user) {
                    console.log('no user found!')
                } else {
                    callback(user.savedGraphs)
                }
            }
        )
    }