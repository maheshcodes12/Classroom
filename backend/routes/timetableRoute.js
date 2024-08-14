const express = require("express");
const router = express.Router();
const { updateTimetable } = require("../controllers/timetable.js");

router.post("/update", updateTimetable);

module.exports = router;
