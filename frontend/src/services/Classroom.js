import axios from "axios";

export async function getClassroomData(name) {
	try {
		const backend_url = import.meta.env.VITE_BACKEND_URI;

		const response = await axios.get(`${backend_url}/classroom/get`, {
			params: { name: name },
		});

		if (response.data) {
			return {
				name: response.data.name,
				startTime: response.data.startTime,
				endTime: response.data.endTime,
				daysInSession: response.data.daysInSession,
				studentsInClass: response.data.studentsInClass,
				teacherOfClass: response.data.teacherOfClass[0],
			};
		}
	} catch (error) {
		console.log(error);
	}
}

export async function removeTeacherFromClassroom(name, email) {
	try {
		const backend_url = import.meta.env.VITE_BACKEND_URI;

		const response = await axios.post(`${backend_url}/teacher/remove`, {
			name: name,
			email: email,
		});

		console.log(response);
	} catch (error) {
		console.log(error);
	}
}

export async function addTeacherToClassroom(name, email) {
	try {
		const backend_url = import.meta.env.VITE_BACKEND_URI;

		const response = await axios.post(`${backend_url}/teacher/add`, {
			name: name,
			email: email,
		});

		console.log(response);
	} catch (error) {
		console.log(error);
	}
}

export async function removeStudentFromClassroom(name, email) {
	try {
		const backend_url = import.meta.env.VITE_BACKEND_URI;

		const response = await axios.post(`${backend_url}/student/remove`, {
			name: name,
			email: email,
		});

		console.log(response);
	} catch (error) {
		console.log(error);
	}
}
