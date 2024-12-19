const express = require('express');
const router = express.Router();

const ProfileController = require("../controllers/ProfileController");

router.post("/CreateProfile", ProfileController.CreateProfile);

module.exports = router;