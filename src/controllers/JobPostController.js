const JobPostModel = require("../models/JobPostModel");


exports.CreateJobPost = async (req, res) => {
  try {
    const data = req.body;
    const email = req.headers['email'];

    if (!email) {
      return res.status(400).json({ status: 'fail', message: 'Email is required in headers' });
    }

    // Add email to the data object
    data.email = email;

    // Save the data to the database
    const result = await JobPostModel.create(data);

    res.status(200).json({ status: 'success', data: result });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};






exports.GetAllJobPost = async (req, res) => {
  let email = req.headers['email'];

  console.log(email);

  try {
    const data = await JobPostModel.find({ email });
    res.status(200).json({ status: 'success', data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
}




exports.SelectJobPostById = async (req, res) => {
  let _id = req.params.id;

  try {
    const data = await JobPostModel.findById(_id);
    res.status(200).json({ status: 'success', data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
}





exports.UpdateJobPostById = async (req, res) => {
  const data = req.body;
  let id = req.params.id;
  try {
    const result = await JobPostModel.findOneAndUpdate(
      { _id: id },
      { $set: data },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ status: "fail", message: "Need Tutor Post not found" });
    }
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};





exports.DeleteJobPostById = async (req, res) => {
  let _id = req.params.id;

  if (!_id) {
    return res.status(400).json({ status: "fail", message: "Id is required" });
  };

  try {
    const result = await JobPostModel.findByIdAndDelete(_id);

    if (!result) {
      return res.status(404).json({ status: "fail", message: "POST not found" });
    }

    res.status(200).json({ status: "success", message: "POST deleted successfully", data: result });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }


}