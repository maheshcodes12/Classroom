const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	classroom: {
		type: String,
	},
});

const student = mongoose.model("students", studentSchema);

module.exports = student;
