const express = require("express");
const router = express.Router();
const {
	getAllStudents,
	getAllTeachers,
} = require("../controllers/giveUsers.js");

router.get("/getstudents", getAllStudents);
router.get("/getteachers", getAllTeachers);

module.exports = router;
