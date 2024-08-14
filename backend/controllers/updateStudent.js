const classroom = require("../models/classroomModel.js");
const students = require("../models/studentModel.js");
const teachers = require("../models/teacherModel.js");

async function addStudentToClassroom(req, res) {
	const { name, email } = req.body;

	try {
		const exist = await classroom.find({
			name: name,
		});
		const student = await students.find({
			email: email,
		});
		if (!exist[0]) {
			return res
				.status(200)
				.json({ success: false, message: "Classroom does not exists" });
		} else if (!student[0]) {
			return res
				.status(200)
				.json({ success: false, message: "Student does not exists" });
		} else {
			await students.updateOne({ email: email }, { classroom: name });

			return res.status(200).json({
				success: true,
				message: "Added student to classroom Successfully",
			});
		}
	} catch (error) {
		console.log(error);
		res.status(404).json({
			success: "false",
			message: "encountered some error while adding student",
		});
	}
}

async function removeStudentFromClassroom(req, res) {
	const { name, email } = req.body;

	try {
		const studentOfClass = await students.find(
			{ email: email, classroom: name },
			{ name: 1, email: 1 }
		);

		if (!studentOfClass[0]) {
			return res
				.status(200)
				.json({ success: false, message: "Classroom student does not exist" });
		} else {
			await students.updateOne(
				{ classroom: name, email: email },
				{ classroom: "" }
			);
			return res.status(200).json({
				success: true,
				message: "Removed student from classroom successfully",
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while removing student" });
	}
}

module.exports = {
	addStudentToClassroom,
	removeStudentFromClassroom,
};
