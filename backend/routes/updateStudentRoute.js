const express = require("express");
const router = express.Router();
const {
	addStudentToClassroom,
	removeStudentFromClassroom,
} = require("../controllers/updateStudent.js");

router.post("/add", addStudentToClassroom);
router.post("/remove", removeStudentFromClassroom);

module.exports = router;
