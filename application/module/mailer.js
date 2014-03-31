module.exports = function(recipient) {
    var nodemailer = require("nodemailer")
    var mailOpts
    var smtpConfig

    mailOpts = {
        from: "Signup Bot <signup@EZgraph.eu>",
        to: recipient,
        subject: "EZgraph Registration Confimration", // Subject line
        text: "Hello " + recipient + ", Thank you for signing up to EZgraph.",
        html: "<b>Hello " + recipient + ", Thank you for signing up to EZgraph.</b>"
    }

    smtpConfig = nodemailer.createTransport('SMTP', {
        service: 'Gmail',
        auth: {
            user: "ezgraphapp@gmail.com",
            pass: "ezgraphpassword"
        }
    })

    smtpConfig.sendMail(mailOpts, function(error, response) {
        //Email not sent
        if (error) {
            console.log("Email send Falied: " + error);
        } else {
            console.log("Email sent successfully!");
        }
    })
}