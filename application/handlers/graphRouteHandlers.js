var userModel   =   App.model('userModel')

exports.getGraphing         =   getGraphing
exports.getBarchartentry    =   getBarchartentry
exports.postBarchartentry   =   postBarchartentry
exports.getImport           =   getImport

function getImport(req, res){
        res.render('import', {
                                    title: 'EZgraph | Import',
                                    user: req.user})
}


function getGraphing(req, res){
        res.render('graphing', {
                                    title: 'EZgraph | graphing',
                                    user: req.user})
}

function getBarchartentry(req, res){
        res.render('barchartentry', {
                                        title: 'EZgraph | Bar Chart',
                                        user: req.user})
}

function postBarchartentry(req, res){
        res.render('barchart', {
                                    barValues: req.body.barValues,
                                    barLabels: req.body.barLabels,
                                    axisLabels: req.body.axisLabels,
                                    title: 'EZgraph | Bar Chart',
                                    user: req.user})
}