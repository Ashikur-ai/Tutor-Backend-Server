const nodemailer = require('nodemailer');
require("dotenv").config()
let pass = process.env.PASS
let smtpTransport = require("nodemailer-smtp-transport");
const SendEmailUtility = async (EmailTo, EmailText, EmailSubject) => {
  // console.log("Hello from Email Helper")
  let transporter = nodemailer.createTransport(
    smtpTransport({
      service: "Gmail",
      auth: {
        user: "ashikur1602@gmail.com",
        pass: "pznm nwfh ebuc pntn"
      },
    }
    )
  );
  let mailOptions = {
    from: 'ashikur1602@gmail.com',
    to: EmailTo,
    subject: EmailSubject,
    text: EmailText
  };

  // console.log("Hello from Email Helper")
  return await transporter.sendMail(mailOptions)

}
module.exports = SendEmailUtility