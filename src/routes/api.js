const express = require('express');
const router = express.Router();

const ProfileController = require("../controllers/ProfileController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const { PostNeedTutor, SelectNeedTutor, SelectNeedTutorById, UpdateNeedTutor, DeleteNeedTutor } = require('../controllers/NeedTutorController');
const { CreateTutorProfile, TutorLogin, SelectTutorProfile, UpdateTutorProfile } = require('../controllers/TutorProfileController');
const { CreateGuardianProfile, GuardianLogin, SelectGuardianProfile, UpdateGuardianProfile } = require('../controllers/GuardianProfileController');



// Admin Profile related api 
router.post("/CreateProfile", ProfileController.CreateProfile);
router.post("/UserLogin", ProfileController.UserLogin);
router.get("/SelectProfile", AuthVerifyMiddleware, ProfileController.SelectProfile);
router.post("/UpdateProfile", AuthVerifyMiddleware, ProfileController.UpdateProfile);

// Tutor Profile Related APi
router.post("/CreateTutorProfile", CreateTutorProfile);
router.post("/GuardianLogin", GuardianLogin);

router.get("/SelectGuardianProfile", AuthVerifyMiddleware, SelectGuardianProfile);

router.post("/UpdateGuardianProfile", AuthVerifyMiddleware, UpdateGuardianProfile);



// Guardian Profile Related APi
router.post("/CreateGuardianProfile", CreateGuardianProfile);
router.post("/TutorLogin", TutorLogin);
router.get("/SelectTutorProfile", AuthVerifyMiddleware, SelectTutorProfile);

router.post("/UpdateTutorProfile", AuthVerifyMiddleware, UpdateTutorProfile);






// Need Tutor related api
router.post("/PostNeedTutor", AuthVerifyMiddleware, PostNeedTutor);
router.get("/SelectNeedTutor", AuthVerifyMiddleware, SelectNeedTutor);
router.get("/SelectNeedTutorById/:id", AuthVerifyMiddleware, SelectNeedTutorById);
router.put("/UpdateNeedTutor/:id", AuthVerifyMiddleware, UpdateNeedTutor);

router.delete("/DeleteNeedTutor/:id", AuthVerifyMiddleware, DeleteNeedTutor);

module.exports = router;