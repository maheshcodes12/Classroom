const classroom = require("../models/classroomModel.js");
const students = require("../models/studentModel.js");
const teachers = require("../models/teacherModel.js");

async function getAllStudents(req, res) {
	try {
		const studentsArray = await students.find();

		if (!studentsArray[0]) {
			return res
				.status(200)
				.json({ success: false, message: "No student is registered" });
		} else {
			return res.status(200).json({
				success: true,
				message: "Added classroom Successfully",
				studentsArray: studentsArray,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(404).json({
			success: "false",
			message: "encountered some error",
		});
	}
}

async function getAllTeachers(req, res) {
	try {
		const teachersArray = await teachers.find();

		if (!teachersArray[0]) {
			return res
				.status(200)
				.json({ success: false, message: "No teachers registetrd" });
		} else {
			return res.status(200).json({
				success: true,
				message: "Got classroom data successfully",
				teachersArray: teachersArray,
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while getting data" });
	}
}

module.exports = {
	getAllStudents,
	getAllTeachers,
};
