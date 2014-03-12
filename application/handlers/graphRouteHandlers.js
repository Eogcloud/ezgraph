var fileManager             =   require('../module/fileManager')
var userModel               =   App.model('userModel')
exports.getGraphing         =   getGraphing
exports.getBarchartentry    =   getBarchartentry
exports.postBarchartentry   =   postBarchartentry
exports.getImport           =   getImport
exports.getPieChartEntry    =   getPieChartEntry
exports.postPieChartEntry   =   postPieChartEntry
exports.postImport          =   postImport

function getImport(req, res){
        res.render('import',{
                                title: 'EZgraph | Import',
                                user: req.user})
}

function postImport(req, res){
    console.log(req.files)
    if (fileManager.verifyFileTypeCSV(req.files.csvFile.type)){

    }
    else{

    }
}

function getGraphing(req, res){
        res.render('graphing', {
                                    title: 'EZgraph | Graphing',
                                    user: req.user})
}

function getPieChartEntry(req, res){
        res.render('pieChartEntry', {
                                        title: 'EZgraph | Pie Chart',
                                        user: req.user})
}

function postPieChartEntry(req, res){
        res.render('pieChart', {
                                    pieValues: req.body.pieValues,
                                    pieLabels: req.body.pieLabels,
                                    pieTitle: req.body.pieTitle,
                                    title: 'EZgraph | Pie Chart',
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