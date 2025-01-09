const ProfileModel = require("../models/ProfileModel");
const SendEmailUtility = require("../utility/EmailHelper");

exports.UserOTPService = async (req) => {
  // console.log("Hello from User Service")
  try {
    let email = req.params.email;
    let code = Math.floor(100000 + Math.random() * 900000);
    let EmailText = `Your Verification Code is: ${code}`;
    let EmailSubject = 'Email Verification Code';
    await SendEmailUtility(email, EmailText, EmailSubject);
    await ProfileModel.updateOne({ email: email }, { $set: { otp: code } }, { upsert: true });
    return { status: "success", message: "6 Digit OTP has been send" };
  } catch (e) {
    return { status: "fail", message: "Something went wrong" }
  }
}