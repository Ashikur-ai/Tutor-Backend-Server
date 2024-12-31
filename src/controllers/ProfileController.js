const GuardianProfileModel = require("../models/GuardianProfileModel");
const ProfileModel = require("../models/ProfileModel");
let jwt = require('jsonwebtoken');
const TutorProfileModel = require("../models/TutorProfileModel");

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
  const { email, password } = req.body;

  try {
    // Find user by UserName and Password 
    const data = await ProfileModel.find({ email: email, password: password });

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



// updated register function 
exports.RegisterUser = async (req, res) => {
  try {
    const role = req.params.role; // Extract role from request parameters
    const reqBody = req.body; // Extract user details from request body

    // Validate role
    const validRoles = ["guardian", "tutor", ""]; // List of allowed roles
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        status: "fail",
        message: `Invalid role. Allowed roles are: ${validRoles.join(", ")}`,
      });
    }

    // Create the user profile in the main ProfileModel
    const userProfile = await ProfileModel.create({ ...reqBody, role });

    // Add the user to the respective role-based model
    if (role === "guardian") {
      await GuardianProfileModel.create({
        profile: userProfile._id,
        email: userProfile.email,
        
      });
    } else if (role === "tutor") {
      await TutorProfileModel.create({
        profile: userProfile._id,
        email: userProfile.email,
       
      });
    }

    // Generate a JWT token
    const payload = { exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, data: userProfile };
    const token = jwt.sign(payload, "SecretKey122354235234");

    res.status(200).json({
      status: "success",
      message: `User registered successfully with role '${role}'`,
      token: token,
      data: userProfile,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};






exports.SelectProfile = async (req, res) => {
  let email = req.headers['email'];

  try {
    const data = await ProfileModel.find({ email });
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
};


exports.UpdateProfile = async (req, res) => {
  const email = req.headers['email']; // Extract UserName from headers
  const reqBody = req.body; // Extract update data from request body

  if (!email) {
    return res.status(400).json({ status: "fail", message: "email is required in headers" });
  }

  try {
    // Update the profile based on email
    const updatedProfile = await ProfileModel.findOneAndUpdate(
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

