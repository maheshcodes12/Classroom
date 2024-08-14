const express = require("express");
const router = express.Router();
const {
	addTeacherToClassroom,
	removeTeacherFromClassroom,
} = require("../controllers/updateTeacher.js");

router.post("/add", addTeacherToClassroom);
router.post("/remove", removeTeacherFromClassroom);

module.exports = router;
