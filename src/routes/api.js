const express = require('express');
const router = express.Router();

const ProfileController = require("../controllers/ProfileController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const { PostNeedTutor, SelectNeedTutor, SelectNeedTutorById, UpdateNeedTutor, DeleteNeedTutor } = require('../controllers/NeedTutorController');

router.post("/CreateProfile", ProfileController.CreateProfile);
router.post("/UserLogin", ProfileController.UserLogin);
router.get("/SelectProfile", AuthVerifyMiddleware, ProfileController.SelectProfile);
router.post("/UpdateProfile", AuthVerifyMiddleware, ProfileController.UpdateProfile);


// Need Tutor related api
router.post("/PostNeedTutor", AuthVerifyMiddleware, PostNeedTutor);
router.get("/SelectNeedTutor", AuthVerifyMiddleware, SelectNeedTutor);
router.get("/SelectNeedTutorById/:id", AuthVerifyMiddleware, SelectNeedTutorById);
router.put("/UpdateNeedTutor/:id", AuthVerifyMiddleware, UpdateNeedTutor);

router.delete("/DeleteNeedTutor/:id", AuthVerifyMiddleware, DeleteNeedTutor);

module.exports = router;