const classroom = require("../models/classroomModel.js");
const students = require("../models/studentModel.js");
const teachers = require("../models/teacherModel.js");

async function addTeacherToClassroom(req, res) {
	const { name, email } = req.body;

	try {
		const exist = await classroom.find({
			name: name,
		});
		const teacher = await teachers.find({
			email: email,
		});
		if (!exist[0]) {
			return res
				.status(200)
				.json({ success: false, message: "Classroom does not exists" });
		} else if (!teacher[0]) {
			return res
				.status(200)
				.json({ success: false, message: "Teacher does not exists" });
		} else {
			await teachers.updateOne({ email: email }, { classroom: name });

			return res.status(200).json({
				success: true,
				message: "Added teacher to Successfully",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(404).json({
			success: "false",
			message: "encountered some error while adding classroom",
		});
	}
}

async function removeTeacherFromClassroom(req, res) {
	const { name, email } = req.body;

	try {
		const teacherOfClass = await teachers.find(
			{ email: email, classroom: name },
			{ name: 1, email: 1 }
		);

		if (!teacherOfClass[0]) {
			return res
				.status(200)
				.json({ success: false, message: "Classroom teacher does not exist" });
		} else {
			await teachers.updateOne(
				{ classroom: name, email: email },
				{ classroom: "" }
			);
			return res.status(200).json({
				success: true,
				message: "Removed teacher from classroom successfully",
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
	addTeacherToClassroom,
	removeTeacherFromClassroom,
};
