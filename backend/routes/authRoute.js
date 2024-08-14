const express = require("express");
const router = express.Router();
const {
	loginForTeacher,
	loginForStudent,
	signupForTeacher,
	signupForStudent,
	loginForPrincipal,
} = require("../controllers/auth.js");

router.post("/loginteacher", loginForTeacher);
router.post("/loginstudent", loginForStudent);
router.post("/signupteacher", signupForTeacher);
router.post("/signupstudent", signupForStudent);
router.post("/loginprincipal", loginForPrincipal);

module.exports = router;
