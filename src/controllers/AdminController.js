const GuardianProfileModel = require("../models/GuardianProfileModel");
const ProfileModel = require("../models/ProfileModel");
const TutorProfileModel = require("../models/TutorProfileModel");

exports.GetAllUser = async (req, res) => {

  try {
    const data = await ProfileModel.find();
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
};

exports.GetAllGuardian = async (req, res) => {

  try {
    const data = await GuardianProfileModel.find();
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
};


exports.GetAllTutor = async (req, res) => {

  try {
    const data = await TutorProfileModel.find();
    res.status(200).json({ status: "success", data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
};


exports.VerifyUser = async (req, res) => {
  const _id = req.params.id; // Extract user ID from request parameters
  const { verified } = req.body;

  try {
    // Check if `verified` field is provided in the request body
    if (typeof verified !== "boolean") {
      return res.status(400).json({
        status: "fail",
        message: "Please provide a valid 'verified' field (true or false).",
      });
    }

    // Update the verified field for the given user ID
    const updatedUser = await ProfileModel.findByIdAndUpdate(
      _id,
      { verified: verified },
      { new: true } // Return the updated document
    );

    // Check if the user exists
    if (!updatedUser) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    const action = verified ? "verified" : "unverified";
    res
      .status(200)
      .json({ status: "success", message: `User ${action} successfully`, data: updatedUser });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};



exports.UpdateRole = async (req, res) => {
  const _id = req.params.id; // Extract user ID from request parameters
  const { role } = req.body; // Extract 'role' field from request body

  try {
    // Validate role
    const validRoles = ["guardian", "tutor", ""]; // List of allowed roles
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        status: "fail",
        message: `Invalid role. Allowed roles are: ${validRoles.join(", ")}`,
      });
    }

    // Find the user by ID
    const user = await ProfileModel.findById(_id);
    if (!user) {
      return res.status(404).json({ status: "fail", message: "User not found" });
    }

    // Update the user's role
    const updatedUser = await ProfileModel.findByIdAndUpdate(
      _id,
      { role },
      { new: true } // Return the updated document
    );

    // Remove the user from the previous role model (if applicable)
    if (user.role === "guardian") {
      await GuardianProfileModel.findOneAndDelete({ email: user.email });
    } else if (user.role === "tutor") {
      await TutorProfileModel.findOneAndDelete({ email: user.email });
    }

    // Add the user to the respective model based on the new role
    if (role === "guardian") {
      await GuardianProfileModel.create({
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        city: user.city,
      });
    } else if (role === "tutor") {
      await TutorProfileModel.create({
        name: user.name,
        email: user.email,
        phone: user.phone,
        location: user.location,
        city: user.city,
      });
    }

    res.status(200).json({
      status: "success",
      message: `User role updated to '${role}' and saved to respective profile model successfully`,
      data: updatedUser,
    });
  } catch (err) {
    res.status(400).json({ status: "fail", message: err.message });
  }
};





