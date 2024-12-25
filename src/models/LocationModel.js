const mongoose = require("mongoose");

const DataSchema = mongoose.Schema(
  {
    name: { type: String }
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields automatically
    versionKey: false, // removes __v field automatically
  }
);

const LocationModel = mongoose.model('Location', DataSchema);
module.exports = LocationModel;