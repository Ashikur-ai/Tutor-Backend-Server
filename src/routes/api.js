const express = require('express');
const router = express.Router();

const ProfileController = require("../controllers/ProfileController");
const AuthVerifyMiddleware = require("../middleware/AuthVerifyMiddleware");
const { PostNeedTutor, SelectNeedTutor, SelectNeedTutorById, UpdateNeedTutor, DeleteNeedTutor } = require('../controllers/NeedTutorController');
const { CreateTutorProfile, TutorLogin, SelectTutorProfile, UpdateTutorProfile } = require('../controllers/TutorProfileController');
const { CreateGuardianProfile, GuardianLogin, SelectGuardianProfile, UpdateGuardianProfile } = require('../controllers/GuardianProfileController');
const { CreateJobPost, GetAllJobPost, SelectJobPostById, UpdateJobPostById, DeleteJobPostById, GetJobPostsByDateRange, GetJobPostsByTuitionType, GetJobPostsBySubject, GetJobPostsByPreferredTeacherGender, GetJobPostsByPreferredStudentGender } = require('../controllers/JobPostController');
const { GetAllUser, VerifyUser, UpdateRole, GetAllGuardian, GetAllTutor } = require('../controllers/AdminController');
const { AddLocation, GetAllLocation, DeleteLocationById } = require('../controllers/LocationController');



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



// Create Job Post related api 

router.post("/CreateJobPost", AuthVerifyMiddleware, CreateJobPost);
router.get("/GetAllJobPost", AuthVerifyMiddleware, GetAllJobPost);
router.get("/SelectJobPostById/:id", AuthVerifyMiddleware, SelectJobPostById);

router.post("/UpdateJobPostById/:id", AuthVerifyMiddleware, UpdateJobPostById);

router.delete("/DeleteJobPostById/:id", AuthVerifyMiddleware, DeleteJobPostById);

router.post("/GetJobPostsByDateRange", GetJobPostsByDateRange);
router.post("/GetJobPostsByTuitionType", GetJobPostsByTuitionType);
router.post("/GetJobPostsBySubject", GetJobPostsBySubject);
router.post("/GetJobPostsByPreferredTeacherGender", GetJobPostsByPreferredTeacherGender);
router.post("/GetJobPostsByPreferredStudentGender", GetJobPostsByPreferredStudentGender);



// Admin Work Related Api 
router.get("/GetAllUser", AuthVerifyMiddleware, GetAllUser);
router.get("/GetAllGuardian", AuthVerifyMiddleware, GetAllGuardian);
router.get("/GetAllTutor", AuthVerifyMiddleware, GetAllTutor);
router.post("/verifyUser/:id", AuthVerifyMiddleware, VerifyUser);
router.post("/updateRole/:id", AuthVerifyMiddleware, UpdateRole);


// Location related api 
router.post("/AddLocation", AddLocation);
router.get("/GetAllLocation", GetAllLocation);
router.get("/DeleteLocationById/:id", DeleteLocationById);



module.exports = router;