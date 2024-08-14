const timetable = require("../models/timetableModel.js");

async function updateTimetable(req, res) {
	const { classroom, periods } = req.body;

	try {
		const exist = await timetable.find({
			classroom: classroom,
		});

		if (!exist[0]) {
			const newTimetable = new timetable({
				classroom: classroom,
				periods: periods,
			});
			await newTimetable.save();

			return res.status(200).json({
				success: true,
				message: "Added timetable Successfully",
				classes: classes,
			});
		} else {
			await timetable.updateOne(
				{ classroom: classroom },
				{
					periods: periods,
				}
			);

			return res.status(200).json({
				success: true,
				message: "Updated timetable data Successfully",
				periods: periods,
			});
		}
	} catch (error) {
		console.log(error);
		res.status(404).json({
			success: "false",
			message: "encountered some error while updating timetable data",
		});
	}
}

module.exports = {
	updateTimetable,
};
