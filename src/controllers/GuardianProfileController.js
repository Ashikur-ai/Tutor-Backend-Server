let jwt = require('jsonwebtoken');
const GuardianProfileModel = require('../models/GuardianProfileModel');

exports.CreateGuardianProfile = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await GuardianProfileModel.create(reqBody);
    res.status(200).json({ status: 'success', data: data });
  } catch (err) {
    res.status(400).json({ status: 'fail', data: err });
  }
};



exports.GuardianLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by UserName and Password 
    const data = await GuardianProfileModel.find({ email: email, password: password });

    if (data.length > 0) {

      let Payload = { exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data[0] };
      let token = jwt.sign(Payload, 'SecretKey122354235234')
      res.status(200).json({ status: 'success', token: token, data: data });
    } else {
      res.status(401).json({ status: 'unauthorized', message: 'Invalid Credentials' });
    }
  } catch (err) {
    res.status(400).json({ status: 'fail', data: err.message });
  }
}



exports.SelectGuardianProfile = async (req, res) => {
  let email = req.headers['email'];

  try {
    const data = await GuardianProfileModel.find({ email }).populate('profile');
    if (data.length > 0) {
      res.status(200).json({ status: "success", data: data });
    } else {
      res.status(404).json({ status: "Not Found. Login As Guardian", data: data });
    }
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
};


exports.UpdateGuardianProfile = async (req, res) => {
  const email = req.headers['email']; // Extract UserName from headers
  const reqBody = req.body; // Extract update data from request body

  if (!email) {
    return res.status(400).json({ status: "fail", message: "email is required in headers" });
  }

  try {
    // Update the profile based on email
    const updatedProfile = await GuardianProfileModel.findOneAndUpdate(
      { email },        // Find the profile with this email
      { $set: reqBody },   // Set the updated fields
      { new: true }        // Return the updated document
    );

    if (!updatedProfile) {
      return res.status(404).json({ status: "fail", message: "Profile not found" });
    }

    res.status(200).json({ status: "success", data: updatedProfile });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};