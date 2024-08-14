const mongoose = require("mongoose");

const PeriodSchema = new mongoose.Schema({
	period_name: { type: String, required: true },
	start_time: { type: String, required: true },
	end_time: { type: String, required: true },
});

const timetableSchema = new mongoose.Schema({
	classroom: {
		type: String,
		required: true,
	},
	periods: {
		type: [PeriodSchema],
		required: true,
	},
});

const timetable = mongoose.model("timetables", timetableSchema);

module.exports = timetable;
