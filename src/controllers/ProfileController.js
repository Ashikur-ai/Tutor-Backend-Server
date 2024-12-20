const ProfileModel = require("../models/ProfileModel");
let jwt = require('jsonwebtoken');

exports.CreateProfile = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await ProfileModel.create(reqBody);
    res.status(200).json({ status: 'success', data: data });
  } catch (err) {
    res.status(400).json({ status: 'fail', data: err });
  }
};



exports.UserLogin = async (req, res) => {
  const { UserName, Password } = req.body;

  try {
    // Find user by UserName and Password 
    const data = await ProfileModel.find({ UserName: UserName, Password: Password });

    if (data.length > 0) {
      
      let Payload = { exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: data[0] };
      let token  = jwt.sign(Payload, 'SecretKey122354235234')
      res.status(200).json({ status: 'success', token:token, data: data });
    } else {
      res.status(401).json({ status: 'unauthorized', message: 'Invalid Credentials' });
    }
  } catch (err) {
    res.status(400).json({ status: 'fail', data: err.message });
  }
}


// exports.SelectProfile = (req, res) => {
//   let UserName = "admin";
//   ProfileModel.find({ UserName: UserName }, (err, data) => {
//     if (err) {
//       res.status(400).json({ status: "fail", data: err });
//     }
//     else {
//       res.status(200).json({ status: "success", data: data });
//     }
//   })
// }


exports.SelectProfile = async (req, res) => {
  let UserName = req.headers['username'];

  try {
    const data = await ProfileModel.find({ UserName });
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
};


exports.UpdateProfile = async (req, res) => {
  const UserName = req.headers['username']; // Extract UserName from headers
  const reqBody = req.body; // Extract update data from request body

  if (!UserName) {
    return res.status(400).json({ status: "fail", message: "Username is required in headers" });
  }

  try {
    // Update the profile based on UserName
    const updatedProfile = await ProfileModel.findOneAndUpdate(
      { UserName },        // Find the profile with this UserName
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

