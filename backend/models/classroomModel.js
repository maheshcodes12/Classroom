const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	startTime: {
		type: String,
		required: true,
	},
	endTime: {
		type: String,
		required: true,
	},
	daysInSession: {
		type: [String],
		required: true,
	},
});

const classroom = mongoose.model("classrooms", classroomSchema);

module.exports = classroom;
