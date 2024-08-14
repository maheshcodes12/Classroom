const express = require("express");
const router = express.Router();
const {
	addClassroom,
	getClassroomData,
	updateClassroomData,
} = require("../controllers/classroom.js");

router.post("/add", addClassroom);
router.post("/update", updateClassroomData);
router.get("/get", getClassroomData);

module.exports = router;
