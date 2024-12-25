const LocationModel = require("../models/LocationModel");

exports.AddLocation = async (req, res) => {
  try {
    const data = req.body;
    const result = await LocationModel.create(data);
    res.status(200).json({ status: 'success', data: result });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
}


exports.GetAllLocation = async (req, res) => {
  try {
    const data = await LocationModel.find({});
    res.status(200).json({ status:'success', data: data });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
}

exports.DeleteLocationById = async (req, res) => {
  const _id = req.params.id;
  try {
    const result = await LocationModel.findByIdAndDelete(_id);
    if (!result) {
      return res.status(404).json({ status: 'fail', message: 'Location not found' });
    }
    res.status(200).json({ status: 'success', message: 'Location deleted successfully' });
    
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
}