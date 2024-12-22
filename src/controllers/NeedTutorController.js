const NeedTutorModel = require("../models/NeedTutorModel");

exports.PostNeedTutor = async (req, res) => {
  try {
    const data = req.body;
    const email = req.headers['email'];

    if (!email) {
      return res.status(400).json({ status: 'fail', message: 'Email is required in headers' });
    }

    // Add email to the data object
    data.email = email;

    // Save the data to the database
    const result = await NeedTutorModel.create(data);

    res.status(200).json({ status: 'success', data: result });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};






exports.SelectNeedTutor = async (req, res) => {
  let email = req.headers['email'];
  
  try {
    const data = await NeedTutorModel.find({ email });
    res.status(200).json({ status: 'success', data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
}




exports.SelectNeedTutorById = async (req, res) => {
  let id = req.params.id;

  try {
    const data = await NeedTutorModel.findById(id);
    res.status(200).json({ status: 'success', data: data });
  } catch (err) {
    res.status(400).json({ status: "fail", data: err.message });
  }
}  





exports.UpdateNeedTutor = async (req, res) => {
  const data = req.body;
  let id = req.params.id;
  console.log(id);
  try {
    const result = await NeedTutorModel.findOneAndUpdate(
      { _id:id },
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





exports.DeleteNeedTutor = async (req, res) => {
  let _id = req.params.id;

  if (!_id) {
    return res.status(400).json({ status: "fail", message: "Id is required" });
  };

  try {
    const result = await NeedTutorModel.findByIdAndDelete(_id);

    if (!result) {
      return res.status(404).json({ status: "fail", message: "POST not found" });
    }

    res.status(200).json({ status: "success", message: "POST deleted successfully", data: result });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }


}