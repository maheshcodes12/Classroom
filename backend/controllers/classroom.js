const classroom = require("../models/classroomModel.js");
const students = require("../models/studentModel.js");
const teachers = require("../models/teacherModel.js");

async function addClassroom(req, res) {
	const { name, startTime, endTime, daysInSession } = req.body;

	try {
		const exist = await classroom.find({
			name: name,
		});
		if (exist[0]) {
			return res
				.status(200)
				.json({ success: false, message: "Classroom already exists" });
		} else {
			const newClassroom = new classroom({
				name: name,
				startTime: startTime,
				endTime: endTime,
				daysInSession: daysInSession,
			});
			await newClassroom.save();

			return res.status(200).json({
				success: true,
				message: "Added classroom Successfully",
				startTime: startTime,
				endTime: endTime,
				daysInSession: daysInSession,
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

async function getClassroomData(req, res) {
	const { name } = req.query;

	try {
		const exist = await classroom.find(
			{ name: name },
			{ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
		);

		const studentsInClass = await students.find(
			{ classroom: name },
			{ name: 1, email: 1 }
		);

		const teacherOfClass = await teachers.find(
			{ classroom: name },
			{ name: 1, email: 1 }
		);

		if (!exist[0]) {
			return res
				.status(200)
				.json({ success: false, message: "Classroom does not exist" });
		} else {
			return res.status(200).json({
				success: true,
				message: "Got classroom data successfully",
				name: exist[0].name,
				startTime: exist[0].startTime,
				endTime: exist[0].endTime,
				daysInSession: exist[0].daysInSession,
				studentsInClass: studentsInClass,
				teacherOfClass: teacherOfClass,
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while getting data" });
	}
}

async function updateClassroomData(req, res) {
	const { name, startTime, endTime, daysInSession } = req.body;

	try {
		const exist = await classroom.find({
			name: name,
		});

		if (!exist[0]) {
			return res
				.status(200)
				.json({ success: false, message: "Classroom does not exists" });
		} else {
			await classroom.updateOne(
				{ name: name },
				{ startTime: startTime, endTime: endTime, daysInSession: daysInSession }
			);

			return res.status(200).json({
				success: true,
				message: "Updated classroom data Successfully",
				startTime: startTime,
				endTime: endTime,
				daysInSession: daysInSession,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(404).json({
			success: "false",
			message: "encountered some error while updating classroom data",
		});
	}
}

module.exports = {
	addClassroom,
	getClassroomData,
	updateClassroomData,
};
