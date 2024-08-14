const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
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

const teacher = mongoose.model("teachers", teacherSchema);

module.exports = teacher;
