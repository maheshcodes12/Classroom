const teacher = require("../models/teacherModel.js");
const student = require("../models/studentModel.js");
const principal = require("../models/principalModel.js");

async function loginForTeacher(req, res) {
	const { email, password } = req.body;
	console.log(email, password);

	try {
		const exist = await teacher.find(
			{ email: email },
			{ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
		);

		if (!exist[0]) {
			return res
				.status(200)
				.json({ success: false, message: "User does not exist" });
		} else {
			let password_match = false;
			const email = exist[0].email;
			const password_in_db = exist[0].password;
			if (password_in_db === password) password_match = true;

			if (password_match) {
				return res.status(200).json({
					success: true,
					message: "Logged in successfully",
					email: email,
					name: exist[0].name,
				});
			} else {
				return res
					.status(200)
					.json({ success: false, message: "Invalid password" });
			}
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while logging" });
	}
}
async function signupForTeacher(req, res) {
	const { name, email, password } = req.body;
	const classroom = "";
	try {
		const exist = await teacher.find({ email: email });
		if (exist[0]) {
			return res.status(200).json({
				success: false,
				message: "User already exists",
			});
		} else {
			const newTeacher = new teacher({
				name: name,
				email: email,
				password: password,
				classroom: classroom,
			});
			await newTeacher.save();

			return res.status(200).json({
				success: true,
				message: "Teacher signed in successfully",
				email: email,
				name: name,
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while signing" });
	}
}

async function loginForStudent(req, res) {
	const { email, password } = req.body;

	try {
		const exist = await student.find(
			{ email: email },
			{ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
		);

		if (!exist[0]) {
			return res
				.status(200)
				.json({ success: false, message: "User does not exist" });
		} else {
			let password_match = false;
			const email = exist[0].email;
			const password_in_db = exist[0].password;
			if (password_in_db === password) password_match = true;

			if (password_match) {
				return res.status(200).json({
					success: true,
					message: "Logged in successfully",
					email: email,
					name: exist[0].name,
				});
			} else {
				return res
					.status(200)
					.json({ success: false, message: "Invalid password" });
			}
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while logging" });
	}
}
async function signupForStudent(req, res) {
	const { name, email, password, classroom } = req.body;

	try {
		const exist = await student.find({ email: email });
		if (exist[0]) {
			return res.status(200).json({
				success: false,
				message: "User already exists",
			});
		} else {
			const newStudent = new student({
				name: name,
				email: email,
				password: password,
				classroom: classroom,
			});
			await newStudent.save();

			return res.status(200).json({
				success: true,
				message: "Student signed in successfully",
				email: email,
				name: name,
			});
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while signing" });
	}
}

async function loginForPrincipal(req, res) {
	const { email, password } = req.body;
	console.log(email, password);

	try {
		const exist = await principal.find(
			{ email: email },
			{ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 }
		);

		if (!exist[0]) {
			return res
				.status(200)
				.json({ success: false, message: "User does not exist" });
		} else {
			let password_match = false;
			const email = exist[0].email;
			const password_in_db = exist[0].password;
			if (password_in_db === password) password_match = true;

			if (password_match) {
				return res.status(200).json({
					success: true,
					message: "Logged in successfully",
					email: email,
					name: exist[0].name,
				});
			} else {
				return res
					.status(200)
					.json({ success: false, message: "Invalid password" });
			}
		}
	} catch (e) {
		console.log(e);
		return res
			.status(404)
			.json({ success: false, message: "Problem while logging" });
	}
}

module.exports = {
	loginForStudent,
	loginForTeacher,
	signupForStudent,
	signupForTeacher,
	loginForPrincipal,
};
