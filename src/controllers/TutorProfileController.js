let jwt = require('jsonwebtoken');
const TutorProfileModel = require('../models/TutorProfileModel');
const TutorAdditionalInfoModel = require('../models/TutorAdditionalInfoModel');

exports.CreateTutorProfile = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await TutorProfileModel.create(reqBody);
    res.status(200).json({ status: 'success', data: data });
  } catch (err) {
    res.status(400).json({ status: 'fail', data: err });
  }
};



exports.TutorLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by UserName and Password 
    const data = await TutorProfileModel.find({ email: email, password: password });

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



exports.SelectTutorProfile = async (req, res) => {
  let email = req.headers['email'];

  try {
    const data = await TutorAdditionalInfoModel.find({ email }).populate('profile');
    if (data.length > 0) {
      res.status(200).json({ status: "success", data: data });
    } else {
      res.status(404).json({ status: "Not Found. Login As Tutor", data: data });
    }

  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
};


exports.UpdateTutorProfile = async (req, res) => {
  const email = req.headers['email']; // Extract UserName from headers
  const reqBody = req.body; // Extract update data from request body

  if (!email) {
    return res.status(400).json({ status: "fail", message: "email is required in headers" });
  }

  try {
    // Update the profile based on email
    const updatedProfile = await TutorProfileModel.findOneAndUpdate(
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



exports.UpdateTutorInfo = async (req, res) => {
  const { email } = req.headers; // Extract email from headers
  const { category, categoryRelated } = req.body; // Extract category and related info from body

  try {
    // Validate input
    if (!email || !category || !categoryRelated) {
      return res.status(400).json({
        status: 'fail',
        message: 'Email, category, and categoryRelated fields are required',
      });
    }

    // Validate category
    const validCategories = [
      'CATEGORYRELATED',
      'EDUCATIONRELATED',
      'PERSONALRELATED',
      'CREDENTIALRELATED',
    ];
    if (!validCategories.includes(category)) {
      return res.status(400).json({
        status: 'fail',
        message: `Invalid category. Allowed categories are: ${validCategories.join(
          ', '
        )}`,
      });
    }

    // Find the document by email
    const tutorInfo = await TutorAdditionalInfoModel.findOne({ email });

    // If tutor info doesn't exist, create a new document
    if (!tutorInfo) {
      const newTutorInfo = new TutorAdditionalInfoModel({
        email,
        categoryRelated: { [category]: categoryRelated },
      });
      await newTutorInfo.save();
      return res.status(201).json({
        status: 'success',
        message: `Tutor information for category '${category}' created successfully`,
        data: newTutorInfo,
      });
    }

    // Update the specific category data without overwriting others
    tutorInfo.categoryRelated[category] = categoryRelated;

    // Recalculate completion percentage for the updated category
    const totalFields = Object.keys(categoryRelated).length;
    const filledFields = Object.values(categoryRelated).filter(
      (value) => value !== null && value !== ''
    ).length;
    tutorInfo.percentage = Math.floor((filledFields / totalFields) * 100);

    // Update status based on percentage
    tutorInfo.status = tutorInfo.percentage === 100 ? 'complete' : 'incomplete';

    // Save the updated document
    await tutorInfo.save();

    res.status(200).json({
      status: 'success',
      message: `Tutor information for category '${category}' updated successfully`,
      data: tutorInfo,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

